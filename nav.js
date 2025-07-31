// nav.js - Hypermodern navigatie voor Residentie HELIX
// Minimalistisch, strak, en volgens de laatste design standards

(function() {
    // Configuratie
    const navItems = [
        { href: 'index.html', text: 'Home' },
        { href: 'mdnanalyse.html', text: 'Immo Beach & Co'},
        { href: 'bankafschriften.html', text: 'Bankafschriften' },
        { href: 'aankoopfacturen.html', text: 'Aankoopfacturen' },
        { href: 'wanbetalers.html', text: 'Wanbetalers' },
        { href: 'leveranciersbalans.html', text: 'Leveranciers'},
        { href: 'boekhouding.html', text: 'Boekhouding'},
         { href: 'mdnanalyse.html', text: 'Immo Beach & Co'}
    ];

    // CSS Styles - Hypermodern minimalistisch design
    const styles = `
        .nav-menu {
            position: fixed;
            top: 32px;
            left: 32px;
            z-index: 1000;
        }

        .nav-toggle {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 0, 0, 0.08);
            padding: 0;
            width: 44px;
            height: 44px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .nav-toggle:hover {
            background: rgba(255, 255, 255, 1);
            border-color: rgba(0, 0, 0, 0.12);
        }

        .nav-toggle-lines {
            width: 18px;
            height: 12px;
            position: relative;
        }

        .nav-toggle-lines span {
            display: block;
            position: absolute;
            height: 1.5px;
            width: 100%;
            background: #1e293b;
            left: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-toggle-lines span:nth-child(1) {
            top: 0;
        }

        .nav-toggle-lines span:nth-child(2) {
            top: 5px;
        }

        .nav-toggle-lines span:nth-child(3) {
            top: 10px;
        }

        .nav-toggle.active .nav-toggle-lines span:nth-child(1) {
            transform: rotate(45deg);
            top: 5px;
        }

        .nav-toggle.active .nav-toggle-lines span:nth-child(2) {
            opacity: 0;
            transform: translateX(-10px);
        }

        .nav-toggle.active .nav-toggle-lines span:nth-child(3) {
            transform: rotate(-45deg);
            top: 5px;
        }

        .nav-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.2);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }

        .nav-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .nav-panel {
            position: fixed;
            top: 0;
            left: 0;
            width: 280px;
            height: 100vh;
            background: #ffffff;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .nav-panel.active {
            transform: translateX(0);
        }

        .nav-header {
            padding: 28px 28px 20px 28px;
            border-bottom: 1px solid #f1f5f9;
            flex-shrink: 0;
        }

        .nav-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #0f172a;
            margin: 0;
            letter-spacing: -0.025em;
        }

        .nav-subtitle {
            font-size: 0.8125rem;
            color: #64748b;
            margin: 2px 0 0 0;
            font-weight: 400;
        }

        .nav-links {
            flex: 1;
            padding: 8px;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .nav-links a {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            margin: 2px 0;
            text-decoration: none;
            color: #475569;
            font-size: 0.9375rem;
            font-weight: 400;
            transition: all 0.15s ease;
            position: relative;
            letter-spacing: -0.01em;
            border-radius: 6px;
        }

        .nav-links a:hover {
            color: #1e293b;
            background: #f1f5f9;
        }

        .nav-links a.active {
            color: #3b82f6;
            font-weight: 500;
            background: rgba(59, 130, 246, 0.08);
        }

        .nav-links a.active::before {
            display: none;
        }

        .nav-badge {
            margin-left: auto;
            font-size: 0.75rem;
            padding: 3px 8px;
            background: #f1f5f9;
            color: #64748b;
            border-radius: 4px;
            font-weight: 500;
            letter-spacing: 0.02em;
        }

        .nav-close {
            position: absolute;
            top: 32px;
            right: 32px;
            width: 32px;
            height: 32px;
            background: transparent;
            border: none;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .nav-close:hover {
            opacity: 1;
        }

        .nav-close::before,
        .nav-close::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 1.5px;
            background: #475569;
        }

        .nav-close::before {
            transform: rotate(45deg);
        }

        .nav-close::after {
            transform: rotate(-45deg);
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
            .nav-menu {
                top: 16px;
                left: 16px;
            }

            .nav-panel {
                width: 280px;
            }

            .nav-header {
                padding: 24px;
            }

            .nav-links a {
                padding: 12px 24px;
            }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .nav-toggle {
                background: rgba(0, 0, 0, 0.8);
                border-color: rgba(255, 255, 255, 0.1);
            }

            .nav-toggle:hover {
                background: rgba(0, 0, 0, 0.9);
                border-color: rgba(255, 255, 255, 0.2);
            }

            .nav-toggle-lines span {
                background: white;
            }

            .nav-panel {
                background: #0f172a;
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
            }

            .nav-header {
                border-bottom-color: rgba(255, 255, 255, 0.06);
            }

            .nav-title {
                color: white;
            }

            .nav-subtitle {
                color: #94a3b8;
            }

            .nav-links a {
                color: #cbd5e1;
            }

            .nav-links a:hover {
                color: white;
                background: rgba(255, 255, 255, 0.05);
            }

            .nav-links a.active {
                color: #60a5fa;
            }

            .nav-links a.active::before {
                background: #60a5fa;
            }

            .nav-close::before,
            .nav-close::after {
                background: #94a3b8;
            }

            .nav-badge {
                background: #1e293b;
                color: #94a3b8;
            }
        }
    `;

    // Injecteer styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Creëer menu HTML
    const menuHTML = `
        <div class="nav-menu">
            <button class="nav-toggle" id="navToggle" aria-label="Menu">
                <div class="nav-toggle-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
        </div>
        <div class="nav-overlay" id="navOverlay"></div>
        <nav class="nav-panel" id="navPanel">
            <button class="nav-close" id="navClose" aria-label="Sluit menu"></button>
            <div class="nav-header">
                <h2 class="nav-title">Residentie HELIX</h2>
                <p class="nav-subtitle">Financieel Dashboard</p>
            </div>
            <div class="nav-links">
                ${navItems.map(item => `
                    <a href="${item.href}">
                        ${item.text}
                        ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
                    </a>
                `).join('')}
            </div>
        </nav>
    `;

    // Initialiseer navigatie
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }

    function initNav() {
        // Injecteer menu HTML
        document.body.insertAdjacentHTML('afterbegin', menuHTML);

        // Geen extra padding toevoegen - laat pagina's hun eigen styling behouden

        // Setup event listeners
        const navToggle = document.getElementById('navToggle');
        const navOverlay = document.getElementById('navOverlay');
        const navPanel = document.getElementById('navPanel');
        const navClose = document.getElementById('navClose');

        function openMenu() {
            navToggle.classList.add('active');
            navOverlay.classList.add('active');
            navPanel.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            navToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            navPanel.classList.remove('active');
            document.body.style.overflow = '';
        }

        navToggle.addEventListener('click', openMenu);
        navOverlay.addEventListener('click', closeMenu);
        navClose.addEventListener('click', closeMenu);

        // ESC key om te sluiten
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navPanel.classList.contains('active')) {
                closeMenu();
            }
        });

        // Markeer huidige pagina
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
})();
