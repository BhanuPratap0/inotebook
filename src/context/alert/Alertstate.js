import React, { useState } from 'react'
import AlertContext from './alertContext'

const Alertstate = (props) => {
    const [alert, setAlert]= useState(null);
    const showAlert=(message, type)=>{
        setAlert({
            msg:message,
            type:type
        });
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    } 
    
  return (
    <AlertContext.Provider value={{ alert, showAlert}}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default Alertstate
