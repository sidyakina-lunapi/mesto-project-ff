const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  }
};

const validateInput = (inputElement) => {
  // Проверка для полей имени и описания профиля
  if (inputElement.id === 'name-input' || inputElement.id === 'description-input' || inputElement.id === 'card-name-input') {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      return false;
    }
  }
  // Проверка для поля названия карточки
  else if (inputElement.id === 'card-name-input') {
    if (inputElement.value.trim().length < 2 || inputElement.value.trim().length > 30) {
      inputElement.setCustomValidity('Название должно быть от 2 до 30 символов');
      return false;
    }
  }
  // Проверка для поля URL картинки
  else if (inputElement.id === 'url-input') {
    if (!inputElement.validity.valid) {
      inputElement.setCustomValidity('Введите корректный URL');
      return false;
    }
  }
  
  inputElement.setCustomValidity("");
  return true;
};

const isValid = (formElement, inputElement, config) => {
  const isValidInput = validateInput(inputElement);

  if (!inputElement.validity.valid || !isValidInput) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Остальной код остается без изменений
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
    // Добавляем начальную проверку при загрузке формы
    isValid(formElement, inputElement, config);
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.setCustomValidity("");
  });

  toggleButtonState(inputList, buttonElement, config);
};