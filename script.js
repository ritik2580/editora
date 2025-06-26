// DOM elements
document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const loader = document.querySelector('.loader');
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const projectItems = document.querySelectorAll('.project-item');
  const circularGallery = document.querySelector('.circular-gallery');
  const contactForm = document.getElementById('contactForm');
  const skillProgress = document.querySelectorAll('.skill-progress');
  
  // Helper functions
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  // DOM elements
document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const loader = document.querySelector('.loader');
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const projectItems = document.querySelectorAll('.project-item');
  const circularGallery = document.querySelector('.circular-gallery');
  const contactForm = document.getElementById('contactForm');
  const skillProgress = document.querySelectorAll('.skill-progress');
  
  // Helper functions
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  const counters = document.querySelectorAll('.counter');
let started = false;

function startCounter() {
  if (started) return;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const speed = 200; // lower is faster
    const increment = Math.ceil(target / speed);

    let count = 0;

    const update = () => {
      count += increment;
      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });

  started = true;
}

// Trigger animation when section is in viewport
window.addEventListener('scroll', () => {
  const section = document.getElementById('track-record');
  const sectionTop = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight - 100) {
    startCounter();
  }
});

  // Loading animation
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 2000);
  
  // Sticky header
  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if(pageYOffset >= (sectionTop - sectionHeight/3)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if(link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  }));
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    
    if (menuToggle.classList.contains('active')) {
      menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 7px)';
      menuToggle.querySelector('.bar:nth-child(2)').style.transform = 'rotate(-45deg)';
    } else {
      menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
      menuToggle.querySelector('.bar:nth-child(2)').style.transform = 'none';
    }
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
      menuToggle.querySelector('.bar:nth-child(2)').style.transform = 'none';
    });
  });
  
  // Circular gallery scroll functionality
  let isDown = false;
  let startX;
  let scrollLeft;
  let velX = 0;
  let momentumID;
  
  // Set initial position of gallery
  if (circularGallery) {
    circularGallery.style.transform = 'translateX(0)';
    
    // Set up the circular gallery items for proper layout
    const projectWidth = projectItems[0].offsetWidth + parseInt(getComputedStyle(projectItems[0]).marginLeft) * 2;
    circularGallery.style.width = projectWidth * projectItems.length + 'px';
    
    // Mouse events for desktop
    circularGallery.addEventListener('mousedown', (e) => {
      isDown = true;
      circularGallery.style.cursor = 'grabbing';
      startX = e.pageX - circularGallery.offsetLeft;
      scrollLeft = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      cancelMomentumTracking();
    });
    
    circularGallery.addEventListener('mouseleave', () => {
      isDown = false;
      circularGallery.style.cursor = 'grab';
    });
    
    circularGallery.addEventListener('mouseup', () => {
      isDown = false;
      circularGallery.style.cursor = 'grab';
      beginMomentumTracking();
    });
    
    circularGallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - circularGallery.offsetLeft;
      const walk = (x - startX) * 2; // Adjust for faster/slower movement
      const newPosition = scrollLeft + walk;
      circularGallery.style.transform = `translateX(${newPosition}px)`;
      velX = walk;
    });
    
    // Touch events for mobile
    circularGallery.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - circularGallery.offsetLeft;
      scrollLeft = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      cancelMomentumTracking();
    });
    
    circularGallery.addEventListener('touchend', () => {
      isDown = false;
      beginMomentumTracking();
    });
    
    circularGallery.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - circularGallery.offsetLeft;
      const walk = (x - startX) * 2;
      const newPosition = scrollLeft + walk;
      circularGallery.style.transform = `translateX(${newPosition}px)`;
      velX = walk;
    });
    
    // Momentum scrolling
    function beginMomentumTracking() {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }
    
    function cancelMomentumTracking() {
      cancelAnimationFrame(momentumID);
    }
    
    function momentumLoop() {
      const currentPosition = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      const newPosition = currentPosition + velX;
      
      // Calculate boundaries for the gallery
      const maxScrollLeft = 0;
      const galleryWidth = circularGallery.scrollWidth;
      const containerWidth = circularGallery.parentElement.offsetWidth;
      const minScrollLeft = -(galleryWidth - containerWidth);
      
      // Bounce effect when reaching the edges
      if (newPosition > maxScrollLeft) {
        velX *= -0.5;
      } else if (newPosition < minScrollLeft) {
        velX *= -0.5;
      }
      
      circularGallery.style.transform = `translateX(${newPosition}px)`;
      
      velX *= 0.95; // Friction
      
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }
    
    // Highlight the active project item
    function updateActiveProject() {
      const containerCenter = circularGallery.parentElement.offsetWidth / 2;
      const currentPosition = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      
      projectItems.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2 + currentPosition;
        const distanceFromCenter = Math.abs(containerCenter - itemCenter);
        
        if (distanceFromCenter < item.offsetWidth / 2) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
    
    // Update active project on scroll
    circularGallery.addEventListener('transitionend', updateActiveProject);
    window.addEventListener('resize', updateActiveProject);
    
    // Mouse wheel event for gallery scrolling
    circularGallery.parentElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      const currentPosition = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      const newPosition = currentPosition - e.deltaY;
      
      // Calculate boundaries
      const maxScrollLeft = 0;
      const galleryWidth = circularGallery.scrollWidth;
      const containerWidth = circularGallery.parentElement.offsetWidth;
      const minScrollLeft = -(galleryWidth - containerWidth);
      
      // Apply scroll with boundaries
      if (newPosition > maxScrollLeft) {
        circularGallery.style.transform = `translateX(${maxScrollLeft}px)`;
      } else if (newPosition < minScrollLeft) {
        circularGallery.style.transform = `translateX(${minScrollLeft}px)`;
      } else {
        circularGallery.style.transform = `translateX(${newPosition}px)`;
      }
      
      updateActiveProject();
    });
  }
  
  // Reviews slider functionality
  const reviewItems = document.querySelectorAll('.review-item');
  const reviewDots = document.querySelectorAll('.dot');
  const prevArrow = document.querySelector('.review-arrow.prev');
  const nextArrow = document.querySelector('.review-arrow.next');
  let currentReview = 0;
  
  function showReview(index) {
    // Hide all reviews
    reviewItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Remove active class from all dots
    reviewDots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the selected review and activate corresponding dot
    reviewItems[index].classList.add('active');
    reviewDots[index].classList.add('active');
  }
  
  // Initialize reviews
  showReview(currentReview);
  
  // Previous review
  if (prevArrow) {
    prevArrow.addEventListener('click', () => {
      currentReview = (currentReview - 1 + reviewItems.length) % reviewItems.length;
      showReview(currentReview);
    });
  }
  
  // Next review
  if (nextArrow) {
    nextArrow.addEventListener('click', () => {
      currentReview = (currentReview + 1) % reviewItems.length;
      showReview(currentReview);
    });
  }
  
  // Dot navigation
  reviewDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentReview = index;
      showReview(currentReview);
    });
  });
  
  // Auto rotate reviews
  setInterval(() => {
    currentReview = (currentReview + 1) % reviewItems.length;
    showReview(currentReview);
  }, 7000);
  
  // Animate skill bars on scroll
  function checkSkills() {
    const skillsSection = document.querySelector('.skills-container');
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      skillProgress.forEach(progress => {
        progress.style.width = progress.style.width || progress.getAttribute('style').split('width: ')[1].split('%)')[0] + '%';
      });
      window.removeEventListener('scroll', checkSkills);
    }
  }
  
  window.addEventListener('scroll', debounce(checkSkills));
  checkSkills(); // Check on page load
  
  // Form submission handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }
      
      // Here you would normally send the form data to a server
      // For demo purposes, we'll just show a success message
      
      // Create a success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <p>Thanks for reaching out! We'll get back to you soon.</p>
      `;
      successMessage.style.cssText = `
        background-color: rgba(0, 255, 0, 0.1);
        color: #2ecc71;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 15px;
        margin-top: 20px;
      `;
      
      // Clear the form and show success message
      contactForm.reset();
      contactForm.parentNode.appendChild(successMessage);
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          successMessage.remove();
        }, 500);
      }, 5000);
    });
  }
  
  // Animate on scroll functionality for sections
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.service-card, .project-item, .skill');
    
    animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight * 0.85) {
        element.style.opacity = '1';
        element.style.transform = element.classList.contains('project-item') ? 'scale(0.9)' : 'translateY(0)';
      }
    });
  }
  
  window.addEventListener('scroll', debounce(animateOnScroll));
  window.addEventListener('load', animateOnScroll);
  
  // Initialize page (set initial states for elements)
  function initPage() {
    document.querySelectorAll('.service-card, .skill').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    document.querySelectorAll('.project-item').forEach(element => {
      element.style.opacity = '0';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
  }
  
  initPage();
});

  // Loading animation
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 2000);
  
  // Sticky header
  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if(pageYOffset >= (sectionTop - sectionHeight/3)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if(link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  }));
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    
    if (menuToggle.classList.contains('active')) {
      menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 7px)';
      menuToggle.querySelector('.bar:nth-child(2)').style.transform = 'rotate(-45deg)';
    } else {
      menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
      menuToggle.querySelector('.bar:nth-child(2)').style.transform = 'none';
    }
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
      menuToggle.querySelector('.bar:nth-child(2)').style.transform = 'none';
    });
  });
  
  // Circular gallery scroll functionality
  let isDown = false;
  let startX;
  let scrollLeft;
  let velX = 0;
  let momentumID;
  
  // Set initial position of gallery
  if (circularGallery) {
    circularGallery.style.transform = 'translateX(0)';
    
    // Set up the circular gallery items for proper layout
    const projectWidth = projectItems[0].offsetWidth + parseInt(getComputedStyle(projectItems[0]).marginLeft) * 2;
    circularGallery.style.width = projectWidth * projectItems.length + 'px';
    
    // Mouse events for desktop
    circularGallery.addEventListener('mousedown', (e) => {
      isDown = true;
      circularGallery.style.cursor = 'grabbing';
      startX = e.pageX - circularGallery.offsetLeft;
      scrollLeft = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      cancelMomentumTracking();
    });
    
    circularGallery.addEventListener('mouseleave', () => {
      isDown = false;
      circularGallery.style.cursor = 'grab';
    });
    
    circularGallery.addEventListener('mouseup', () => {
      isDown = false;
      circularGallery.style.cursor = 'grab';
      beginMomentumTracking();
    });
    
    circularGallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - circularGallery.offsetLeft;
      const walk = (x - startX) * 2; // Adjust for faster/slower movement
      const newPosition = scrollLeft + walk;
      circularGallery.style.transform = `translateX(${newPosition}px)`;
      velX = walk;
    });
    
    // Touch events for mobile
    circularGallery.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - circularGallery.offsetLeft;
      scrollLeft = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      cancelMomentumTracking();
    });
    
    circularGallery.addEventListener('touchend', () => {
      isDown = false;
      beginMomentumTracking();
    });
    
    circularGallery.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - circularGallery.offsetLeft;
      const walk = (x - startX) * 2;
      const newPosition = scrollLeft + walk;
      circularGallery.style.transform = `translateX(${newPosition}px)`;
      velX = walk;
    });
    
    // Momentum scrolling
    function beginMomentumTracking() {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }
    
    function cancelMomentumTracking() {
      cancelAnimationFrame(momentumID);
    }
    
    function momentumLoop() {
      const currentPosition = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      const newPosition = currentPosition + velX;
      
      // Calculate boundaries for the gallery
      const maxScrollLeft = 0;
      const galleryWidth = circularGallery.scrollWidth;
      const containerWidth = circularGallery.parentElement.offsetWidth;
      const minScrollLeft = -(galleryWidth - containerWidth);
      
      // Bounce effect when reaching the edges
      if (newPosition > maxScrollLeft) {
        velX *= -0.5;
      } else if (newPosition < minScrollLeft) {
        velX *= -0.5;
      }
      
      circularGallery.style.transform = `translateX(${newPosition}px)`;
      
      velX *= 0.95; // Friction
      
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }
    
    // Highlight the active project item
    function updateActiveProject() {
      const containerCenter = circularGallery.parentElement.offsetWidth / 2;
      const currentPosition = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      
      projectItems.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2 + currentPosition;
        const distanceFromCenter = Math.abs(containerCenter - itemCenter);
        
        if (distanceFromCenter < item.offsetWidth / 2) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
    
    // Update active project on scroll
    circularGallery.addEventListener('transitionend', updateActiveProject);
    window.addEventListener('resize', updateActiveProject);
    
    // Mouse wheel event for gallery scrolling
    circularGallery.parentElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      const currentPosition = parseFloat(circularGallery.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      const newPosition = currentPosition - e.deltaY;
      
      // Calculate boundaries
      const maxScrollLeft = 0;
      const galleryWidth = circularGallery.scrollWidth;
      const containerWidth = circularGallery.parentElement.offsetWidth;
      const minScrollLeft = -(galleryWidth - containerWidth);
      
      // Apply scroll with boundaries
      if (newPosition > maxScrollLeft) {
        circularGallery.style.transform = `translateX(${maxScrollLeft}px)`;
      } else if (newPosition < minScrollLeft) {
        circularGallery.style.transform = `translateX(${minScrollLeft}px)`;
      } else {
        circularGallery.style.transform = `translateX(${newPosition}px)`;
      }
      
      updateActiveProject();
    });
  }
  
  // Reviews slider functionality
  const reviewItems = document.querySelectorAll('.review-item');
  const reviewDots = document.querySelectorAll('.dot');
  const prevArrow = document.querySelector('.review-arrow.prev');
  const nextArrow = document.querySelector('.review-arrow.next');
  let currentReview = 0;
  
  function showReview(index) {
    // Hide all reviews
    reviewItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Remove active class from all dots
    reviewDots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the selected review and activate corresponding dot
    reviewItems[index].classList.add('active');
    reviewDots[index].classList.add('active');
  }
  
  // Initialize reviews
  showReview(currentReview);
  
  // Previous review
  if (prevArrow) {
    prevArrow.addEventListener('click', () => {
      currentReview = (currentReview - 1 + reviewItems.length) % reviewItems.length;
      showReview(currentReview);
    });
  }
  
  // Next review
  if (nextArrow) {
    nextArrow.addEventListener('click', () => {
      currentReview = (currentReview + 1) % reviewItems.length;
      showReview(currentReview);
    });
  }
  
  // Dot navigation
  reviewDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentReview = index;
      showReview(currentReview);
    });
  });
  
  // Auto rotate reviews
  setInterval(() => {
    currentReview = (currentReview + 1) % reviewItems.length;
    showReview(currentReview);
  }, 7000);
  
  // Animate skill bars on scroll
  function checkSkills() {
    const skillsSection = document.querySelector('.skills-container');
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      skillProgress.forEach(progress => {
        progress.style.width = progress.style.width || progress.getAttribute('style').split('width: ')[1].split('%)')[0] + '%';
      });
      window.removeEventListener('scroll', checkSkills);
    }
  }
  
  window.addEventListener('scroll', debounce(checkSkills));
  checkSkills(); // Check on page load
  
  // Form submission handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }
      
      // Here you would normally send the form data to a server
      // For demo purposes, we'll just show a success message
      
      // Create a success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <p>Thanks for reaching out! We'll get back to you soon.</p>
      `;
      successMessage.style.cssText = `
        background-color: rgba(0, 255, 0, 0.1);
        color: #2ecc71;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 15px;
        margin-top: 20px;
      `;
      
      // Clear the form and show success message
      contactForm.reset();
      contactForm.parentNode.appendChild(successMessage);
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          successMessage.remove();
        }, 500);
      }, 5000);
    });
  }
  
  // Animate on scroll functionality for sections
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.service-card, .project-item, .skill');
    
    animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight * 0.85) {
        element.style.opacity = '1';
        element.style.transform = element.classList.contains('project-item') ? 'scale(0.9)' : 'translateY(0)';
      }
    });
  }
  
  window.addEventListener('scroll', debounce(animateOnScroll));
  window.addEventListener('load', animateOnScroll);
  
  // Initialize page (set initial states for elements)
  function initPage() {
    document.querySelectorAll('.service-card, .skill').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    document.querySelectorAll('.project-item').forEach(element => {
      element.style.opacity = '0';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
  }
  
  initPage();
});
