import React, { Component } from 'react'
import Question from './Question';
import { loadQuestions } from "../helpers/QuestionsHelper";
import HUD from './HUD';

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
      return this.setState({
        done: true
      });
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
  
  render() {
    return (
      <>
        {this.state.loading && !this.state.done && <div id="loader"/>}
        {!this.state.done && !this.state.loading && this.state.currentQuestion && (
          <>
          <HUD 
            score={this.state.score} 
            questionNumber={this.state.questionNumber}
          />
          <Question 
            question={this.state.currentQuestion} 
            changeQuestion={this.changeQuestion}
          />
          </>
        )}
        {this.state.done && <h1>DONE!!</h1>}
      </>
    )
  }
}
