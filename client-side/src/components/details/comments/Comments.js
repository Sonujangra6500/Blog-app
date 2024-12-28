import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import Comment from './Comment';
import { MyContext } from '../../context/DataProvider';
import axios from 'axios';

const Container = styled(Box)`
    margin-top: 50px;
     display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;
const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}


const Comments = ({ post }) => {

    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(MyContext);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://blog-app-o5hc.onrender.com/user/getcomments/${post._id}`)
            if (res.data.success) {
                setComments(res.data.comments);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            username: account.username,
            postId: post._id,
            comments: e.target.value,
        });
    }

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://blog-app-o5hc.onrender.com//user/addcomments", comment)
            if (res.data.success) {
                setComment(initialValue)
                setToggle(prev => !prev);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea
                    rowsMin={5}
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)}
                    value={comment.comments}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;
