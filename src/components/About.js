import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




const About = () => {
  document.body.style.backgroundColor = "#f0ece2";
  let history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
    } else {
      history("/login")
    }

  }, [])
  return (
    <>
      <div className='about-container' >
        <div className='section-1' >
        <div className='section' ><h1><b>About iNoteBook</b></h1>
          <hr></hr>
          <br />
          <p>Welcome to iNoteBook, your digital notebook for seamless note-taking, organizing, and accessing your thoughts anytime, anywhere.</p>
        </div>
        <div className='section' ><h2><b>Our Mission</b></h2>
          <hr></hr>
          <br />
          <p>At iNoteBook, we believe in empowering users with a simple and secure platform to capture and manage their ideas effortlessly. We understand the importance of privacy and strive to provide you with a reliable space where you can create, update, and delete your notes with confidence.</p></div>
          </div>

        <center><h2><b>Key Features</b></h2></center>
        <hr></hr>
        <div className='section-1' >

        <div className='sub-section' >
        <h3>1. Effortless Note Creation</h3>
        <p>iNoteBook simplifies the note-taking process. With our intuitive interface, you can quickly jot down your ideas, to-do lists, and important reminders.</p>
        </div>
        <div className='sub-section' >
        <h3>2.Seamless Updates &nbsp;</h3>
        <p>Stay organized effortlessly by updating your notes on the go. iNoteBook ensures that your information is always current, reflecting your latest thoughts and plans.</p>
        </div>
        <div className='sub-section' >
        <h3>3. Secure Deletion &nbsp;&nbsp;&nbsp;</h3>
        <p>Your privacy matters. iNoteBook allows you to delete notes securely, giving you peace of mind that your information is handled with the utmost care.</p>
        </div>
        <div className='sub-section' >
        <h3>4. Access Anytime, Anywhere</h3>
        <p>Enjoy the convenience of accessing your notes whenever you need them. iNoteBook is designed to be your reliable companion, whether you're at home, in the office, or on the move.</p>
        </div>
        </div>

        <div className='section-3'>
          <center><h2><b>Privacy and Security</b></h2></center>
        <hr></hr>
        <br />
        <p>We take your privacy seriously. iNoteBook employs robust security measures to protect your data, ensuring that your notes are yours and yours alone. Our commitment is to provide you with a safe and confidential space for your thoughts.</p>
        </div>

        <div className='section-3'>
        <center><h2><b>Get Started</b></h2></center>
        <hr></hr>
        <br />
        <p>Join the iNoteBook community today and experience the joy of hassle-free note-taking. Embrace the freedom to create, update, and delete notes without any concerns about privacy breaches.<br /><br />
          Thank you for choosing iNoteBook. Your ideas, your notes, your world – all in one place.<br /><br />
          Happy Note-Taking!</p>
          </div>
      </div>
    </>
  )
}

export default About
