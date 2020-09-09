import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import NewComment from './NewComment'
import CommentList from './CommentList'

class Details extends Component {
  render () {
    console.log("hello")
    return (
      <div>
        <Post id="6ni6ok3ym7mf1p33lnez" />
        <NewComment pid="6ni6ok3ym7mf1p33lnez" />
        <CommentList pid="6ni6ok3ym7mf1p33lnez" />
      </div>
    )
  }
}

export default connect()(Details)
