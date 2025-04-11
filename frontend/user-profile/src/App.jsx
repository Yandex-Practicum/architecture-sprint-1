import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import UserProfile from "./components/UserProfile";
import EditProfilePopup from "./components/EditProfilePopup";

const fake_user = {
    "name": "Alexeynew",
    "about": "ffr",
    "avatar": "https://places.moscow/images/otdyh-v-oslo/1.jpg",
    "_id": "dd8b6dea22fe4ea0ad5d46f4",
    "cohort": "cohort0"
}

function onEditProfile(){
    alert('onEditProfile')
}

function onEditAvatar(){
    alert('onEditProfile')
}

const App = () => (
  <div className="container">
    <div>Name: user-profile</div>
    <UserProfile currentUser={fake_user}
                 onEditProfile={onEditProfile}
                 onEditAvatar={onEditAvatar}
                 rblock={() => (<b>8888</b>)}
    />
      <EditProfilePopup/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
