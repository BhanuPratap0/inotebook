import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';

const Home = (props) => {
  
  return (
    <>
      <AddNote handleProgress={props.handleProgress} />
      <Notes handleProgress={props.handleProgress} />
    </>
  )
}
 
export default Home;
