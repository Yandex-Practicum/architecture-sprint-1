import React from "react";
const Button = React.lazy(() => import('AuthMicroFrontend/Button'))

export default function App() {
    return (
        <div>
            App
            <Button buttonName={"click here"}/>
        </div>
    )
}