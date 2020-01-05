import React, { Component } from 'react'
import Question from './Question';
import { loadQuestions } from "../helpers/QuestionsHelper";
import HUD from './HUD';
import SaveScoreForm from './SaveScoreForm';

export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0,
      done: false
    };
  }
  async componentDidMount() {
    try {
      const questions = await loadQuestions();
      this.setState({
        questions: questions
      }, () => {
        this.changeQuestion();
      });
    } catch (error) {
      console.error(error);
    }
  }

  changeQuestion = (bonus = 0) => {
    if(this.state.questions.length === 0) {
      return this.setState((prevState) => ({
        done: true,
        score: prevState.score + bonus
      }));
    }
    // get a random index of a question
    const randomQuestionIndex = Math.floor(Math.random() * this.state.questions.length)
    // we set the current question to the question at that random index
    const currentQuestion = this.state.questions[randomQuestionIndex];
    // remove that question from the questions going forward
    const remainingQuestions = [...this.state.questions];
    remainingQuestions.splice(randomQuestionIndex, 1);
    // update the state to reflect these changes
    this.setState((prevState) => ({
      questions: remainingQuestions,
      currentQuestion: currentQuestion,
      loading: false,
      score: prevState.score += bonus,
      questionNumber: prevState.questionNumber + 1
    }));
  }

  scoreSaved = () => {
    this.props.history.push('/');
  }
  
  render() {
    const { loading, done, currentQuestion, score, questionNumber } = this.state;
    return (
      <>
        {loading && !done && <div id="loader"/>}
        {!done && !loading && currentQuestion && (
          <>
          <HUD 
            score={score} 
            questionNumber={questionNumber}
          />
          <Question 
            question={currentQuestion} 
            changeQuestion={this.changeQuestion}
          />
          </>
        )}
        {done && <SaveScoreForm score={score} scoreSaved={this.scoreSaved}/>}
      </>
    )
  }
}
