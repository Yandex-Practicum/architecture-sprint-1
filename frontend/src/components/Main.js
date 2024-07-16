import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Profile = React.lazy(() => import("profile/Profile"));
const CardList = React.lazy(() => import("card/CardList"));

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    const imageStyle = {backgroundImage: `url(${currentUser.avatar})`};

    return (
        <main className="content">
            <section className="page__section">
                <Profile
                    currentUser={currentUser}
                    onEditProfile={onEditProfile}
                    onAddPlace={onAddPlace}
                    onEditAvatar={onEditAvatar}
                    imageStyle={imageStyle}
                />
            </section>
            <section className="page__section">
                <CardList
                    cards={cards}
                    currentUser={currentUser}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                />
            </section>
        </main>
    );
}

export default Main;
