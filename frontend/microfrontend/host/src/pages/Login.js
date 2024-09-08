import {Suspense} from "react";
import {useHistory} from "react-router-dom";
import {AuthForm} from "../components/LazyImport";

export default function Login({setIsLoggedIn}) {
    const history = useHistory();

    return <Suspense fallback={''}>
        <AuthForm isAuth={true} setIsLoggedIn={setIsLoggedIn} history={history}/>
    </Suspense>
}