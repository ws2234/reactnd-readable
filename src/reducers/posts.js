import { RECEIVE_POSTS, INCREMENT_COUNTER, ADD_POST, UPDATE_POST, UPVOTE_POST, DOWNVOTE_POST, DELETE_POST } from '../actions/posts'

export default function posts (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        ...action.posts
      }
    case INCREMENT_COUNTER :
      const { id } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          commentCount: state[id].commentCount + 1
        }
      }
    case ADD_POST :
      const { post } = action

      return {
        ...state,
        [post.id]: post
      }
    case UPDATE_POST :
      const { category, author, title, body, timestamp } = action

      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          category,
          author,
          title,
          body,
          timestamp
        }
      }
    case UPVOTE_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: state[action.id].voteScore + 1
        }
      }
    case DOWNVOTE_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: state[action.id].voteScore - 1
        }
      }
    case DELETE_POST :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      }
    default :
      return state
  }
}
