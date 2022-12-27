import React, { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { IoMdArrowDropup ,IoMdArrowDropdown} from "react-icons/io";
import myStyle from "../styles/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showUserdata } from "Redux/UserData/userAction";
import SearchGist from "./SearchGist";
const Navbar = () => {
  let navigate = useNavigate();
  const CLIENT_ID = "c2d66ead40d612da05cf";
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(!open);
  };
  const signOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const [tokens, setTokens] = useState([]);
  const [userData, setUserData] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [starGist, setStarGist] = useState(true);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const CodeParams = urlParams.get("code");

    async function getAccessToken() {
      await fetch("http://localhost:4000/getAccessToken?code=" + CodeParams, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setTokens(localStorage.getItem("accessToken"));
            setRerender(!rerender);
          }
        });
      let token = localStorage.getItem("accessToken");
      await fetch("http://localhost:4000/getUserData", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setUserData(data);
          console.log(userData);
        });
    }
    getAccessToken();
  }, []);

  function loginWithgithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }
  return (
    <div className={myStyle["Navbar-container"]}>
      <ul className={myStyle["Navbar"]}>
        <div className={myStyle["nav-left"]}>
          <h2 className={myStyle["app-name"]}>Gist App</h2>
        </div>

        <div className={myStyle["nav-right"]}>
          <SearchGist />
          {localStorage.getItem("accessToken") ? (
            <>
              <div
                className="create-gist"
                onClick={() => dispatch(showUserdata(userData))}
              >
                <Link to="/create">
                  <IoAddSharp size="17px" color="white" />
                </Link>
              </div>

              <div className={myStyle["dropdown"]}>
                <div onClick={handleOpen} className={myStyle["profile-menu"]}>
                  <img src={userData.avatar_url} alt="" />
                  <IoMdArrowDropdown color="white" size="20px"/>
                </div>
                {open ? (<>
                <div >
                <IoMdArrowDropup className={myStyle["icon"]} color="white" size="40px"/>
                </div>
                 
                  <div
                    onClick={() => setOpen(false)}
                    className={myStyle["menu"]}
                  >
                    <div className={myStyle["menu-item1"]}>
                      Signed in as <span>{userData.login}</span>
                    </div>

                    <div className={myStyle["menu-item2"]}>
                      <Link
                        className={myStyle["nostyle"]}
                        onClick={() => dispatch(showUserdata(userData,starGist),setStarGist(false))}
                        to="/yourgist"
                      >
                        Your gists
                      </Link>

                      <Link
                        className={myStyle["nostyle"]}
                        onClick={() =>
                          dispatch(showUserdata(userData, starGist),setStarGist(true))
                        }
                        to="/starred"
                      >
                        Starred gists
                      </Link>
                      <li className={myStyle["nostyle"]}>Help</li>
                    </div>
                    <div className={myStyle["menu-item3"]}>
                      <a 
                        className={myStyle["nostyle"]}
                        href={userData.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Github Profile
                      </a>
                      <li onClick={signOut} className={myStyle["nostyle"]}>sign out</li>
                    </div>
                  </div></>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <button className={myStyle["login"]} onClick={loginWithgithub}>
                Login
              </button>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
