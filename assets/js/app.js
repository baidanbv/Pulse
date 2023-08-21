import { AppointmentForm } from './appointmentForm.js';
import { Visit } from './createVisit.js';
import { Modal } from './modal.js';
document.addEventListener('DOMContentLoaded', function () {
  const modalInstance = new Modal('openModalButton', 'loginUser', 'btn-close');
  const createVisitForm = new AppointmentForm('btnVisit', 'loginUser', 'btn-close');
  const visit = new Visit();
  createVisitForm.renderCard()
  visit.addEventListeners()

  const mobileFilterBtn = document.querySelector('.filter-mobile');
  const mobileFilter = document.querySelector('.filter');
  const wrapperCards = document.querySelector('.cards');
  document.addEventListener('click', (e) => {
    if (e.target === mobileFilterBtn) {
      mobileFilter.classList.toggle('visible-filter');
      wrapperCards.classList.toggle('moved')
    } else if (!mobileFilter.contains(e.target)) {
      mobileFilter.classList.remove('visible-filter');
       wrapperCards.classList.remove('moved');
    }
  })

});