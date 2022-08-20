import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let history = useNavigate();

    const handleSubmit=async (e)=>{
     e.preventDefault();
        // API Call 
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: credentials.email,password:credentials.password})
        });
        const json = await response.json() 
        console.log(json)
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("Logged in Successfully","success")
            history("/");

        }
        else{
          props.showAlert("Invalid Credentials","danger")
        }
      
    }
    const onChange = (e)=>{
      setcredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3 mt-3">
    <h2>Login to Enter iNoteBook</h2>
    <label htmlFor="exampleInputEmail1" className="Form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email'onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" name='password' className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
  )
}

export default Login