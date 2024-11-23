import { useContext } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { MyContext } from "../../context/DataProvider";
import axios from "axios";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
    
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 20px;
`;
const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {

    const { account } = useContext(MyContext)
    const removeComment = async (e) => {
        e.preventDefault();
       await axios.delete(`http://localhost:3030/user/deletecomment/${comment._id}`);
       setToggle(prev => !prev);
    }
    return (
        <Component>
            <Container>
                <Name>{comment.username}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { comment.username === account.username && <DeleteIcon key={comment._id} onClick={() => removeComment(e)} /> }
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    )
}

export default Comment;