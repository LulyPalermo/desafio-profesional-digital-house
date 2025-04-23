import { createContext, useState } from "react";

export const Context = createContext()

/* eslint-disable-next-line react/prop-types */
const ContextProvider = ({ children }) => {

    const [detail, setDetail] = useState([])

    return (
        <Context.Provider value={{ detail, setDetail }}>
            {children}
        </Context.Provider>
    )

}

export default ContextProvider