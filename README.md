# Проектная работа принта 1

## Задание №1
>Вам нужно разделить проект Mesto на несколько микрофронтендов. Самостоятельно решите, какой фреймворк будете использовать, — Module Federation или Single SPA.

### Уровень 1. Проектирование
>Выберите фреймворк для создания микрофронтендов и опишите решение в удобном вам виде.  

**Решение** 

Выбор фреймворка будет зависить от нескольких причин: 
- Стек команд поддерживающих и добавляющих фичи в данный проект
- Необходимость переиспользывания общего кода независимами модулями  

Для простоты предположим, что:
- У нас в ресурсе имеется несколько команд, которые разрабатывают приложения на React. 
- У команд нет каких-то объективных причин переходить на какой-то другой фреймворк

С учетом данных условий предпочтительнее выбрать фреймворк Webpack Module Federation, поскольку будет единый стек в разных командах, а соответственно при необходимости будет возможность шарить общие компоненты между разными модулям, которые поддерживают разные команды.

### Уровень 2. Проектирование
>Предоставьте структуру кода и обоснуйте своё решение в Readme.md. Вы можете создать необходимые проекты, добавить в них подкаталоги для контролов и логики, разложить код исходного проекта по ним, но запускать проекты не нужно.
Главное — верно определить, какие компоненты в какой микрофронтенд пойдут.  

**Решение** 

В данном проекте имеется следующий функционал:
- Просмотр/загрзука/удаление фото карточки(`frontend/src/components/AddPlacePopup.js`, `frontend/src/components/Card.js`, `frontend/src/components/ImagePopup.js`)
- Сбор и учет лайков(`frontend/src/components/AddPlacePopup.js`) 
- Просмотр и редактирование профиля (`frontend/src/components/EditProfilePopup.js`, `frontend/src/components/EditProfilePopup.js`)
- Авторизация/Регистрация(`frontend/src/components/Register.js`,`frontend/src/components/Login.js`, `frontend/src/components/InfoTooltip.js`)

Исходя из текущего функционала можно выделить несколько сущностей над которыми производятся какие-то действия:
- Фото карточка
- Профиль пользователя 

Работу над различными сущностями можно вынести в отдельные микрофронты. В данном случае мне кажется уместным сделать следующие микрофронты: `cards`, `profile`, `auth`. 

Разбиение проекта концептуально будет выглядить следующим образом
Хостом будет приложение в `./src/App.js` ремоуты(микрофронты) находятся в `./microfronted/*`
```
.
├── index.spec.js
├── microfrontend
│   ├── auth
│   │   ├── README.md
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public
│   │   ├── src
│   │   │   ├── App.css
│   │   │   ├── App.js
│   │   │   ├── App.test.js
│   │   │   ├── blocks
│   │   │   │   ├── auth-form
│   │   │   │   ├── login
│   │   │   │   └── popup
│   │   │   ├── components
│   │   │   │   ├── InfoTooltip.js
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   ├── logo.svg
│   │   │   ├── reportWebVitals.js
│   │   │   ├── setupTests.js
│   │   │   └── utils
│   │   │       └── auth.js
│   │   └── webpack.config.js
│   ├── cards
│   │   ├── README.md
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public
│   │   ├── src
│   │   │   ├── App.css
│   │   │   ├── App.js
│   │   │   ├── App.test.js
│   │   │   ├── blocks
│   │   │   │   ├── card
│   │   │   │   ├── places
│   │   │   │   └── popup
│   │   │   ├── components
│   │   │   │   ├── AddPlacePopup.js
│   │   │   │   ├── Card.js
│   │   │   │   ├── ImagePopup.js
│   │   │   │   └── PopupWithForm.js
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   ├── logo.svg
│   │   │   ├── reportWebVitals.js
│   │   │   ├── setupTests.js
│   │   │   └── utils
│   │   └── webpack.config.js
│   └── profile
│       ├── README.md
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       ├── src
│       │   ├── App.css
│       │   ├── App.js
│       │   ├── App.test.js
│       │   ├── blocks
│       │   │   ├── popup
│       │   │   └── profile
│       │   ├── components
│       │   │   ├── EditAvatarPopup.js
│       │   │   └── EditProfilePopup.js
│       │   ├── index.css
│       │   ├── index.js
│       │   ├── logo.svg
│       │   ├── reportWebVitals.js
│       │   ├── setupTests.js
│       │   └── utils
│       └── webpack.config.js
├── package-lock.json
├── package.json
├── public
├── src
│   ├── blocks
│   │   ├── content
│   │   ├── footer
│   │   ├── header
│   │   ├── page
│   │   └── popup
│   ├── components
│   │   ├── App.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Main.js
│   │   ├── PopupWithForm.js
│   │   └── ProtectedRoute.js
│   ├── contexts
│   │   └── CurrentUserContext.js
│   ├── images
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── serviceWorker.js
│   ├── setupTests.js
│   └── vendor
└── webpack.config.js
```


### Уровень 3. Запуск кода (Опционально)
>Настройте маршрутизацию и убедитесь, что все компоненты работают корректно.  

**Решение**   

Данный пункт решения был пропущен мной, поскольку разработка фронтенда не входит в мой основной стэк, а времени преобрести нужную экспертизу не хватает. В PR проект разбит концептуально и конфиги webpack были добавлены просто для наглядности:(  

## Задание #2
>В этом задании вам нужно декомпозировать веб-приложения на Django на микросервисы. Кодить не придётся: в этот раз вы будете работать в онлайн-редакторе draw.io.  

**Решение**  

[drawio](https://drive.google.com/file/d/1lauHukWW_-0Tp1Cg98S1tb2UZR7R2qZe/view?usp=sharing)
