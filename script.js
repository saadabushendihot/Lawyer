document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Adjust for fixed header height
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Add an active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li');
    const headerHeight = document.querySelector('header').offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            // Add a buffer to ensure section becomes active slightly before it reaches the very top
            const sectionTop = section.offsetTop - headerHeight - 50; 
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });
});
