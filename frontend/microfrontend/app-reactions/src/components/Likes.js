import React from 'react';

function Likes() {

    return (
        <div className="card__likes">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="card__like-count">{card.likes.length}</p>
        </div>
    );
}

export default Likes;
