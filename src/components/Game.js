import React, { Component } from 'react'
import Question from './Question';

const sampleQuestion = {
  question: "Who is making the Web standards?",
  answerChoices: [
    'Microsoft',
    'Google',
    'The World Wide Web Consortium',
    'Mozilla'
  ]
};

export default class Game extends Component {
  render() {
    return (
      <>
        <Question question={sampleQuestion}/>
      </>
    )
  }
}
