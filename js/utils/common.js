export function setTextConten(parent, selector, text) {
    if (!parent) return;
    const element = parent.querySelector(selector);
    if (element) element.textContent = text;
}
