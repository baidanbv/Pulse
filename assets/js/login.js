import { Modal } from './modal.js';
const loginBtn = document.querySelector("#userSingIn");
const formUser = document.querySelector(".userInfo");
const modalUser = document.querySelector("#loginUser");
const createVisit = document.getElementById('btnVisit');
const appointmentModal = document.querySelector("#appointmentModal");
const users = [
    { email: "aa@a.a", pass: "a" }
];

const modalInstance = new Modal('openModalButton', 'loginUser', 'btn-close', 'errorUser');

appointmentModal.addEventListener("click", () => {
    modalInstance.open();
});

formUser.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("userSingIn")){
        loginUser();
    }
});

function createBtnExit() {
  const btnExit = document.createElement('div');
  btnExit.innerHTML = ` <button
      class="btn btn-danger"
      id="btnExit"
      type="button"
    >
    Exit
    </button>`;
  const navbar = document.querySelector('.header__buttons');
  navbar.appendChild(btnExit);
  btnExit.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
  });
}

function createBtnVisit() {
    loginBtn.classList.add('hide');
    createVisit.classList.remove('none');
}


window.addEventListener("load", () => {
    const userInLocal = localStorage.getItem("user");
    const homePage = document.querySelector(".homePage");
    const homePageOpen = document.querySelector(".homePage-open");
    const headerImg = document.querySelector(".header__img");
    const signInButton = document.querySelector(".header__buttons-Sign-in");
    const wrapper = document.querySelector(".wrapper");

    if (userInLocal) {
        homePage.style.display = "none";
        homePageOpen.style.display = "block";
        signInButton.style.display = "none";
        headerImg.style.display = "none";
        wrapper.style.overflow = "visible";

        console.log("User is logged in");
    } else {
        homePage.style.display = "block";
        homePageOpen.style.display = "none";
        signInButton.style.display = "block";
        headerImg.style.display = "block";
        wrapper.style.overflow = "hidden";

        console.log("User is not logged in");
    }
});

function loginUser() {
    const userEmail = document.querySelector("#userEmail").value;
    const userPassword = document.querySelector("#userPassword").value;
    const errorUser = document.querySelector("#errorUser");

  const user = users.find(function (user) {
    return user.email === userEmail && user.pass === userPassword;
  });

    if (user) {
        formUser.reset();

        const homePage = document.querySelector(".homePage");
        const homePageOpen = document.querySelector(".homePage-open");
        const headerImg = document.querySelector(".header__img");
        homePage.style.display = "none";
        homePageOpen.style.display = "block";
        headerImg.style.display = "none";

        localStorage.setItem("user", user.email);
        const modal = document.querySelector("#loginUser");
        modal.style.display = "none";
        modalInstance.close();

        setToken();
        location.reload();
    } else {
        console.log("eroorrrr");
        errorUser.style.display = 'block';
        const headerImg = document.querySelector(".header__img");
        headerImg.style.display = "block";
    }
}

function setToken() {
    const userInLocal = localStorage.getItem("user");
    let token;
    if (userInLocal === "aa@a.a") {
        token = "0c5db2cb-8a4b-418d-bfc9-ae9610270430";
        createBtnVisit();
        createBtnExit();
    }
    localStorage.setItem("token", token);
}

window.addEventListener('load', () => {
  setToken();
});