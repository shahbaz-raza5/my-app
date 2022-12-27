import React from "react";
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai";
import myStyle from "../styles/Gists.module.css";
import { showSinglegist } from "Redux/gistAction";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Gists = ({ data }) => {
  const setmyDate = () => {
    const dates = new Date("2022-11-30T10:14:49Z");
    return dates.toLocaleString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const toMonthName = (mydate) => {
    var [day, month, years] = mydate
      .split("T")
      .splice(0, 1)
      .toString()
      .split("-");
    const date = new Date();
    date.setMonth(month - 1);

    return [
      years,
      " ",
      date.toLocaleString("en-US", {
        month: "short",
      }),
      " ",
      day,
    ];
  };
  const dispatch = useDispatch();
  return (
    <div>
      <div className={myStyle["list-container"]}>
        <div className={myStyle["color"]}>
          <li className={myStyle["user-avatar"]}></li>
          <li className={myStyle["user-name"]}>Name</li>
          <li className={myStyle["user-date"]}>Date</li>
          <li className={myStyle["user-time"]}>Time</li>
          <li className={myStyle["user-keyword"]}>Keyword</li>
          <li className={myStyle["user-notebook-name"]}>NoteBook Name</li>
          <li className={myStyle["user-action"]}>Actions</li>
        </div>

        {data.map((item) => (
          <Link key={item.node_id} className={myStyle["link"]} to="/gist">
            <div
              className={myStyle["list-user"]}
              onClick={() => dispatch(showSinglegist(item))}
            >
              <li className={myStyle["user-avatar"]}>
                <img src={item.owner.avatar_url} alt="pic" />
              </li>
              <li className={myStyle["user-name"]}>{item.owner.login}</li>
              <li className={myStyle["user-date"]}>
                {toMonthName(item.created_at)}
              </li>
              <li className={myStyle["user-time"]}>
                {setmyDate(item.created_at)}
              </li>
              <li className={myStyle["user-keyword"]}>
                {Object.values(item.files)[0].language}
              </li>
              <li className={myStyle["user-notebook-name"]}>
                {Object.values(item.files)[0].filename}
              </li>
              <li className={myStyle["user-action"]}>
                <div className={myStyle["star"]}>
                  <AiOutlineStar />
                </div>

                <div className={myStyle["fork"]}>
                  <AiOutlineFork />
                </div>
              </li>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gists;
