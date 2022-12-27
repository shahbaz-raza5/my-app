import React, { useEffect, useState } from "react";
import myStyle from "../styles/Gistlist.module.css";
import { AiOutlineIdcard, AiOutlineUnorderedList } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import GistCard from "./GistCard";
import Gists from "./Gists";
import { UserName, Password } from "../constant/AuthConst";
import { Buffer } from "buffer";
import { useSelector } from "react-redux";
const GistList = () => {
  const [data, setData] = useState([]);
  const [searchdata, setsearchData] = useState([]);
  const [btnactive, setbtnActive] = useState(true);
  const [isActive, setActive] = useState(false);
  const [pageCount, setpageCount] = useState(0);
  let basicAuth = Buffer.from(`${UserName}:${Password}`).toString("base64");
  let result1 = [];
  let limit = 10;
  result1 = useSelector((state) => state.singleSearchData);
  useEffect(() => {
    searchGist();
  }, [result1]);

  useEffect(() => {
    listOfgist();
    setActive(false);
  }, []);

  const searchGist = () => {
    if (result1.length >= 1) {
      setsearchData(result1);
      setActive(true);
    } else {
      setActive(false);
      return <h1>Data Not Found</h1>;
    }
  };

  const listOfgist = async () => {
    let result = await fetch(
      `https://api.github.com/gists?page=1&per_page=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );
    result = await result.json();
    setpageCount(Math.ceil(100 / limit));
    setData(result);
    console.warn(result);
  };

  const gistList = async (currentPage) => {
    const res = await fetch(
      `https://api.github.com/gists?page=${currentPage}&per_page=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    const data = await res.json();
    console.warn(data);
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const myData = await gistList(currentPage);
    setData(myData);
  };

  return (
    <div className={myStyle["App"]}>
      <div className={myStyle["Toggle-list-btns"]}>
        <AiOutlineIdcard
          size="22px"
          onClick={() => setbtnActive(false)}
          className={btnactive ? myStyle["btnCard"] : myStyle["row-list"]}
        />
        <div className={myStyle["line"]}></div>
        <AiOutlineUnorderedList
          size="22px"
          onClick={() => setbtnActive(true)}
          className={!btnactive ? myStyle["btnCard"] : myStyle["row-list"]}
        />
      </div>
      {isActive ? (
        <>
          {btnactive ? (
            <Gists data={searchdata} />
          ) : (
            <GistCard data={searchdata} />
          )}
        </>
      ) : (
        <>
          {btnactive ? <Gists data={data} /> : <GistCard data={data} />}

          <div   className={myStyle["paginate"]}>
          <ReactPaginate
        
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
          </div>
        </>
      )}
    </div>
  );
};

export default GistList;
