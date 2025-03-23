export function addCard(cardData, deleteCallback, imageClickCallback, likeClickCallback, currentUserId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
    // Заполняем данные карточки
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
  

    const likeCountElement = cardElement.querySelector('.card__like-count');
    likeCountElement.textContent = cardData.likes.length;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (cardData.owner._id !== currentUserId) {
      deleteButton.style.display = 'none';
    } else {
      deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement, cardData._id); 
      });
    }
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
      likeClickCallback(likeButton, cardData._id);
    });
  
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
      imageClickCallback(cardData.link, cardData.name);
    });
  
    return cardElement;
  }