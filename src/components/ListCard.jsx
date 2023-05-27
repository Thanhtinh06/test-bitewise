import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import CardProduct from "./card/CardProduct";

const ListCard = (props) => {
  const { data, columns } = props;
  const renderListProduct = () => {
    return data?.map((value, index) => {
      return (
        <Grid item key={index}>
          <CardProduct value={value} />
        </Grid>
      );
    });
  };
  return (
    <Grid
      container
      spacing={3}
      columns={{ xs: 1, sm: 1, md: columns, lg: columns, xl: columns }}
      justifyContent="center"
      sx={{ m: 5 }}
    >
      {renderListProduct()}
    </Grid>
  );
};

export default ListCard;
