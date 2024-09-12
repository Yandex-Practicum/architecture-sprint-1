<b>ЗАДАНИЕ #1</b>

Уровень1 Проектирование.<br/>
Выбор между фреймворками: выбираю ModuleFederation - потому что имеется представление как с ним работать.
к сожалению с другим фреймворком яндекс не дал скрипт как работать - самомстоятельное изучение.

Уровень2 Планирование изменений.<br/>
Нужна структура кода и обонование своего решения 
Нужно определить какик компоненты в какой микрофронтенд пойдет.

Стратегия разбиения DDD какие сущности видятся.
<p></p>
Учетная запись:
<ul>
	<li>Авторизация пользователя</li>
	<li>Регистрация пользователя</li>
	<li>Выход пользоваля из под своей учетной записи</li>
</ul>

Страница пользователя:
 - изменения данных пользователя
  - зменения аватар
  - изменения  мета данных( имя, занятие)
 - просмотр добавление и удаление фото
 - лайки фото

Отсюда разбиваем на микрофронтенд:
<br/>
1)Хост координатор подключения микрофронтендов
- содержит основые стили
- разбиение страницы на:
- Header
- Footer
<br/>
2)authorization микроронтедн :
  <ul>
		<li>регистрация пользователей </li>
		<li>вход в личный кабинет</li>
		<li>выход из личного кабинета</li>
		<li>проверка токена</li>
</ul>
<br/>
3) user-profile микрофронтенд -метаданные профиля
<ul>
  <li>аватарка (просмотр, редактирование)</li>
  <li>имя, занятия (просмотр, редактирование)</li>
</ul>
4) user-card микрофронтенд - работас карточками пользователя
<ul>  Работка с карточками
	<li>просмотр карточек</li>
	<li>создание карточки</li>
	<li> удаление карточки</li>
	<li>лайки карточки</li>
</ul>

Сктруктура проекта  <b> микрофронтенда  host</b>
<code>
    App.js
│   App.jsx
│   index.css
│   index.html
│   index.js
│
├───components
│       Footer.js
│       Header.js
│
├───images
│       logo.svg
│
├───styles
│   ├───footer
│   │   │   footer.css
│   │   │
│   │   └───__copyright
│   │           footer__copyright.css
│   │
│   ├───header
│   │   │   header.css
│   │   │
│   │   ├───__auth-link
│   │   │       header__auth-link.css
│   │   │
│   │   ├───__logo
│   │   │       header__logo.css
│   │   │
│   │   ├───__logout
│   │   │       header__logout.css
│   │   │
│   │   ├───__user
│   │   │       header__user.css
│   │   │
│   │   └───__wrapper
│   │           header__wrapper.css
│   │
│   └───page
│       │   page.css
│       │
│       ├───__content
│       │       page__content.css
│       │
│       └───__section
│               page__section.css
│
└───utils
</code>

структура проекта <b> микрофронтенда user-profile </b>
<code>
структура проекта микрофронтенда user-profile 
│   App.js
│   App.jsx
│   index.css
│   index.html
│   index.js
│   Main.js
│   ProtectedRoute.js
├───components
│       EditAvatarPopup.js
│       EditProfilePopup.js
├───contexts
│       CurrentUserContext.js
├───images
│       add-icon.svg
│       delete-icon.svg
│       edit-icon.svg
├───styles
│   ├───page
│   │   │   page.css
│   │   │
│   │   ├───__content
│   │   │       page__content.css
│   │   │
│   │   └───__section
│   │           page__section.css
│   ├───content
│   │       content.css
│   ├───page
│   │   │   page.css
│   │   │
│   │   ├───__content
│   │   │       page__content.css
│   │   │
│   │   └───__section
│   │           page__section.css
│   └───profile
│       │   profile.css
│       │
│       ├───__add-button
│       │       profile__add-button.css
│       │
│       ├───__description
│       │       profile__description.css
│       │
│       ├───__edit-button
│       │       profile__edit-button.css
│       │
│       ├───__image
│       │       profile__image.css
│       │
│       ├───__info
│       │       profile__info.css
│       │
│       └───__title
│               profile__title.css
│
└───utils
api.js
</code>

