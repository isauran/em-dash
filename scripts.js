// Update copyright year automatically
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('current-year')) {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
    
    // Language switcher functionality
    if (document.getElementById('language-select')) {
        document.getElementById('language-select').addEventListener('change', function() {
            const lang = this.value;
            const currentPath = window.location.pathname;
            
            // Check if we're at the root level
            const isRootLevel = !currentPath.match(/\/[a-z]{2}\//) && 
                               (currentPath === "/" || currentPath.endsWith('/index.html'));
            
            if (lang === 'en') {
                window.location.href = isRootLevel ? './index.html' : '../index.html';
            } else if (isRootLevel) {
                window.location.href = './' + lang + '/index.html';
            } else {
                // We're already in a language subfolder
                const currentLang = currentPath.match(/\/([a-z]{2})\//)?.[1];
                
                if (currentLang === lang) {
                    window.location.href = './index.html';
                } else {
                    window.location.href = '../' + lang + '/index.html';
                }
            }
        });
    }

    // Theme toggle functionality
    const setupTheme = () => {
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
        }
        
        // Update theme toggle button if it exists
        updateThemeToggle();
    };
    
    const updateThemeToggle = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        const isDarkTheme = document.documentElement.classList.contains('dark-theme') || 
                           (window.matchMedia('(prefers-color-scheme: dark)').matches && 
                           !document.documentElement.classList.contains('light-theme'));
        
        themeToggle.innerHTML = isDarkTheme ? 
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>' : 
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    };
    
    // Add theme toggle to DOM if it doesn't exist
    const addThemeToggle = () => {
        if (document.getElementById('theme-toggle')) return;
        
        const languageSelector = document.querySelector('.language-selector');
        if (!languageSelector) return;
        
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        
        themeToggle.addEventListener('click', () => {
            const isDarkTheme = document.documentElement.classList.contains('dark-theme') || 
                               (window.matchMedia('(prefers-color-scheme: dark)').matches && 
                               !document.documentElement.classList.contains('light-theme'));
            
            if (isDarkTheme) {
                document.documentElement.classList.add('light-theme');
                document.documentElement.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark-theme');
                document.documentElement.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
            
            updateThemeToggle();
        });
        
        languageSelector.insertAdjacentElement('beforebegin', themeToggle);
        updateThemeToggle();
    };
    
    // Initialize theme
    setupTheme();
    addThemeToggle();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            updateThemeToggle();
        }
    });
});