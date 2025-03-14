export function addCard({ name, link }, deleteCallback, imageClickCallback) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = name;
    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__image").setAttribute("alt", name);


    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
        deleteCallback(cardElement);
    });
    

    const likeButton = cardElement.querySelector(".card__like-button");

    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_is-active');
      });

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
        imageClickCallback(link, name); 
    });
  
    return cardElement; 
}
