import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';


const Signup = () => {
  const context2=useContext(alertContext);
  const {showAlert}=context2;
  const [credential, setCredential]= useState({name:"",email: "", password: "",cpassword:""})
    let history=useNavigate();
    const handleClick = async(e) => {
        e.preventDefault();
        const {name,email,password}=credential;
        const response = await fetch(`https://inotebookbackend-zolh.onrender.com/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password}),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            showAlert("Signup Successfully","success")
            history("/login")
        }else{
            showAlert("Invalid Credentials","danger")
        }
    }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
}
  return (
    <div className='container' >
      <form onSubmit={handleClick} >
      <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
