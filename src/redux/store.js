import { configureStore } from '@reduxjs/toolkit'
import useridReducer from './slices/userid'
import usernameReducer from './slices/username'
import usertypeReducer from './slices/usertype'

export const store = configureStore({
    reducer: {
        userid: useridReducer,
        username: usernameReducer,
        usertype: usertypeReducer,
    },
})