import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const Context = createContext()


const ContextProvider = ({ children }) => {

    const [detail, setDetail] = useState([])

    return (
        <Context.Provider value={{ detail, setDetail }}>
            {children}
        </Context.Provider>
    )

}

export default ContextProvider

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };