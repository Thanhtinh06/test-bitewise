import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/system";
import { Chip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { manageProductActions } from "../../store/manageProduct/slice";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardProduct = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const data = props.value;
  const ratingColor = data.rating === "Good" ? "#0A9822" : "#EF4444";
  const ratingColorBg = data.rating === "Good" ? "#DCFCE7" : "#FEE2E2";
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 500, borderRadius: 4 }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/${data.id}`);
        }}
      >
        <Avatar
          variant="rounded"
          src={data.image}
          style={{ width: 100, height: 90 }}
        />
        <Stack
          spacing={0.5}
          width={300}
          height={60}
          display={"flex"}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <Typography fontWeight={700} textAlign="center">
            {data.product_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.product_brand}
          </Typography>
        </Stack>
        <Stack
          variant="rounded"
          sx={{
            backgroundColor: ratingColorBg,
            paddingX: 1.5,
            paddingY: 2.5,
            borderRadius: 2,
            alignItems: "center",
            width: 75,
          }}
        >
          {data.rating === "Good" ? (
            <ThumbUpIcon style={{ color: "#FFB74D" }} />
          ) : (
            <ThumbDownAltIcon style={{ color: "FFB74D" }} />
          )}
          <Typography fontWeight={700} color={ratingColor}>
            {data.rating.toUpperCase()}
          </Typography>
        </Stack>
      </Box>
      <CardActions
        disableSpacing
        style={{ position: "relative", right: "45%" }}
      >
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{ px: 2, py: 1, bgcolor: "background.default" }}
          >
            <Chip label={data.health_risks[0].health_risk_name}></Chip>
            <Chip label={data.health_risks[1].health_risk_name}></Chip>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardProduct;
