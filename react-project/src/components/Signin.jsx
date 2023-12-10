
import { Redirect } from "react-router-dom";


import { authenticate, signin} from "./../auth";


import Alert from '@mui/material/Alert';

import { useState } from "react";
const Signin = () => {
   const [values, setValues] = useState({
   
    email: "",
    password: "",
  
    success: false,
    error: false,
  });

  const {  email, password, error, success } =
    values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
    
  };
 
  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });

    signin({ email, password }).then(
      (data) => {
        console.log(data)
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
         
          authenticate(data, ()=>{
            setValues({
                ...values,
                success: true,
              });
          })
         
        }
      }
    );
  };
  const SignInForm = () =>(
    <form className="signinForm">
   
    <div className="signinItem">
      <label>Email</label>
      <input type="email" placeholder="email.."      value={email}
        onChange={handleChange("email")}/>
    </div>
    <div className="signinItem">
      <label>Password</label>
      <input type="password" placeholder="password..."     value={password}
        onChange={handleChange("password")}/>
    </div>
   
    <button className="signinButton"  onClick={clickSubmit}>Login</button>
  </form>
  )

  const showError = () => (
    <Alert severity="error"
   
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

  const showSuccess = () => (
    <>
       { success  && <div
     
     
    >
    
    <Redirect to="/editor"  />
    </div>}
    </>
   
  );
  return (
    <div className="signin">
      <h1 className="signinTitle">Login</h1>
      {showSuccess()}
      {showError()}

      {SignInForm()}
    </div>
  );
};

export default Signin;