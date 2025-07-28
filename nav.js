// nav.js - Centraal navigatie script voor Residentie HELIX
// Plaats dit bestand in de root van je GitHub Pages site

(function() {
    // Configuratie - hier kan je makkelijk pagina's toevoegen/aanpassen
    const navItems = [
        { href: 'index.html', icon: '🏠', text: 'Home' },
        { href: 'bankafschriften.html', icon: '🏦', text: 'Bankafschriften' },
        { href: 'aankoopfacturen.html', icon: '📄', text: 'Aankoopfacturen' },
        { href: 'wanbetalers.html', icon: '⚠️', text: 'Wanbetalers' },
        { href: 'boekhouding.html', icon: '📊', text: 'Boekhouding', badge: 'Beta' }
    ];

    // CSS Styles
    const styles = `
        .nav-menu {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
        }

        .nav-toggle {
            background: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.3s ease;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .nav-toggle:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .nav-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            background: #1e293b;
            margin: 4px 0;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        .nav-dropdown {
            position: absolute;
            top: 60px;
            left: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            min-width: 250px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }

        .nav-dropdown.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .nav-dropdown a {
            display: flex;
            align-items: center;
            padding: 15px 20px;
            text-decoration: none;
            color: #1e293b;
            transition: background 0.2s ease;
            border-bottom: 1px solid #f1f5f9;
        }

        .nav-dropdown a:first-child {
            border-radius: 12px 12px 0 0;
        }

        .nav-dropdown a:last-child {
            border-bottom: none;
            border-radius: 0 0 12px 12px;
        }

        .nav-dropdown a:hover {
            background: #f8fafc;
        }

        .nav-dropdown a.active {
            background: #e0f2fe;
            color: #0369a1;
            font-weight: 500;
        }

        .nav-icon {
            font-size: 1.2rem;
            margin-right: 12px;
            width: 24px;
            text-align: center;
        }

        .nav-text {
            flex: 1;
        }

        .nav-badge {
            font-size: 0.75rem;
            padding: 2px 8px;
            border-radius: 12px;
            background: #e0f2fe;
            color: #0369a1;
        }

        /* Voor donkere headers - uncomment indien nodig */
        /*
        .dark-header .nav-toggle {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dark-header .nav-toggle span {
            background: white;
        }

        .dark-header .nav-toggle:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        */

        @media (max-width: 768px) {
            .nav-menu {
                top: 10px;
                left: 10px;
            }
            
            .nav-dropdown {
                min-width: 200px;
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
            <button class="nav-toggle" id="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="nav-dropdown" id="navDropdown">
                ${navItems.map(item => `
                    <a href="${item.href}">
                        <span class="nav-icon">${item.icon}</span>
                        <span class="nav-text">${item.text}</span>
                        ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    // Wacht tot DOM geladen is
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }

    function initNav() {
        // Injecteer menu HTML
        document.body.insertAdjacentHTML('afterbegin', menuHTML);

        // Voeg padding toe aan body
        document.body.style.paddingTop = '70px';

        // Setup event listeners
        const navToggle = document.getElementById('navToggle');
        const navDropdown = document.getElementById('navDropdown');

        // Toggle menu
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navDropdown.classList.toggle('active');
        });

        // Sluit menu bij klik buiten
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navDropdown.contains(e.target)) {
                navToggle.classList.remove('active');
                navDropdown.classList.remove('active');
            }
        });

        // Markeer huidige pagina
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = navDropdown.querySelectorAll('a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // Check voor donkere header (optioneel)
        const header = document.querySelector('header');
        if (header) {
            const headerBg = window.getComputedStyle(header).backgroundColor;
            const rgb = headerBg.match(/\d+/g);
            if (rgb) {
                const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                if (brightness < 128) {
                    document.querySelector('.nav-menu').classList.add('dark-header');
                }
            }
        }
    }
})();
