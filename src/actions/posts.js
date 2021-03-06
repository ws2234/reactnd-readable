import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const DELETE_POST = 'DELETE_POST'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

export function incrementCounter (id) {
  return {
    type: INCREMENT_COUNTER,
    id,
  }
}

function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

function upVotePost (id) {
  return {
    type: UPVOTE_POST,
    id
  }
}

function downVotePost (id) {
  return {
    type: DOWNVOTE_POST,
    id
  }
}

function updatePost (id, category, author, title, body, timestamp) {
  return {
    type: UPDATE_POST,
    id,
    category,
    author,
    title,
    body,
    timestamp
  }
}

function deletePost (id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function handleNewPost (title, body, author, category) {
  return (dispatch) => {
    return ReadableAPI.postPost({
      title,
      body,
      author,
      category
    })
      .then((formattedPost) => {
        dispatch(addPost(formattedPost))
      })
  }
}

export function handleUpdatePost (category, author, title, body, id) {
  return (dispatch) => {
    const timestamp = Date.now()
    return Promise.all([
      ReadableAPI.updatePost(id, category, author, title, body, timestamp)
    ]).then(() => {
      dispatch(updatePost(id, category, author, title, body, timestamp))
    })
  }
}

export function handleVote (id, option) {
  return (dispatch) => {
    return Promise.all([
      ReadableAPI.votePost(id, option)
    ]).then(() => {
      option === 'upVote'
        ? dispatch(upVotePost(id))
        : dispatch(downVotePost(id))
    })
  }
}

export function handleDeletePost (id) {
  return (dispatch) => {
    return Promise.all([
      ReadableAPI.deletePost(id)
    ]).then(() => {
      dispatch(deletePost(id))
    })
  }
}
