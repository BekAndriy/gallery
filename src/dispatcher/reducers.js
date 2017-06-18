import { combineReducers, createStore } from 'redux'
import { user} from './actions'

const rootReducer = combineReducers({
  user
});

export default createStore(rootReducer);









// store.subscribe(() => {
//   console.log(store.getState());
// });
//store.dispatch({ type: 'ADD_TODO', user: response })