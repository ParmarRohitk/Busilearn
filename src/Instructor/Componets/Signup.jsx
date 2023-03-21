import React from "react";
import "./Logincom.scss";
import TextField from "@mui/material/TextField";
import { Avatar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { Instructorsignup } from "../../redux/actions/instructor";

function Signup() {

  const [picture, setPicture] = React.useState(null);
  const [imgData, setImgData] = React.useState(null);

  const onChangePicture = e => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      setImgData(URL.createObjectURL(e.target.files[0]));
    }
  };
  const disatch = useDispatch();
  
  function submitHandler(e){
    e.preventDefault();
    
    const data = new FormData(e.currentTarget);
    
    data.append("name", data.get('name'));
    data.append("email", data.get('email'));
    data.append("password", data.get('password'));
    data.append("avatar", data.get('avatar'));
    // data.append("role","instructor");
    disatch(Instructorsignup(data));
  }
  return (
    <>
      <div className="i-login-container">
        <div className="bg order-2 order-md-1"></div>
        <div className="contents order-1 order-md-2">
          <div className="container i-login-form">
            <div className="row align-items-center justify-content-center i-login-content">
              <div className="col-md-7">
                <div className="mb-4">
                  <h3>SIGN UP</h3>
                </div>
                <Box component="form" noValidate onSubmit={submitHandler}>
                  <div className="form-group first">
                    <TextField
                      id="name"
                      label="Enter Your Name"
                      variant="standard"
                      fullWidth
                      name="name"
                    />
                  </div>
                  <div className="form-group first" 
                    style={{ paddingTop: "15px" }}
                    >
                    <TextField
                      id="email"
                      label="Enter Your Email"
                      variant="standard"
                      fullWidth
                      name="email"
                    />
                  </div>
                  <div
                    className="form-group last mb-3"
                    style={{ paddingTop: "15px" }}
                  >
                    <TextField
                      id="password"
                      label="Enter Your Password"
                      variant="standard"
                      name="password"
                      fullWidth
                    />
                  </div>
                  <div
                    className="form-group last mb-3"
                    style={{ paddingTop: "15px" }}
                  >
                    <Box sx={{display:"flex",flexDirection:"column",gap:2,alignItems:"center"}}>
                      <Button variant="outlined" component="label">
                        Upload Profile Picture
                        <input type="file" hidden name="avatar"
                          onChange={onChangePicture}
                        />
                      </Button>
                      {
                      Image ? <Avatar  sx={{ width: 96, height: 96 }} alt="profile photo" src={imgData && imgData }/>
                      : null}
                    </Box>
                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link to={"/instructor/login"}>Login</Link>
                  </Typography>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
