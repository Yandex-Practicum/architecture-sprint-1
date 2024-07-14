import React, {useState} from 'react'
import api from "../../src/utils/api";

const AppContext = React.createContext();

export const UserContextProvider = ({children}) => {
    // Define the data you want to share globally

    const [userData, setUserData] = useState()

    const globalData = {
        user: {
            name: 'John Doe',
            email: 'john@example.com',
        }
    };

    // React.useEffect(() => {
    //     api
    //         .getAppInfo()
    //         .then(([cardData, userData]) => {
    //             // console.log(userData);
    //
    //         })
    //         .catch((err) => console.log(err));
    // }, [setUserData]);

    return (
        <AppContext.Provider value={globalData}>
            {children}
        </AppContext.Provider>
    );
};

export const useCurrentUser = () => React.useContext(AppContext)
