import {Modal} from './modal.js';
import {
    VisitCardiologist,
    VisitDentist,
    VisitTherapist,
} from './createVisit.js';
const cardsContainer = document.querySelector('.cards');
const currentFullName = document.getElementById('fullName');
const urgency = document.getElementById('urgently');
const status = document.getElementById('status');
export class AppointmentForm extends Modal {
    constructor(openButtonId, modalId, closeButtonClass) {
        super(openButtonId, modalId, closeButtonClass);
        this.formTitle = this.modal.querySelector('p');
        this.formLogin = this.modal.querySelector('.userInfo');
        this.formCreateVisit = this.modal.querySelector('.create-form-visit');
        this.selectedValue = document.querySelector('.select-doctor');
        this.fieldsCardiologist = document.getElementById('fields__cardiologist');
        this.fieldsDentist = document.getElementById('fields__dentist');
        this.fieldsTherapist = document.getElementById('fields__therapist');
        this.createVisitBtn = document.getElementById('createVisit');
        this.openButton.addEventListener('click', this.showAppointmentForm.bind(this));
        this.addAppointment();
    }

    showAppointmentForm() {
        this.formTitle.textContent = 'Create visit';
        this.formLogin.classList.add('none');
        this.formCreateVisit.classList.remove('none');
    }

