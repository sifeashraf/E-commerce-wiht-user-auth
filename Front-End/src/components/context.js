import { createContext, useState } from "react";
export let userdatacontext = createContext({});
export default function Usercontext({ children }) {
  const [auth, setAuth] = useState({});
  // console.log(auth);
  return (
    <userdatacontext.Provider value={{ auth, setAuth }}>
      <>{children}</>
    </userdatacontext.Provider>
  );
}
