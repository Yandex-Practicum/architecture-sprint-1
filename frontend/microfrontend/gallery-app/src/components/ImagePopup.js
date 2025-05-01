import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img alt={card ? card.name : ''} src={card ? card.link : ''} className="popup__image" />
        <p className="popup__caption">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
