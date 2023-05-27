import { useRoutes } from "react-router-dom";
import DetailProduct from "../pages/DetailProduct";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import Question2 from "../pages/Question2";

const Router = () => {
  const elements = useRoutes([
    {
      path : '/',
      element : <MainLayout />,
      children : [{
        path : '',
        element : <Home />
      },
      {
        path : '/:id',
        element : <DetailProduct />
      },
      {
        path : '/question2',
        element : <Question2/>
      }
    ]
    },
  ])
  return elements;
};

export default Router;
