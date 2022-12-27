import React, { useEffect, useState } from "react";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import { UserName, Password } from "../constant/AuthConst";
import { showSinglegist } from "Redux/gistAction";
import { useDispatch } from "react-redux";
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai";
import Gist from "react-gist";
import myStyle from "../styles/Yourgist.module.css";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
const YourGists = ({ userData, allGists }) => {
  let basicAuth = Buffer.from(`${UserName}:${Password}`).toString("base64");
  const dispatch = useDispatch();
  let name = userData.login;
  localStorage.setItem("Your_Name", name);
  const [myData, setmyData] = useState([]);
  const [click, setClick] = useState(true);

  useEffect(() => {
    getUserGists();
    starGist();
  }, [allGists]);

  const starGist = async (i) => {
    console.warn('rrrr');
    let res = await fetch(`https://api.github.com/gists/starred`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + basicAuth,
      },
    });
    res = await res.json();
    if (!allGists) {
      setmyData(res);
    }
  };

  const getUserGists = async () => {
    console.warn('gettttttt');
    let name1 = localStorage.getItem("Your_Name");
    let data = await fetch(`https://api.github.com/users/${name1}`, {
      method: "Get",
    });
    data = await data.json();
    let result = await fetch(`https://api.github.com/users/${name1}/gists`, {
      method: "Get",
    });
    result = await result.json();
    if (allGists) {
      setmyData(result);
    }
  };
  if (myData.length == 0) {
    return (
      <Spinner className={myStyle["Spinner"]} animation="border" role="status" variant="success">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
    return (
      <div className={myStyle["your-profile-container"]}>
        <div className={myStyle["yourgist-profile"]}>
          <div className={myStyle["profile-image"]}>
            <img src={userData.avatar_url} alt="pic" />
          </div>
          <div className={myStyle["profile-owner-name"]}>
            <h2>{userData.name}</h2>
          </div>
          <div className={myStyle["github-profile"]}>
            <a href={userData.html_url} target="_blank" rel="noreferrer">
              <button className={myStyle["github-profile-btn"]}>
                View Github Profile
              </button>
            </a>
          </div>
        </div>

        <div className={myStyle["your-gist-card-container"]}>
          <div className={myStyle["GistCard"]}>
            {myData.map((item, i) => (
              <Link key={i} className={myStyle["link"]} to="/gist">
                <div className={myStyle["gist-card-body"]}>
                  <div
                    onClick={() =>
                      dispatch(
                        showSinglegist(item, click),
                        console.log("click")
                      )
                    }
                    className={myStyle["card-bottom"]}
                  >
                    <div className={myStyle["gist-owner-info"]}>
                      <div className={myStyle["gist-image"]}>
                        <img src={item.owner.avatar_url} alt="pic" />
                      </div>
                      <div className={myStyle["gist-info"]}>
                        <div className={myStyle["gist-info-name"]}>
                          <h1>{item.owner.login}/</h1>
                          <h2>{Object.values(item.files)[0].filename}</h2>
                        </div>
                        <p>{moment(new Date(item.created_at)).fromNow()} </p>

                        <p className={myStyle["gist-p"]}>
                          {Object.values(item.files)[0].language}
                        </p>
                      </div>
                    </div>

                    <div className={myStyle["gists-action"]}>
                      <div className={myStyle["action-container"]}>
                        <div className={myStyle["star"]}>
                          <AiOutlineStar color="blue" />
                          Star
                        </div>
                        <div className={myStyle["start-show"]}>0</div>
                        <div className={myStyle["fork"]}>
                          <AiOutlineFork color="blue" />
                          Fork
                        </div>
                        <div className={myStyle["fork-show"]}>0</div>
                      </div>
                    </div>
                  </div>
                  <div className={myStyle["gist-file"]}>
                    <Gist
                      id={item.id}
                      file={Object.values(item.files)[0].filename}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default YourGists;
