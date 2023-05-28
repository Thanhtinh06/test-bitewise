import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListCard from "../components/ListCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { manageProductActions } from "../store/manageProduct/slice";
import { manageProductServices } from "../services/manageProduct.services";
import { getProductData } from "../constant/mockAPI";

const Question2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  const { dataBinding, dataHaveDivided } = useSelector(
    (state) => state.manageProduct
  );

  const fetchData = async () => {
    try {
      const res = await manageProductServices.getDataQuestion2();
      if (res.status === 200) {
        dispatch(manageProductActions.getAllProductLocalQuestion2(res.data));
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
      const dataHaveDivided = localStorage.getItem("DataDivided")
        ? JSON.parse(localStorage.getItem("DataDivided"))
        : [];
      const page = getProductData(dataHaveDivided, pageIndex);
      if (page) {
        dispatch(manageProductActions.getdataBinding({ page, pageIndex }));
      }
    };
    loadData();
  }, [dispatch, pageIndex]);

  // Handle scroll event and update pageIndex
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      pageIndex < Object.keys(dataHaveDivided).length
    ) {
      setPageIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Add scroll event listener after data is loaded
  useEffect(() => {
    if (dataHaveDivided && Object.keys(dataHaveDivided).length > 0) {
      window.addEventListener("scroll", handleScroll);
    }

    // Remove scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dataHaveDivided]);

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
        <ListCard data={dataBinding} columns={1} />
        <Button color="secondary">Load More</Button>
      </>
    </Container>
  );
};

export default Question2;
