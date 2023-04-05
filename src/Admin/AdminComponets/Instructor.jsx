import React from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { getAllUsers,deleteUser,activeDeactiveUser } from '../../redux/actions/admin';
import { useSelector } from 'react-redux';
import { Button,Chip,IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export const Instructor = (props) => {

  let users = props.users;
  const dispatch = useDispatch();

  const { message,admin } = useSelector((state) => state.admin);
  
  useEffect(() => {
    if(message){
      dispatch(getAllUsers());
    }
  }, [message]);
 
  function deleteBtnHandler(e){
    dispatch(deleteUser(e.target.attributes.dataid.value));
  }
  function adBtnHandler(e){
    dispatch(activeDeactiveUser(e.target.attributes.dataid.value));
  }
  return (
    <div className="home-content">
      <Box sx={{paddingX:5,paddingTop:5}}>
      <Box sx={{ width: '100%' }}>
      <Typography variant='h4' sx={{position:"absolute",fontWeight:"bold",pt:1,pl:1}}>Instructor</Typography>
      <Box sx={{display:"flex",justifyContent:"right"}}>
        {/* <Button onClick={RefreshPageBtn} sx={{backgroundColor:"#008cff",color:"white",mx:1}}><RefreshIcon/></Button> */}
        <Link to={"/admin/dashboard/instructors/addinstructor"}><Button variant="contained" sx={{mY:5}}>Add Instructor</Button></Link>
        </Box>      
        {admin ? admin.role === "super-admin" ?  

      <Paper sx={{ width: '100%', mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Profile photo</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">CreateAt</TableCell>
            <TableCell align="center">Enable/Disable</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          

          {
            users ?
          users.length > 0 ?
          users.map((row,index) => (
            users[index].role === "instructor" ?
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row" align="center">
                {row.avatar ? <img src={row.avatar.url} alt="avatar" style={{width:50,height:50,borderRadius:50}}/> : null }
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.active ? (<Chip label="Active" color="primary"  />) : (<Chip label="Deactive" color="success"   />)}</TableCell>
              <TableCell align="center">{row.createAt.substring(0, 10)}</TableCell>
              <TableCell align="center"><Button dataid={row._id} onClick={adBtnHandler}> {row.active === true ? "Disable" : "Enable"} </Button></TableCell>
              <TableCell align="center"><IconButton aria-label="delete" dataid={row._id} onClick={deleteBtnHandler}> <DeleteIcon/> </IconButton></TableCell>
            </TableRow>
            : null
          ))
          : null 
          : null
        }
        </TableBody>
      </Table>
      </Paper>
      : admin.role === "sub-admin" ? 
      
      <Paper sx={{ width: '100%', mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Profile photo</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">CreateAt</TableCell>
            <TableCell align="center">Enable/Disable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          

          {
            users ?
          users.length > 0 ?
          users.map((row,index) => (
            users[index].role === "instructor" ?
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row" align="center">
                {row.avatar ? <img src={row.avatar.url} alt="avatar" style={{width:50,height:50,borderRadius:50}}/> : null }
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.active ? (<Chip label="Active" color="primary"  />) : (<Chip label="Deactive" color="success"   />)}</TableCell>
              <TableCell align="center">{row.createAt.substring(0, 10)}</TableCell>
              <TableCell align="center"><Button dataid={row._id} onClick={adBtnHandler}> {row.active === true ? "Disable" : "Enable"} </Button></TableCell>
            </TableRow>
            : null
          ))
          : null 
          : null
        }
        </TableBody>
      </Table>
      </Paper>
      : null : null}
      
    </Box>
        </Box>
    </div>
  )
}

