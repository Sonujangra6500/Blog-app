import { Box, styled } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Post from "./Post"
import Spinner from '../Spinner';

const StyledBox = styled(Box)`
  color: #878787;
  margin: 30px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 18px;
`;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [SearchParams] = useSearchParams();
  const category = SearchParams.get("category");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const GetPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3030/user/getposts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
    GetPost();
  }, [category]);

  const filteredPosts = category ? posts.filter(post => post.categorie === category) : posts;

  if (loading) {
    return <Spinner />;
  }
  return (
    <StyledBox>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div className='cursor-pointer' key={post._id} onClick={() => navigate(`/details/${post._id}`, { state: { data: [post] } })}>
            <Post post={post} />
          </div>
        ))
      ) : (
        <StyledBox>Posts not found</StyledBox>
      )}
    </StyledBox>
  );
};

export default Posts;
