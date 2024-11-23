import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import { Box, Button, styled, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Comments from "./comments/Comments";

const StyledBox = styled(Box)`
  margin:1% 15%;
  width:full;
  height:full;
   font-size: 18px;
`
const StyledTypography = styled(Typography)`
display:flex;
align-items:center;
margin:10px 0 ;
justify-Content:space-between;
`
const DetailsView = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state?.data;
  const { id } = useParams();

  const FilterData = data.filter((res) => {
    return res._id == id
  })

  if (!FilterData) return <Spinner />;

  return (
    <>
      {FilterData.map((post) => {
        return <StyledBox key={post._id}>
          <img style={{ width: "100%", height: "300px" }} src={post.picture} alt={post.title} />
          <StyledTypography >
            <Typography sx={{ fontWeight: 'bold' }}
              variant="h4">{post.title}</Typography>
            <Typography>
              <Button onClick={() => navigate(`/update/${post._id}`, { state: { val: post } })}>
                <EditIcon />
              </Button>
              <Button>
                <DeleteIcon />
              </Button>
            </Typography>
          </StyledTypography>
          <StyledTypography>
            <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold' }} ><strong>Author :</strong> {post.username}</Typography>
            <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
          </StyledTypography>
          <Typography sx={{ marginTop: '10px', fontWeight: 'bold' }}><strong>Description:</strong> {post.description}</Typography>
          <Comments post={post} />
        </StyledBox>
      })}
    </>
  );
};
export default DetailsView;
