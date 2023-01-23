const form = document.getElementById("form")
const fullName = document.getElementById("fullName").value;
const documentNumber = document.getElementById("documentNumber").value;
const email = document.getElementById("email").value;
const phoneNumber = document.getElementById("phoneNumber").value;
const password = document.getElementById("password").value;


form.addEventListener("submit", e => {
    e.preventDefault();
});
