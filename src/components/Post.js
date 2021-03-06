import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { handleUpdatePost, handleVote, handleDeletePost } from '../actions/posts'
import { formatDate } from '../utils/helpers'
import '../styles/Post.css';

class Post extends Component {
  state = {
    category: this.props.post ? this.props.post.category : '',
    author: this.props.post ? this.props.post.author : '',
    title: this.props.post ? this.props.post.title : '',
    body: this.props.post ? this.props.post.body : '',
    edit: false,
    toHome: false
  }

  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    this.setState(() => ({
      [name]: value
    }))
  }

  editPost = () => {
    this.setState((prevState) => ({
      edit: !prevState.edit
    }))
  }

  vote = (e) => {
    const { dispatch, post } = this.props
    const name = e.target.getAttribute('name')

    dispatch(handleVote(post.id, name))
  }

  deletePost = () => {
    const { dispatch, post, showLink } = this.props

    dispatch(handleDeletePost(post.id))
    .then(() => {
      this.setState(() => ({
        toHome: true
      }))
    })

    //reloading webpage to update the post list on the dashboard page
    //doesn't reload if it is on the post details page since it is redirected
    if(showLink) {
      window.location.reload();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { category, author, title, body } = this.state
    const { dispatch, post } = this.props

    if (category !== '' && author !== '' && title !== '' && body !== '') {
      dispatch(handleUpdatePost(category, author, title, body, post.id))
      .then(() => {
        this.setState(() => ({
          edit: false
        }))
      })
    } else {
      alert("Options cannot be blank and cannot be the same. Try again.")
    }
  }

  render () {
    const { category, author, title, body, edit, toHome } = this.state
    const { post, showLink } = this.props

    if (toHome === true && !showLink) {
      return <Redirect to='/' />
    }

    return (
      post
        ? (
          edit
          ? (
            <div key={post.id}>
              <form className='update-post' onSubmit={this.handleSubmit}>
                <div className='update-post-category-label label'>Category</div>
                <input
                  name='category'
                  type='text'
                  className='update-post-category'
                  placeholder='Enter category'
                  value={category}
                  onChange={this.handleChange}
                />
                <div className='update-post-author-label label'>Author</div>
                <input
                  name='author'
                  type='text'
                  className='update-post-author'
                  placeholder='Enter username'
                  value={author}
                  onChange={this.handleChange}
                />
                <div className='update-post-title-label label'>Title</div>
                <input
                  name='title'
                  type='text'
                  className='update-post-title'
                  placeholder='Enter title'
                  value={title}
                  onChange={this.handleChange}
                />
                <div className='update-post-body-label label'>Comment</div>
                <textarea
                  name='body'
                  className='update-post-body'
                  placeholder='Enter post details...'
                  value={body}
                  onChange={this.handleChange}
                ></textarea>
                <button
                  className="update-post-submit"
                  type='submit'
                  align="center"
                >
                  Update Post
                </button>
              </form>
            </div>
          )
          : (
            <div className='post' key={post.id}>
              <div className='post-category'>{post.category}</div>
              <div className='post-author'>{post.author}</div>
              <div className='post-timestamp'>{formatDate(post.timestamp)}</div>
              <div className="vote post-circle">
                <div name="upVote" className="increment up" onClick={this.vote}></div>
                <div name="downVote" className="increment down" onClick={this.vote}></div>
                <div className="count">{post.voteScore}</div>
              </div>
              <div className='post-title'>{post.title}</div>
              <div className='post-body'>{post.body}</div>
              <div className='post-comments'>{post.commentCount} comments</div>
              { showLink
                ? <Link to={`/${post.category}/${post.id}`} className='post-details link'>View Details</Link>
                : <p className='post-details-link'></p>
              }

              <div className='post-edit link' onClick={this.editPost}>Edit Post</div>
              <div className='post-delete link' onClick={this.deletePost}>Delete Post</div>
            </div>
          )
        )
        : (
          <div></div>
        )
    )
  }
}

function mapStateToProps ({posts}, {id, showLink}) {
  return {
    post: posts[id],
    showLink
  }
}

export default connect(mapStateToProps)(Post)
