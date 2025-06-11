document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active-section'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active-section');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Health Tips Generator
    const healthTips = [
        "Drink a glass of water first thing in the morning to rehydrate your body.",
        "Take a 5-minute break every hour to stretch if you sit for long periods.",
        "Aim for 7-9 hours of sleep each night for optimal health.",
        "Include a source of protein in every meal to help maintain muscle mass.",
        "Practice deep breathing for 2-3 minutes when feeling stressed.",
        "Eat slowly and chew your food thoroughly for better digestion.",
        "Spend at least 10 minutes outside in natural sunlight each day.",
        "Replace sugary drinks with water, herbal tea, or infused water.",
        "Stand up and move for at least 2 minutes every hour.",
        "Keep healthy snacks like nuts or fruit readily available.",
        "Practice gratitude by listing 3 things you're thankful for each day.",
        "Wash your hands frequently to prevent the spread of germs.",
        "Maintain good posture to prevent back and neck pain.",
        "Limit screen time before bed to improve sleep quality.",
        "Try a new vegetable or fruit each week for variety."
    ];
    
    const healthTipsBtn = document.getElementById('health-tips-btn');
    const tipDisplay = document.getElementById('health-tip-display');
    
    healthTipsBtn.addEventListener('click', function() {
        const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
        tipDisplay.textContent = randomTip;
        tipDisplay.style.display = 'block';
    });
    
    // BMI Calculator
    const calculateBtn = document.getElementById('calculate-bmi');
    const bmiResult = document.getElementById('bmi-result');
    
    calculateBtn.addEventListener('click', function() {
        const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to m
        const weight = parseFloat(document.getElementById('weight').value);
        const bmi = weight / (height * height);
        let category = '';
        
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }
        
        bmiResult.innerHTML = `Your BMI: <strong>${bmi.toFixed(1)}</strong><br>Category: <strong>${category}</strong>`;
    });
    
    // Exercise Tracker
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const trackerBody = document.getElementById('tracker-body');
    const resetTrackerBtn = document.getElementById('reset-tracker');
    
    function populateTracker() {
        trackerBody.innerHTML = '';
        
        days.forEach(day => {
            const row = document.createElement('tr');
            
            const dayCell = document.createElement('td');
            dayCell.textContent = day;
            row.appendChild(dayCell);
            
            const activityCell = document.createElement('td');
            const activityInput = document.createElement('input');
            activityInput.type = 'text';
            activityInput.placeholder = 'e.g., Running, Yoga';
            activityInput.value = localStorage.getItem(`exercise-${day}-activity`) || '';
            activityCell.appendChild(activityInput);
            row.appendChild(activityCell);
            
            const durationCell = document.createElement('td');
            const durationInput = document.createElement('input');
            durationInput.type = 'text';
            durationInput.placeholder = 'e.g., 30 min';
            durationInput.value = localStorage.getItem(`exercise-${day}-duration`) || '';
            durationCell.appendChild(durationInput);
            row.appendChild(durationCell);
            
            const completedCell = document.createElement('td');
            const completedCheckbox = document.createElement('input');
            completedCheckbox.type = 'checkbox';
            completedCheckbox.checked = localStorage.getItem(`exercise-${day}-completed`) === 'true';
            completedCell.appendChild(completedCheckbox);
            row.appendChild(completedCell);
            
            // Save data when changed
            activityInput.addEventListener('change', () => {
                localStorage.setItem(`exercise-${day}-activity`, activityInput.value);
            });
            
            durationInput.addEventListener('change', () => {
                localStorage.setItem(`exercise-${day}-duration`, durationInput.value);
            });
            
            completedCheckbox.addEventListener('change', () => {
                localStorage.setItem(`exercise-${day}-completed`, completedCheckbox.checked);
            });
            
            trackerBody.appendChild(row);
        });
    }
    
    resetTrackerBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset your exercise tracker for this week?')) {
            days.forEach(day => {
                localStorage.removeItem(`exercise-${day}-activity`);
                localStorage.removeItem(`exercise-${day}-duration`);
                localStorage.removeItem(`exercise-${day}-completed`);
            });
            populateTracker();
        }
    });
    
    // Breathing Exercise
    const breathingCircle = document.getElementById('breathing-circle');
    const breathingText = document.getElementById('breathing-text');
    const startBreathingBtn = document.getElementById('start-breathing');
    let breathingInterval;
    let isBreathing = false;
    
    startBreathingBtn.addEventListener('click', function() {
        if (isBreathing) {
            clearInterval(breathingInterval);
            breathingText.textContent = 'Click Start';
            breathingCircle.style.transform = 'scale(1)';
            startBreathingBtn.textContent = 'Start Exercise';
            isBreathing = false;
            return;
        }
        
        isBreathing = true;
        startBreathingBtn.textContent = 'Stop Exercise';
        
        let cycle = 0;
        const phases = [
            { text: 'Breathe In', duration: 4000, scale: 1.2 },
            { text: 'Hold', duration: 4000, scale: 1.2 },
            { text: 'Breathe Out', duration: 6000, scale: 1 }
        ];
        
        function updateBreathing() {
            const phase = phases[cycle % phases.length];
            breathingText.textContent = phase.text;
            
            // Animate the circle
            breathingCircle.style.transition = `transform ${phase.duration/1000}s ease-in-out`;
            breathingCircle.style.transform = `scale(${phase.scale})`;
            
            cycle++;
        }
        
        updateBreathing(); // Start immediately
        breathingInterval = setInterval(updateBreathing, 14000); // Total cycle duration
    });
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // In a real application, you would send this data to a server
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
    });
    
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = type === 'error' ? '#ffdddd' : '#ddffdd';
        formMessage.style.color = type === 'error' ? '#ff0000' : '#008000';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // Initialize components
    populateTracker();
});