const deepSelect = document.querySelector('.form__select-menu--deep');
let selectedValue = document.querySelector('.select-doctor');
const fieldsCardiologist = document.getElementById('fields__cardiologist');
const fieldsDentist = document.getElementById('fields__dentist');
const fieldsTherapist = document.getElementById('fields__therapist');
let urgentlyValue = document.querySelector('.urgently');
const urgentlyDeepMenu = document.querySelector('.urgently-deep-menu');
let statusValue = document.querySelector('.status');
const statusDeepMenu = document.querySelector('.status-deep-menu');
const date = document.getElementById('date');
export class Visit {
  constructor(doctor, fullName, goalVisit, shotDescVisit, urgency, status) {
    this.doctor = doctor;
    this.fullName = fullName;
    this.goalVisit = goalVisit;
    this.shotDescVisit = shotDescVisit;
    this.urgency = urgency;
    this.status = status;

    // this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target !== deepSelect && e.target !== selectedValue) {
        selectedValue.classList.remove('rotate');
        deepSelect.classList.remove('show');
      }
      if (e.target !== urgentlyDeepMenu && e.target !== urgentlyValue) {
        urgentlyValue.classList.remove('rotate');
        urgentlyDeepMenu.classList.remove('show');
      }
      if (e.target !== statusDeepMenu && e.target !== statusValue) {
        statusValue.classList.remove('rotate');
        statusDeepMenu.classList.remove('show');
      }
    });
    selectedValue.addEventListener('click', () => {
      this.toggleSelectMenu(deepSelect);
      if (selectedValue.classList.contains('rotate')) {
        selectedValue.classList.remove('rotate');
      } else {
        selectedValue.classList.add('rotate');
      }
    });
    urgentlyValue.addEventListener('click', () => {
      this.toggleSelectMenu(urgentlyDeepMenu);
      if (urgentlyValue.classList.contains('rotate')) {
        urgentlyValue.classList.remove('rotate');
      } else {
        urgentlyValue.classList.add('rotate');
      }
    });
    statusValue.addEventListener('click', () => {
      this.toggleSelectMenu(statusDeepMenu);
      if (statusValue.classList.contains('rotate')) {
        statusValue.classList.remove('rotate');
      } else {
        statusValue.classList.add('rotate');
      }
    });

    deepSelect
      .querySelectorAll('.form__select-menu--deep li')
      .forEach((item) => {
        item.addEventListener('click', () => this.handleDoctorSelect(item));
      });

    urgentlyDeepMenu
      .querySelectorAll('.urgently-deep-menu li')
      .forEach((item) => {
        item.addEventListener('click', () => this.handleUrgentlySelect(item));
      });
    statusDeepMenu.querySelectorAll('.status-deep-menu li').forEach((item) => {
      item.addEventListener('click', () => this.handleStatusSelect(item));
    });

    date.addEventListener('change', () => {
      const today = new Date();
      let currentDate = new Date(date.value);

      const labelDate = document.getElementById('label-date');

      if (currentDate > today) {
        labelDate.textContent = 'The selected date has not yet arrived.';
        date.value = today.toISOString().split('T')[0];
      } else {
        labelDate.textContent = 'Date of last visit';
      }
    });
  }

  toggleSelectMenu(menu) {
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
    } else {
      menu.classList.add('show');
    }

  }

  handleDoctorSelect(item) {
    selectedValue.innerText = item.dataset.doctor;
    fieldsCardiologist.classList.add('visible');
    fieldsDentist.classList.add('visible');
    fieldsTherapist.classList.add('visible');
    if (selectedValue.textContent !== 'Choose a doctor') {
      selectedValue.classList.remove('error');
    }
    switch (item.dataset.doctor) {
      case 'no-doctor-select':
        selectedValue.innerText = 'Choose a doctor';
        fieldsCardiologist.classList.add('visible');
        fieldsDentist.classList.add('visible');
        fieldsTherapist.classList.add('visible');
        break;
      case 'Cardiologist':
        fieldsCardiologist.classList.remove('visible');
        break;
      case 'Dentist':
        fieldsDentist.classList.remove('visible');
        break;
      case 'Therapist':
        fieldsTherapist.classList.remove('visible');
        break;
    }
    this.toggleSelectMenu(deepSelect);
    selectedValue.classList.toggle('rotate');
  }

  handleUrgentlySelect(item) {
    urgentlyValue.innerText = item.textContent;
    this.toggleSelectMenu(urgentlyDeepMenu);
    urgentlyValue.classList.toggle('rotate');
    if (urgentlyValue.textContent !== 'Urgently') {
      urgentlyValue.classList.remove('error');
    }
  }
  handleStatusSelect(item) {
    statusValue.innerText = item.textContent;
    this.toggleSelectMenu(statusDeepMenu);
    statusValue.classList.toggle('rotate');
    if (statusValue.textContent !== 'Status') {
      statusValue.classList.remove('error');
    }
  }
}

export class VisitCardiologist extends Visit {
  constructor(
    doctor,
    fullName,
    goalVisit,
    shotDescVisit,
    urgency,
    status,
    pressure,
    massIndex,
    heartSystem,
    age
  ) {
    super(doctor, fullName, goalVisit, shotDescVisit, urgency, status);
    this.doctor = doctor;
    this.fullName = fullName;
    this.goalVisit = goalVisit;
    this.shotDescVisit = shotDescVisit;
    this.urgency = urgency;
    this.status = status;
    this.pressure = pressure;
    this.massIndex = massIndex;
    this.heartSystem = heartSystem;
    this.age = age;
  }
}
export class VisitDentist extends Visit {
  constructor(
    doctor,
    fullName,
    goalVisit,
    shotDescVisit,
    urgency,
    status,
    date
  ) {
    super(doctor, fullName, goalVisit, shotDescVisit, urgency, status);
    this.doctor = doctor;
    this.fullName = fullName;
    this.goalVisit = goalVisit;
    this.shotDescVisit = shotDescVisit;
    this.urgency = urgency;
    this.status = status;
    this.date = date;
  }
}
export class VisitTherapist extends Visit {
  constructor(
    doctor,
    fullName,
    goalVisit,
    shotDescVisit,
    urgency,
    status,
    age
  ) {
    super(doctor, fullName, goalVisit, shotDescVisit, urgency, status);
    this.doctor = doctor;
    this.fullName = fullName;
    this.goalVisit = goalVisit;
    this.shotDescVisit = shotDescVisit;
    this.urgency = urgency;
    this.status = status;
    this.age = age;
  }
}
