import { Box, styled, Typography } from '@mui/material';
import React from 'react';

const Image = styled(Box)`
    width: 100%;
 background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    display: flex;
        align-items: center;
      height: 50vh;
    flex-direction: column;
    justify-content: center;
  `
const Heading = styled(Typography)`
     font-size:70px;
    color:#ffffff;
    line-height:1;

 `
const SubHeading = styled(Typography)`
 font-size:20px;
 background:#ffffff;
 `
const Banner = () => {
  return (
    <Image>
      <Heading>
        BLOG
      </Heading>
      <SubHeading>
        Create Your Blog
      </SubHeading>
    </Image>
  )
}
export default Banner;  
