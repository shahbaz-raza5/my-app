import React, { useEffect, useState } from "react";
import myStyle from "../styles/AllGists.module.css";
import YourGists from './YourGists';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const AllGists = () => {
  const myData = useSelector((state) => state.UserGistData);
  let userData=myData[0].data
  const [allGists, setAllGists] = useState(null);
  useEffect(()=>{
    if(!myData[0].star){
      setAllGists(false)
    }else{
      setAllGists(true)
    }
  },[ myData])
 
  return (
    <div>
      <div className={myStyle["allgist-container"]}>
        <div className={myStyle["all-gist"]}>
       <div onClick={()=>setAllGists(true)} className={!allGists ?myStyle["yourgist"]:myStyle["yourgist-active"]}><Link  className={myStyle["nostyle"]} to="/yourgist">All gists</Link> </div>
          <div onClick={()=>setAllGists(false)} className={allGists ?myStyle["yourgist"]:myStyle["yourgist-active"]}><Link  className={myStyle["nostyle"]} to="/starred">Starred</Link></div>
        </div>
      </div>
      <YourGists allGists={allGists} userData={userData}/>
      
     
    </div>
  )
}

export default AllGists
