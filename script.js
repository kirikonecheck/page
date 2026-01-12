// Функция для анимации котика на главной странице
function animateCat() {
    const cat = document.getElementById('cat-animation');
    if (!cat) return;
    
    // Создаем элемент для котика
    cat.innerHTML = '🐱';
    
    // Анимация изменения размера
    let size = 1;
    let growing = true;
    
    const resizeCat = () => {
        if (growing) {
            size += 0.01;
            if (size >= 1.2) growing = false;
        } else {
            size -= 0.01;
            if (size <= 0.8) growing = true;
        }
        
        cat.style.transform = `scale(${size})`;
        requestAnimationFrame(resizeCat);
    };
    
    resizeCat();
    
    // Меняем эмодзи котика каждые 3 секунды
    const catEmojis = ['🐱', '🐈', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
    let emojiIndex = 0;
    
    setInterval(() => {
        cat.innerHTML = catEmojis[emojiIndex];
        emojiIndex = (emojiIndex + 1) % catEmojis.length;
    }, 3000);
}

// Магия при нажатии кнопки
function setupMagicButton() {
    const magicButton = document.getElementById('magic-button');
    if (!magicButton) return;
    
    magicButton.addEventListener('click', function() {
        // Анимация кнопки
        this.style.transform = 'scale(0.9)';
        this.style.backgroundColor = '#ffd166';
        this.textContent = 'Мяу-магия!';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '#06d6a0';
            this.textContent = 'Ещё разок!';
        }, 300);
        
        // Создаем летающих котиков
        for (let i = 0; i < 10; i++) {
            createFlyingCat();
        }
        
        // Воспроизводим звук "мяу" (если доступно)
        playMeowSound();
        
        // Показываем сообщение
        showNotification('Мяу! Магия котиков активирована!');
    });
}

// Создаем летающих котиков
function createFlyingCat() {
    const flyingCat = document.createElement('div');
    flyingCat.innerHTML = '🐱';
    flyingCat.style.position = 'fixed';
    flyingCat.style.fontSize = '2rem';
    flyingCat.style.zIndex = '1000';
    flyingCat.style.pointerEvents = 'none';
    
    // Случайная начальная позиция
    const startX = Math.random() * window.innerWidth;
    flyingCat.style.left = `${startX}px`;
    flyingCat.style.top = `${window.innerHeight}px`;
    
    document.body.appendChild(flyingCat);
    
    // Анимация полета
    const duration = 2000 + Math.random() * 2000;
    const endX = startX + (Math.random() * 400 - 200);
    const endY = -100;
    
    const startTime = Date.now();
    
    function fly() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentX = startX + (endX - startX) * progress;
        const currentY = window.innerHeight + (endY - window.innerHeight) * progress;
        
        flyingCat.style.left = `${currentX}px`;
        flyingCat.style.top = `${currentY}px`;
        
        // Вращение
        flyingCat.style.transform = `rotate(${progress * 360}deg)`;
        
        if (progress < 1) {
            requestAnimationFrame(fly);
        } else {
            document.body.removeChild(flyingCat);
        }
    }
    
    requestAnimationFrame(fly);
}

// Воспроизведение звука "мяу"
function playMeowSound() {
    // Создаем аудио контекст
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Создаем осциллятор для генерации звука
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Настраиваем звук "мяу"
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.3);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.4);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Показываем уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#ff6b8b';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.style.fontFamily = "'Comic Neue', cursive";
    notification.style.fontWeight = 'bold';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        notification.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// Отзывы на главной странице
function setupTestimonials() {
    const testimonials = [
        "Эти котики написали код, который не только работает, но и мурлычет!",
        "Лучшие разработчики, с которыми я работал. Правда, иногда они спят на клавиатуре во время совещаний.",
        "Заказ выполнен быстрее, чем я успел сказать 'кис-кис'. Качество - выше всяких похвал!",
        "Котики пофиксили баг, который моя команда искала 2 недели. За 10 минут. И еще поспали.",
        "Теперь я понимаю, почему говорят, что у кошек 9 жизней. У их кода - все 10!"
    ];
    
    const testimonialText = document.getElementById('testimonial-text');
    const nextButton = document.getElementById('next-testimonial');
    
    if (!testimonialText || !nextButton) return;
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialText.style.opacity = '0';
        testimonialText.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            testimonialText.textContent = testimonials[index];
            testimonialText.style.opacity = '1';
            testimonialText.style.transform = 'translateY(0)';
            testimonialText.style.transition = 'all 0.5s ease';
        }, 300);
    }
    
    nextButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
        
        // Анимация кнопки
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Показываем первый отзыв
    showTestimonial(currentTestimonial);
}

