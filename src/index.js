import { addCard } from './scripts/card.js';
import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup, closePopupOverlay, closeAllPopups} from './scripts/modal.js';
import './pages/index.css';

const placesList = document.querySelector(".places__list");
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
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const imageElement = document.querySelector('.popup__caption');


function deleteCard(cardElement) {
    cardElement.remove(); 
}

function likeButtonCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

function showImageCard(link, name) {
    openPopup(popupTypeImage)
    popupImage.src = link;
    popupImage.alt = name;
    imageElement.textContent = name;
}

function fillProfileInputs() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

initialCards.forEach(cardData => {
    const card = addCard(cardData, deleteCard, showImageCard, likeButtonCard);
    placesList.append(card); 
});


document.querySelectorAll('.popup').forEach(popup => popup.addEventListener('click', closePopupOverlay)); 
editProfileButton.addEventListener('click', () => {
    openPopup(popupEdit);
    fillProfileInputs(); 
});

addCardButton.addEventListener('click', () => openPopup(popupNewCard));
popupCloses.forEach(button => {
    button.addEventListener('click', closeAllPopups); 
})

function handleFormEditProfile(evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const job = jobInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = job;

    closePopup(popupEdit);

}

function handleAddCardSubmit(evt) {
  evt.preventDefault(); 
  const name = cardNameInput.value;
  const link = urlInput.value;
  
  const newCardData = { name, link};

  const newCard = addCard(newCardData, deleteCard, showImageCard, likeButtonCard);
  placesList.prepend(newCard); 

  cardNameInput.value = '';
  urlInput.value = '';

  closePopup(popupNewCard);


}

formEditProfile.addEventListener('submit', handleFormEditProfile); 
formAddCard.addEventListener('submit', handleAddCardSubmit); 

