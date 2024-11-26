"use strict"

document.addEventListener('DOMContentLoaded', function () {
   const mainSwiper = new Swiper('.banner__swiper', {
      direction: 'horizontal',
      loop: true,
      autoplay: true,
      delay: 2000,
      spaceBetween: 30,
      speed: 2000,
      allowTouchMove: false,
   });

   const productsSwiper = new Swiper('.products__swiper', {
      direction: 'horizontal',
      loop: false,
      spaceBetween: 20,
      speed: 1000,
      breakpoints: {
         378: {
            slidesPerView: 1,
         },
         425: {
            slidesPerView: 1.5,
         },
         600: {
            slidesPerView: 2,
         },
         768: {
            slidesPerView: 3,
         },
         900: {
            slidesPerView: 4,
         }
      },
      navigation: {
         nextEl: '.swiper-products__btn-next',
         prevEl: '.swiper-products__btn-prev',
      },
   });

   // !inputmask
   var elementPhone = document.querySelectorAll('.phone-form');
   var maskOptionsPhone = {
      mask: '+7(000)000-00-00',
      lazy: true
   }

   elementPhone.forEach(i => {
      var maskPhone = new IMask(i, maskOptionsPhone);
   });


   var elementEmail = document.getElementById('email');
   var maskOptionsEmail = {
      mask: function (value) {
         if (/^[a-z0-9_\.-]+$/.test(value))
            return true;
         if (/^[a-z0-9_\.-]+@$/.test(value))
            return true;
         if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value))
            return true;
         if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value))
            return true;
         if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value))
            return true;
         if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
            return true;
         if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
            return true;
         return false;
      },
      lazy: false
   }
   var maskEmail = new IMask(elementEmail, maskOptionsEmail);
   // !modal

   const openModalButtons = document.querySelectorAll('.open-modal');

   const closeModalButtons = document.querySelectorAll('.modal__close');

   function openModal(modalId, modalText, modalTitle) {
      const modal = document.getElementById(modalId);
      if (modal) {
         modal.classList.add('open');
         document.querySelector('.modal__text').textContent = modalText;
         document.querySelector('.modal__title-product').textContent = modalTitle;
      }
   }

   function closeModalAll() {
      document.querySelectorAll('.modal').forEach(i => {
         i.classList.remove('open');
      });
   }

   function closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
         modal.classList.remove('open');
      }
   }

   openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
         const modalId = button.getAttribute('data-modal');
         const modalTitle = button.getAttribute('data-title');
         const modalText = button.getAttribute('data-description');
         openModal(modalId, modalText, modalTitle)
      });
   });

   closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
         const modalId = button.getAttribute('data-modal');
         closeModal(modalId);
      });
   });

   // window.onclick = function (event) {
   //    const modals = document.querySelectorAll('.modal');
   //    modals.forEach(modal => {
   //       if (event.target === modal) {
   //          closeModal(modal.id);
   //       }
   //    });
   // };

   // !sendMail

   const form = document.querySelectorAll('.form');

   form.forEach(i => {
      i.addEventListener('submit', formSend);
   });

   let formData = new formData(form);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      if (error === 0) {
         closeModalAll();
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         if (response.ok) {
            alert('Успешно');
            let result = await response.json();
            alert(result.message);
            formPreview.innerHTML = '';
            form.reset();
         } else {
            alert('ошибка');
         }
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);

         if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
            formAddError(input);
            error++;
         } else if (input.value === '') {
            formAddError(input);
            error++;
         } else if (input.getAttribute('type') === 'tel' && input.value.length < 16) {
            formAddError(input);
            error++;
         }
      }

      return error;
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }

   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
});


// !menu-burger 

const burgerOpen = document.querySelector('.header__burger-menu');

burgerOpen.addEventListener('click', () => {
   if (!burgerOpen.classList.contains('_active')) {
      burgerOpen.classList.add('_active');
      document.querySelector('.mobal-menu').classList.add('_active');
   } else {
      burgerOpen.classList.remove('_active');
      document.querySelector('.mobal-menu').classList.remove('_active');
   }
});

const headerLinks = document.querySelectorAll('.mobal-menu__link');

headerLinks.forEach(link => {
   link.addEventListener('click', () => {
      burgerOpen.classList.remove('_active');
      document.querySelector('.mobal-menu').classList.remove('_active');
   })
});

