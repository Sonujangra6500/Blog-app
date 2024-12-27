import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, FormControl, InputBase, styled, TextareaAutosize } from '@mui/material';
import { MyContext } from '../context/DataProvider';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toastr from 'toastr';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';

const Component = styled(Box)`
  margin: 5% 10%;
  @media (max-width: 768px) {
    margin: 5% 5%;
  }
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
  margin: 0 15px;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    margin: 0 10px;
    font-size: 1.2rem;
  }
`;

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 18px;
  font-size: 1.2rem;
  border: none;
  &:focus-visible {
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const UpDatePost = () => {
  const { account } = useContext(MyContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const val = state?.val;
  const { id } = useParams();

  const [post, setPost] = useState({
    title: val?.title || '',
    description: val?.description || '',
    picture: val?.picture || '',
    username: account.username || '',
    categorie: val?.categorie || '',
    createdDate: new Date(),
  });
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      username: account.username,
    }));
    if (file) {
      const picPreview = URL.createObjectURL(file);
      setPreview(picPreview);
    }
  }, [file, account.username]);

  const handleUpdate = async () => {

    const token = localStorage.getItem('token');

    const formData = new FormData();

    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('username', post.username);
    formData.append('categorie', post.categorie);
    formData.append('createdDate', post.createdDate);
    formData.append('picture', file || post.picture);
    try {
      const res = await axios.put(`https://blog-app-o5hc.onrender.com/user/updatepost/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        toastr.success(res.data.message);
        setPost({ picture: '', title: '', description: '' });
        navigate(`/`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong, please try again.';
      toastr.error(errorMessage);
    }
  };

  return (
    <Component className="shadow-lg">
      <img
        className="w-full h-[55vh]"
        src={preview || post.picture}
        alt={post.title || 'Post Banner'}
      />
      <StyledFormControl>
        <label className="cursor-pointer" htmlFor="fileinput">
          <AddCircleIcon fontSize="large" color="action" />
        </label>
        <input
          className="hidden"
          type="file"
          id="fileinput"
          onChange={(e) => {
            setPost({ ...post, picture: e.target.files[0] });
            setFile(e.target.files[0]);
          }}
        />
        <StyledInputBase
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <Button variant="contained" onClick={handleUpdate}>
          Update Post
        </Button>
      </StyledFormControl>
      <StyledTextArea
        value={post.description}
        name="description"
        onChange={(e) => setPost({ ...post, description: e.target.value })}
        minRows={5}
        placeholder="Tell your story..."
      />
    </Component>
  );
};

export default UpDatePost;
