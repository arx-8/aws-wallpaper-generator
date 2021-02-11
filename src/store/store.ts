import { isDevelopment } from "constants/Env"
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from "redux"
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant"
import { createSerializableStateInvariantMiddleware } from "redux-starter-kit"
import thunkMiddleWare from "redux-thunk"

export type RootState = Readonly<{}>

export const configureStore = (
  initialState: Partial<RootState> = {}
): Store<RootState, AnyAction> => {
  const rootReducer = combineReducers<RootState>({})

  // Connect Chrome Redux DevTools, if installed.
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleWares = []
  middleWares.push(thunkMiddleWare)
  if (isDevelopment) {
    middleWares.push(immutableStateInvariantMiddleware())
    middleWares.push(createSerializableStateInvariantMiddleware())
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWares))
  )
  return store
}
