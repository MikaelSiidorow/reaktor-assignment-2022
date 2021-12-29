import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import liveReducer from './reducers/liveReducer'
import historyReducer from './reducers/historyReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  live: liveReducer,
  history: historyReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store