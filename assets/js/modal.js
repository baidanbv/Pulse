export class Modal {
  constructor(openButtonId, modalId, closeButtonClass) {
    this.openButton = document.getElementById(openButtonId);
    this.modal = document.getElementById(modalId);
    this.closeButton = document.querySelector(`.${closeButtonClass}`);
    this.modalContent = document.querySelector('.modal-dialog');
    this.body = document.body;
    this.openButton.addEventListener('click', this.open.bind(this));
    this.closeButton.addEventListener('click', this.close.bind(this));
    this.createVisitButton = document.getElementById('createVisit');
    this.editVisitButton = document.getElementById('editVisit');
    this.selectedValue = document.querySelector('.select-doctor');
    document.addEventListener('click', this.clickOutside.bind(this));
  }

  open() {
    this.modal.style.display = 'block';
    this.body.classList.add('modal-opened');
  }

  close() {
    this.modal.style.display = 'none';
    this.body.classList.remove('modal-opened');
    this.clearFieldsOnClose();
    this.closeEdit()
  }

  closeEdit(){
    this.modal.style.display = 'none';
    this.body.classList.remove('modal-opened');
    this.selectedValue.style.display = "block"
    this.createVisitButton.style.display = 'initial'
    this.editVisitButton.style.display = 'none'
  }

  clickOutside(event) {
    if (this.modal.style.display === 'block' && 
        event.target === this.modal && 
        !this.modalContent.contains(event.target)) {
      this.close();
      this.clearFieldsOnClose();
      this.closeEdit()
    }
  }

  clearFieldsOnClose() {
    const emailField = document.querySelector(".form-email");
    const passwordField = document.querySelector("#userPassword");
    const errorUser = document.querySelector("#errorUser");

    emailField.value = '';
    passwordField.value = '';
    errorUser.style.display = 'none';
  }
}
