const placesList = document.querySelector(".places__list");

function addCard({ name, link }, deleteCallback) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = name;
    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__image").setAttribute("alt", name);

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
        deleteCallback(cardElement);
    });

    return cardElement; 
}

function deleteCard(cardElement) {
    cardElement.remove(); 
}

initialCards.forEach((CARD)=> {
    const card = addCard(CARD,deleteCard);
    placesList.append(card); 
});

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };
function multiplyNumeric(obj) {
  for (let key in obj) {
    if (tupeof(obj[key]) == 'number') {
        obj[key] = obj[key]*2;
    }
  }
}