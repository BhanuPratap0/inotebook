import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const u1=[];
  const [users, setUsers] = useState(u1);

  //to get user data
  const getUser=async()=>{
      const host = "https://inotebookbackend-zolh.onrender.com"
      const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem('token')
          },body: JSON.stringify({email:localStorage.getItem('email'),password:localStorage.getItem('password')})
        });
        const json = await response.json();
        setUsers(json);
  }
  let history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getUser();
    }else{
      history("/login")
    }
  }, [])


  return (
    <div>
      {users.name}
    </div>
  )
}

export default Test
