import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListCard from "../components/ListCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { manageProductActions } from "../store/manageProduct/slice";
import { manageProductServices } from "../services/manageProduct.services";

const Question2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageSize = 10;
  const fetchData = async() => {
    const res = await manageProductServices.getDataQuestion2()
    if(res.status === 200){
      localStorage.setItem("listDataStatic",JSON.stringify(res.data))
    }
  }
  fetchData()
  const { dataBidding } = useSelector(
    (state) => state.manageProduct
  );

  const listProductQuestion2 = JSON.parse(localStorage.getItem("listDataStatic")) || ""

  const divideData = () => {
    let dataSplitPage = {};
    let final = Math.ceil(listProductQuestion2.length / pageSize);
    let term = 1;
    let listTerm = [];
    let startIndex = 0;
    while (term <= final) {
      listTerm = listProductQuestion2.slice(startIndex, startIndex + pageSize);
      dataSplitPage[term] = listTerm;
      term += 1;
      startIndex += pageSize;
    }
    return dataSplitPage;
  };
  const dataHaveDivided = divideData();
  console.log("data di", dataHaveDivided);
  const getProductData = (pageIndex) => {
    return dataHaveDivided[pageIndex];
  };
  const page1 = getProductData(1);
  localStorage.setItem("dataBidding", JSON.stringify(page1));
  console.log("page1", page1);

  useEffect(() => {
    dispatch(manageProductActions.getDataBidding(page1));
  }, []);

  const [data, setData] = useState(page1);

  const [pageIndex, setPageIndex] = useState(1);
  console.log("page Index", pageIndex);
  console.log("data bidding", dataBidding);

  useEffect(() => {
    const newData = getProductData(pageIndex)?.filter(
      (item) => item !== undefined || item !== null
    );
    setData((prevData) => {
      if (prevData) {
        return prevData
          .concat(newData)
          .filter((item) => item !== undefined || item !== null);
      }
      return newData;
    });
    dispatch(manageProductActions.getDataBidding(data));
    console.log("dataBiddingUseEffect", dataBidding);
    localStorage.setItem("dataBidding", JSON.stringify(data));
  }, [pageIndex]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      pageIndex < Object.keys(dataHaveDivided).length
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
    <Container>
      <Button
        onClick={() => {
          navigate("/");
        }}
        color="secondary"
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        BACK HOME
      </Button>
      <>
        <ListCard data={dataBidding} columns={1} />
        <Button color="secondary">Load More</Button>
      </>
    </Container>
  );
};

export default Question2;
