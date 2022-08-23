"use strict";

window.addEventListener('DOMContentLoaded', function(){

    //Read More

    let read = document.querySelector('.read_more');
    let btn = document.querySelector('.read');
    let close = document.querySelector('.close');
    let button = document.querySelector('.button');

    read.style.display = 'none';

    btn.addEventListener('click', () => {
       read.style.display = 'block';
    });

    close.addEventListener('click', () => {
        read.style.display = 'none';
    });


    let btnAnimation;
    btnAnimation = button.animate([
        {transform: 'translateX(0)'},
        {transform: 'translateX(5px)'},
        {transform: 'translateX(-5px)'},
        {transform: 'translateX(0)'}
    ],{
        duration: 1000,
        iterations: Infinity,
    });

    btn.addEventListener('click', () => {
        btnAnimation.pause();
    });

    //Read More Orange

    let readOrange = document.querySelector('.read_more_orange');
    let btnOrange = document.querySelector('.button_black_orange');
    let closeOrange = document.querySelector('.close_orange');
    let orangeBtn = document.querySelector('.btn_black_orange');

    readOrange.style.display = 'none';

    btnOrange.addEventListener('click', () => {
       readOrange.style.display = 'block';
    });

    closeOrange.addEventListener('click', () => {
        readOrange.style.display = 'none';
    });

    let btnAnimationOrange;
    btnAnimationOrange = btnOrange.animate([
        {transform: 'translateX(0)'},
        {transform: 'translateX(5px)'},
        {transform: 'translateX(-5px)'},
        {transform: 'translateX(0)'}
    ],{
        duration: 1100,
        iterations: Infinity,
    });

    orangeBtn.addEventListener('click', () => {
        btnAnimationOrange.pause();
    });

    //Address

    let btnAddress = document.querySelector('.btn_address');
    let closeAddress = document.querySelector('.close_address');
    let readAddress = document.querySelector('.read_more_address');
    let buttonAnimationAddress = document.querySelector('.button_address')

    readAddress.style.display = 'none';

    btnAddress.addEventListener('click', () => {
       readAddress.style.display = 'block';
    });

    closeAddress.addEventListener('click', () => {
        readAddress.style.display = 'none';
    });

    let btnAnimationAddress;
    btnAnimationAddress = buttonAnimationAddress.animate([
        {transform: 'translateX(0)'},
        {transform: 'translateX(5px)'},
        {transform: 'translateX(-5px)'},
        {transform: 'translateX(0)'}
    ],{
        duration: 1100,
        iterations: Infinity,
    });

    btnAddress.addEventListener('click', () => {
        btnAnimationAddress.pause();
    });

    //Modal

    let buttonModal = document.querySelector('.button_modal');
    let modalTel = document.querySelector('.modal___tel');
    let closeModal = document.querySelector('.close_modal');


    modalTel.style.display = 'none';

    buttonModal.addEventListener('click', () => {
       modalTel.style.display = 'block';
       readAddress.style.display = 'none';
    });

    closeModal.addEventListener('click', () => {
        modalTel.style.display = 'none';
    });

    //Form

    let formInput = document.querySelectorAll('form');

    let message = {
        loading: 'Загрузка',
        //loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    formInput.forEach(item => {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (event) => {
           event.preventDefault();//отменяю стандартное поведение браузера-нет перезагрузки сайта

           let statusMessage = document.createElement('div');
           statusMessage.classList.add('status');
           statusMessage.textContent = message.loading;
           form.append(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json')
            let formDate = new FormData(form);

            let object = {};
            formDate.forEach(function (value, key){
               object[key] = value;
            });
            let objJson = JSON.stringify(object);

            //let jsonData = JSON.stringify(Object.fromEntries(formDate.entries()));

            request.send(objJson);

            request.addEventListener('load', () => { //отслеживаю конечную загрузку запроса
                if (request.status === 200){
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset(); //збрасываем форму
                    statusMessage.remove();
                }   else {
                    showThanksModal(message.failure);
                    form.reset(); //збрасываем форму
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                }
            });
        });
    }

    //Оповещение

    function showThanksModal(message){
        let modalCloseForm = document.querySelector('.modal___tel');

        modalCloseForm.classList.add('hide');

        let thanksModal = document.createElement('div');
        thanksModal.classList.add('modal___tel');
        thanksModal.innerHTML = `
        <div class="modal_dialog">
            <div class="close_modal">&times;</div>
            <div class="modal_div">${message}</div>
            <div class="expect">Ожидайте</div>
        </div>
        `;

        document.querySelector('.modal_tel').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalTel.classList.add('.show');
            modalTel.classList.remove('.hide');
            modalTel.style.display = 'none';
            //document.body.style.overflow = '';
        }, 1500);
    }

});