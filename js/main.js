import axiosClient from './api/axiosClient';
import postApi from './api/postApi';
const data = {
    id: 'lea319jollj7y1q8',
    title: 'thai',
};

async function main() {
    try {
        const queryParams = {
            _page: 1,
            _limit: 5,
        };
        const reponse = await postApi.getById('lea319jollj7y1q8');
        console.log(reponse);
    } catch (error) {
        console.log('error', error);
    }
}

main();
