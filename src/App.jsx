import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navbars } from "./comp/Navbars";
import "./App.css";
import { Counter } from "./comp/Counter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faSkype } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope as faEnvelopeSolid } from '@fortawesome/free-solid-svg-icons';


import correctSoundFile from "./sound/correct_sound.wav";
import wrongSoundFile from "./sound/wrong_sound.mp3";

function App() {
  const [currentStr, setCurrentStr] = useState("");
  const [inputString, setInputString] = useState("");
  const [timer, setTimer] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [total, setTotal] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const [correctSound, setCorrectSound] = useState(null);
  const [wrongSound, setWrongSound] = useState(null);

  function generateString() {
    let str = "";
    let char = "asdfjkl;";

    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < Math.random() * 5; i++) {
        str += char.charAt(Math.floor(Math.random() * char.length));
      }

      str += " ";
    }

    str = str.trim();

    return str;
  }

  function handleInput(e) {
    setTotal((count) => count + 1);
    let v = e.target.value;
    setInputString(e.target.value);

    setTimer(true);

    for (let i = 0; i < v.length; i++) {
      if (v[i] === currentStr[i]) {
        setCorrect((count) => count + 1);
      } else {
        setWrong((count) => count + 1);
        playWrongSound(); // Play wrong sound
      }
    }

    if (e.target.value === currentStr) {
      setTimeout(() => {
        setInputString("");
        let random = generateString();
        setCurrentStr(random);

        let WPM = total / 5 / 60;
        let NWPM = (total - wrong) / 5 / 60;

        let a = Math.floor((NWPM * 100) / WPM);
        setAccuracy(a);

        playCorrectSound(); // Play correct sound
      }, 1500);
    }
  }

  useEffect(() => {
    let random = generateString();
    setCurrentStr(random);
    const interval = setInterval(() => {
      let random = generateString();
      setCurrentStr(random);
    }, 300000);

    // Load the audio files
    const loadAudioFiles = async () => {
      try {
        const correctSoundObj = new Audio(correctSoundFile);
        const wrongSoundObj = new Audio(wrongSoundFile);

        await correctSoundObj.load();
        await wrongSoundObj.load();

        setCorrectSound(correctSoundObj);
        setWrongSound(wrongSoundObj);
      } catch (error) {
        console.error("Failed to load audio files:", error);
      }
    };

    loadAudioFiles();

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Play the correct sound
  const playCorrectSound = () => {
    if (correctSound) {
      correctSound.currentTime = 0;
      correctSound.play();
    }
  };

  // Play the wrong sound
  const playWrongSound = () => {
    if (wrongSound) {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }
  };

  let next = currentStr[0];
  for (let i = 0; i < currentStr.length; i++) {
    if (currentStr[i] === inputString[i]) {
      next = currentStr[i + 1];
    }
  }

  const inputColor = () => {
    if (currentStr.indexOf(inputString) !== -1) {
      if (currentStr === inputString) {
        return "green";
      }
      return "white";
    }
    return "red";
  };

  const color = () => {
    if (currentStr.indexOf(inputString) !== -1) {
      if (currentStr === inputString) {
        return "white";
      }
      return "black";
    }
    return "white";
  };

  return (
    <div
      className="main"
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/002/393/823/small/gradient-blue-background-free-vector.jpg')`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Navbars />
      <Counter timer={timer} />
      <Container style={{ width: "100%", marginBottom: "10px" }}>
        <img
          style={{ display: "block", margin: "auto" }}
          src="https://i.gifer.com/C1WU.gif"
          className="img-fluid"
          alt=""
        />
      </Container>

      <Container
        style={{
          width: "50%",
          maxWidth: "100%",
          margin: "auto",
          height: "40px",
          marginBottom: "20px",
          borderRadius: "0",
          backgroundColor: "#5097A4",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>
          {currentStr}
        </h2>
      </Container>

      <Container style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
        <div style={{ display: "flex", width: "auto", margin: "auto", marginBottom: "10px" }}>
          <h4 style={{ margin: "auto" }}>Press:-</h4>

          <Button
            style={{
              backgroundColor: "#003151F",
              border: "1px solid #003151",
              fontWeight: "500",
              fontSize: "30px",
              marginRight: "0px",
              padding: "0 15px 0 15px",
              borderRadius: "0",
            }}
          >
            {next === " " ? "SPACE" : next}
          </Button>
        </div>
      </Container>

      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Form.Control
          style={{
            width: "50%",
            maxWidth: "100%",
            margin: "auto",
            borderRadius: "0",
            backgroundColor: inputColor(),
            color: color(),
            fontSize: "24px",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "20px",
          }}
          size="lg"
          type="text"
          placeholder="Start Typing..."
          onChange={handleInput}
          value={inputString}
        />
      </Container>
      <Container style={{ display: "flex", justifyContent: "space-evenly", justifyItems: "center", color: "white", }}>
        <h4>Total: {total}</h4>
        <h4>Accuracy: {accuracy}%</h4>
        <h4>WPM: {correct}</h4>
      </Container>

  <Container style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px", height:"30px", padding: "20px 0", backgroundColor: "black" }}>
  <Button
    variant="link"
    href="https://github.com/Hemanth-Gurugubelli"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={faGithub} size="2x" style={{ color: "white" }} />
    <span style={{ color: "white", marginLeft: "0.5rem" }}> GitHub</span>
  </Button>
  <Button
    variant="link"
    href="http://www.linkedin.com/in/hemanth-gurugubelli"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: "white" }} />
    <span style={{ color: "white", marginLeft: "0.5rem" }}> LinkedIn</span>
  </Button>
  <Button
    variant="link"
    href="https://join.skype.com/invite/yi3gW4p2bpse"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={faSkype} size="2x" style={{ color: "white" }} />
    <span style={{ color: "white", marginLeft: "0.5rem" }}> Skype</span>
  </Button>
  <Button
    variant="link"
    href="hemanthgurugubelli@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={faEnvelopeSolid} size="2x" style={{ color: "white" }} />
    <span style={{ color: "white", marginLeft: "0.5rem" }}> Email</span>
  </Button>
</Container>

    </div>
  );
}

export default App;
