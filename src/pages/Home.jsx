import React, { useEffect, useState } from "react";
import CardProduct from "../components/card/CardProduct";
import { manageProductServices } from "../services/manageProduct.services";
import Grid from "@mui/system/Unstable_Grid/Grid";
import {
  createCookie,
  deleteCookie,
  isCookieExpired,
} from "../constant/cookie";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ListCard from "../components/ListCard";

const Home = () => {
  const fetchData = async () => {
    const res = await manageProductServices.getData();
    localStorage.setItem("data", JSON.stringify(res.data));
    setData(cache);
  };
  const [data, setData] = useState();
  const cache = JSON.parse(localStorage.getItem("data"));
  const cookieName = "BiteWiseCookies";

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
      setData(cache);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          navigate("question2");
        }}
        color="secondary"
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        Go Question 2
      </Button>
      <ListCard data={data} colums={2} />
    </div>
  );
};

export default Home;
