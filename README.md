### Задание 1

В приложении выделено 3 микрофронтенда, исходное приложение работает как хост.

- **microfrontend\auth** - Логин и регистрация пользователя. Компоненты Login, Register. Собственный API utils\auth.js. Порт 3001.

- **microfrontend\profile** - Профиль пользователя. Компоненты EditAvatarPopup, EditProfilePopup, PopupWithForm. API utils\profileApi.js. Порт 3002.

- **microfrontend\post** - Лента фотографий, карточки. Компоненты Card, AddPlacePopup, PostsFeed. API utils\postApi.js. Порт 3003.

Микрофронтенды содержат собственные package.json и webpack.config.js. Запускаются через nmp i + yarn start.

Хост - порт 3000, связан с микрофронтендами через ModuleFederationPlugin, см. webpack.config.js. Запуск npm i + yarn start.

### Задание 2

...