import {useHistory} from "react-router-dom";
import {AuthForm} from "../components/LazyImport";

export default function Register({setIsLoggedIn}) {
    const history = useHistory();

    return <AuthForm isAuth={false} history={history} setIsLoggedIn={setIsLoggedIn}/>
}