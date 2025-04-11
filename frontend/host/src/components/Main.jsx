import React, {lazy, Suspense} from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

const UserProfile = lazy(() => import('MFUserProfile/UserProfile').catch(() => {
        return { default: () => 'UserProfile not load' };
    })
);

const Places = lazy(() => import('MFPlaces/Places').catch(() => {
        return { default: () => 'Places not load' };
    })
);

function Main() {
  const currentUser = React.useContext(CurrentUserContext);

  function onAddPlace(){
      dispatchEvent(new CustomEvent("add-new-place"));
  }

  return (
    <main className="content">
        <Suspense fallback="loading…">
            <UserProfile
                currentUser={currentUser}
                PopupWithForm={PopupWithForm}
                RBlock={() => (<button className="profile__add-button" type="button" onClick={onAddPlace}></button>)}
            />
        </Suspense>

        <Suspense fallback="loading…">
            <Places currentUser={currentUser}
                    PopupWithForm={PopupWithForm}
            />
        </Suspense>
    </main>
  );
}

export default Main;
