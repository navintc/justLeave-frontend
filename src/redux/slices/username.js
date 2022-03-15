import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "Amarabandu Roopasinghe",
}

export const usernameSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserName } = usernameSlice.actions

export default usernameSlice.reducer