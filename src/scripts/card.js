export function addCard(cardData, deleteCallback, imageClickCallback, likeClickCallback, currentUserId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image'); // Объявляем cardImage здесь


  // Заполняем данные карточки
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link; // Используем cardImage
  cardImage.alt = cardData.name; // Используем cardImage

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


  // Проверка, лайкнул ли текущий пользователь карточку
  if (cardData.likes.some(like => like._id === currentUserId)) {
      likeButton.classList.add('card__like-button_active');
  }


  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
      likeClickCallback(likeButton, cardData._id);
  });

  cardImage.addEventListener('click', () => {
      imageClickCallback(cardData.link, cardData.name);
  });

  return cardElement;
}

export const removeCard = (cardElement) => {
  cardElement.remove();
};

export const toggleLikeUI = (likeButton, likesCount) => {
  likeButton.classList.toggle('card__like-button_is-active');
  const likeCountElement = likeButton.closest('.card__likes').querySelector('.card__like-count');
  likeCountElement.textContent = likesCount;
};

export const isCardLiked = (likeButton) => {
  return likeButton.classList.contains('card__like-button_is-active');
};

