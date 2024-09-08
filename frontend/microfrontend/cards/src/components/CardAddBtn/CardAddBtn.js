import {useCallback} from "react";
export default function CardAddBtn({setIsOpenAddCard}) {
    const open = useCallback(() => {
        setIsOpenAddCard(true);
    }, [setIsOpenAddCard])

    return <button className="profile__add-button" type="button" onClick={open}></button>
}