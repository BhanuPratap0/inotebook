import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Alertstate from './context/alert/Alertstate';
import Test from './components/Test';
import UserState from './context/user/UserState';
import Profile from './components/Profile';
import Footer from './components/Footer';
import AllNotes from './components/AllNotes';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
function App() {
  const [progress, setProgress]=useState('10')
  const handleProgress=(progress)=>{
    setProgress(progress)
  }
  return (
    <>
    <UserState>
      <NoteState>
      <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={progress}
        //onLoaderFinished={() => handleProgress(0)}
      />
        <NavBar />
        <Alertstate><Alert />
        <Routes>
          <Route exact path="/" element={<Home handleProgress={handleProgress} />} ></Route>
          <Route exact path="/about" element={<About />} ></Route>
          <Route exact path="/login" element={<Login  handleProgress={handleProgress} />} ></Route>
          <Route exact path="/signup" element={<Signup />} ></Route>
          <Route exact path="/test" element={<Test/>} ></Route>
          <Route exact path="/profile" element={<Profile/>} ></Route>
          <Route exact path="/allnotes" element={<AllNotes/>} ></Route>
        </Routes>
        <Footer/>
        </Alertstate>
      </BrowserRouter>
      </NoteState>
      </UserState>
    </>
  );
}

export default App;
