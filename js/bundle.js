/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function calc (){
    // Calc

    const result = document.querySelector('.calculating__result span');
    let height, weight, age, sex , ratio ;

    if (localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSetting(selector,activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }else{
                if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                    elem.classList.add(activeClass);
                }
            }
        });
    }

    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div','calculating__choose-item_active');

    function calcTotal (){
        
        if(!height || !weight || !age || !sex || !ratio){
            result.textContent = `____`;
            return;
        }else{
            if(sex === 'female'){
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }else{
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))* ratio);
            } 
        }
    }

    calcTotal();

    function getStaticInformation (selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach( el =>{
            el.addEventListener('click', (e)=>{
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
                }else{
                    sex =e.target.getAttribute('id');
                    localStorage.setItem('sex',e.target.getAttribute('id'));
                }

                elements.forEach((el)=>{
                    el.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    
        
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input',(e)=>{
            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')){
                case 'height' :
                    height = +input.value;
                    break;
                case 'weight' :
                    weight = +input.value;
                    break;
                case 'age' :
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}
module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 90:0-14 */
/***/ ((module) => {

function cards (){
     // Используем классы для карточек 

    class MenuCard{
        constructor(src,alt,title,descr,price,parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }
        
        render(){
            const element = document.createElement('div');
            
            if (this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({img,altimg,title,descr,price})=>{
    //                 new MenuCard(img,altimg,title,descr,price,'.menu .container').render();
    //     });
    // });

    let getResource = async(url) => {
        let res = await fetch(url);

        if(!res.ok){
           throw new Error(` Can't answer from server: url: ${url} , status: ${res.status}`);
        }
        return await res.json();
    };

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img,altimg,title,descr,price})=>{
            new MenuCard(img,altimg,title,descr,price,'.menu .container').render();
        });
        
    });

    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard (data){
    //     data.forEach(({img,altimg,title,descr,price})=>{
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src="${img}" alt="${altimg}">
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });        
    // }
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function forms (){
    // Forms
    // в формате JSON
    const forms = document.querySelectorAll('form');        
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item=>{
        bindPostData(item);
    });

    let postData = async(url,data) => {
        let res = await fetch(url,{
            method : "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            
            postData('http://localhost:3000/requests', json)
            .then(data=>{
                console.log(data);
                showThangsModal(message.success);
                statusMessage.remove();
            }).catch(()=>{
                showThangsModal(message.failure);
                statusMessage.remove();
            }).finally(()=>{
                form.reset();
            });
        });
    }

    function showThangsModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal();

        const modalThanks = document.createElement('div');
        modalThanks.classList.add('modal__dialog');
        modalThanks.innerHTML = `
            <div class = "modal__content">
                <div class = "modal__close" data-close>&times;</div>
                <div class ="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(modalThanks);
        setTimeout(()=>{
            modalThanks.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        },4000);        
    }   

    // fetch ('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

}
module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function modal (){
    // modal

    let modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

        function closeModal(){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        
        function openModal(){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        }      

        modalTrigger.forEach((item,i)=>{
            item.addEventListener('click',openModal);
        });

        modal.addEventListener('click', (event)=>{
            if(event.target === modal || event.target.getAttribute('data-close')== ""){
            closeModal();
            }
        });

        
        document.addEventListener('keydown', (event)=>{
            if(event.code === "Escape" && modal.classList.contains('show')){
                closeModal();
            }
        });

        // let modalTimerId = setTimeout(openModal,3000);

        function showModalByScroll(){
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                openModal();
                window.removeEventListener('scroll',showModalByScroll);
            }
        }
        window.addEventListener('scroll',showModalByScroll);
}
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function slider (){
    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    btnNext = document.querySelector('.offer__slider-next'),
    btnPrev = document.querySelector('.offer__slider-prev'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1,
    offset = 0;

    if(slides.length < 10){
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
    }else{
    total.textContent = `${slides.length}`;
    current.textContent = `${slideIndex.length}`;
    }


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide =>{
    slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
    dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i = 0; i<slides.length; i++ ){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to',i+1);
    dot.classList.add('dot');

    if(i == 0){
    dot.style.opacity = 1;
    }

    dots.push(dot);
    indicators.append(dot);

    }

    function dotsOpacity(slideIndex){
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1; 
    }

    function currentValue(slideIndex){
    if (slides.length <10){
    current.textContent = `0${slideIndex}`;
    }else{
    current.textContent = `${slideIndex}`;
    }
    }

    function deleteNotDigits(string){
    return +string.replace(/\D/g,'');
    }

    btnNext.addEventListener('click', ()=>{
    if (offset == deleteNotDigits(width)*(slides.length - 1)){
    offset = 0;
    }else {
    offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length){
    slideIndex = 1;
    }else{
    slideIndex++;
    }

    currentValue(slideIndex);
    dotsOpacity(slideIndex);      
    });

    btnPrev.addEventListener('click', ()=>{
    if (offset == 0){
    offset = deleteNotDigits(width)*(slides.length - 1);
    }else {
    offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1){
    slideIndex = slides.length;
    }else{
    slideIndex--;
    }

    currentValue(slideIndex);
    dotsOpacity(slideIndex);    
    });

    dots.forEach(dot=>{
    dot.addEventListener('click',(e)=>{
    const slideTo = e.target.getAttribute('data-slide-to');

    slideIndex = slideTo;
    offset = deleteNotDigits(width)*(slideTo - 1);

    slidesField.style.transform = `translateX(-${offset}px)`;

    currentValue(slideIndex);
    dotsOpacity(slideIndex);   
    });
    });
}
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function tabs (){
    //Tabs
    const tabContent = document.querySelectorAll('.tabcontent'),
    tabParent = document.querySelector('.tabheader__items'),
    tabItem = document.querySelectorAll('.tabheader__item');

    function hideTab(){

    tabContent.forEach((item)=>{
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabItem.forEach((item)=>{
        item.classList.remove('tabheader__item_active');
    });
    
    }

    function showTab(i = 0){
    tabContent[i].classList.add('show','fade');
    tabContent[i].classList.remove('hide');
    tabItem[i].classList.add('tabheader__item_active');
    }



    hideTab();
    showTab();

    tabParent.addEventListener('click', (event)=>{
        let target = event.target;
        if (target && target.classList.contains('tabheader__item')){
            tabItem.forEach((item,i)=>{
                if(target == item){
                    hideTab();
                    showTab(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function timer (){
     // Timer
    
     const deadline = '2020-11-03';

     function getTimeRemaining(endtime){
         let t = Date.parse(endtime) - Date.parse(new Date()),
             days = Math.floor((t/(1000*60*60*24)) ),
             hours = Math.floor( (t/(1000*60*60)%24) ),
             minutes = Math.floor( (t/1000/60)%60),
             seconds = Math.floor( (t/1000)%60 );
 
         return{
             'total' : t,
             'days': days,
             'hours': hours,
             'minutes': minutes,
             'seconds': seconds
         };
     }
 
     function getZero(num){
         if (num >=0 && num<10){
             return `0${num}`;
         }else{
             return num;
         }
     }
 
     function setClock(selector, endtime){
         const timer = document.querySelector(selector),
               days = timer.querySelector('#days'),
               hours = timer.querySelector('#hours'),
               minutes = timer.querySelector('#minutes'),
               seconds = timer.querySelector('#seconds'),
               interval = setInterval(updateClock,1000);
               
         updateClock();
 
         function updateClock(){
             const t = getTimeRemaining(endtime);
 
             days.innerHTML = getZero(t.days);
             hours.innerHTML = getZero(t.hours);
             minutes.innerHTML = getZero(t.minutes);
             seconds.innerHTML = getZero(t.seconds);
 
             if (t.total <= 0){
                 clearInterval(interval);
             }
         }        
             
     }
 
     setClock('.timer',deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
window.addEventListener('DOMContentLoaded',()=>{
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards= __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc= __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms= __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider= __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
          
    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map