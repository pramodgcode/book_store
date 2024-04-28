let email = document.getElementById("auth_email");
let password = document.getElementById("auth_password");

let errorMessage = document.getElementById("errorMessage");


/**
 * funtion for performing login and some checkups 
 */
function login() {
    errorMessage.innerHTML = "";
    email.style.border = "";

    if (validateEmail(email)) {
        errorMessage.innerHTML = "Invalid Email";
        email.style.border = "1px solid red";
        return false;
    }
    if (!validatePassword(password)) {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * funtion for performing signup and some checkups 
 */
function signUp() {
   
    email.style.border = "";

    let confirmPass = document.getElementById("confirmPass");
    let phone = document.getElementById("phone");
    phone.style.border = "";

    // debugger;
    if (!validatePhone(phone.value)) {
        phone.style.border = "5px solid red";
        return false;
    } else {
        phone.style.border = "5px solid green";
    }

    if (validateEmail(email)) {
        email.style.border = "5px solid red";
        return false;
    } else {
        email.style.border = "5px solid green";
    }
    if (!validatePassword(password)) {
        return false;
    }

    if (!passwordValidators.confirmPassword(password.value, confirmPass.value)) {
        return false;
    }


}

///////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * validation of email using rejex
 */
function validateEmail(email) {
    let regexp = /^([A-za-z0-9\.-]+)@([A-za-z0-9\-]+).([a-z]{2,3})(.[a-z]{2,3})?$/
    if (!regexp.test(email.value.trim())) {
        return true;
    }
}

function validatePassword(password) {
    let pwd = password.value
    if (passwordValidators.validateLength(pwd) === true) {
        return true;
    }

    if (passwordValidators.upperCaseCheck(pwd) === true) {
        return true;
    }

    if (passwordValidators.lowerCaseCheck(pwd)) {
        return true;
    }

    if (passwordValidators.numberCheck(pwd)) {
        return true;
    }

    return false;
}

function validatePhone(number) {
    let regexPattern = /^(\d{3}[-. ]?\d{3}[-. ]?\d{4}|\d{10})$/;
    if (regexPattern.test(number)) {
        return true; 
    } 
    return false;
}
/**
 * checking password strenght based on every conditions
 * => Min 8 chars
 */
function passwordStrength() {
    let psswd = password.value;
    let minChars = document.getElementById("min_chars");
    let upperCase = document.getElementById("one_upper_case");
    let lowerCase = document.getElementById("one_lower_case");
    let numberCheck = document.getElementById("one_number_check");

    // password min characters
    if (passwordValidators.validateLength(psswd)) {
        minChars.style.color = "green";
    } else {
        minChars.style.color = "red";
    }


    // upper case check
    if (passwordValidators.upperCaseCheck(psswd)) {
        upperCase.style.color = "green";
    } else {
        upperCase.style.color = "red";
    }

    // contains one lower case
    if (passwordValidators.lowerCaseCheck(psswd)) {
        lowerCase.style.color = "green";
    } else {
        lowerCase.style.color = "red";
    }

    // contains one lower case
    if (passwordValidators.numberCheck(psswd)) {
        numberCheck.style.color = "green";
    } else {
        numberCheck.style.color = "red";
    }

    // password status check
    if (passwordValidators.strenghtIndicator(password) == 1) {
        password.style.border = "5px solid red";
    } else if (passwordValidators.strenghtIndicator(password) == 2) {
        password.style.border = "5px solid orange";
    } else if (passwordValidators.strenghtIndicator(password) == 3) {
        password.style.border = "5px solid green";
    }
}

function validateConfirmPass() {
    let oldPass = password.value;
    let newPass = document.getElementById("confirmPass");

    if (passwordValidators.confirmPassword(oldPass, newPass.value)) {
        newPass.style.border = "5px dashed green";
    } else {
        newPass.style.border = "5px dashed red";
    }
}


// password object
let passwordValidators = {
    validateLength: function (password) {
        if (password.length >= 8) {
            return true;
        }
        return false;
    },
    upperCaseCheck: function (password) {
        if (/[A-Z]/.test(password)) {
            return true;
        }
        return false;
    },
    lowerCaseCheck: function (password) {
        if (/[a-z]/.test(password)) {
            return true;
        }
        return false;
    }, numberCheck: function (password) {
        if (/\d/.test(password)) {
            return true;
        }
        return false;
    }, strenghtIndicator: function (password) {
        let pwd_len = password.value.trim().length;
        // poor
        if (pwd_len < 2) {
            return 1;

            // medium
        } else if (pwd_len > 2 && pwd_len < 8) {
            return 2;

            // strong
        } else if (pwd_len >= 8) {
            return 3;
        }
    }, confirmPassword: function (oldPass, newPass) {
        if (oldPass != newPass) {
            return false;
        }
        return true
    }
}
