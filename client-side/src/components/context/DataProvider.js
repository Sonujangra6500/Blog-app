import { createContext, useState } from "react";

const MyContext = createContext();

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({
    username: "",
    name: ""
  });
  return (
    <MyContext.Provider value={{ account, setAccount }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext };
export default DataProvider; 
