import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "SX0000",
}

export const useridSlice = createSlice({
    name: 'userid',
    initialState,
    reducers: {
        setUserID: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserID } = useridSlice.actions

export default useridSlice.reducer