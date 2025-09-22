// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeScrollToTop();
    initializeTypingEffect();
});

// Mobile Navigation Toggle
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Effects and Active Navigation
function initializeScrollEffects() {
    // Active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        updateActiveNavigation();
        handleScrollToTopVisibility();
    });

    function updateActiveNavigation() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Fade in animations and skill bars
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.closest('#skills')) {
                    setTimeout(() => {
                        animateSkillBars(entry.target);
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Animate skill progress bars
function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const skillLevel = bar.getAttribute('data-skill');
        bar.style.width = skillLevel + '%';
    });
}

// Scroll to Top functionality
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('id', 'scrollToTop');
    document.body.appendChild(scrollToTopBtn);

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Handle scroll to top button visibility
function handleScrollToTopVisibility() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}

// Typing effect for hero title
function initializeTypingEffect() {
    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    });
}

// Type writer function
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Download CV function
function downloadCV() {
    // Create a temporary link element for download
    const link = document.createElement('a');
    
    // In a real implementation, you would have an actual CV file
    // For demo purposes, we'll show an alert
    alert('CV download would start here. In a real implementation, this would download your actual CV file.');
    
    // Example of how you would implement actual file download:
    // link.href = 'path/to/your/cv.pdf';
    // link.download = 'John_Doe_CV.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Send message function
function sendMessage() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // In a real implementation, you would send this data to your backend
    // For demo purposes, we'll show a success message
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
    
    // Clear form
    clearContactForm();
    
    // Here's how you might implement actual form submission:
    /*
    const formData = {
        name: name,
        email: email,
        message: message
    };
    
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Message sent successfully!', 'success');
        clearContactForm();
    })
    .catch(error => {
        showNotification('Error sending message. Please try again.', 'error');
    });
    */
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Clear contact form
function clearContactForm() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4CAF50, #45a049)' : 
                     type === 'error' ? 'linear-gradient(45deg, #f44336, #da190b)' : 
                     'linear-gradient(45deg, #4facfe, #00f2fe)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);

    // Click to close
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Smooth scroll to section function (can be called externally)
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize particle background (optional enhancement)
function initializeParticles() {
    // This is a placeholder for particle effects
    // You could integrate libraries like particles.js here
    console.log('Particle effects would be initialized here');
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme switcher (bonus feature)
function initializeThemeSwitcher() {
    // This could be used to implement light/dark theme switching
    const theme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', theme);
}

// Lazy loading images (if you add real images later)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Contact form enhancement with real-time validation
function initializeFormValidation() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch(field.type) {
        case 'email':
            if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'text':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter at least 2 characters';
            }
            break;
        default:
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'Please enter at least 5 characters';
            }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    `;
    
    field.style.borderColor = '#ff4444';
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = 'rgba(79, 172, 254, 0.2)';
}


  // Inisialisasi EmailJS dengan Public Key Anda
emailjs.init("fbluq4dgBC4PBYAY8");

const form = document.getElementById("contact-form");
const successMessage = document.getElementById("successMessage"); // Ganti successModal dengan successMessage

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Mencegah halaman me-refresh

    emailjs.sendForm("serID_hilman", "temID_hilman", this)
    .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        
        // Tampilkan pesan sukses
        successMessage.style.display = "block";
        
        // Kosongkan formulir
        form.reset();
        
        // Sembunyikan pesan sukses setelah 3 detik
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);

    }, (error) => {
        console.error("FAILED...", error);
        alert("Gagal mengirim pesan. Silakan coba lagi.");
    });
});

// Export functions for global access (if needed)
window.portfolioFunctions = {
    downloadCV,
    sendMessage,
    scrollToSection,
    showNotification
};