    async addAppointment() {
        this.createVisitBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const selectedDoctor = this.selectedValue.textContent;
            const goal = document.getElementById('goal').value;
            const description = document.getElementById('desc').value;

            const fullName = document.getElementById('fullName').value;

            let visitCard;

            if (selectedDoctor === 'Cardiologist') {
                const pressure = document.getElementById('pressure').value;
                const massIndex = document.getElementById('massIndex').value;
                const heartSystem = document.getElementById('heartSystem').value;
                const age = document.getElementById('ageCardiologist').value;

                visitCard = new VisitCardiologist(
                    selectedDoctor,
                    fullName,
                    goal,
                    description,
                    urgency.textContent,
                    status.textContent,
                    pressure,
                    massIndex,
                    heartSystem,
                    age
                );
            } else if (selectedDoctor === 'Dentist') {
                const date = document.getElementById('date').value;

                visitCard = new VisitDentist(
                    selectedDoctor,
                    fullName,
                    goal,
                    description,
                    urgency.textContent,
                    status.textContent,
                    date
                );
            } else if (selectedDoctor === 'Therapist') {
                const age = document.getElementById('ageTherapist').value;
                visitCard = new VisitTherapist(
                    selectedDoctor,
                    fullName,
                    goal,
                    description,
                    urgency.textContent,
                    status.textContent,
                    age
                );
            }
            try {
                if (
                    fullName !== '' &&
                    selectedDoctor !== 'Choose a doctor' &&
                    urgency.textContent !== 'Urgently' &&
                    status.textContent !== 'Status'
                ) {
                    const token = '0c5db2cb-8a4b-418d-bfc9-ae9610270430';
                    const response = await fetch(
                        'https://ajax.test-danit.com/api/v2/cards',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(visitCard),
                        }
                    );

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    this.clearFields();
                    this.close();
                    this.renderCard();
                } else {
                    this.showErrorFields();
                }
            } catch (e) {
                console.log('Network response was not ok', e);
            }
        });
    }

    clearFields() {
        const allInputs = document.querySelectorAll(
            '.form input:not([type="submit"])'
        );
        allInputs.forEach((input) => (input.value = ''));

        this.selectedValue.textContent = 'Choose a doctor';
        this.selectedValue.classList.remove('error');
        currentFullName.placeholder = 'Full name';
        currentFullName.classList.remove('error');
        urgency.classList.remove('error');
        urgency.innerText = 'Urgently';
        status.classList.remove('error');
        status.innerText = 'Status';
    }

    showErrorFields() {
        if (currentFullName.value === '') {
            currentFullName.placeholder = 'this field required *';
            currentFullName.classList.add('error');
        }
        if (this.selectedValue.textContent === 'Choose a doctor') {
            this.selectedValue.classList.add('error');
        }
        if (urgency.textContent === 'Urgently') {
            urgency.classList.add('error');
        }
        if (status.textContent === 'Status') {
            status.classList.add('error');
        }
        currentFullName.addEventListener('change', () => {
            if (currentFullName.value !== '') {
                currentFullName.classList.remove('error');
            } else {
                currentFullName.placeholder = 'this field required *';
                currentFullName.classList.add('error');
            }
        });
    }

    open() {
        this.modal.style.display = 'block';
        this.body.classList.add('modal-opened');
        this.clearFields();
    }

    close() {
         this.modal.style.display = 'none';
         this.body.classList.remove('modal-opened');
         this.selectedValue.style.display = 'block';
         this.createVisitButton.style.display = 'initial';
         this.editVisitButton.style.display = 'none';
        this.clearFields();
    }

    async renderCard() {
        try {
            const token = '0c5db2cb-8a4b-418d-bfc9-ae9610270430';
            const response = await fetch(
                `https://ajax.test-danit.com/api/v2/cards/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const cards = await response.json();

            if (cards.length !== 0) {
                cardsContainer.innerHTML = '';
                cardsContainer.classList.add('columns');
            }
            if (cards.length === 0) {
                const noCards = document.querySelector('.noCards');
                noCards.classList.add('visible');
                cardsContainer.classList.remove('columns');
            }
            cards.forEach((card) => {
                const cardItem = document.createElement('div');
                cardItem.classList.add('cards__item-card', 'card');
                cardItem.setAttribute('data-card-id', card.id);//зберігати стан видимості елементів карток
                const cardDate = new Date(card.date);
                const day = String(cardDate.getDate()).padStart(2, '0');
                const month = String(cardDate.getMonth() + 1).padStart(2, '0');
                const year = cardDate.getFullYear();
                const formattedDate = `${day}.${month}.${year}`;
                cardItem.innerHTML = `<div class="card__doctor-img">
              <img src="assets/img/doctor.png" alt="doctor photo" />
            </div>
            <ul class="card__info">
              <li class="card__item-info card__item-info-type">
                <span class="info__key doctor-type">${card.doctor}</span
                ><span class="info__value doctor-name">Dmytro Ivanchenko</span>
              </li>
              <li class="card__item-info">
                <span class="info__key">Full name</span
                ><span class="info__value full-name">${card.fullName}</span>
              </li>
              <li class="card__item-info">
                <span class="info__key">Status</span
                ><span class="info__value status">${card.status}</span>
              </li>
              <li class="card__item-info">
                <span class="info__key">The purpose of the visit:</span
                ><span class="info__value">${card.goalVisit}</span>
              </li>
              <li class="card__item-info">
                <span class="info__key">Brief description of the visit</span
                ><span class="info__value"
                  >${card.shotDescVisit}</span
                >
              </li>
               <li class="card__item-info">
                <span class="info__key">Urgency</span
                ><span class="info__value urgency">${card.urgency}</span>
              </li>
              <li class="card__item-info">
                <span class="info__key">Normal pressure</span
                ><span class="info__value">${card.pressure}</span>
              </li>
              <li class="card__item-info">
                <span class="info__key">Body mass index</span
                ><span class="info__value">${card.massIndex}</span>
              </li>
              <li class="card__item-info">
                <span class="info__key"
                  >Transferred diseases cardiovascular system</span
                ><span class="info__value">${card.heartSystem}</span>
              </li>
              <li class="card__item-info">
                <span class="info__key">Age</span
                ><span class="info__value">${card.age}</span>
              </li>
              <li class="card__item-info ">
                <span class="info__key ">Last visit </span
                ><span class="info__value card__date">${formattedDate}</span>
              </li>
            </ul>
            <div class="button-container">
              <button class="hide-button">
                <div class="hide-button-text">
                  <p class="hide-button-title hide-button-show">Show</p>
                  <p class="hide-button-title hide-button-hide">Hide</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4.08 15.05L10.6 8.52999C11.37 7.75999 12.63 7.75999 13.4 8.52999L19.92 15.05" stroke="#052C2F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
              <button class="close-button">
              <svg enable-background="new 0 0 40 40" id="Слой_1" version="1.1" viewBox="0 0 40 40" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z"/></g><g><path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z"/></g><g><path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z"/></g><g><path d="M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z"/></g><g><path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z"/></g></svg>
              </button>
              <button class="edit-button">
                <div class="edit-button-text">
                  Edit
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M10.97 2H8.97C3.97 2 1.97 4 1.97 9V15C1.97 20 3.97 22 8.97 22H14.97C19.97 22 21.97 20 21.97 15V13" stroke="#052C2F" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M21.88 3.55998C20.65 6.62998 17.56 10.81 14.98 12.88L13.4 14.14C13.2 14.29 13 14.41 12.77 14.5C12.77 14.35 12.76 14.2 12.74 14.04C12.65 13.37 12.35 12.74 11.81 12.21C11.26 11.66 10.6 11.35 9.92 11.26C9.76 11.25 9.6 11.24 9.44 11.25C9.53 11 9.66 10.77 9.83 10.58L11.09 8.99998C13.16 6.41998 17.35 3.30998 20.41 2.07998C20.88 1.89998 21.34 2.03998 21.63 2.32998C21.93 2.62998 22.07 3.08998 21.88 3.55998Z" stroke="#052C2F" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.82 11.98C15.82 9.89 14.13 8.19 12.03 8.19M12.78 14.49C12.78 15.37 12.44 16.21 11.81 16.85C11.32 17.34 10.66 17.68 9.87 17.78L7.9 17.99C7.64694 18.017 7.39103 17.9869 7.15117 17.9018C6.9113 17.8168 6.69359 17.6789 6.51411 17.4985C6.33463 17.3181 6.19795 17.0996 6.11416 16.8593C6.03038 16.619 6.00161 16.3629 6.03 16.11L6.24 14.14C6.43 12.39 7.89 11.27 9.45 11.24C9.61 11.23 9.77 11.24 9.93 11.25C10.61 11.34 11.27 11.65 11.82 12.2C12.36 12.74 12.66 13.36 12.75 14.03C12.77 14.19 12.78 14.35 12.78 14.49Z" stroke="#052C2F" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                </button>
            </div>`;

                const closeButton = cardItem.querySelector('.close-button');
                closeButton.addEventListener('click', () => {
                    this.deleteAppointment(card, cardItem);
                    cardItem.remove();
                });

                const editButton = cardItem.querySelector('.edit-button');
                editButton.addEventListener('click', () => {
                    this.editAppointment(card, card.id);
                });

                const hideButton = cardItem.querySelector('.hide-button');
                hideButton.addEventListener('click', () => {
                    // cardItem.classList.toggle('card__item-hidden');
                    toggleCardVisibility(cardItem);//зберігати стан видимості елементів карток
                });

                const isHidden = localStorage.getItem(`card_${card.id}_hidden`);//зберігати стан видимості елементів карток
                if (isHidden === 'true') {
                    cardItem.classList.add('card__item-hidden');
                }
                this.filter(cardItem)
                cardsContainer.appendChild(cardItem);
                this.sortCardsDescendingOrder();
                this.checkRenderedCard();
            });

        } catch (e) {
            console.log(e.message);
        }
    }

  filter(cardItem) {

    const searchInput = document.getElementById('search-input');
    const doctorName = cardItem.querySelector('.doctor-name');
    const fullName = cardItem.querySelector('.full-name');
    const status = cardItem.querySelector('.status');
    const urgency = cardItem.querySelector('.urgency');
    const filterBar = document.querySelector('.filter');
    const statusOptions = document.querySelectorAll('.filter-options a');
    searchInput.addEventListener('input', () => {
      cardItem.classList.remove('none');
      if (doctorName.textContent.includes(searchInput.value) || fullName.textContent.includes(searchInput.value)) {
          cardItem.classList.remove('none')
      } else {
        cardItem.classList.add('none');
      }
    })
    filterBar.addEventListener('click', (e) => {
      statusOptions.forEach(option => option.classList.remove('active-option'))
      switch (e.target.textContent) {
        case 'Open':
          cardItem.classList.remove('none');
          e.target.classList.add('active-option');
          if (status.textContent !== 'Open') {
            cardItem.classList.add('none');
          }
          break;
        case 'Done':
          cardItem.classList.remove('none');
          e.target.classList.add('active-option');
          if (status.textContent !== 'Done') {
            cardItem.classList.add('none');
          }
          break;
        case 'All statuses':
          cardItem.classList.remove('none');
          break;
        case 'High':
          cardItem.classList.remove('none');
          e.target.classList.add('active-option');
          if (urgency.textContent !== 'High') {
            cardItem.classList.add('none');
          }
          break;
        case 'Normal':
          cardItem.classList.remove('none');
          e.target.classList.add('active-option');
          if (urgency.textContent !== 'Normal') {
            cardItem.classList.add('none');
          }
          break;
        case 'Low':
          cardItem.classList.remove('none');
          e.target.classList.add('active-option');
          if (urgency.textContent !== 'Low') {
            cardItem.classList.add('none');
          }
          break;
        case 'All urgency':
          cardItem.classList.remove('none');
          break;
      }
    })
   
    }
  
    checkRenderedCard() {
        const renderedCards = cardsContainer
            .querySelectorAll('.card')
            .forEach((card) => {
                const doctorImg = card.querySelector('img');
                const doctor = card.querySelector('.doctor-type');
                const doctorName = card.querySelector('.doctor-name');
                if (doctor.textContent === 'Dentist') {
                    doctorImg.src = 'assets/img/dentist.png';
                    doctorName.textContent = 'Alla Vincent';
                }
                if (doctor.textContent === 'Therapist') {
                    doctorImg.src = 'assets/img/therapist.png';
                    doctorName.textContent = 'Ivan Dytreko';
                }
            });

        const removeEmptyFields = document
            .querySelectorAll('.info__value')
            .forEach((item) => {
                if (item.textContent.includes('undefined')) {
                    item.parentElement.remove();
                }
            });
        const removeEmptyDate = document
            .querySelectorAll('.card__date')
            .forEach((item) => {
                if (item.textContent === 'NaN.NaN.NaN' || item.textContent === '') {
                    item.parentElement.remove();
                }
            });
        const checkStatus = document.querySelectorAll('.status').forEach((item) => {
            if (item.textContent === 'Open') {
                item.classList.add('status--open');
            } else if (
                item.textContent === 'Done' &&
                !item.classList.contains('status--done')
            ) {
                item.classList.add('status--done');
                const confirmIcon = document.createElement('img');
                confirmIcon.src = 'assets/img/icons/confirm.svg';
                item.appendChild(confirmIcon);
            }
        });
    }

    async deleteAppointment(card, cardItem) {
        const token = '0c5db2cb-8a4b-418d-bfc9-ae9610270430';
        try {
            const deleteResponse = fetch(
                `https://ajax.test-danit.com/api/v2/cards/${card.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then(response => {
                    checkRemainingCards();
                });
            if (!deleteResponse.ok) {
                throw new Error('Network response was not ok');
            }

        } catch (e) {
            console.log('Error deleting card:', e);
        }
    }

    sortCardsDescendingOrder() {
        const cards = Array.from(cardsContainer.querySelectorAll('.cards__item-card'));
        cards.sort((a, b) => {
            const idA = parseInt(a.getAttribute('data-card-id'));
            const idB = parseInt(b.getAttribute('data-card-id'));
            return idB - idA;
        });
        cardsContainer.innerHTML = '';
        cards.forEach(card => cardsContainer.appendChild(card));
    }

    async editAppointment(card, cardId) {
        const createVisitButton = document.getElementById('createVisit');
        const editVisitButton = document.getElementById('editVisit');
        const fieldsDentist = document.getElementById('fields__dentist');
        const fieldsTherapist = document.getElementById('fields__therapist');
        const fieldsCardiologist = document.getElementById('fields__cardiologist');
        let selectedValue = document.querySelector('.select-doctor');
        let fullName = document.getElementById('fullName');
        let goal = document.getElementById('goal');
        let description = document.getElementById('desc');
        let urgency = document.getElementById('urgently');
        const date = document.getElementById('date');
        const age = document.getElementById('ageTherapist');
        const pressure = document.getElementById('pressure');
        const massIndex = document.getElementById('massIndex');
        const heartSystem = document.getElementById('heartSystem');
        const ageCardio = document.getElementById('ageCardiologist');
        const status = document.getElementById('status');

        function showFields(elementToShow, ...elementsToHide) {
            elementToShow.classList.remove('visible');
            elementsToHide.forEach(element => element.classList.add('visible'));
        }

        function show(...elementToShow) {
            elementToShow.forEach(element => element.classList.remove('visible'));
        }

        function setElementValues(card) {
            fullName.value = card.fullName;
            goal.value = card.goalVisit;
            description.value = card.shotDescVisit;
            urgency.innerText = card.urgency;
            status.innerText = card.status;
        }

        function setupDoctorFields(card) {
            if (card.doctor === "Dentist") {
                showFields(fieldsDentist, fieldsCardiologist, fieldsTherapist);
                date.value = card.date;
            } else if (card.doctor === "Therapist") {
                showFields(fieldsTherapist, fieldsCardiologist, fieldsDentist);
                age.value = card.age;
            } else if (card.doctor === "Cardiologist") {
                showFields(fieldsCardiologist, fieldsDentist, fieldsTherapist);
                pressure.value = card.pressure;
                massIndex.value = card.massIndex;
                heartSystem.value = card.heartSystem;
                ageCardio.value = card.age;
            }
        }
        this.formTitle.innerText = 'Edit Visit'
        createVisitButton.style.display = 'none';
        editVisitButton.style.display = 'initial';

        this.formLogin.classList.add('none');
        this.formCreateVisit.classList.remove('none');
        this.open();

        selectedValue.style.display = "none";

        setElementValues(card);
        setupDoctorFields(card);

        editVisitButton.addEventListener('click', () => {
            const newName = fullName.value;
            const newGoal = goal.value;
            const newDescription = description.value;
            const newUrgency = urgency.innerText;
            const newDate = date.value;
            const newAge = age.value;
            const newPressure = pressure.value;
            const newMassIndex = massIndex.value;
            const newHeartSystem = heartSystem.value;
            const newAgeCardio = ageCardio.value;
            const newStatus = status.innerText;

            try {
                const apiUrl = `https://ajax.test-danit.com/api/v2/cards/${cardId}`;
                const token = '0c5db2cb-8a4b-418d-bfc9-ae9610270430';
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                };
                let requestBody = {
                    fullName: newName,
                    status: newStatus,
                    goalVisit: newGoal,
                    shotDescVisit: newDescription,
                    urgency: newUrgency,
                };

                if (card.doctor === "Dentist") {
                    requestBody.doctor = "Dentist";
                    requestBody.date = newDate;
                } else if (card.doctor === "Therapist") {
                    requestBody.doctor = "Therapist";
                    requestBody.age = newAge;
                } else if (card.doctor === "Cardiologist") {
                    requestBody.doctor = "Cardiologist";
                    requestBody.heartSystem = newHeartSystem;
                    requestBody.age = newAgeCardio;
                    requestBody.pressure = newPressure;
                    requestBody.massIndex = newMassIndex;
                }
                fetch(apiUrl, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(requestBody),
                })
                    .then(response => {
                        if (response.ok) {
                            this.renderCard();
                            cardId = '';
                        } else {
                            console.error('Ошибка при отправке данных:', response.status);
                        }
                    })
                    .catch(error => {
                        console.error('Произошла ошибка:', error);
                    });

                this.closeEdit()
                this.selectedValue.style.display = "block"
                this.createVisitButton.style.display = 'initial'
                this.editVisitButton.style.display = 'none'
            } catch (e) {
                console.log('Error updating card name:', e);
            }
        })
    }
}

function toggleCardVisibility(cardItem) {//зберігати стан видимості елементів карток
    cardItem.classList.toggle('card__item-hidden');
    const cardItemId = cardItem.getAttribute('data-card-id');
    const isHidden = cardItem.classList.contains('card__item-hidden');
    localStorage.setItem(`card_${cardItemId}_hidden`, isHidden.toString());
}

function checkRemainingCards() {
    const renderedCards = document.querySelectorAll('.cards__item-card');
    if (renderedCards.length === 0) {
        cardsContainer.innerHTML = `<div class="noCards visible">No items have been added</div>`;
        cardsContainer.classList.remove('columns');
    }

}