import React, { useContext, useEffect, useState } from 'react';
import image from '../../assets/blog-img.png';
import { Box, Button, FormControl, InputBase, styled, TextareaAutosize } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { MyContext } from '../context/DataProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';

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


const CreatePost = () => {
  const { account } = useContext(MyContext);
  const navigate = useNavigate();
  const [SearchParams] = useSearchParams();
  const [file, setFile] = useState("");
  const [post, setPost] = useState({
    title: "",
    description: "",
    picture: "",
    username: "",
    categorie: "",
    createdDate: new Date(),
  });

  useEffect(() => {
    const category = SearchParams.get("categorie");
    setPost((prevPost) => ({
      ...prevPost,
      categorie: category,
      username: account.username,
    }));

    if (post.picture) {
      const pictureUrl = URL.createObjectURL(post.picture);
      setFile(pictureUrl);
    }

  }, [account.username, SearchParams, post.picture]);

  const handlePublish = async () => {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("username", post.username);
    formData.append("categorie", post.categorie);
    formData.append("createdDate", post.createdDate);
    formData.append("picture", post.picture);

    try {
      const res = await axios.post("https://blog-app-4w77.onrender.com/user/createpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        toastr.success('Post published successfully!');
        setPost({ picture: "", title: "", description: "" });
        navigate('/');
      }
    } catch (error) {
      toastr.error("Something went wrong");
    }
  };

  return (
    <Component className="shadow-lg">
      <img
        className="w-full h-[55vh] "
        src={file || image}
        alt="banner"
      />
      <StyledFormControl>
        <label className="cursor-pointer" htmlFor="fileinput">
          <AddCircleIcon fontSize="large" color="action" />
        </label>
        <input
          className="hidden"
          type="file"
          id="fileinput"
          onChange={(e) => setPost({ ...post, picture: e.target.files[0] })}
        />
        <StyledInputBase
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <Button variant="contained" onClick={handlePublish}>
          Publish
        </Button>
      </StyledFormControl>
      <StyledTextArea
        value={post.description}
        name="description"
        onChange={(e) => setPost({ ...post, description: e.target.value })}
        minRows={5}
        placeholder="Tell Your Story...."
      />
    </Component>
  );
};

export default CreatePost;
