import React from "react";
import moment from "moment";
import myStyle from "../styles/Gistcard.module.css";
import { Link } from "react-router-dom";
import Gist from "react-gist";
import { showSinglegist } from "Redux/gistAction";
import { useDispatch } from "react-redux";
const GistCard = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className={myStyle["gist-card-container"]}>
      <div className={myStyle["gist-card"]}>
        {data.map((item, index) => (
          <Link key={item.node_id} className={myStyle["GistCard"]} to="/gist">
            <div onClick={() => dispatch(showSinglegist(item))}>
              <div className={myStyle["gist-card-body"]}>
                <div className={myStyle["gist-file"]}>
                  <Gist
                    id={item.id}
                    file={Object.values(item.files)[0].filename}
                  />
                </div>
                <div className={myStyle["card-bottom"]}>
                  <div className={myStyle["gist-image"]}>
                    <img src={item.owner.avatar_url} alt="pic" />
                  </div>
                  <div className={myStyle["gist-info"]}>
                    <h1>{item.owner.login}</h1>
                    <p>{moment(new Date(item.created_at)).fromNow()}</p>
                    <p>{Object.values(item.files)[0].language}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GistCard;
