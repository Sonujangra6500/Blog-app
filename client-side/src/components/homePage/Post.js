import { Box, Typography } from '@mui/material';
import { AddElipsis } from '../../constants/Data';
import image from '../../assets/blog-img.png';

const Post = ({ post }) => {

  const Url = post.picture ? post.picture : image;

  return (
    <Box
      sx={{
        width: '300px',
        margin: '10px',
        padding: '10px',
        height: '400px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
      }}
    >
      <img
        src={Url}
        alt={`Blog post by ${post.username}`}
        style={{ width: '100%', objectFit: 'cover', height: '40%', borderRadius: '8px' }}
      />
      <Typography
        color="textPrimary"
        sx={{ marginTop: '10px', paddingLeft: '40%', fontWeight: 'bold' }}
      >
        {post.categorie}
      </Typography>
      <Typography
        variant="h5"
        color="textPrimary"
        sx={{ marginTop: '10px', fontWeight: 'bold' }}
      >
        {AddElipsis(post.title, 25)}
      </Typography>
      <Typography
        color="textPrimary"
        sx={{ marginTop: '10px', fontWeight: 'bold' }}
      >
        {post.username}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ marginTop: '10px', fontSize: '16px' }}
      >
        {AddElipsis(post.description, 100)}
      </Typography>
    </Box>
  );
};

export default Post;
