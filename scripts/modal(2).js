export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}


export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}


export function closeAllPopups() {
  const openedPopups = document.querySelectorAll('.popup_is-opened');
  openedPopups.forEach(popup => closePopup(popup));
}

export function EscClose(event) {
  if (event.key === "Escape") {
    closeAllPopups();
  }
}

export function OverlayClick(event) {
  if (event.target === event.currentTarget) { 
    closeAllPopups();
  }
}


