import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setcredentials] = useState({name: "",email:"",password:"",cpassword:""})
    let history = useNavigate();

    const handleSubmit=async (e)=>{
     e.preventDefault();
        // API Call 
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name:credentials.name,email: credentials.email,password:credentials.password})
        });
        const json = await response.json() 
        console.log(json)
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history("/");
            props.showAlert("Successfully created Account","success")
            

        }
        else{
            props.showAlert("Invalid credentials","danger")
        }
        
    }
    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3 mt-3">
    <h2>Create New Account</h2>
    <label htmlFor="name" className="Form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="Form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email'onChange={onChange} aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" name='password' className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" name='cpassword' className="form-label">Confirm Password</label>
    <input type="text" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
  )
}

export default Signup