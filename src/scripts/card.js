export function addCard(cardData, deleteCallback, imageClickCallback, likeClickCallback, currentUserId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeCountElement = cardElement.querySelector('.card__like-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCountElement.textContent = cardData.likes.length;

  if (cardData.owner._id !== currentUserId) {
      deleteButton.style.display = 'none';
  } else {
      deleteButton.addEventListener('click', () => {
          deleteCallback(cardElement, cardData._id);
      });
  }

  likeButton.addEventListener('click', () => {
      likeClickCallback(likeButton, cardData._id);
  });

  cardImage.addEventListener('click', () => {
      imageClickCallback(cardData.link, cardData.name);
  });

  const isLiked = cardData.likes.some(like => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  return cardElement;
}

export function removeCard(cardElement) {
  cardElement.remove();
}

export function toggleLikeState(likeButton, likesCount) {
  likeButton.classList.toggle('card__like-button_is-active');
  likeButton.closest('.card__likes').querySelector('.card__like-count').textContent = likesCount;
}

export function isCardLiked(likeButton) {
  return likeButton.classList.contains('card__like-button_is-active');
}