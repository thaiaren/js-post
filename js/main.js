import postApi from './api/postApi';
import { setTextConten } from './utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function createPostElement(post) {
    // console.log(post);
    const postTemplate = document.getElementById('postTemplate');
    if (!postTemplate) return;
    const liElement = postTemplate.content.firstElementChild.cloneNode(true);

    // update title, thumbnail, description ,timeSpan
    setTextConten(liElement, '[data-id="title"]', post.title);
    setTextConten(liElement, '[data-id="description"]', post.description);
    setTextConten(liElement, '[data-id="author"]', post.author);

    const thumbnail = liElement.querySelector('[data-id="thumbnail"]');
    if (thumbnail) {
        thumbnail.src = post.imageUrl;
        thumbnail.addEventListener('error', () => {
            thumbnail.src = 'https://placehold.co/600x400';
        });
    }

    const time = dayjs(post.updatedAt).fromNow();
    setTextConten(liElement, '[data-id="timeSpan"]', `- ${time}`);

    return liElement;
}

function renderPostList(postList) {
    if (!Array.isArray(postList) || postList.length === 0) return;

    const ulElement = document.getElementById('postList');
    if (!ulElement) return;

    postList.forEach((post, index) => {
        const liElement = createPostElement(post);
        ulElement.appendChild(liElement);
    });
}

function handleFilterChange(filterName, filterValue) {
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);
    history.pushState({}, '', url);
}

// handlePrevClick click
function handlePrevClick(e) {
    e.preventDefault();
    console.log('prev');
}
// handleNextClick click
function handleNextClick(e) {
    e.preventDefault();
    console.log('nextLink');
}

//even click panigation
function initPanigation() {
    const ulPagination = document.getElementById('postsPagination');
    const prevLink = ulPagination.firstElementChild.firstElementChild;
    const nextLink = ulPagination.lastElementChild.firstElementChild;

    // prevLink event Click
    if (prevLink) {
        prevLink.addEventListener('click', handlePrevClick);
    }

    // nextLink event Click
    if (nextLink) {
        nextLink.addEventListener('click', handleNextClick);
    }
}

// set URL default
function initUrl() {
    const url = new URL(window.location);

    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

    history.pushState({}, '', url);
}

(async () => {
    try {
        initPanigation();
        initUrl();

        const queryParams = new URLSearchParams(window.location.search);

        const { data, pagination } = await postApi.getAll(queryParams);
        renderPostList(data);
    } catch (error) {
        console.log('error', error);
    }
})();
