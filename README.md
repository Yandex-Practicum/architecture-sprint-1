# Задание №1

### Описание
Для реализации микрофронтов, был использован WebPack Module Federation
И следующие части были выделены:

1. Auth - функционал авторизации/регистрации. Port: 9991
2. Card - функционал карточек с фотографиями. Port: 9992
3. Profile - функционал профиля . Port: 9993
4. Host - агрегирующий модуль


### Запуск микрофронтов и приложения
1. Запуск Auth-Micro: cd ./frontend/microfrontend/auth && npm start
2. Запуск Card-Micro: cd ./frontend/microfrontend/card && npm start
3. Запуск Profile-Micro: cd ./frontend/microfrontend/profile && npm start
4. Запуск Host: cd ./frontend && npm start

# Задание №2
[link to drawio](https://drive.google.com/file/d/1-7Xl_Ib7-B08e0LBvI6o0NfKIOkSuFW-/view?usp=sharing)