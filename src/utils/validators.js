import strings from '../i18n/strings';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const mobileNumberRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

// const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{1,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;

const nameRegex = /^([\w"."]{1,})+([\w\s]{0,})+$/i; //

//Email validation
const validateEmail = email => {
  if (!email) {
    return {
      status: false,
      msg: strings.plsEnterEmail,
    };
  } else {
    return emailRegex.test(email)
      ? { status: true, msg: '' }
      : {
        status: false,
        msg: strings.validEmail,
      };
  }
};

//Mobile Number validation
const validateMobile = mobile => {
  if (!mobile) {
    return {
      status: false,
      msg: strings.plsEnterMobileNo,
    };
  } else {
    return mobileNumberRegex.test(mobile)
      ? { status: true, msg: '' }
      : {
        status: false,
        msg: strings.validMobileNo,
      };
  }
};

//Password validation
const validatePassword = (pass, isConfrimPass, password, msg = '') => {
  if (!pass) {
    return {
      status: false,
      msg: msg !== '' ? msg : strings.plsEnterPassword,
    };
  } else if (pass.length < 8) {
    return {
      status: false,
      msg: strings.validatePassword,
    };
  } else {
    if (passwordRegex.test(pass)) {
      if (isConfrimPass && password != pass) {
        return {
          status: false,
          msg: strings.confirmPassValidString,
        };
      }
      return { status: true, msg: '' };
    } else {
      return {
        status: false,
        msg: strings.validatePassword,
      };
    }
  }
};

//Name validation
const validateName = name => {
  if (!name) {
    return {
      status: false,
      msg: strings.plsEnterName,
    };
  } else if (!name.trim()) {
    return {
      status: false,
      msg: strings.enterValidName,
    };
  } else {
    return nameRegex.test(name)
      ? { status: true, msg: '' }
      : {
        status: false,
        msg: strings.enterValidName,
      };
  }
};

//First Name validation
const validateField = (name, type) => {
  if (!name) {
    return {
      status: false,
      msg: strings.plsEnterField + type,
    };
  } else if (!name.trim()) {
    return {
      status: false,
      msg: strings.enterValidField + type,
    };
  } else {
    return nameRegex.test(name)
      ? { status: true, msg: '' }
      : {
        status: false,
        msg: strings.enterValidField + type,
      };
  }
};

// Notes Validation
// Write here Validation
const validateWriteHere = val => {
  if (!val) {
    return {
      status: false,
      msg: 'Please Enter Text',
    };
  } else {
    return {
      status: true,
      msg: '',
    };
  }
};

export {
  validateEmail,
  validateMobile,
  validatePassword,
  validateName,
  validateWriteHere,
  validateField
};
