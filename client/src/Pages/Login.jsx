import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { authLinLout, setName, setUser } from "../redux/authSlice";
import "./login.css"

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast({
      title: "Logging in",
      description: "Please wait...",
      status: "info",
      duration: null, // Set duration to null to make it persistent until dismissed manually
      isClosable: false,
    }); 

    try {
      const response = await axios.post(`https://coderipple-backend.onrender.com/users/login`, {
        email,
        pass,
      });
      console.log(response);
      if (response.status === 200) {
        toast.closeAll();
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        await Promise.all([
          dispatch(authLinLout(true)),
          dispatch(setName(response.data.name)),
          dispatch(setUser(response.data.user)),
        ]);
        setModalMessage(response.data.msg);
        setShowModal(true);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      setModalMessage(error);
      setShowModal(true);
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === "Login Successful!") {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" id="signInForm">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div id="messageWrapper"> </div>
            <input type="submit" value="Login" className="btn solid" onClick={handleSubmit}/>
            <p className="social-text">Or Sign in with social platforms</p>
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
          <ModalHeader>Login Status</ModalHeader>
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

export default Login;
