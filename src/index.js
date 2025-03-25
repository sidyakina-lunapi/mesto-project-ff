import { addCard, removeCard, toggleLikeState, isCardLiked } from './scripts/card.js';
import { openPopup, closePopup, closePopupOverlay } from './scripts/modal.js';
import {
  getUserData,
  updateUserData,
  updateUserAvatar,
  getCards,
  addNewCard,
  deleteCard,
  toggleLike,
} from './scripts/api.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import './pages/index.css';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

const placesList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloses = document.querySelectorAll('.popup__close');
const addCardButton = document.querySelector('.profile__add-button');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const imageElement = document.querySelector('.popup__caption');
const profileAvatar = document.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = document.querySelector('.popup__form[name="edit-avatar"]');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar-url');

let currentUserId = '';

const updateUserInfo = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  currentUserId = userData._id;
};

const fillProfileInputs = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

const handleFormEditProfile = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;
  const saveButton = formEditProfile.querySelector('.popup__button');

  saveButton.textContent = 'Сохранение...';

  updateUserData(name, about)
    .then((userData) => {
      updateUserInfo(userData);
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении данных пользователя:', err);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
};

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = urlInput.value;
  const saveButton = formAddCard.querySelector('.popup__button');

  saveButton.textContent = 'Сохранение...';

  addNewCard(name, link)
    .then((cardData) => {
      const newCard = addCard(cardData, deleteCardHandler, showImageCard, likeButtonHandler, currentUserId);
      placesList.prepend(newCard);
      closePopup(popupNewCard);
      formAddCard.reset();
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      saveButton.textContent = 'Создать';
    });
};

const handleEditAvatarSubmit = (evt) => {
  evt.preventDefault();
  const avatarUrl = avatarUrlInput.value;
  const saveButton = formEditAvatar.querySelector('.popup__button');

  saveButton.textContent = 'Сохранение...';

  updateUserAvatar(avatarUrl)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(popupEditAvatar);
      formEditAvatar.reset();
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
};

const deleteCardHandler = (cardElement, cardId) => {
  deleteCard(cardId)
    .then(() => {
      removeCard(cardElement);
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки:', err);
    });
};

const likeButtonHandler = (likeButton, cardId) => {
  const isLiked = isCardLiked(likeButton);

  toggleLike(cardId, isLiked)
    .then((updatedCard) => {
      toggleLikeState(likeButton, updatedCard.likes.length);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении лайка:', err);
    });
};

const showImageCard = (link, name) => {
  openPopup(popupTypeImage);
  popupImage.src = link;
  popupImage.alt = name;
  imageElement.textContent = name;
};

Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    updateUserInfo(userData);
    cards.forEach((cardData) => {
      const card = addCard(cardData, deleteCardHandler, showImageCard, likeButtonHandler, currentUserId);
      placesList.append(card);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', closePopupOverlay);
});

editProfileButton.addEventListener('click', () => {
  openPopup(popupEdit);
  fillProfileInputs();
  clearValidation(formEditProfile, validationConfig);
});

addCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
  clearValidation(formAddCard, validationConfig);
});

popupCloses.forEach((button) => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')));
});

formEditProfile.addEventListener('submit', handleFormEditProfile);
formAddCard.addEventListener('submit', handleAddCardSubmit);
formEditAvatar.addEventListener('submit', handleEditAvatarSubmit);

profileAvatar.addEventListener('click', () => {
  openPopup(popupEditAvatar);
  clearValidation(formEditAvatar, validationConfig);
});