import { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../api/userAuth";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userDetails = await getCurrentUser();
      console.log("UserDetails : "+JSON.stringify(userDetails.data))
      setUser(userDetails.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        // user not logged in (normal case)
        setUser(null);
      } else {
        console.error("Error fetching user:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, loading, setLoading,fetchUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
