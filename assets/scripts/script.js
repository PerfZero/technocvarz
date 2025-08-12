// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');

    const searchToggles = document.querySelectorAll('.search-toggle');
    const mobileSearchToggle = document.querySelector('.mobile-search');
    const searchBlock = document.querySelector('.search');
    const searchClose = document.querySelector('.search__close');
    const searchInput = document.querySelector('.search__input');
    const searchSubmit = document.querySelector('.search__submit');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');
    const mobileSearch = document.querySelector('.mobile-search-screen');
    const mobileSearchBtn = document.querySelector('.mobile-menu__search-btn');
    const mobileSearchBack = document.querySelector('.mobile-search__back');
    const mobileSearchInput = document.querySelector('.mobile-search__input');
    const mobileSearchSubmit = document.querySelector('.mobile-search__submit');
    const mobileSearchResults = document.querySelector('.mobile-search__results');
    const desktopCatalogBtn = document.querySelector('.desktop-catalog');
    const catalogPanel = document.querySelector('.catalog-panel');
    const catalogOverlay = document.querySelector('.catalog-overlay');
    const catalogClose = document.querySelector('.catalog-panel__close');
    const mobileCatalogScreen = document.querySelector('.mobile-catalog-screen');
    const mobileCatalogBack = document.querySelector('.mobile-catalog__back');
    if (searchToggles.length && searchBlock) {
        const openSearch = () => {
            searchBlock.classList.add('search--open');
            searchBlock.setAttribute('aria-hidden', 'false');
            if (searchInput) setTimeout(() => searchInput.focus(), 200);
        };
        const closeSearch = () => {
            searchBlock.classList.remove('search--open');
            searchBlock.setAttribute('aria-hidden', 'true');
        };
        searchToggles.forEach((btn) => {
            btn.addEventListener('click', openSearch);
        });
        if (searchClose) searchClose.addEventListener('click', closeSearch);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearch();
        });
    }

    if (searchInput && searchSubmit) {
        const updateSearchButtonState = () => {
            const hasValue = searchInput.value.trim().length > 0;
            searchSubmit.disabled = !hasValue;
            const results = document.querySelector('.search__results');
            if (results) results.style.display = hasValue ? 'grid' : 'none';
        };
        updateSearchButtonState();
        searchInput.addEventListener('input', updateSearchButtonState);
    }

    const header = document.querySelector('.site-header');
    const openMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.add('is-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        if (header) header.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    };
    const closeMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        if (header) header.classList.remove('menu-open');
        document.body.style.overflow = '';
    };

    const burgerButtons = document.querySelectorAll('.mobile-burger');
    burgerButtons.forEach(btn => btn.addEventListener('click', () => {
        const willOpen = !(mobileMenu && mobileMenu.classList.contains('is-open'));
        if (willOpen) {
            btn.classList.add('active');
            openMobileMenu();
        } else {
            btn.classList.remove('active');
            closeMobileMenu();
        }
    }));

    if (mobileMenuClose) mobileMenuClose.addEventListener('click', () => {
        burgerButtons.forEach(btn => btn.classList.remove('active'));
        closeMobileMenu();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    const openMobileSearch = () => {
        console.log('[mobile-search] open requested');
        if (!mobileSearch) return;
        mobileSearch.classList.add('is-open');
        mobileSearch.setAttribute('aria-hidden', 'false');
        if (mobileSearchInput) setTimeout(() => mobileSearchInput.focus(), 150);
        console.log('[mobile-search] opened');
    };
    const closeMobileSearch = () => {
        console.log('[mobile-search] close requested');
        if (!mobileSearch) return;
        mobileSearch.classList.remove('is-open');
        mobileSearch.setAttribute('aria-hidden', 'true');
        console.log('[mobile-search] closed');
    };
    if (mobileSearchBtn) {
        console.log('[mobile-search] bind click on .mobile-menu__search-btn');
        mobileSearchBtn.addEventListener('click', openMobileSearch);
    } else {
        console.warn('[mobile-search] .mobile-menu__search-btn NOT FOUND at init');
        // делегирование включаем ТОЛЬКО если кнопка не найдена при инициализации
        document.addEventListener('click', (e) => {
            const btn = e.target.closest && e.target.closest('.mobile-menu__search-btn');
            if (btn) {
                console.log('[mobile-search] delegated click');
                openMobileSearch();
            }
        });
    }
    if (mobileSearchBack) mobileSearchBack.addEventListener('click', () => {
        if (mobileSearchInput) mobileSearchInput.value = '';
        if (mobileSearchResults) mobileSearchResults.innerHTML = '';
        if (mobileSearchSubmit) mobileSearchSubmit.disabled = true;
        closeMobileSearch();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileSearch();
    });

    const sampleResults = [
        { title: 'Кварцевый песок', desc: 'фракции 1,00–2,00 мм' },
        { title: 'Кварцевый песок', desc: 'фракции 1,00–2,00 мм' },
        { title: 'Кварцевый песок', desc: 'фракции 1,00–2,00 мм' },
        { title: 'Кварцевый песок', desc: 'фракции 1,00–2,00 мм' },
        { title: 'Кварцевый песок', desc: 'фракции 1,00–2,00 мм' },
        { title: 'Кварцевый песок', desc: 'фракции 1,00–2,00 мм' }
    ];

    const renderMobileResults = (query) => {
        if (!mobileSearchResults) return;
        if (!query) {
            mobileSearchResults.innerHTML = '';
            return;
        }
        const html = sampleResults.map(r => (
            `<a href="#" class="mobile-search__result">
                <span class="mobile-search__result-title">${r.title}</span>
                <span class="mobile-search__result-desc">${r.desc}</span>
            </a>`
        )).join('');
        mobileSearchResults.innerHTML = html;
    };

    const updateMobileSearchState = () => {
        const hasValue = !!mobileSearchInput && mobileSearchInput.value.trim().length > 0;
        if (mobileSearchSubmit) mobileSearchSubmit.disabled = !hasValue;
        renderMobileResults(hasValue ? mobileSearchInput.value.trim() : '');
    };

    if (mobileSearchInput) mobileSearchInput.addEventListener('input', () => {
        console.log('[mobile-search] input change');
        updateMobileSearchState();
    });
    if (mobileSearchSubmit) mobileSearchSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        updateMobileSearchState();
    });

    const openCatalogPanel = () => {
        if (!catalogPanel) return;
        catalogPanel.classList.add('is-open');
        if (catalogOverlay) catalogOverlay.classList.add('is-open');
        if (header) header.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    };
    const closeCatalogPanel = () => {
        if (!catalogPanel) return;
        catalogPanel.classList.remove('is-open');
        if (catalogOverlay) catalogOverlay.classList.remove('is-open');
        if (header) header.classList.remove('menu-open');
        document.body.style.overflow = '';
    };
    const mobileCatalogBtns = document.querySelectorAll('.mobile-catalog, .mobile-menu__catalog');
    
    const openMobileCatalog = () => {
        if (!mobileCatalogScreen) return;
        mobileCatalogScreen.classList.add('is-open');
        mobileCatalogScreen.setAttribute('aria-hidden', 'false');
        if (header) header.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    };
    const closeMobileCatalog = () => {
        if (!mobileCatalogScreen) return;
        mobileCatalogScreen.classList.remove('is-open');
        mobileCatalogScreen.setAttribute('aria-hidden', 'true');
        if (header) header.classList.remove('menu-open');
        document.body.style.overflow = '';
    };
    
    if (desktopCatalogBtn) desktopCatalogBtn.addEventListener('click', openCatalogPanel);
    
    mobileCatalogBtns.forEach(btn => {
        // Кнопки в mobile-actions всегда открывают десктопные версии
        if (btn.closest('.mobile-actions')) {
            btn.addEventListener('click', openCatalogPanel);
        } else {
            // Остальные мобильные кнопки работают по размеру экрана
            btn.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    openMobileCatalog();
                } else {
                    openCatalogPanel();
                }
            });
        }
    });
    
    if (mobileCatalogBack) mobileCatalogBack.addEventListener('click', closeMobileCatalog);
    if (catalogClose) catalogClose.addEventListener('click', closeCatalogPanel);
    if (catalogOverlay) catalogOverlay.addEventListener('click', closeCatalogPanel);
    document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') {
            closeCatalogPanel();
            closeMobileCatalog();
        }
    });

    // Попапы
    const popupOverlay = document.querySelector('.popup-overlay');
    const popups = document.querySelectorAll('.popup');
    const popupCloses = document.querySelectorAll('.popup__close');
    
    const openPopup = (popupClass) => {
        const popup = document.querySelector(`.popup-${popupClass}`);
        if (!popup) return;
        
        popupOverlay.classList.add('is-open');
        popup.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    };
    
    const closePopup = () => {
        popupOverlay.classList.remove('is-open');
        popups.forEach(popup => popup.classList.remove('is-open'));
        document.body.style.overflow = '';
    };
    
    // Закрытие попапов
    if (popupCloses.length > 0) {
    popupCloses.forEach(btn => btn.addEventListener('click', closePopup));
    }
    if (popupOverlay) {
    popupOverlay.addEventListener('click', closePopup);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });
    
    // Логика города
    const cityConfirm = document.querySelector('.popup-city-confirm');
    const cityChange = document.querySelector('.popup-city-change');
    const cityItems = document.querySelectorAll('.popup__city-item');
    const locationBtn = document.querySelector('.location__btn');
    const cityNameDisplay = document.querySelector('.popup__city-name');
    const citySearchInput = document.querySelector('.popup__search-input');
    const citiesList = document.querySelector('.popup__cities-list');
    
    // Определение города по IP
    const detectCity = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (data.city) {
                const detectedCity = data.city;
                console.log('Определен город:', detectedCity);
                
                if (cityNameDisplay) cityNameDisplay.textContent = detectedCity.toUpperCase();
                
                const cityConfirmed = localStorage.getItem('cityConfirmed');
                if (!cityConfirmed) {
                    setTimeout(() => openPopup('city'), 1000);
                } else {
                    const savedCity = localStorage.getItem('userCity');
                    if (savedCity && locationBtn) locationBtn.textContent = savedCity;
                }
            }
        } catch (error) {
            console.log('Не удалось определить город:', error);
            if (cityNameDisplay) cityNameDisplay.textContent = 'ВОРОНЕЖ';
        }
    };
    
    detectCity();
    
    if (cityConfirm) {
        cityConfirm.addEventListener('click', () => {
            const currentCity = cityNameDisplay ? cityNameDisplay.textContent : 'ВОРОНЕЖ';
            localStorage.setItem('cityConfirmed', 'true');
            localStorage.setItem('userCity', currentCity.toLowerCase());
            if (locationBtn) locationBtn.textContent = currentCity.toLowerCase();
            closePopup();
        });
    }
    if (cityChange) cityChange.addEventListener('click', () => {
        closePopup();
        setTimeout(() => openPopup('cities'), 100);
    });
    
    cityItems.forEach(item => {
        item.addEventListener('click', () => {
            const city = item.dataset.city;
            localStorage.setItem('cityConfirmed', 'true');
            localStorage.setItem('userCity', city);
            if (locationBtn) locationBtn.textContent = city;
            if (cityNameDisplay) cityNameDisplay.textContent = city.toUpperCase();
            closePopup();
        });
    });
    
    if (locationBtn) {
        locationBtn.addEventListener('click', () => openPopup('city'));
    }
    
    // Поиск городов
    if (citySearchInput && citiesList) {
        const allCityItems = [...cityItems];
        
        citySearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            allCityItems.forEach(item => {
                const cityName = item.textContent.toLowerCase();
                const isVisible = cityName.includes(searchTerm);
                item.style.display = isVisible ? 'block' : 'none';
            });
            
            // Показываем сообщение если ничего не найдено
            const visibleItems = allCityItems.filter(item => item.style.display !== 'none');
            if (visibleItems.length === 0 && searchTerm) {
                if (!citiesList.querySelector('.popup__no-results')) {
                    const noResults = document.createElement('div');
                    noResults.className = 'popup__no-results';
                    noResults.textContent = 'Город не найден';
                    citiesList.appendChild(noResults);
                }
            } else {
                const noResults = citiesList.querySelector('.popup__no-results');
                if (noResults) noResults.remove();
            }
        });
        
        // Очищаем поиск при открытии попапа городов
        const citiesPopup = document.querySelector('.popup-cities');
        if (citiesPopup) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (citiesPopup.classList.contains('is-open')) {
                            setTimeout(() => {
                                citySearchInput.value = '';
                                allCityItems.forEach(item => item.style.display = 'block');
                                const noResults = citiesList.querySelector('.popup__no-results');
                                if (noResults) noResults.remove();
                                citySearchInput.focus();
                            }, 100);
                        }
                    }
                });
            });
            observer.observe(citiesPopup, { attributes: true });
        }
    }
    
    // Кнопки открытия попапов
    const callbackBtns = document.querySelectorAll('.btn--ghost');
    const authLinks = document.querySelectorAll('[href="#"]');
    const orderBtn = document.querySelector('.hero__btn');
    
    callbackBtns.forEach(btn => {
        if (btn.textContent.includes('Обратный звонок')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openPopup('callback');
            });
        }
    });
    
    if (orderBtn) {
        orderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openPopup('request');
        });
    }
    
    // Авторизация
    authLinks.forEach(link => {
        if (link.closest('.icon-link') && link.querySelector('img[src*="exit"]')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openPopup('auth');
            });
        }
    });
    
    // Табы авторизации
    const authTabs = document.querySelectorAll('.popup__tab');
    const authContents = document.querySelectorAll('.popup__tab-content');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            authTabs.forEach(t => t.classList.remove('popup__tab--active'));
            authContents.forEach(c => c.classList.remove('popup__tab-content--active'));
            
            tab.classList.add('popup__tab--active');
            document.querySelector(`[data-content="${targetTab}"]`).classList.add('popup__tab-content--active');
        });
    });
    
    // Валидация форм и управление кнопками
    const forms = document.querySelectorAll('.popup__form');
    
    const validateForm = (form) => {
        const submitBtn = form.querySelector('.popup__submit');
        const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
        const requiredCheckboxes = form.querySelectorAll('input[type="checkbox"][required]');
        
        let isValid = true;
        
        // Проверяем обязательные поля
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });
        
        // Проверяем обязательные чекбоксы
        requiredCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                isValid = false;
            }
        });
        
        // Управляем состоянием кнопки
        if (submitBtn) {
            submitBtn.disabled = !isValid;
            if (isValid) {
                submitBtn.classList.remove('popup__submit--disabled');
            } else {
                submitBtn.classList.add('popup__submit--disabled');
            }
        }
    };
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        
        // Изначально валидируем форму
        validateForm(form);
        
        // Слушаем изменения в полях ввода
        inputs.forEach(input => {
            input.addEventListener('input', () => validateForm(form));
            input.addEventListener('change', () => validateForm(form));
        });
        
        // Слушаем изменения в чекбоксах
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => validateForm(form));
        });
        
        // Обработка отправки
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            validateForm(form);
            
            const submitBtn = form.querySelector('.popup__submit');
            if (submitBtn && !submitBtn.disabled) {
                console.log('Форма отправлена:', form.id);
                // Здесь будет логика отправки
                closePopup();
            }
        });
    });

    // Инициализация Swiper слайдера для категорий
    if (document.querySelector('.categories__slider')) {
        var swiper = new Swiper('.categories__slider', {
            slidesPerView: 4,
            slidesPerColumn: 2,
            spaceBetween: 15,
            slidesPerColumnFill: 'row',
            navigation: {
                nextEl: '.categories__arrow--next',
                prevEl: '.categories__arrow--prev',
            },
            scrollbar: {
                el: '.categories__scrollbar',
                draggable: true,
            },
           
        });
    }

    // Слайдер сертификатов
    const certificatesSlider = document.querySelector('.certificates__slider');
    const certificatesCards = document.querySelectorAll('.certificates__card');
    const certificatesNavBtn = document.querySelector('.certificates__nav-btn--next');
    
    if (certificatesSlider && certificatesCards.length > 0) {
        let currentIndex = 0;
        
        function showCertificate(index) {
            certificatesCards.forEach((card, i) => {
                card.classList.remove('certificates__card--active');
                if (i === index) {
                    card.classList.add('certificates__card--active');
                }
            });
        }
        
        function nextCertificate() {
            currentIndex = (currentIndex + 1) % certificatesCards.length;
            showCertificate(currentIndex);
        }
        
        if (certificatesNavBtn) {
            certificatesNavBtn.addEventListener('click', nextCertificate);
        }
        
        // Автоматическое переключение каждые 4 секунды
        setInterval(nextCertificate, 4000);
    }

    // FAQ табы
    const faqTabs = document.querySelectorAll('.faq__tab');
    
    faqTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Убираем активный класс у всех табов
            faqTabs.forEach(otherTab => {
                otherTab.classList.remove('faq__tab--active');
            });
            
            // Добавляем активный класс текущему табу
            tab.classList.add('faq__tab--active');
        });
    });

    // FAQ аккордеон
    const faqQuestions = document.querySelectorAll('.faq__question');
    
    faqQuestions.forEach(question => {
        const btn = question.querySelector('.faq__question-btn');
        
        if (btn) {
            btn.addEventListener('click', () => {
                // Закрываем все остальные вопросы
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question) {
                        otherQuestion.classList.remove('faq__question--active');
                    }
                });
                
                // Переключаем текущий вопрос
                question.classList.toggle('faq__question--active');
            });
        }
    });

    // Инициализация Яндекс карты
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function () {
            const map = new ymaps.Map('yandex-map', {
                center: [51.672, 39.1843], // Координаты Воронежа
                zoom: 10,
                controls: ['zoomControl', 'fullscreenControl']
            });

            // Отключаем скролл карты
            map.behaviors.disable('scrollZoom');
            
            // Добавляем метку
            const placemark = new ymaps.Placemark([51.672, 39.1843], {
                balloonContent: 'ТехноКварц<br>Воронеж',
                hintContent: 'ТехноКварц'
            }, {
                preset: 'islands#orangeCircleDotIcon'
            });

            map.geoObjects.add(placemark);
        });
    }

    // Страница товара
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
            tabContents.forEach(c => c.classList.remove('tab-content--active'));
            
            btn.classList.add('tab-btn--active');
            document.getElementById(targetTab).classList.add('tab-content--active');
        });
    });

    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const quantityInput = document.querySelector('.quantity-input');
    
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!quantityInput) return;
            
            let value = parseInt(quantityInput.value) || 1;
            
            if (btn.classList.contains('quantity-btn--minus')) {
                value = Math.max(1, value - 1);
            } else if (btn.classList.contains('quantity-btn--plus')) {
                value = value + 1;
            }
            
            quantityInput.value = value;
        });
    });

    const galleryMain = document.querySelector('.product-gallery__main');
    const galleryThumbs = document.querySelector('.product-gallery__thumbs');
    
    if (galleryMain && galleryThumbs) {
        var thumbsSwiper = new Swiper(galleryThumbs, {
            spaceBetween: 12,
            slidesPerView: 1,   
            slidesPerView: 'auto',
            watchSlidesProgress: true,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 12,
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 12,
                }
            }
        });
        
        var mainSwiper = new Swiper(galleryMain, {
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable: true,
            },
            thumbs: {
                swiper: thumbsSwiper,
            },
        });
    }

    // Слайдер лидеры продаж
    const bestsellersSlider = document.querySelector('.bestsellers__slider');
    if (bestsellersSlider) {
        const bestsellersSwiper = new Swiper(bestsellersSlider, {
            slidesPerView: 'auto',
            
            slidesPerView: 'auto',  
            spaceBetween: 24,
            navigation: {
                nextEl: '.bestsellers__arrow--next',
                prevEl: '.bestsellers__arrow--prev',
            },
            scrollbar: {
                el: '.bestsellers__slider .swiper-scrollbar',
                draggable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                900: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                }
            }
        });
    }

    // Липкая панель товара
    const productSticky = document.getElementById('productSticky');
    if (productSticky) {
        let lastScrollY = 0;
        
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const productInfo = document.querySelector('.product-info');
            
            if (productInfo) {
                const productInfoBottom = productInfo.offsetTop + productInfo.offsetHeight;
                
                // Показываем панель когда прокрутили ниже основной информации о товаре
                if (scrollY > productInfoBottom) {
                    productSticky.classList.add('show');
                } else {
                    productSticky.classList.remove('show');
                }
            }
            
            lastScrollY = scrollY;
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Синхронизация количества с основной формой
        const stickyQuantityBtns = productSticky.querySelectorAll('.quantity-btn');
        const stickyQuantityInput = productSticky.querySelector('.quantity-input');
        const mainQuantityInput = document.querySelector('.product-purchase .quantity-input');
        
        stickyQuantityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!stickyQuantityInput) return;
                
                let value = parseInt(stickyQuantityInput.value) || 1;
                
                if (btn.classList.contains('quantity-btn--minus')) {
                    value = Math.max(1, value - 1);
                } else if (btn.classList.contains('quantity-btn--plus')) {
                    value = value + 1;
                }
                
                stickyQuantityInput.value = value;
                if (mainQuantityInput) mainQuantityInput.value = value;
            });
        });
        
        // Синхронизация при изменении в основной форме
        if (mainQuantityInput && stickyQuantityInput) {
            mainQuantityInput.addEventListener('input', () => {
                stickyQuantityInput.value = mainQuantityInput.value;
            });
        }
    }

    const favoriteBtn = document.querySelector('.product-info__favorite');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => {
            favoriteBtn.classList.toggle('product-info__favorite--active');
        });
    }

    const addToCartBtn = document.querySelector('.btn--cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            console.log('Добавлено в корзину:', quantity, 'шт.');
        });
    }

    const optionSelected = document.querySelectorAll('.product-option__selected');
    const optionDropdowns = document.querySelectorAll('.product-option__dropdown');
    
    optionSelected.forEach(btn => {
        btn.addEventListener('click', () => {
            const optionContainer = btn.closest('.product-option');
            const dropdown = optionContainer.querySelector('.product-option__dropdown');
            
            // Закрываем все другие dropdown
            optionDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('product-option__dropdown--open');
                }
            });
            
            dropdown.classList.toggle('product-option__dropdown--open');
        });
    });
    
    // Мобильный селектор фасовки
    const mobileSelector = document.getElementById('mobileSelector');
    const mobileSelectorOverlay = document.getElementById('mobileSelectorOverlay');
    const mobileSelectorClose = document.getElementById('mobileSelectorClose');
    const mobileSelectorConfirm = document.querySelector('.mobile-selector__confirm');
    const mobileRadios = document.querySelectorAll('.mobile-selector__radio');
    
    const openMobileSelector = () => {
        if (mobileSelectorOverlay) {
            mobileSelectorOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };
    
    const closeMobileSelector = () => {
        if (mobileSelectorOverlay) {
            mobileSelectorOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    };
    
    // Добавляем клик на всю область контента опции
    const optionContents = document.querySelectorAll('.product-option__content');
    optionContents.forEach(content => {
        content.addEventListener('click', () => {
            const optionContainer = content.closest('.product-option');
            const dropdown = optionContainer.querySelector('.product-option__dropdown');
            
            // На мобильных показываем мобильный селектор
            if (window.innerWidth <= 768) {
                openMobileSelector();
                return;
            }
            
            // На десктопе показываем dropdown
            optionDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('product-option__dropdown--open');
                }
            });
            
            dropdown.classList.toggle('product-option__dropdown--open');
        });
    });
    
    // Обработчики мобильного селектора
    if (mobileSelectorClose) {
        mobileSelectorClose.addEventListener('click', closeMobileSelector);
    }
    
    if (mobileSelectorOverlay) {
        mobileSelectorOverlay.addEventListener('click', (e) => {
            if (e.target === mobileSelectorOverlay) {
                closeMobileSelector();
            }
        });
    }
    
    if (mobileSelectorConfirm) {
        mobileSelectorConfirm.addEventListener('click', () => {
            const selectedRadio = document.querySelector('.mobile-selector__radio:checked');
            if (selectedRadio) {
                const value = selectedRadio.value;
                const text = selectedRadio.nextElementSibling.textContent;
                const selected = document.querySelector('.product-option__selected');
                
                if (selected) {
                    selected.textContent = text;
                    selected.dataset.value = value;
                }
            }
            closeMobileSelector();
        });
    }
    
    const optionValues = document.querySelectorAll('.product-option__value');
    optionValues.forEach(btn => {
        btn.addEventListener('click', () => {
            const optionContainer = btn.closest('.product-option');
            const selected = optionContainer.querySelector('.product-option__selected');
            const dropdown = optionContainer.querySelector('.product-option__dropdown');
            const value = btn.textContent;
            const dataValue = btn.dataset.value;
            
            selected.textContent = value;
            selected.dataset.value = dataValue;
            dropdown.classList.remove('product-option__dropdown--open');
        });
    });
    
    const radioInputs = document.querySelectorAll('.product-option__radio');
    radioInputs.forEach(radio => {
        radio.addEventListener('change', () => {
            const optionContainer = radio.closest('.product-option');
            const selected = optionContainer.querySelector('.product-option__selected');
            const dropdown = optionContainer.querySelector('.product-option__dropdown');
            const value = radio.value;
            const text = radio.nextElementSibling.textContent;
            
            selected.textContent = text;
            selected.dataset.value = value;
            dropdown.classList.remove('product-option__dropdown--open');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.product-option')) {
            optionDropdowns.forEach(dropdown => {
                dropdown.classList.remove('product-option__dropdown--open');
            });
        }
    });

    // Certificates Swiper
    const certificatesSwiper = new Swiper('.certificates-slider', {
        spaceBetween: 20,
        slidesPerView: 'auto',
     
        navigation: {
            nextEl: '.certificates-btn-next',
            prevEl: '.certificates-btn-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                spaceBetween: 20,
                slidesPerView: 'auto',
            }
        }
    });

    // Video Swiper
    const videoSwiper = new Swiper('.video-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '.video-btn-next',
            prevEl: '.video-btn-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                spaceBetween: 20,
                slidesPerView: 'auto',
            }
        }
    });

    // Production Slider
    const productionSwiper = new Swiper('.production-slider', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
        }
    });

    // Якорная навигация для страницы О компании
    const aboutNavLinks = document.querySelectorAll('.about-nav__link');
    const aboutSections = document.querySelectorAll('.about-section');
    
    if (aboutNavLinks.length > 0) {
        // Smooth scroll для якорных ссылок
        aboutNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Обновляем активную ссылку
                    aboutNavLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
        
        // Отслеживание скролла для активации ссылок
        const handleAboutScroll = () => {
            let current = '';
            
            aboutSections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            if (current) {
                aboutNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }
        };
        
        window.addEventListener('scroll', handleAboutScroll, { passive: true });
    }
});