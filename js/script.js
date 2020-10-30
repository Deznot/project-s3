/*
1) Написать функцию которая будет скрывать ненужные нам табы
2) показать нужный таб
3)назначить обработчики событий на меню которое будет манипулировать функциями
*/


window.addEventListener('DOMContentLoaded',()=>{
    // Tabs
    const tabContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items'),
          tabItem = document.querySelectorAll('.tabheader__item');

//    console.log(tabItem);
    
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
            // console.log(event.target)
            if (target && target.classList.contains('tabheader__item')){
                tabItem.forEach((item,i)=>{
                    if(target == item){
                        hideTab();
                        showTab(i);
                    }
                });
            }
        });
    





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

// modal

let modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

       
    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        '.menu .container',
        'menu__item',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню “Постное”',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        9,
        '.menu .container',
        'menu__item'
    ).render();


    // Forms

    // в формате JSON
    const forms = document.querySelectorAll('form');        
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item=>{
        postData(item);
    });

    function postData(form){
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

            const object = {};

            formData.forEach(function(value,key){
                object[key] = value;
            });

            
            fetch('server.php',{
                method : "POST",
                headers : {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(object),

            }).then(data => data.text())
            .then((data)=>{
                console.log(data);
                showThangsModal(message.success);
                statusMessage.remove();
            }).catch(()=>{
                showThangsModal(message.failure);
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


// const forms = document.querySelectorAll('form');
// const message = {
//     'loading' : 'img/form/spinner.svg',
//     'success' : 'Спасибо, скоро мы с вами свяжемся',
//     'failure' : 'Что-то пошло не так ...'
// };

// forms.forEach((item)=>{
//     postModal(item);
// });

// function postModal(form){
//     form.addEventListener('submit', (e)=>{
//         e.preventDefault();

//         const statusMessage = document.createElement('img');
//               statusMessage.src = message.loading;
//               statusMessage.style.cssText = `
//                 display: block;
//                 margin: 0 auto;
//               `;
//         form.insertAdjacentElement('afterend', statusMessage);
//         const formData = new FormData(form);
        
//         fetch('server.php',{
//             method: "POST",
//             body : formData
//         }).then(data=>data.text())
//         .then(data =>{
//             console.log(data);
//             showThanksModal(message.success);
//             statusMessage.remove();
//         }).catch(()=>{
//             showThanksModal(message.failure);
//         }).finally(()=>{
//             form.reset();
//         });
//     });
// }

// function showThanksModal(message){
//     const prevModalDialog = document.querySelector('.modal__dialog');

//     prevModalDialog.classList.add('hide');
//     prevModalDialog.classList.remove('show');
//     openModal();

//     const ThanksModal = document.createElement('div');
//           ThanksModal.classList.add('modal__dialog');
//           ThanksModal.innerHTML = `
//           <div class="modal__content">
//             <div data-close class="modal__close">&times;</div>
//             <div class="modal__title">${message}</div>
//           </div>
//           `;
          
//           document.querySelector('.modal').append(ThanksModal);

//     setTimeout(()=>{
//         ThanksModal.remove();
//         prevModalDialog.classList.add('show');
//         prevModalDialog.classList.remove('hide');
//         closeModal();
//     },4000);

// }




});
