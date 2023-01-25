window.addEventListener('load', function () {
    const formulario = document.getElementById('form');


    const manageError = (container, message, condition) => {
        if (condition) {
            container.innerHTML = '<div class="errors"><p>' + message + '</p></div>'
        } else {
            container.innerHTML = ''
        }
    };
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        const userImageInput = document.getElementById("userImage");
        const userImageContainer = document.getElementById("error_msg-userImage");
        const nameInput = document.getElementById("fullName");
        const nameErrorContainer = document.getElementById("error_msg-fullName");
        const typeDocumentInput = document.getElementById("documentType");
        const typeDocumentErrorContainer = document.getElementById("error_msg-documentType");
        const documentNumberInput = document.getElementById("documentNumber");
        const documentNumberErrorContainer = document.getElementById("error_msg-documentNumber");
        const emailInput = document.getElementById("email");
        const emailErrorContainer = document.getElementById("error_msg-email");
        const phoneNumberInput = document.getElementById("phoneNumber");
        const phoneNumberErrorContainer = document.getElementById("error_msg-phoneNumber");
        const passwordInput = document.getElementById("password");
        const passwordErrorContainer = document.getElementById("error_msg-password");

        const errors = [];

        if (userImageInput.value != "") {
            const validFormatImages = [".png", ".jpeg", ".jpg", ".gif"];
            const isValidformat = validFormatImages.map((validFormatImage) => {
                return userImageInput.value.includes(validFormatImage)
            }).some(validation => validation === true)
            if (!isValidformat) {
                errors.push("Ingrese un archivo válido (.jpeg/.jpg/.png/.gif)")
            }
            manageError(userImageContainer, errors[errors.length - 1], !isValidformat);
        }

        if (nameInput.value == "") {
            errors.push("Ingrese su nombre")
            manageError(nameErrorContainer, errors[errors.length - 1], nameInput.value == "")
        } else if (nameInput.value.length < 2) {
            errors.push("Ingrese su nombre completo")
            manageError(nameErrorContainer, errors[errors.length - 1], nameInput.value.length < 2)
        } else {
            manageError(nameErrorContainer, "", false)
        };

        if (typeDocumentInput.value == "") {
            errors.push("Seleccione su tipo de documento")
        }
        manageError(typeDocumentErrorContainer, errors[errors.length - 1], typeDocumentInput.value == "");

        if (documentNumberInput.value == "") {
            errors.push("Ingrese su número de documento")
        }
        manageError(documentNumberErrorContainer, errors[errors.length - 1], documentNumberInput.value == "")

        if (emailInput.value == "") {
            errors.push("Ingrese su correo electrónico")
            manageError(emailErrorContainer, errors[errors.length - 1], emailInput.value == "")
        } else if (!emailInput.value.includes("@")) {
            errors.push("Ingrese un email válido Juan@gmail.com")
            manageError(emailErrorContainer, errors[errors.length - 1], !emailInput.value.includes("@"))
        } else {
            manageError(emailErrorContainer, "", false)
        };

        if (phoneNumberInput.value == "") {
            errors.push("Ingrese su número de teléfono")
        }
        manageError(phoneNumberErrorContainer, errors[errors.length - 1], phoneNumberInput.value == "")


        if (passwordInput.value == "") {
            errors.push("Defina su contraseña")
            manageError(passwordErrorContainer, errors[errors.length - 1], passwordInput.value == "")
        } else if (passwordInput.value.length < 5) {
            errors.push("Su contraseña debe tener más de 5 caracteres")
            manageError(passwordErrorContainer, errors[errors.length - 1], passwordInput.value.length < 5)
        } else {
            manageError(passwordErrorContainer, "", false)
        };

        if (errors.length === 0) {
            this.submit()
        }

    });
});


