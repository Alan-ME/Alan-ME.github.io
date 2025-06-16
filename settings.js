
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00bef8" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#3943ce",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});


document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.remove('active');
        });
        this.classList.add('active');
        
        
        const color = window.getComputedStyle(this).backgroundColor;
        document.documentElement.style.setProperty('--accent', color);
    });
});


document.querySelectorAll('.toggle-switch').forEach(switchEl => {
    switchEl.addEventListener('change', function() {
    
        const slider = this.querySelector('.slider');
        slider.style.transform = 'scale(1.1)';
        setTimeout(() => {
            slider.style.transform = 'scale(1)';
        }, 200);
    });
});


document.querySelector('.btn-save').addEventListener('click', function() {
    this.innerHTML = '<i class="fas fa-check"></i> Changes Saved!';
    this.style.background = 'linear-gradient(45deg, #00cc66, #00994d)';
    
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        this.style.background = 'linear-gradient(45deg, #00ff7f, #00cc66)';
    }, 2000);
});


document.querySelector('.btn-reset').addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resetting...';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Reset Complete!';
            this.style.background = 'linear-gradient(45deg, #990033, #660022)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-undo"></i> Reset to Defaults';
                this.style.background = 'linear-gradient(45deg, #ff0697, #c10000)';
            }, 1500);
        }, 1000);
    }
});