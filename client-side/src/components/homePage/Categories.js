import { Button, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Categorie } from '../../constants/Data'
import { Link, useSearchParams } from 'react-router-dom'

const StyledTable = styled(Table)`
border : 1px solid rgba(224,224,224,1);
background:white;
`
const StyledButton = styled(Button)`
margin:20px;
width:85%;
background:#6495ED;
color:#fff;
`
const Categories = () => {
  const [SearchParams] = useSearchParams();
  const category = SearchParams.get("category")
  return (
    <div>
      <Link to={`/createpost?categorie=${category ? category : "All"}`}>

        <StyledButton> Create Blog </StyledButton>

      </Link>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell><Link to="/">All Categories</Link></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Categorie.map((categorie) => {
              return <TableRow key={categorie.id}>
                <TableCell>
                  <Link to={`/?category=${categorie.type}`}>{categorie.type}</Link></TableCell>
              </TableRow>

            })
          }
        </TableBody>
      </StyledTable>

    </div>
  )
}

export default Categories
