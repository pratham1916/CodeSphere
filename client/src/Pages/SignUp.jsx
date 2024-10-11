import  { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"

const Signup = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast({
      title: "Register",
      description: "Please wait...",
      status: "info",
      duration: null, // Set duration to null to make it persistent until dismissed manually
      isClosable: false,
    }); 
    try {
      const response = await axios.post(`https://coderipple-backend.onrender.com/users/register`, {
        name,
        email,
        pass,
      });
      console.log(response);
      if (response.data.msg == "Already Registered") {
        setShowModal(true);
        setModalMessage("Already Registrered. Please Login");
      } else {
        setShowModal(true);
        setModalMessage("Registration successful");
      }
    } catch (error) {
      console.log(error);
      setShowModal(true);
      if (error.response && error.response.status === 400) {
        setModalMessage("Email already exists. Please try with another email.");
      } else {
        setModalMessage("Registration failed. Please try again later.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === "Registration successful") {
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-up-form" id="signUpForm">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" name="username" placeholder="Username" onChange={handleUsername} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" name="email" placeholder="Email" onChange={handleEmail} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" name="password" placeholder="Password" onChange={handlePassword}/>
            </div>
            {/* <!-- <div class="input-field">
              <i class="fas fa-image"></i>
              <input type="file" id="imageUpload" name="imageUpload" accept="image/*" />
            </div> --> */}
            <input type="submit" className="btn" value="Sign up" onClick={handleSubmit} />
            <div id="signUpMessageWrapper" className="message-wrapper">{modalMessage}</div>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Join Coding Community</h3>
            <p>
              Sign up to participate in coding quizzes, connect with developers, and expand your coding network.
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="../assets/images/login.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Ready for a coding challenge? Log in to test your coding knowledge and skills.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="../assets/images/signup.svg" className="image" alt="" />
        </div>
      </div>
      
      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registration Status</ModalHeader>
          <ModalBody>{modalMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Signup;
