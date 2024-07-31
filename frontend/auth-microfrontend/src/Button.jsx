import React from 'react'

export default function Button({ buttonName }) {
    const [cards, setCards] = React.useState([]);

    return (
        <button>{buttonName}</button>
    )
}
