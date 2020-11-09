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