// Анимации на странице "О нас"
function setupAboutPageAnimations() {
    // Анимация аватаров команды
    const memberAvatars = document.querySelectorAll('.member-avatar');
    
    memberAvatars.forEach(avatar => {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    });
    
    // Анимация фактов
    const facts = document.querySelectorAll('.fact');
    
    facts.forEach(fact => {
        fact.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(3deg) scale(1.05)';
        });
        
        fact.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    });
}

// Форма на странице контактов
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const catName = document.getElementById('cat-name').value;
        
        // В реальном приложении здесь был бы AJAX-запрос
        // Для демонстрации просто покажем сообщение
        
        let responseMessage = `Спасибо, ${name}! Ваше сообщение отправлено. `;
        
        if (catName) {
            responseMessage += `Мы обязательно передадим привет ${catName}! `;
        } else {
            responseMessage += `Жаль, что у вас нет котика, но мы всё равно вас любим! `;
        }
        
        responseMessage += `Мы ответим вам на ${email} в течение 24 часов. Мяу!`;
        
        formMessage.textContent = responseMessage;
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = '#d4edda';
        formMessage.style.color = '#155724';
        
        // Анимация сообщения
        formMessage.style.opacity = '0';
        formMessage.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            formMessage.style.opacity = '1';
            formMessage.style.transform = 'translateY(0)';
            formMessage.style.transition = 'all 0.5s ease';
        }, 10);
        
        // Очищаем форму
        contactForm.reset();
        
        // Создаем летающих котиков
        for (let i = 0; i < 5; i++) {
            createFlyingCat();
        }
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.opacity = '0';
            formMessage.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 500);
        }, 5000);
    });
}

// Анимация котика на карте
function setupMapCat() {
    const mapCat = document.getElementById('map-cat');
    if (!mapCat) return;
    
    // Меняем эмодзи котика на карте
    const mapCatEmojis = ['😸', '🐈‍⬛', '😻', '😼', '🐱'];
    let mapCatIndex = 0;
    
    setInterval(() => {
        mapCat.textContent = mapCatEmojis[mapCatIndex];
        mapCatIndex = (mapCatIndex + 1) % mapCatEmojis.length;
        
        // Случайное изменение размера
        const randomSize = 0.8 + Math.random() * 0.4;
        mapCat.style.fontSize = `${randomSize * 5}rem`;
    }, 2000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация котика на главной
    animateCat();
    
    // Кнопка магии
    setupMagicButton();
    
    // Отзывы
    setupTestimonials();
    
    // Анимации на странице "О нас"
    setupAboutPageAnimations();
    
    // Форма контактов
    setupContactForm();
    
    // Котик на карте
    setupMapCat();
    
    // Добавляем плавающих котиков на все страницы
    addMoreFloatingCats();
});

// Добавляем больше плавающих котиков
function addMoreFloatingCats() {
    const floatingCatsContainer = document.querySelector('.floating-cats');
    if (!floatingCatsContainer) return;
    
    // Добавляем еще котиков
    const catEmojis = ['🐱', '🐈', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
    
    for (let i = 0; i < 7; i++) {
        const cat = document.createElement('div');
        cat.classList.add('floating-cat');
        cat.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)];
        
        // Случайные начальные позиции и анимация
        cat.style.left = `${Math.random() * 100}%`;
        cat.style.top = `${Math.random() * 100}%`;
        cat.style.fontSize = `${1 + Math.random() * 2}rem`;
        cat.style.opacity = `${0.1 + Math.random() * 0.2}`;
        
        // Разная скорость анимации
        const duration = 15 + Math.random() * 30;
        cat.style.animation = `floatAround ${duration}s linear infinite`;
        
        floatingCatsContainer.appendChild(cat);
    }
}