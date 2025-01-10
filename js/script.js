// Polyfill for smooth scrolling (if needed)
if ('scrollBehavior' in document.documentElement.style === false) {
    import('https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js').then(module => {
        module.polyfill();
    });
}


function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add active class on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', debounce(() => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {  // Use window.scrollY
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}, 100));



// Smooth Scroll (Improved and Deduplicated)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




// Blog Post Initialization (Dynamic Generation)
const blogPosts = [
    {
        title: "How to Improve Your English Speaking Skills",
        excerpt: "Speaking English fluently is a common goal for many language learners. Here are some practical tips to help you become more confident and articulate in English...",
        link: "blog/blog-post-1.html",
    },
    {
        title: "Mastering English Prepositions: A Comprehensive Guide", // Added second blog post
        excerpt: "Prepositions can be tricky! This guide breaks down common uses and mistakes, helping you master these essential words.",
        link: "blog/prepositions-guide.html",  // Assuming the file name
    },
    // ... more blog posts
];

const blogContainer = document.querySelector('.blog-posts');

blogPosts.forEach(post => {
    const postElement = document.createElement('article');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="${post.link}" class="read-more">Read More</a>
    `;
    blogContainer.appendChild(postElement);
});
