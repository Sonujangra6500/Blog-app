import { AppBar, styled, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Component = styled(AppBar)`
background:#ffffff;
color:#000
`
const Container = styled(Toolbar)`
  justify-content: center;
  & > a{
  padding : 20px;
  color:#000
  }
`
const Navbar = () => {
  return (
    <div>
      <Component>
        <Container>
          <Link to='/'>HOME</Link>
          <Link to='/about'>ABOUT</Link>
          <Link to='/contact'>CONTACT</Link>
          <Link to='/logout'>LOGOUT</Link>
        </Container>
      </Component>

    </div>
  )
}
export default Navbar
