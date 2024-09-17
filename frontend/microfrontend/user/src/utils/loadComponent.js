import { lazy } from "react";


const defaultComponent = () => {
    return { default: () => <div className='error'>Component is not available!</div> };
}

const loadComponent = (name, from) => lazy(() => import(`${from}/${name}`).catch(defaultComponent));

export default loadComponent;
