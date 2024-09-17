import React from 'react';

// Объект контекста CurrentUserContext экспортируется из отдельного файла директории contexts
export const CurrentUserContext = React.createContext();
export const createListener = (event, handler) => {
    const h = (t, event) => handler(event.detail);
    window.addEventListener(event, h);
    return ()=> {
        window.removeEventListener(event, h);
    }
};

export const sendEvent = (event)=> {
    return (item)=> {
        const message = new CustomEvent(event, {detail: item});
        window.dispatchEvent(message);
    }
}
