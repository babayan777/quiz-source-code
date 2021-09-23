import React, {useState,useEffect} from "react";
import quizData from './data.json'
import Question from "./components/Question";
import Start from './components/Start'
import End from './components/End'

const App = () => {
  const [step,setStep] = useState(1);
  const [activeQuestion,setActiveQuestion] = useState(0);
  const [answers,setAnswers] = useState([]);
  const [data,setData]  = useState([]);
  const [loading,setLoading] = useState(true);
  const quizStartHandler = () => {
    setStep(2);
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
  }

  const getData = () => {
    fetch('./quiz.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    )
    .then(function(response){
      console.log(response);
      return response.json();
    })
    .then(function(myJson){
      console.log(myJson);
      setData([...data, ...myJson.data]);
      setLoading(false);
    });
  }

  useEffect(() => {
    getData()
  },[])

  return (

    <div className="App wrapper">
      {step === 1 && <Start onQuizStart={quizStartHandler}/>} 
      {step === 2 && !loading && <Question
        data={data[activeQuestion]}
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
