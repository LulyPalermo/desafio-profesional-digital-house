import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const AdminUserContext = createContext();

export const AdminUserProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);

  return (
    <AdminUserContext.Provider value={{ adminUser, setAdminUser }}>
      {children}
    </AdminUserContext.Provider>
  );
};


export const useAdminUser = () => useContext(AdminUserContext);


AdminUserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
