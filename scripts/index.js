
const placesList = document.querySelector(".places__list");

function addCard({ name, link }) {

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.setAttribute("alt", name);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

function deleteCard() {
  const cards = this.parentElement;
  cards.remove();
}


initialCards.forEach(addCard, deleteCard);
placesList.append(cardElement);