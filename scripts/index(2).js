import { addCard } from 'card.js';
import { initialCards } from 'cards.js';
import { openPopup, closePopup, EscClose, OverlayClick, closeAllPopups} from 'modal.js';

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupClose = document.querySelector('.popup__close');
const addCardButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');


function deleteCard(cardElement) {
    cardElement.remove(); 
}

initialCards.forEach(cardData => {
    const card = addCard(cardData, deleteCard);
    placesList.append(card); 
});

document.addEventListener('keydown', EscClose);
document.querySelectorAll('.popup').forEach(popup => popup.addEventListener('click', OverlayClick)); 
editProfileButton.addEventListener('click', () => openPopup(popupEdit));
addCardButton.addEventListener('click', () => openPopup(popupNewCard));
popupClose.addEventListener('click', closeAllPopups); 




function handleFormSubmit(evt) {
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

  const newCard = addCard(newCardData, deleteCard);
  placesList.prepend(newCard); 

  cardNameInput.value = '';
  urlInput.value = '';

  closePopup(popupEdit);


}

formElement.addEventListener('submit', handleFormSubmit); 
formAddCard.addEventListener('submit', handleAddCardSubmit); 

