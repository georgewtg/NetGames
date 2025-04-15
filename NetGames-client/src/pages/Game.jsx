import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./Game.css";
import { createScorePost } from "../actions/Score.action";
import Navbar from '../components/Navbar';

export default function Game() {
  const inputRef = useRef(null);
  const guessRef = useRef(null);
  const chancesRef = useRef(null);
  const scoreRef = useRef(null);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100));
  const [chance, setChance] = useState(10);
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Check");
  const [cookies, setCookies] = useCookies(["score", "user_id"]);
  const [score, setScore] = useState(0);
  const [post, setPost] = useState(false);
  const [scoreText, setScoreText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus(); // Focus input on mount

    if (!cookies.score) { // initialize score
      setCookies("score", 0, { path: '/' });
      setScore(0);
    } else {
      setScore(Number(cookies.score));
    }
  }, []);

  useEffect(() => {
    if (scoreRef.current) { // update score
      scoreRef.current.textContent = `Current Score = ${score}`;
    }
  }, [score]);

  // Function to reset the game
  const resetGame = () => {
    setRandomNum(Math.floor(Math.random() * 100));
    setChance(10);
    inputRef.current.disabled = false;
    chancesRef.current.textContent = 10;
    guessRef.current.textContent = "";
    guessRef.current.style.color = "#333";
    inputRef.current.value = "";
    setButtonText("Check");
    setDisabled(false);
    setPost(false);
  };

  const handleCheck = () => {
    if (disabled) {
      resetGame();
      return;
    }
    
    let newChance;
    const inputValue = Number(inputRef.current.value);
    setPost(false);

    if (inputValue === randomNum) {
      guessRef.current.textContent = "Congrats! You found the number.";
      guessRef.current.style.color = "#27ae60";
      setScore(score + 1);
      setCookies("score", score, { path: '/' });
      setButtonText("Replay");
      setDisabled(true);
      newChance = chance;
      inputRef.current.disabled = true;
      setPost(true);
    } else if (inputValue > randomNum && inputValue < 100) {
      guessRef.current.textContent = "Your guess is high";
      guessRef.current.style.color = "#333";
      newChance = chance - 1;
    } else if (inputValue < randomNum && inputValue > 0) {
      guessRef.current.textContent = "Your guess is low";
      guessRef.current.style.color = "#333";
      newChance = chance - 1;
    } else {
      guessRef.current.textContent = "Your number is invalid";
      guessRef.current.style.color = "#e74c3c";
      newChance = chance;
    }
    setChance(newChance);
    chancesRef.current.textContent = newChance;

    if (newChance === 0 && inputValue !== randomNum) {
      guessRef.current.textContent = "You lost the game";
      guessRef.current.style.color = "#e74c3c";
      setCookies("score", 0, { path: '/' });
      setButtonText("Replay");
      setDisabled(true);
      inputRef.current.disabled = true;
      setPost(true);
    }
  };

  const postScore = () => {
    createScorePost({
      value: score,
      text: scoreText,
      owner: cookies.user_id,
    })
    .then((response) => {
      if (response.data != null) {
        alert("Successfully post score");
        setScore(0);
        navigate("/post");
      } else {
        alert("Failed to post score!");
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
  }

  return (
    <>
      <Navbar />
      <game>
        <div className="wrapper" style={{maxWidth: '500px'}}>
          <header>Guess a number from 1 to 100</header>
          <p className="score" ref={scoreRef}></p>
          <p className="guess" ref={guessRef}></p>
          <div className="input-field">
            <input type="number" ref={inputRef} disabled={disabled} />
            <button onClick={handleCheck}>{buttonText}</button>
          </div>
          <p>You have <span className="chances" ref={chancesRef}>10</span> chances</p>
          {post &&
          <div className="input-field">
            <input type="text" placeholder="Enter comment" style={{ width: '200px' }} onChange={(e) => setScoreText(e.target.value)} />
            <button onClick={postScore} className="post-button" style={{ width: '150px' }}>Post Score</button>
          </div>}
        </div>
      </game>
    </>
  );
}