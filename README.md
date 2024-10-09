# Проектная работа 1 спринта

## Задание 1

### Уровень 1. Проектирование
Текущий проект небольшой и написан на React. Предположим что команда знает только React, а для написания на других фреймворках, необходим дополнительный найм разработчиков.
Поэтому решили оставить React, тем более что он нас полностью устраивает:
- Виртуальный DOM. Повышает скорость отрисовки компонентов, экономит ресурсы;
- Удобство создания компонентов и переиспользования их в других частях кода. Более чистая архитектура. В ней проще обнаруживать и исправлять баги, её проще поддерживать. Что должно повысить скорость разработки;
- Решение проблем с SEO. Если поисковик нашёл страницу, он сразу получит её разметку и сможет её индексировать, без ожидания, когда отработают скрипты;
- Популярность. Несложно будет находить и нанимать разработчиков.

Объединять новые микрофронтенды будем с помощью Single SPA, что обеспечит более гибкую архитектуру и в будущем позволит например заменить React, либо в случае необходимости внедрить новый фреймворк.

### Уровень 2. Планирование изменений
В текущем проекте реализован функционал:
- Просмотр, загрузка и удаление фотографий
`frontend.src.components.AddPlacePopup.js`
`frontend.src.components.Card.js`
`frontend.src.components.ImagePopup.js`
`frontend.src.components.PopupWithForm.js`
- Просмотр и редактирование профиля пользователей
`frontend.src.components.EditProfilePopup.js`
`frontend.src.components.EditAvatarPopup.js`
`frontend.src.components.PopupWithForm.js`
- Сбор и учет лайков под фото
`frontend.src.components.Card.js`
- Регистрация и авторизация пользователей
`frontend.src.components.InfoTooltip.js`
`frontend.src.components.Login.js`
`frontend.src.components.Register.js`
- Хедер и футер
`frontend.src.components.Header.js`
`frontend.src.components.Footer.js`


Исходя из этого можем выделить 5 микросервисов:
1. `places` - Сервис фотографий:
- Загрузка фотографий
- Удаление фотографий
- Просмотр фотографий

2. `users` - Сервис по хранению информации о пользователях
- Создание профиля пользователя
- Редактирование профиля пользователя
- Просмотр профиля пользователя

3. `likes` - Сервис по сбору и учету лайков
- Создание лайка
- Удаление лайка
- Просмотр лайков

4. `auth` - Сервис регистрации и авторицации пользователей
- Регистрация пользователей
- Аутентификация и авторизация пользователей

5. `landing` - Сервис для общих компонентов
- Хедер
- футер

Примерная структура проекта для каждого микрофронтенда:
```
/places-microfrontend
  /src
    /blocks
        /places/*
        /card/*  // все кроме лайков
        /popup/*
    /components
      App.js
      AddPlacePopup.js
      Card.js
      ImagePopup.js
      PopupWithForm.js
    /utils
      api.js
    index.js
  package.json

/users-microfrontend
  /src
    /blocks
        /profile/*
        /popup/*
    /components
      EditProfilePopup.js
      EditAvatarPopup.js
      PopupWithForm.js
    /utils
      api.js
    index.js
  package.json
  
/likes-microfrontend
  /src
    /blocks
        /card/*  // все что касается лайков
        /popup/*
    /components
      App.js
      Card.js
    /utils
      api.js
    index.css
    index.js
  package.json
  
/auth-microfrontend
  /src
    /blocks
        /login/*
        /auth-form/*
    /components
      App.js
      InfoTooltip.js
      Login.js
      Register.js
    /utils
      auth.js
    index.css
    index.js
  package.json
  
/landing-microfrontend
  /src
    /blocks
        /footer/*
        /header/*
    /components
      App.js
      Header.js
      Footer.js
    /utils
      auth.js
    index.css
    index.js
  package.json
```