document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const activeKey = path.startsWith('team-') ? 'team'
        : ['reference.html', 'source.html'].includes(path) ? 'references'
        : ['paper.html', 'pdf-viewer.html'].includes(path) ? 'paper'
        : path === 'dashboard.html' ? 'analysis'
        : 'home';

    const links = [
        { key: 'home', label: 'Home', href: path === 'index.html' ? '#home' : 'index.html' },
        { key: 'about', label: 'About', href: 'index.html#about' },
        { key: 'paper', label: 'Paper', href: 'paper.html' },
        { key: 'analysis', label: 'Analysis', href: 'dashboard.html' },
        { key: 'references', label: 'References', href: 'reference.html' },
        { key: 'team', label: 'Team', href: 'index.html#team' }
    ];

    const nav = document.querySelector('body > nav');
    if (!nav) return;

    const desktop = nav.querySelector('.hidden.lg\\:flex');
    if (desktop) {
        const themeButton = document.getElementById('theme-toggle');
        desktop.className = 'hidden lg:flex items-center space-x-1 xl:space-x-2';
        desktop.innerHTML = links.map(link => {
            const active = link.key === activeKey;
            const classes = active
                ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800';
            return `<a href="${link.href}" class="px-3 py-2 rounded-md text-sm font-medium transition-all ${classes}"${active ? ' aria-current="page"' : ''}>${link.label}</a>`;
        }).join('') + '<div class="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>';

        if (themeButton) desktop.appendChild(themeButton);
    }

    const mobileControls = nav.querySelector('.lg\\:hidden.flex');
    if (mobileControls) {
        [...mobileControls.querySelectorAll('button:not([id])')].forEach(button => button.remove());

        const menuButton = document.createElement('button');
        menuButton.type = 'button';
        menuButton.id = 'mobile-menu-toggle';
        menuButton.className = 'p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors';
        menuButton.setAttribute('aria-label', 'Open navigation menu');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
        mobileControls.appendChild(menuButton);

        const menu = document.createElement('div');
        menu.id = 'mobile-menu';
        menu.className = 'hidden lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-3';
        menu.innerHTML = `<div class="max-w-7xl mx-auto grid grid-cols-2 gap-2">${links.map(link => {
            const active = link.key === activeKey;
            const classes = active
                ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';
            return `<a href="${link.href}" class="px-4 py-3 rounded-xl text-sm font-medium ${classes}"${active ? ' aria-current="page"' : ''}>${link.label}</a>`;
        }).join('')}</div>`;
        nav.appendChild(menu);

        menuButton.addEventListener('click', () => {
            const opening = menu.classList.contains('hidden');
            menu.classList.toggle('hidden');
            menuButton.setAttribute('aria-expanded', String(opening));
            menuButton.setAttribute('aria-label', opening ? 'Close navigation menu' : 'Open navigation menu');
            menuButton.innerHTML = opening
                ? '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
                : '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
        });

        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
        }));
    }

    document.querySelectorAll('footer a').forEach(link => {
        if (link.textContent.trim() === 'Reference') link.textContent = 'References';
    });

    const footerAnalysis = [...document.querySelectorAll('footer a')].find(link => link.textContent.trim() === 'Analysis');
    document.querySelectorAll('footer a').forEach(link => {
        if (footerAnalysis && link.textContent.trim() === 'Data Explorer' && link.getAttribute('href') === footerAnalysis.getAttribute('href')) {
            link.closest('li')?.remove();
        }
    });

    const footerResourceList = [...document.querySelectorAll('footer h4')]
        .find(heading => heading.textContent.trim() === 'Resources')
        ?.parentElement.querySelector('ul');
    if (footerResourceList && !footerResourceList.querySelector('a[href="presentation.html"]')) {
        const item = document.createElement('li');
        item.innerHTML = '<a href="presentation.html" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Presentation</a>';
        footerResourceList.insertBefore(item, footerResourceList.children[1] || null);
    }

    const footer = document.querySelector('footer');
    const footerInner = footer?.querySelector(':scope > div');
    if (footerInner && !footerInner.querySelector('[data-blueprint-credit]')) {
        const credit = document.createElement('div');
        credit.dataset.blueprintCredit = '';
        credit.className = 'mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500';
        credit.innerHTML = 'Made by <a href="https://blueprint.shoug-tech.com/" target="_blank" rel="noopener noreferrer" class="font-semibold text-teal-600 dark:text-teal-400 hover:underline">Blueprint</a>';
        footerInner.appendChild(credit);
    }
});
