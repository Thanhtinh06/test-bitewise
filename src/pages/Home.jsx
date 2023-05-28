import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import ListCard from "../components/ListCard";
import {
  createCookie,
  deleteCookie,
  isCookieExpired,
} from "../constant/cookie";
import { manageProductServices } from "../services/manageProduct.services";

const Home = () => {
  const navigate = useNavigate();
  const { listProduct } = useSelector((state) => state.manageProduct);
  const [data, setData] = useState(listProduct);
  const cookieName = "BiteWiseCookies";

  const fetchData = async () => {
    const res = await manageProductServices.getData();
    localStorage.setItem("data", JSON.stringify(res.data));
    setData(res.data);
  };

  useEffect(() => {
    createCookie(cookieName);
    const currentTime = new Date();
    const cookieExpired = isCookieExpired(cookieName, currentTime);
    if (cookieExpired) {
      deleteCookie(cookieName);
      createCookie(cookieName);
      localStorage.removeItem("data");
      fetchData();
    } else {
      const cache = JSON.parse(localStorage.getItem("data"));
      if (!cache) {
        fetchData();
      }
      setData(cache);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoToQuestion2 = () => {
    navigate("/question2");
  };

  return (
    <Container>
      <Button
        onClick={handleGoToQuestion2}
        color="secondary"
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        Go to Question 2
      </Button>
      <ListCard data={data} columns={2} />
    </Container>
  );
};

export default Home;
