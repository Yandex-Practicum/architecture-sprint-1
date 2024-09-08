import {useState} from "react";
import {CardAddBtn, Places, Profile} from "../LazyImport";

import './content/content.css';
import './page/page.css';
export function Main() {
    const [isOpenAddCard, setIsOpenAddCard] = useState(false);

    return <main className="content">
        <Profile>
            <CardAddBtn setIsOpenAddCard={setIsOpenAddCard}/>
        </Profile>
        <Places isOpenAddCard={isOpenAddCard}/>
    </main>
}