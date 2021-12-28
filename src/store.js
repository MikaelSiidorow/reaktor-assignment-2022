import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import liveReducer from './reducers/liveReducer'
import historyReducer from './reducers/historyReducer'

const reducer = combineReducers({
  live: liveReducer,
  history: historyReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store