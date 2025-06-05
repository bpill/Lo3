// src/components/Navigation/index.js

const Navigation = () => {
    const nav = document.createElement('nav');
    nav.classList.add('navigation');

    const ul = document.createElement('ul');
    ul.classList.add('nav-list');

    const pages = ['Home', 'About'];

    pages.forEach(page => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        const link = document.createElement('a');
        link.href = `${page.toLowerCase()}.html`;
        link.textContent = page;
        li.appendChild(link);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    return nav;
};

export default Navigation;