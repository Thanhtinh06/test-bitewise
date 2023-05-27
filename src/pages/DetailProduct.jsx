import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button, Chip, Paper } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { manageProductActions } from "../store/manageProduct/slice";

const DetailProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(manageProductActions.getAllProductLocal());
    dispatch(manageProductActions.getDetailId(params.id));
  }, [params.id]);

  const { detailProduct } = useSelector((state) => state.manageProduct);
  return (
    <Paper sx={{ minHeight: "100vh" }}>
      <Container sx={{ mx: "auto", py: 4 }}>
      <Button onClick={() =>{
        navigate('/')
      }} color="secondary">Back Home</Button>
        <Card sx={{ maxWidth: 400, mx: "auto" }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], width: 80, height: 80 }}
                aria-label="recipe"
              >
                {detailProduct?.product_brand}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={detailProduct?.product_name}
            subheader={detailProduct?.product_brand}
          />
          <CardMedia
            component="img"
            height="194"
            image={detailProduct?.image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {detailProduct?.product_details}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
              sx={{ px: 2, py: 1, bgcolor: "background.default" }}
            >
              <Chip
                label={detailProduct?.health_risks[0].health_risk_name}
              ></Chip>
              <Chip
                label={detailProduct?.health_risks[1].health_risk_name}
              ></Chip>
            </Stack>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Container>
    </Paper>
  );
};
export default DetailProduct;
