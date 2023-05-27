import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductQuestion2 } from "../store/manageProduct/thunkAction";
import ListCard from "../components/ListCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Animations from "../components/loading/Skeleton";

const Question2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductQuestion2());
  }, []);

  const { listProductQuestion2 ,loading} = useSelector((state) => state.manageProduct);

  const divideData = () => {
    let dataSplitPage = {};
    let final = Math.ceil(listProductQuestion2.length / 10);
    let term = 1;
    let listTerm = [];
    let startIndex = 0;
    while (term <= final) {
      listTerm = listProductQuestion2.slice(startIndex, startIndex + 10);
      dataSplitPage[term] = listTerm;
      term += 1;
      startIndex += 10;
    }
    return dataSplitPage;
  };
  const dataHaveDivided = divideData();
  const getProductData = (pageIndex) => {
    return dataHaveDivided[pageIndex];
  };

  const [pageIndex, setPageIndex] = useState(1);
  const [dataBidding, setDataBidding] = useState(getProductData(pageIndex));

  useEffect(() => {
    if (pageIndex > 1) {
      const oldData = dataBidding;
      setDataBidding(oldData.concat(getProductData(pageIndex)));
    } else {
      setDataBidding(getProductData(pageIndex));
    }
  }, [pageIndex]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      pageIndex < Object.keys(dataHaveDivided).length // check has scrolled to the bottom of the page && current Index < total Page
    ) {
      setPageIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          navigate("/");
        }}
        color="secondary"
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        BACK HOME
      </Button>
      { loading ? <Animations /> : <ListCard data={dataBidding} columns={1} /> && <Button   style={{ position: "absolute", bottom: 10, left: 10 }} color="secondary">Load More</Button>}
    </div>
  );
};

export default Question2;
