import React, {useState,useEffect} from "react";
import quizData from './data.json'
import Question from "./components/Question";
import Start from './components/Start'
import End from './components/End'

const App = () => {
  const [step,setStep] = useState(1);
  const [activeQuestion,setActiveQuestion] = useState(0);
  const [answers,setAnswers] = useState([]);

  const quizStartHandler = () => {
    setStep(2);
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
  }



  return (
    <div className="App wrapper">
      {step === 1 && <Start onQuizStart={quizStartHandler}/>} 
      {step === 2 && <Question
        data={quizData.data[activeQuestion]}
        onAnswerUpdate = {setAnswers}
        numberOfQuestion = {quizData.data.length}
        activeQuestion = {activeQuestion}
        onSetActiveQuestion = {setActiveQuestion}
        onSetStep = {setStep}
      /> } 
      {step === 3 && <End
        results={answers}
        data={quizData.data}
        onReset={resetClickHandler}
        onAnswerCheck={() => {}}
      />}
    </div>
  );
}

export default App;
