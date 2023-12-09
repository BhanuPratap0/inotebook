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
function App() {

  return (
    <>
    <UserState>
      <NoteState>
      <BrowserRouter>
        <NavBar />
        <Alertstate><Alert />
        <Routes>
          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="/about" element={<About />} ></Route>
          <Route exact path="/login" element={<Login />} ></Route>
          <Route exact path="/signup" element={<Signup />} ></Route>
          <Route exact path="/test" element={<Test/>} ></Route>
          <Route exact path="/profile" element={<Profile/>} ></Route>
        </Routes>
        </Alertstate>
      </BrowserRouter>
      </NoteState>
      </UserState>
    </>
  );
}

export default App;
