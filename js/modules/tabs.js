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