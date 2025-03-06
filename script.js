// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Time-based greeting
    updateGreeting();
    
    // Image Slider
    initSlider();
    
    // Random Garden Tip
    initRandomTip();
    
    // Chatbot
    initChatbot();
    
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Contact Form Validation
    if (document.getElementById('contact-form')) {
        initContactForm();
    }
});

// Update greeting based on time of day
function updateGreeting() {
    const greetingText = document.getElementById('greeting-text');
    const currentHour = new Date().getHours();
    let greeting;
    
    if (currentHour < 12) {
        greeting = "Good Morning! Welcome to Mena Hair Salon";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon! Welcome to Mena Hair Salon";
    } else {
        greeting = "Good Evening! Welcome to Mena Hair Salon";
    }
    
    greetingText.textContent = greeting;
}

// Image slider functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize automatic slideshow
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Event listeners for controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

// Random gardening tip functionality
function initRandomTip() {
    const tipButton = document.getElementById('tip-button');
    const tipText = document.getElementById('random-tip');
    
    if (!tipButton || !tipText) return;
    
    const tips = [
        "Attach elastic band to your wigs to keep secure them.",
        "Try your wig to be sure it fits right and looks looks good before buying it.",
        "Use styling products or hairspray sparingly so you dont need to wash them often..",
        "Moisturise your cornrows before wearing your wigs.",
        "Do not use hot water to wash your wigs, it will damage the hair instead use warm or cold water.",
      "Undo your braids/cornrow after a month to prevent hair breakage."
    ];
    
    function getRandomTip() {
        const randomIndex = Math.floor(Math.random() * tips.length);
        return tips[randomIndex];
    }
    
    tipButton.addEventListener('click', function() {
        tipText.textContent = getRandomTip(--light-color);
        
        // Change button background color temporarily
        const originalColor = getComputedStyle(tipButton).backgroundColor;
        tipButton.style.backgroundColor = '#f6aa1c';
        
        setTimeout(() => {
            tipButton.style.backgroundColor = originalColor;
        }, 500);
    });
}

// Chatbot functionality
function initChatbot() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatbox = document.getElementById('chatbot');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');
    
    if (!chatToggle || !chatbox) return;
    
    // Predefined responses
    const responses = {
        'hi': 'Hello! How can I help with your Hair needs today?',
        'hello': 'Hi there! What Hair questions do you have?',
        'hours': 'Our salon is open 6 days a week from 9am to 6pm.',
        'location': 'We are located at Borteyman SSNIT Flat, Accra-Ghana, GA-237-7316.',
        'service': 'We offer a wide variety of hair services, including sale of Human hair bundles, Machine sewn wigs, Wig installation, Revamping, Hair treatment, Braids and Online classes.',
        'price': 'Our prices vary depending on the service. Revamping start at GHC150, and our Machine Sewn wig start at GHC300.',
        'contact': 'You can call us at (233) 0241167272 or email us at philomenacollins63@gmail.com.',
        'help': 'I can answer questions about our Hair services, hours, location, or you can ask for Hair tips!'
    };
    
    // Open and close chatbot
    chatToggle.addEventListener('click', function() {
        chatbox.style.display = 'block';
    });
    
    closeChat.addEventListener('click', function() {
        chatbox.style.display = 'none';
    });
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user';
        userMessageDiv.textContent = message;
        chatMessages.appendChild(userMessageDiv);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Process response after a short delay
        setTimeout(() => {
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message bot';
            
            // Get response based on keywords
            let responseText = 'I don\'t understand that question. Try asking about our hours, location, hair, or services.';
            
            const messageLower = message.toLowerCase();
            
            for (const keyword in responses) {
                if (messageLower.includes(keyword)) {
                    responseText = responses[keyword];
                    break;
                }
            }
            
            botMessageDiv.textContent = responseText;
            chatMessages.appendChild(botMessageDiv);
            
            // Scroll to bottom again
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }
    
    // Event listeners for sending messages
    sendChat.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const newMessageBtn = document.getElementById('new-message-btn');
    const previousMessagesList = document.getElementById('previous-messages-list');
    
    // Load previous messages from local storage
    loadPreviousMessages();
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const serviceInput = document.getElementById('service');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const serviceError = document.getElementById('service-error');
        const messageError = document.getElementById('message-error');
        
        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        serviceError.textContent = '';
        messageError.textContent = '';
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name';
            nameInput.focus();
            return false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.focus();
            return false;
        }
        
        // Validate service selection
        if (serviceInput.value === '') {
            serviceError.textContent = 'Please select a service';
            serviceInput.focus();
            return false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter a message';
            messageInput.focus();
            return false;
        }
        
        // If validation passes, save to local storage
        saveMessage({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            service: serviceInput.value,
            message: messageInput.value.trim(),
            date: new Date().toLocaleString()
        });
        
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Update previous messages display
        loadPreviousMessages();
    });
    
    // Reset form for new message
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            contactForm.reset();
            formSuccess.style.display = 'none';
            contactForm.style.display = 'block';
        });
    }
    
    // Functions to handle local storage
    function saveMessage(messageData) {
        let messages = [];
        
        // Get existing messages from local storage
        if (localStorage.getItem('contactMessages')) {
            messages = JSON.parse(localStorage.getItem('contactMessages'));
        }
        
        // Add new message to array
        messages.push(messageData);
        
        // Save back to local storage
        localStorage.setItem('contactMessages', JSON.stringify(messages));
    }
    
    function loadPreviousMessages() {
        if (!previousMessagesList) return;
        
        let messages = [];
        
        // Get messages from local storage
        if (localStorage.getItem('contactMessages')) {
            messages = JSON.parse(localStorage.getItem('contactMessages'));
        }
        
        // Display messages or show "no messages" text
        if (messages.length > 0) {
            previousMessagesList.innerHTML = '';
            
            // Show only the last 3 messages
            const recentMessages = messages.slice(-3);
            
            recentMessages.forEach(msg => {
                const messageItem = document.createElement('div');
                messageItem.className = 'message-item';
                
                const messageContent = document.createElement('p');
                messageContent.textContent = `${msg.name} (${msg.service}): ${msg.message.substring(0, 50)}${msg.message.length > 50 ? '...' : ''}`;
                
                const messageDate = document.createElement('p');
                messageDate.className = 'message-date';
                messageDate.textContent = msg.date;
                
                messageItem.appendChild(messageContent);
                messageItem.appendChild(messageDate);
                previousMessagesList.appendChild(messageItem);
            });
        } else {
            previousMessagesList.innerHTML = '<p class="no-messages">No previous messages found.</p>';
        }
    }
}