import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { isExpired, decodeToken } from "react-jwt";
import { UserContext } from "../contexts/UserContexts";
import { ToastNotification } from "./ToastNotification";
function Authentication() { 
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedinUser, setId, loggedinUser, id } = useContext(UserContext);
  const [isLoginOrRegister, setisLoginOrRegister] = useState("register");
  const [color, setColor] = useState("blue");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      const url = isLoginOrRegister === "register" ? "/auth/register" : "/auth/login";
      axios
        .post(`${url}`, { username, password })
        .then((response) => {
          localStorage.setItem("token", response.data["token"]);
          const user = decodeToken(response.data["token"]);
          setLoggedinUser(user.username);
          setId(user.id);
          navigate("/");
          return;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            toast.error("invalid password", {
              position: toast.POSITION.TOP_LEFT,
            });
            return;
          } else if (err.response.status === 400) {
            setisLoginOrRegister("register");
            toast.error("User not Found", {
              position: toast.POSITION.TOP_LEFT,
            });
            return;
          } else if (err.response.status === 409) {
            setisLoginOrRegister("login");
            toast.warn("User already exists", {
              position: toast.POSITION.TOP_LEFT,
            });
            return;
          }
        });
    } else {
      toast.warn("fill all fields", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const user = decodeToken(localStorage.getItem("token"));
      setLoggedinUser(user.username);
      setId(user.id);
      navigate("/");
    }
  }, []);
  useEffect(() => {
    isLoginOrRegister === "register" ? setColor("blue") : setColor("red");
  }, [isLoginOrRegister]);

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button
          onClick={handleSubmit}
          className={`bg-${color}-500 text-white block p-2 w-full rounded-sm`}
        >
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>

        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already a member ?{" "}
              <button onClick={(e) => setisLoginOrRegister("login")}>
                login here
              </button>{" "}
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Don't have an account ?
              <button onClick={(e) => setisLoginOrRegister("register")}>
                Register
              </button>{" "}
            </div>
          )}
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Authentication;
