const cohortId = 'wff-cohort-34';
const token = '27219f5e-a0a5-4393-b3fb-e8d6c367e05d';
const baseUrl = 'https://nomoreparties.co/v1';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserData = () => {
  return fetch(`${baseUrl}/${cohortId}/users/me`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
};

export const updateUserData = (name, about) => {
  return fetch(`${baseUrl}/${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
};

export const updateUserAvatar = (avatar) => {
  return fetch(`${baseUrl}/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResponse);
};

export const getCards = () => {
  return fetch(`${baseUrl}/${cohortId}/cards`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
};

export const addNewCard = (name, link) => {
  return fetch(`${baseUrl}/${cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
};

export const deleteCard = (cardId) => {
  return fetch(`${baseUrl}/${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
};

export const toggleLike = (cardId, isLiked) => {
  return fetch(`${baseUrl}/${cohortId}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
};