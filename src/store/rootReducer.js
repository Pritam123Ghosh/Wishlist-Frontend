import { combineReducers } from 'redux'

// // Import your reducers here
// import authReducer from './reducers/authReducer';
// import otherReducer from './reducers/otherReducer';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   other: otherReducer,

// });

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    ...asyncReducers,
  })
  return combinedReducer(state, action)
}

export default rootReducer
