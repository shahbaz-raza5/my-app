// import React, { useState } from "react";
// import { AiOutlineStar } from "react-icons/ai";
// import myStyle from "../styles/SingleGistStyle.module.css";
// import { useSelector } from "react-redux";
// const Stargist = () => {
//   let result = useSelector((state) => state.singleGistData);
//   const GIST_ID = result[0].data.id;
//   const [color, setColor] = useState(false);
//   var uname = "shahbaz-raza5";
//   var pass = "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";
//   let basicAuth = Buffer.from(`${uname}:${pass}`).toString("base64");
//   const starAgist = async () => {
//     await fetch(`https://api.github.com/gists/${GIST_ID}/star`, {
//       method: "Put",
//       headers: {
//         Authorization: "Basic " + basicAuth,
//         Accept: "application/vnd.github.v3+json",
//       },
//     })
//       .then((response) => {
//         console.log("API DATA", response);
//         if (response.status == "204") {
//           setColor(true);
//         }
//       })
//       .then((data) => {
//         console.log("data", data);
//       });
//   };
//   return (
//     <div>
//       <div onClick={starAgist} className={myStyle["star"]}>
//         {color ? <AiOutlineStar color="gold" /> : <AiOutlineStar />} Star
//       </div>
//       <div className={myStyle["start-show"]}>0</div>
//     </div>
//   );
// };

// export default Stargist;
