import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import myStyle from "../styles/CreateGist.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {UserName,Password} from "../constant/AuthConst"

const CreateGist = ({ editGist }) => {
  
  const [gistData, setGistData] = useState([
    {
      filename: "",
      content: "",
    },
  ]);
  const [gistDat, setGistDat] = useState([]);
  const [gistDes, setGistDes] = useState({
    description: "",
  });
  const [isValidfile, setIsValidFile] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [gistEdit, setGistEdit] = useState(false);
  const [check, setCheck] = useState(false);
  const [updateCheck, setUpdateCheck] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const navigate = useNavigate();
  let result = useSelector((state) => state.singleGistData);
  let basicAuth = Buffer.from(`${UserName}:${Password}`).toString("base64");

  useEffect(() => {
    if (editGist) {
      editGistBtn();
    }
  }, []);

  const arrayToObject = (arr) => {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i]["filename"];
      res[key] = arr[i];
      delete res[key]["filename"];
    }
    return res;
  };

  const arraytoObject = (arr) => {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i]["0"];
      res[key] = arr[i];
      delete res[key]["0"];
    }
    return res;
  };

  const editGistBtn = async () => {
    const GIST_ID = result[0].data.id;
    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3.raw+json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const arrOfObj1 = Object.values(data.files);
        setGistDes({ description: data.description });
        setGistData(Object.values(arrOfObj1));
        setGistDat(Object.keys(data.files))
        setGistEdit(true);
      });
  };

 
  const updateGist = async () => {
  var array3 =gistData.map((obj, index) => ({
      ...obj,
      ...[gistDat[index]]
    }));
    let updatedGist = arraytoObject(array3)
    let errCheck = validation(gistData);
    if (errCheck) {
      setIsValid(true);
      setIsValidFile(true);
      const GIST_ID = result[0].data.id;
      await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: "PATCH",

        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "Basic " + basicAuth,
        },
        
        body: JSON.stringify({
          description: `${gistDes.description}`,
          public: "true",
          files: updatedGist
          
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.id) {
            setUpdateCheck(true);
            setTimeout(() => {
              setUpdateCheck(false);
            }, 3000);
           
          } else {
            setCheckError(true);
            setTimeout(() => {
              setCheckError(false);
            }, 3000);
          }
         
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
         

        });
    } 
    navigate("/yourgist");
  };

  const validation = (gistData) => {
    let mydat = [...gistData];
    let valid = true;

    for (let i = 0; i < mydat.length; i++) {
      if (mydat[i].filename == "" || mydat[i].content == "") {
        setIsValid(false);
        valid = false;
      } else {
        valid = true;
      }
      for (let j = 0; j < i; j++) {
        if (mydat[i].filename == mydat[j].filename) {
          setIsValidFile(false);
          valid = false;
        } else {
          valid = true;
        }
      }
    }
    setGistData(mydat);
    return valid;
  };

  const createGistBtn = async (i) => {
    let errCheck = validation(gistData);
    if (errCheck) {
      setIsValid(true);
      setIsValidFile(true);
    }
    if (errCheck) {
      let gistObj = arrayToObject(gistData);
      await fetch(`https://api.github.com/gists`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3.raw+json",
          Authorization: "Basic " + basicAuth,
        },

        body: JSON.stringify({
          description: `${gistDes}`,
          public: "true",
          files: gistObj,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.id) {
            setCheck(true);
            setTimeout(() => {
              setCheck(false);
            }, 3000);
          } else {
            setCheckError(true);
            setTimeout(() => {
              setCheckError(false);
            }, 3000);
          }
          navigate("/yourgist");
        });
    }
  };

  const addFile = (i) => {
    setGistData([
      ...gistData,
      {
        filename: "",
        content: "",
      },
    ]);
  };

  const handleChange = (event, index) => {
    let data = [...gistData];
    data[index][event.target.name] = event.target.value;
    setGistData(data);
  };

  const delBtn = async (index) => {
    let data = [...gistData];
    data.splice(index, 1);
    setGistData(data);
    if (gistEdit) {
      const GIST_ID = result[0].data.id;
      await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: "PATCH",

        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "Basic " + basicAuth,
        },

        body: JSON.stringify({
          files: {
            [gistData[index].filename]: null,
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Data", data);
        });
    }
  };
  return (
    <>
      {!isValidfile && (
        <div className={myStyle["gist-error"]}>
          <div>Filename must be different</div>{" "}
          <div
            className={myStyle["gist-error-remove"]}
            onClick={() => setIsValidFile(true)}
          >
            X
          </div>
        </div>
      )}
      {!isValid && (
        <div className={myStyle["gist-error"]}>
          <div>Contents can't be empty </div>{" "}
          <div
            className={myStyle["gist-error-remove"]}
            onClick={() => setIsValid(true)}
          >
            X
          </div>
        </div>
      )}
      {check && (
        <div className={myStyle["gist-success"]}>Gist create Successfully</div>
      )}
       {updateCheck && (
        <div className={myStyle["gist-success"]}>Gist Updated Successfully</div>
      )}
      {checkError && (
        <div className={myStyle["gist-error"]}>Gist is not Created</div>
      )}
      <div className={myStyle["create-gist-container"]}>
        <div className={myStyle["create-gist"]}>
          <div className={myStyle["gist-desc"]}>
            <input
              name="gistDesc"
              type="text"
              placeholder="Enter Description here"
              onChange={(e) => setGistDes(e.target.value)}
              value={gistDes.description}
            />
          </div>

          <div className={myStyle["gist-content"]}>
            {gistData.map((item, index) => (
              <div key={item.index}>
                <div className={myStyle["gist-name"]}>
                  <input
                    name="filename"
                  
                    placeholder="Enter File name"
                    onChange={(e) => handleChange(e, index)}
                    value={item.filename}
                  />
                </div>
                <textarea
                  name="content"
                  id=""
                  cols="30"
                  rows="max"
                  placeholder="Enter File Content"
                  onChange={(e) => handleChange(e, index)}
                  value={item.content || ""}
                />
                {gistData.length !== 1 && (
                  <button className={myStyle["delete-btn"]} onClick={() => delBtn(index)}>Delete </button>
                )}

                {gistData.length - 1 === index && (
                  <button className={myStyle["add-file"]} onClick={addFile}>
                    Add File
                  </button>
                )}
              </div>
            ))}
            <div className={myStyle["btn-action"]}>
              {editGist ? (
                <button onClick={updateGist} className={myStyle["update-btn"]}>
                  Update Gist
                </button>
              ) : (
                <button
                  className={myStyle["create-btn"]}
                  onClick={createGistBtn}
                >
                  Create Gist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGist;
