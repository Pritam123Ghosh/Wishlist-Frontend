// import { PERSIST_STORE_NAME } from '../constants/app.constant'
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const middlewares = [thunk]

const persistConfig = {
  key: 'Wish List',
  keyPrefix: '',
  storage,
}

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer()),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
})

store.asyncReducers = {}

export const persistor = persistStore(store)

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return false
  }
  store.asyncReducers[key] = reducer
  store.replaceReducer(
    persistReducer(persistConfig, rootReducer(store.asyncReducers))
  )
  persistor.persist()
  return store
}

export default store
