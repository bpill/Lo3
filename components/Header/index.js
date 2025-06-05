// src/components/Header/index.js

function Header() {
    const header = document.createElement('header');
    header.className = 'header';

    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.innerHTML = '<h1>Lo3</h1>';

    const nav = document.createElement('nav');
    nav.innerHTML = `
        <ul>
            <li><a href="index.html">Home</a></li>
        </ul>
    `;

    header.appendChild(logo);
    header.appendChild(nav);

    return header;
}

export default Header;