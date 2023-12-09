import React,{useState} from 'react'
import UserContext from './userContext'

const UserState = (props) => {
    const host = "https://inotebookbackend-zolh.onrender.com";
    const u1=[];
    const [users, setUsers] = useState(u1);

  //to get user data
  const getUser=async()=>{
      const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem('token')
          },body: JSON.stringify({email:localStorage.getItem('email'),password:localStorage.getItem('password')})
        });
        const json = await response.json();
        setUsers(json);
  }
  return (
    <UserContext.Provider value={{users,getUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
