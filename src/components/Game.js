import React, { Component } from 'react'
import Question from './Question';
import { loadQuestions } from "../helpers/QuestionsHelper";

export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null
    };
  }
  async componentDidMount() {
    try {
      const questions = await loadQuestions();
      this.setState({
        questions: questions,
        currentQuestion: questions[0]
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  render() {
    return (
      <>
        {this.state.currentQuestion && (
          <Question question={this.state.currentQuestion}/>
        )}
      </>
    )
  }
}