структура проекта <b> микрофронтенда user-card </b>
<code>
│   App.js
│   App.jsx
│   index.css
│   index.html
│   index.js
│   Main.js
│   ProtectedRoute.js
├───components
│       AddPlacePopup.js
│       Card.js
│       PopupWithForm.js
├───contexts
│       CurrentUserContext.js
├───images
│       close.svg
│       like-active.svg
│       like-inactive.svg
├───styles
│   ├───card
│   │   │   card.css
│   │   │
│   │   ├───__delete-button
│   │   │   │   card__delete-button.css
│   │   │   │
│   │   │   ├───_hidden
│   │   │   │       card__delete-button_hidden.css
│   │   │   │
│   │   │   └───_visible
│   │   │           card__delete-button_visible.css
│   │   ├───__description
│   │   │       card__description.css
│   │   ├───__image
│   │   │       card__image.css
│   │   ├───__like-button
│   │   │   │   card__like-button.css
│   │   │   │
│   │   │   └───_is-active
│   │   │           card__like-button_is-active.css
│   │   ├───__like-count
│   │   │       card__like-count.css
│   │   │
│   │   └───__title
│   │           card__title.css
│   ├───places
│   │   │   places.css
│   │   │
│   │   ├───__item
│   │   │       places__item.css
│   │   │
│   │   └───__list
│   │           places__list.css
│   ├───popup
│   │   │   popup.css
│   │   │
│   │   ├───_is-opened
│   │   │       popup_is-opened.css
│   │   ├───_type
│   │   │       popup_type_edit-avatar.css
│   │   │       popup_type_remove-card.css
│   │   │
│   │   ├───__button
│   │   │   │   popup__button.css
│   │   │   │
│   │   │   └───_disabled
│   │   │           popup__button_disabled.css
│   │   ├───__caption
│   │   │       popup__caption.css
│   │   │
│   │   ├───__close
│   │   │       popup__close.css
│   │   ├───__content
│   │   │   │   popup__content.css
│   │   │   │
│   │   │   └───_content
│   │   │           popup__content_content_image.css
│   │   ├───__error
│   │   │   │   popup__error.css
│   │   │   │
│   │   │   └───_visible
│   │   │           popup__error_visible.css
│   │   ├───__form
│   │   │       popup__form.css
│   │   ├───__icon
│   │   │       popup__icon.css
│   │   ├───__image
│   │   │       popup__image.css
│   │   ├───__input
│   │   │   │   popup__input.css
│   │   │   │
│   │   │   └───_type
│   │   │           popup__input_type_error.css
│   │   ├───__label
│   │   │       popup__label.css
│   │   ├───__status-message
│   │   │       popup__status-message.css
│   │   └───__title
│   │           popup__title.css
└───utils
api.js
</code>


структура проекта <b> микрофронтенда authorization</b>
<code>
│   App.js
│   App.jsx
│   index.css
│   index.html
│   index.js
│
├───components
│       InfoTooltip.js
│       Login.js
│       Register.js
│
├───images
│       close.svg
│       error-icon.svg
│       logo.svg
│       success-icon.svg
│
├───styles
│   ├───auth-form
│   │   │   auth-form.css
│   │   │
│   │   ├───__button
│   │   │       auth-form__button.css
│   │   │
│   │   ├───__form
│   │   │       auth-form__form.css
│   │   │
│   │   ├───__input
│   │   │       auth-form__input.css
│   │   │
│   │   ├───__link
│   │   │       auth-form__link.css
│   │   │
│   │   ├───__text
│   │   │       auth-form__text.css
│   │   │
│   │   ├───__textfield
│   │   │       auth-form__textfield.css
│   │   │
│   │   └───__title
│   │           auth-form__title.css
│   │
│   ├───login
│   │       login.css
│   │
│   └───popup
│       │   popup.css
│       │
│       ├───_is-opened
│       │       popup_is-opened.css
│       │
│       ├───_type
│       │       popup_type_edit-avatar.css
│       │       popup_type_remove-card.css
│       │
│       ├───__button
│       │   │   popup__button.css
│       │   │
│       │   └───_disabled
│       │           popup__button_disabled.css
│       │
│       ├───__caption
│       │       popup__caption.css
│       │
│       ├───__close
│       │       popup__close.css
│       │
│       ├───__content
│       │   │   popup__content.css
│       │   │
│       │   └───_content
│       │           popup__content_content_image.css
│       │
│       ├───__error
│       │   │   popup__error.css
│       │   │
│       │   └───_visible
│       │           popup__error_visible.css
│       │
│       ├───__form
│       │       popup__form.css
│       │
│       ├───__icon
│       │       popup__icon.css
│       │
│       ├───__image
│       │       popup__image.css
│       │
│       ├───__input
│       │   │   popup__input.css
│       │   │
│       │   └───_type
│       │           popup__input_type_error.css
│       │
│       ├───__label
│       │       popup__label.css
│       │
│       ├───__status-message
│       │       popup__status-message.css
│       │
│       └───__title
│               popup__title.css
│
└───utils
        auth.js
</code>
X Уровень 3 Необязательно
<br/>


<b>ЗАДАНИЕ #2</b>
Добавил папку drawio  в которой расположил файл-решение задания №2 .
Специально подробно не распсывал так как нет пониманий все бизнес логики работы приложения.
так же [файл доступен по публичноый ссылки](https://drive.google.com/drive/folders/1a_c7CVDfQLDbUAHykQObizgffTuLY0l4)
