import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "0",
}

export const usertypeSlice = createSlice({
    name: 'userid',
    initialState,
    reducers: {
        setUserType: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserType } = usertypeSlice.actions

export default usertypeSlice.reducer