import React, { Component } from 'react'
import Question from './Question';
import { loadQuestions } from "../helpers/QuestionsHelper";

export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true
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

  changeQuestion = () => {
    // get a random index of a question
    const randomQuestionIndex = Math.floor(Math.random() * this.state.questions.length)
    // we set the current question to the question at that random index
    const currentQuestion = this.state.questions[randomQuestionIndex];
    // remove that question from the questions going forward
    const remainingQuestions = [...this.state.questions];
    remainingQuestions.splice(randomQuestionIndex, 1);
    // update the state to reflect these changes
    this.setState({
      questions: remainingQuestions,
      currentQuestion: currentQuestion,
      loading: false
    });
  }
  
  render() {
    return (
      <>
        {this.state.loading && <div id="loader"/>}
        {!this.state.loading && this.state.currentQuestion && (
          <Question question={this.state.currentQuestion}/>
        )}
      </>
    )
  }
}
