function createElement(elementName, parent, options) { //innen exportalni
    const element = document.createElement(elementName);
    parent.appendChild(element);

    for (const [key, value] of Object.entries(options)) {
        if (key === 'class') {
            if (Array.isArray(value)) {
                value.forEach(className => element.classList.add(className));
            } else {
                element.classList.add(value);
            }
        } else if (key === 'id') {
            element.id = value;
        } else if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'type') {
            element.type = value;
        } else if (key === 'method') {
            element.method = value;
        } else if (key === 'htmlFor') {
            element.htmlFor = value;
        } else if (key === 'value') {
            element.value = value;
        } else if (key === 'name') {
            element.name = value;
        } else if (key === 'required') {
            element.required = value;
        } else if (key === 'src') {
            element.src = value;
        } else if (key === 'style.width') {
            element.style.width = value;
        }
    }
    return element;
}