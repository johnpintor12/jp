// Siena Automation Library - Global Scripts

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Scroll-to-Top Button Functionality ---
    const scrollToTopButton = document.getElementById("scrollToTopBtn");

    function scrollFunction() {
        if (scrollToTopButton) {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollToTopButton.style.display = "block";
            } else {
                scrollToTopButton.style.display = "none";
            }
        }
    }

    function scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    if (scrollToTopButton) {
        window.onscroll = scrollFunction;
        scrollToTopButton.addEventListener('click', scrollToTop);
    }

    // --- TOC and Hamburger Menu Functionality (for pages with TOC) ---
    const body = document.body;
    if (body.classList.contains('has-toc')) { // Only run TOC scripts if the body has 'has-toc' class
        const tocSidebar = document.getElementById('toc-sidebar');
        const menuToggle = document.getElementById('menu-toggle');
        const pageOverlay = document.getElementById('page-overlay');
        const mainContent = document.querySelector('.main-content-area'); // Used for layout adjustment

        function applyLayoutBasedOnScreenSize() {
            if (window.innerWidth >= 1024) { // lg breakpoint from global_styles.css
                if(mainContent) mainContent.classList.add('toc-active'); 
                if(tocSidebar) tocSidebar.classList.add('open'); // Keep TOC open on desktop
                // Hamburger and overlay are hidden by CSS media query in global_styles.css
            } else {
                if(mainContent) mainContent.classList.remove('toc-active');
                // TOC should be closed by default on mobile unless explicitly opened
                // If tocSidebar doesn't have 'open' it will be hidden by transform: translateX(-100%)
            }
        }

        if (menuToggle && tocSidebar) {
            menuToggle.addEventListener('click', () => {
                tocSidebar.classList.toggle('open');
                if (pageOverlay) pageOverlay.classList.toggle('active'); 
            });
        }

        if (pageOverlay) {
            pageOverlay.addEventListener('click', () => { 
                if(tocSidebar) tocSidebar.classList.remove('open');
                pageOverlay.classList.remove('active');
            });
        }
        
        document.querySelectorAll('#toc-sidebar a:not(.back-link)').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const topBarHeight = (window.innerWidth < 1024) ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--top-bar-height')) || 60) : 0;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - topBarHeight - 10; // 10px extra offset

                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

                        if (window.innerWidth < 1024 && tocSidebar && tocSidebar.classList.contains('open')) { 
                            tocSidebar.classList.remove('open');
                            if (pageOverlay) pageOverlay.classList.remove('active');
                        }
                        document.querySelectorAll('#toc-sidebar a').forEach(link => link.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });

        const sections = document.querySelectorAll('.content-section[id], .step-card[id], .info-card[id], .condition-card[id], .policy-check-card[id], .action-card[id], .documentation-card[id], .prerequisite-card[id], .escalation-card[id], .persona-card[id]'); 
        const tocLinksJS = document.querySelectorAll('#toc-sidebar a:not(.back-link)');
        
        const makeActive = (linkId) => {
            tocLinksJS.forEach(l => l.classList.remove('active'));
            if (linkId) {
                const correspondingLink = document.querySelector(`#toc-sidebar a[href="#${linkId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                     const parentLi = correspondingLink.closest('ul')?.closest('li');
                    if (parentLi) {
                        const parentAnchor = parentLi.querySelector('a');
                        if(parentAnchor && !parentAnchor.classList.contains('back-link') && parentAnchor.getAttribute('href').startsWith('#step')) { 
                           parentAnchor.classList.add('active');
                        }
                    }
                }
            }
        };
        
        const observer = new IntersectionObserver(entries => {
            let intersectingEntry = null;
            const topBarHeightForObserver = (window.innerWidth < 1024) ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--top-bar-height')) || 60) : 0;
            for (let i = 0; i < entries.length; i++) { 
                 if (entries[i].isIntersecting) {
                    if (!intersectingEntry || entries[i].target.getBoundingClientRect().top < intersectingEntry.target.getBoundingClientRect().top) {
                        if (entries[i].intersectionRatio >= 0.1) { 
                           intersectingEntry = entries[i];
                        }
                    }
                 }
            }
            if (intersectingEntry) {
                 makeActive(intersectingEntry.target.id);
            }
        }, { 
            threshold: [0.1, 0.5], 
            rootMargin: `-${(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--top-bar-height')) || 60) + 20}px 0px -60% 0px` 
        });

        sections.forEach(section => { if (section.id) { observer.observe(section); } });
        
        window.addEventListener('resize', applyLayoutBasedOnScreenSize);
        applyLayoutBasedOnScreenSize(); // Initial call
    }


    // --- Pagination Functionality (for library page) ---
    const automationGrid = document.getElementById('automationGrid');
    const paginationControls = document.getElementById('paginationControls');
    
    if (automationGrid && paginationControls) { // Only run if these elements exist
        const itemsPerPage = 9;
        let currentPage = 1;
        const automationCards = Array.from(automationGrid.children)
            .filter(child => child.classList.contains('automation-card'))
            .map(card => {
                const link = card.querySelector('a.workflow-button');
                if (link && (!link.dataset.originalHref || !link.dataset.originalHref.includes('?'))) {
                    link.dataset.originalHref = link.getAttribute('href');
                }
                return card;
            });

        function displayPage(page) {
            currentPage = page;
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            automationCards.forEach((card, index) => {
                const link = card.querySelector('a.workflow-button');
                if (index >= startIndex && index < endIndex) {
                    card.style.display = 'flex'; 
                    if (link && link.dataset.originalHref) {
                        link.setAttribute('href', `${link.dataset.originalHref}?fromPage=${currentPage}`);
                    }
                } else {
                    card.style.display = 'none';
                }
            });
            updatePaginationControls();

            if (automationGrid) {
                const gridTopOffset = automationGrid.offsetTop;
                const headerHeightElement = document.querySelector('.library-header');
                const headerHeight = headerHeightElement ? headerHeightElement.offsetHeight : 0;
                let scrollTargetPosition = gridTopOffset - headerHeight - 20; 
                if (scrollTargetPosition < 0) scrollTargetPosition = 0; 

                const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
                if (page !== 1 || Math.abs(currentScrollY - scrollTargetPosition) > 50) { 
                    if(page > 1 || scrollTargetPosition > 0) {
                        window.scrollTo({ top: scrollTargetPosition, behavior: 'smooth' });
                    } else if (page === 1 && currentScrollY > 0) { 
                         window.scrollTo({ top: scrollTargetPosition, behavior: 'smooth' });
                    }
                }
            }
        }

        function updatePaginationControls() {
            if (!paginationControls) return;
            paginationControls.innerHTML = ''; 
            const totalPages = Math.ceil(automationCards.length / itemsPerPage);

            if (totalPages <= 1) {
                paginationControls.style.display = 'none'; 
                return;
            }
            paginationControls.style.display = 'flex';

            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    displayPage(currentPage - 1);
                }
            });
            paginationControls.appendChild(prevButton);

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.classList.add('page-number');
                if (i === currentPage) {
                    pageButton.classList.add('active');
                }
                pageButton.addEventListener('click', () => displayPage(i));
                paginationControls.appendChild(pageButton);
            }

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    displayPage(currentPage + 1);
                }
            });
            paginationControls.appendChild(nextButton);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = parseInt(urlParams.get('page'));
        let initialPage = 1;
        if (!isNaN(pageParam) && pageParam > 0 && pageParam <= Math.ceil(automationCards.length / itemsPerPage)) {
            initialPage = pageParam;
        }

        if (automationCards.length > 0) {
            displayPage(initialPage);
        } else {
            if(paginationControls) paginationControls.style.display = 'none';
        }
    }

    // --- Footer Current Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Back to Library Button State Handling (for individual workflow pages) ---
    // This part is for the individual workflow pages to correctly link back to the paginated library.
    const backToLibraryButton = document.querySelector('#toc-sidebar a.back-link'); // Assuming this is how you select it on workflow pages
    if (backToLibraryButton && window.location.search.includes('fromPage=')) {
        const urlParams = new URLSearchParams(window.location.search);
        const fromPage = urlParams.get('fromPage');
        if (fromPage) {
            // Assuming your library page is index.html or siena_automation_library_page_05.html
            // Adjust the base name if needed.
            let libraryPageName = "index.html"; // Or your actual library page filename
            const currentPath = window.location.pathname;
            if (currentPath.includes("siena_automation_library_page_05.html")) {
                 libraryPageName = "siena_automation_library_page_05.html"; // If you are on the library page itself, this logic is not needed for this button
            } else {
                 // Check if the back-link is already pointing to index.html or similar
                 // This logic might need refinement based on your exact file structure
                 // For now, it assumes the back-link's default href is "index.html"
                 const originalHref = backToLibraryButton.getAttribute('href');
                 if (originalHref.includes("index.html") || originalHref === "./" || originalHref === "../") { // Basic check
                    backToLibraryButton.setAttribute('href', `${originalHref.split('?')[0]}?page=${fromPage}`);
                 }
            }
        }
    }

});
