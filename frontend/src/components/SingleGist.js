import React, { useState } from "react";
import moment from "moment";
import { UserName, Password } from "../constant/AuthConst";
import myStyle from "../styles/SingleGistStyle.module.css";
import { useNavigate, Link } from "react-router-dom";
import { Buffer } from "buffer";
import { AiFillDelete, AiOutlineStar, AiOutlineFork } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Gist from "react-gist";
import { useSelector } from "react-redux";
const SingleGist = () => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [color, setColor] = useState(false);
  const [forkcolor, setforkColor] = useState(false);
  let result = useSelector((state) => state.singleGistData);
  let result1= useSelector((state) => state.UserGistData);
  let starred=result[0].data.owner.login
  let owner=result1[0].data.login
  const GIST_ID = result[0].data.id;
  let mydata = Object.keys(result[0].data.files);
  console.warn(mydata);
  let basicAuth = Buffer.from(`${UserName}:${Password}`).toString("base64");

  const starAgist = async () => {
    await fetch(`https://api.github.com/gists/${GIST_ID}/star`, {
      method: "Put",
      headers: {
        Authorization: "Basic " + basicAuth,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => {
        console.log("data", response.status);
        if (response.status == "204") {
          setColor(true);
        }
      })
      .then((data) => {
        console.log("data", data);
      });
  };

  const gistDelete = async () => {
    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "Delete",
      headers: {
        Authorization: "Basic " + basicAuth,
      },
    })
      .then((response) => {
        console.warn(response);
        if (response.status == "204") {
          setCheck(true);
          setTimeout(() => {
            setCheck(false);
          }, 3000);
        }
      })
      .then((data) => {
        console.warn(data);
      });
    navigate("/yourgist");
  };
  const forkAgist = async () => {
    await fetch(`https://api.github.com/gists/${GIST_ID}/forks`, {
      method: "Post",
      headers: {
        Authorization: "Basic " + basicAuth,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => {
        if (response.status == "204") {
          setforkColor(true);
        }
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
      });
  };

  return (
    <>
      {check && (
        <div className={myStyle["gist-success"]}>Gist deleted successfully</div>
      )}
      <div className={myStyle["Single-Gist-Container"]}>
        <div className={myStyle["single-gist-page"]}>
          <div className={myStyle["gist-owner-data"]}>
            <div className={myStyle["owner-data"]}>
              <div className={myStyle["image"]}>
                <img src={result[0].data.owner.avatar_url} alt="" />
              </div>
              <div className={myStyle["owner-info"]}>
                <h1 className={myStyle["text-name"]}>
                  {result[0].data.owner.login}/
                  {Object.values(result[0].data.files)[0].filename}
                </h1>
                <h1 className={myStyle["text"]}>
                  {moment(new Date(result[0].data.created_at)).fromNow()}
                </h1>
                <h1 className={myStyle["text"]}>
                  {Object.values(result[0].data.files)[0].language}
                </h1>
              </div>
            </div>

            <div className={myStyle["gists-action"]}>
              <div className={myStyle["action-container"]}>
                {result[0].i && (
                  <div className={myStyle["gists-action-icon"]}>
                    {owner==starred?<>
                    <AiFillDelete
                      size="25px"
                      color="red"
                      className={myStyle["icon-del"]}
                      onClick={gistDelete}
                    />
                    <Link to="/edit">
                      <FaEdit
                        size="22px"
                        color="green"
                        className={myStyle["icon-edit"]}
                      />
                    </Link></>:""}
                  </div>
                )}
                <div onClick={starAgist} className={myStyle["star"]}>
                  {color ? (
                    <>
                      Star
                      <AiOutlineStar size="20px" color="gold" />
                    </>
                  ) : (
                    <>
                      Star
                      <AiOutlineStar size="20px" />
                    </>
                  )}
                </div>
                <div className={myStyle["start-show"]}>0</div>
                <div onClick={forkAgist} className={myStyle["fork"]}>
                  {forkcolor ? (
                    <AiOutlineFork size="18px" color="green" />
                  ) : (
                    <AiOutlineFork size="18px" />
                  )}
                  Fork
                </div>
                <div className={myStyle["fork-show"]}>0</div>
              </div>
            </div>
          </div>
        </div>
        <div className={myStyle["parent"]}>
          <div id="area" className={myStyle["area"]}></div>
          <div className={myStyle["area cover"]}></div>
        </div>
        <div className={myStyle["gist-page"]}>
          {mydata.map((key, index) => (
            <Gist key={index} id={result[0].data.id} file={key} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleGist;
