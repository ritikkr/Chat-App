import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create an authentication context
const AuthContext = createContext();

// Custom hook to provide authentication functionality
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Custom hook to consume authentication context
export function useAuth() {
  return useContext(AuthContext);
}

export default function useProvideAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [apiReponseStatus, setApiReponseStatus] = useState({
    type: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function login(data) {
    axios
      .post("/api/v1/user/login", data)
      .then((res) => {
        setUser(res.data);
        console.log("Log", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setApiReponseStatus({
          ...apiReponseStatus,
          type: "success",
          message: "Login SuccessFull, Redirecting to Dashboard",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.log("S", err);
        setApiReponseStatus({
          ...apiReponseStatus,
          type: "error",
          message:  err.code === "ERR_NETWORK" ? "Network Error: Something is wrong" : err.response.data.text,
        });
      });
  }

  function logout () {
    axios.get(`/api/v1/user/logout/${user.id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("S", err);
      setApiReponseStatus({
        ...apiReponseStatus,
        type: "error",
        message:  err.code === "ERR_NETWORK" ? "Network Error: Something is wrong" : err.response.data.text,
      });
    });
    
  }
  function signup(data) {
    axios
      .post("/api/v1/user/register", data)
      .then((res) => {
        setApiReponseStatus({
          ...apiReponseStatus,
          type: "success",
          message: "Register SuccessFull, Redirecting to Login",
        });
        setUser(res.data);
        console.log("Sig", res.data);

        //  setTimeout(() => {
        navigate("/login");
        //  }, 2000)
      })
      .catch((err) => {
        setApiReponseStatus({
          ...apiReponseStatus,
          type: "error",
          message:  err.code === "ERR_NETWORK" ? "Network Error: Something is wrong" : err.response.data.text,

        });
      });
  }

  function refreshUserDetail() {
    axios
      .get(`/api/v1/user/${user.id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setApiReponseStatus({
          ...apiReponseStatus,
          type: "error",
          message:  err.code === "ERR_NETWORK" ? "Network Error: Something is wrong" : err.response.data.text,

        });
      });
  }

  function addToChatList(data) {
    axios
      .post(`/api/v1/user/contact/${user.id}`, data)
      .then((res) => {
        refreshUserDetail();
      })
      .catch((err) => {
        setApiReponseStatus({
          ...apiReponseStatus,
          type: "error",
          message:  err.code === "ERR_NETWORK" ? "Network Error: Something is wrong" : err.response.data.text,

        });
      });
  }

  useEffect(() => {
    if(user !== null){
      console.log("Login");
      login({userName: user.userName, password: user.password})
    }
    const handleBeforeUnload = (e) => {
      // Perform your API call to set the user offline status here
      console.log('User is logging out!'); // For demonstration purposes
      logout()

      // Optionally, you can show a confirmation message to the user
      e.returnValue = 'Are you sure you want to leave?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Cleanup: Remove the event listener
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return {
    user,
    apiReponseStatus,
    setApiReponseStatus,
    login,
    signup,
    addToChatList,
  };
}
