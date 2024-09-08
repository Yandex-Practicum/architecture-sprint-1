/**  Отдельный файл с декларацией всех импортов микрофронтендов **/
import React, {lazy} from "react";

/** Нереально бесит что webpack не умеет динамически ловить связи (либо надо искать подходящую надстройку, плагин...) Так что придется вручную обьявлять все внешние компоненты из микрофронтендов

/* AUTH */
export const AuthTest = lazy(() => import(`auth/TestAuthComponent`).catch((err) => {
    return {
        default: () => {
            console.log(err);
            return <div className='error'>Component is not available! TestAuthComponent !</div>
        }
    }
}))

export const AuthForm = lazy(() => import(`auth/AuthForm`).catch((err) => {
    return {
        default: () => {
            console.log(err);
            return <div className='error'>Component is not available! Login !</div>
        }
    }
}))

export const authApi = import(`auth/api/auth`);

/* PROFILE */
export const ProfileTest = lazy(() => import(`profile/TestProfileComponent`).catch((err) => {
    return {
        default: () => {
            console.log(err);
            return <div className='error'>Component is not available! TestProfileComponent !</div>
        }
    }
}))

export const Profile = lazy(() => import(`profile/Profile`).catch((err) => {
    return {
        default: () => {
            console.log(err);
            return <div className='error'>Component is not available! TestProfileComponent !</div>
        }
    }
}))

/* CARDS */
export const CardsTest = lazy(() => import(`cards/TestCardsComponent`).catch((err) => {
    return {
        default: () => {
            console.log(err);
            return <div className='error'>Component is not available! TestCardsComponent !</div>
        }
    }
}))

export const Places = lazy(() => import(`cards/Places`).catch((err) => {
    return {
        default: () => {
            console.log(err);
            return <div className='error'>Component is not available! TestCardsComponent !</div>
        }
    }
}))

export const CardAddBtn = lazy(() => import(`cards/CardAddBtn`).catch((err) => {
    return {
        default: () => {
            console.log(err);
            return <div className='error'>Component is not available! TestCardsComponent !</div>
        }
    }
}))