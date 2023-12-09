import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  let history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    }else{
      history("/login")
    }
    
  }, [])
  return (
    <>
    This is about
    </>
  )
}

export default About
