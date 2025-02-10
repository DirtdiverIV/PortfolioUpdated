    // // src/scripts.js
    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('img');
    const projectImages = document.querySelectorAll('.project-image, .award-image');

    projectImages.forEach(image => {
      image.addEventListener('click', () => {
        modalImg.src = image.src;
        modal.classList.add('active');
      });
    });

    modal.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    // Intersection Observer para las animaciones de scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class with enhanced animation
          entry.target.classList.add('visible');
          
          // Animate cards within the section with staggered timing and random effects
          entry.target.querySelectorAll('.card').forEach((card, index) => {
            const randomEffect = Math.floor(Math.random() * 3);
            card.style.transform = 'translateY(50px) scale(0.95)';
            card.style.opacity = '0';
            
            setTimeout(() => {
              card.style.transition = 'all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)';
              card.style.transform = 'translateY(0) scale(1)';
              card.style.opacity = '1';
              
              switch(randomEffect) {
                case 0:
                  card.style.animation = 'slideInFromRight 0.8s forwards';
                  break;
                case 1:
                  card.style.animation = 'popIn 0.8s forwards';
                  break;
                case 2:
                  card.style.animation = 'fadeInUp 0.8s forwards';
                  break;
              }
            }, index * 150); // Reduced delay for snappier animations
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px'
    });
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Get the element's position relative to the viewport
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 50;
          
          // Smooth scroll with custom easing
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
    
          // Add highlight effect to the target section
          targetElement.style.animation = 'highlightSection 1s forwards';
        }
      });
    });
