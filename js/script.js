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

   

//modal

let modalTrigger = document.querySelectorAll('[data-modal]'),
    modalclose = document.querySelector('[data-close]'),
    modal = document.querySelector('.modal');

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalclose.addEventListener('click',closeModal);
       
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
        if(event.target === modal){
           closeModal();
        }
    });

    
    document.addEventListener('keydown', (event)=>{
        if(event.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    let modalTimerId = setTimeout(openModal,3000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll',showModalByScroll);
        }
    }
    window.addEventListener('scroll',showModalByScroll);



});