console.log("hola");
window.addEventListener('load', function () {
    const formLogin = document.getElementById('form-login');

    const manageError = (container, message, condition) => {
        if (condition) {
            container.innerHTML = '<div class="errors"><p>' + message + '</p></div>'
        } else {
            container.innerHTML = ''
        }
    };
    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = document.getElementById("login-email");
        const emailErrorContainer = document.getElementById("error_msg-email");
        const passwordInput = document.getElementById("login-password");
        const passwordErrorContainer = document.getElementById("error_msg-password");
        console.log(emailInput.value);
        const errors = [];
        
        if (emailInput.value == "") {
            errors.push("Ingrese su correo electrónico")
            manageError(emailErrorContainer, errors[errors.length - 1], emailInput.value == "")
        } else if (!emailInput.value.includes("@")) {
            errors.push("Ingrese un email válido Juan@gmail.com")
            manageError(emailErrorContainer, errors[errors.length - 1], !emailInput.value.includes("@"))
        } else {
            manageError(emailErrorContainer, "", false)
        };

        
        if (passwordInput.value == "") {
            errors.push("Escriba su contraseña")
            manageError(passwordErrorContainer, errors[errors.length - 1], passwordInput.value == "")
        } else {
            manageError(passwordErrorContainer, "", false)
        };

        if (errors.length === 0) {
            this.submit()
        }

    });
});


