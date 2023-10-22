import { useState } from 'react';
import './App.css';

function App() {

  const TWENTYFIVE_MINUTES = 25 * 60;
  const FIVE_MINUTES = 5 * 60;
  let isSessionMode = true;
  let breakSessionLength = 5 * 60;
  let sessionLength = 25 * 60;
  let sessionTimer;
  let breakTimer;

  const breakMinusElement = document.getElementById("break-minus-element");
  const breakSessionElement = document.getElementById("break-session-element");
  const breakPlusElement = document.getElementById("break-plus-element");
  const sessionMinusElement = document.getElementById("session-minus-element");
  const sessionElement = document.getElementById("session-element");
  const sessionPlusElement = document.getElementById("session-plus-element");
  const timerMinutes = document.getElementById("timer-minutes");
  const timerSeconds = document.getElementById("timer-seconds");
  const playButton = document.getElementById("play-button");
  const pauseButton = document.getElementById("pause-button");
  const resetButton = document.getElementById("reset-button");
  const title = document.getElementById("title");

  reset();

  function updateUITimer(length) {
    if (Math.floor(length / 60).toString().length === 1) {
      timerMinutes.textContent = "0" + Math.floor(length / 60);
    } else {
      timerMinutes.textContent = Math.floor(length / 60);

    }

    if ((length % 60).toString().length === 1) {
      timerSeconds.textContent = "0" + (length % 60);
    } else {
      timerSeconds.textContent = length % 60;
    }

  }



  function reset() {
    isSessionMode = true;
    //breakSessionLength = FIVE_MINUTES;
    //sessionLength = TWENTYFIVE_MINUTES;
    breakSessionLength = 3;
    sessionLength = 3;
    // breakSessionElement.textContent = FIVE_MINUTES / 60;
    //sessionElement.textContent = TWENTYFIVE_MINUTES / 60;
    breakSessionElement.textContent = 0;
    sessionElement.textContent = 0;
    clearInterval(sessionTimer);
    timerMinutes.textContent = "00";
    timerSeconds.textContent = "03";
  }


  function startBreak() {
    clearInterval(sessionTimer);
    isSessionMode = false;
    title.textContent = "Break";
    breakTimer = setInterval(() => {
      breakSessionLength -= 1;
      updateUITimer(breakSessionLength);

      if (breakSessionLength === 0) {
        sessionLength = 5;

        updateUITimer(sessionLength);
        startSession();
      }

    }, 1000);
  }


  function startSession() {
    clearInterval(breakTimer);
    isSessionMode = true;
    title.textContent = "Session";


    sessionTimer = setInterval(() => {
      sessionLength -= 1;
      updateUITimer(sessionLength);

      if (sessionLength === 0) {
        sessionLength = parseInt(breakSessionElement.textContent, 10) * 60;
        updateUITimer(breakSessionLength);
        startBreak();

      }

    }, 1000);

  }



  playButton.addEventListener("click", () => {
    if (isSessionMode) {
      startSession();
    } else {
      startBreak();
    }
  });


  pauseButton.addEventListener("click", () => {
    if (isSessionMode) {
      clearInterval(sessionTimer)
      isSessionMode = false
    }

  });

  resetButton.addEventListener("click", () => {
    reset();
  });

  breakMinusElement.addEventListener("click", () => {
    breakSessionLength -= 60;
    breakSessionElement.textContent = breakSessionLength / 60;
  });



  breakPlusElement.addEventListener("click", () => {
    breakSessionLength += 60;
    breakSessionElement.textContent = breakSessionLength / 60;

  });



  sessionMinusElement.addEventListener("click", () => {
    sessionLength -= 60;
    sessionElement.textContent = sessionLength / 60;
    if (isSessionMode) {
      timerMinutes.textContent = sessionLength / 60;
    }

  });

  sessionPlusElement.addEventListener("click", () => {
    sessionLength += 60;
    sessionElement.textContent = sessionLength / 60;
    if (isSessionMode) {
      timerMinutes.textContent = sessionLength / 60;
    }

  });



}

export default App;
