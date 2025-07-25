import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
  drops:localStorage.getItem("drops")
  ? JSON.parse(localStorage.getItem("drops"))
  : []
}

const dropSlice = createSlice({
  name:  "drop",
  initialState,
  reducers: {
    addDrops: (state,action) => {
      const drop = action.payload;
      const index = state.drops.findIndex((item) => item._id === drop._id)

      if (index >= 0){
        toast.error("Drop already exist.")
        return
      }
      state.drops.push(drop)

      localStorage.setItem("drops", JSON.stringify(state.drops))
      toast.success("Drop added  Successfully", {
        position: "top-right"
      });
      
    },
    updateDrops: (state,action) => {
      const drop = action.payload
      const index = state.drops.findIndex((item) => item._id === drop._id)

      if (index >= 0){
        state.drops[index] = drop

        localStorage.setItem("drops", JSON.stringify(state.drops))

      toast.success("Drop Updated Successfully", {
        position: "top-right"
      })

      }
    },

   
    removeDrops: (state, action) => {

      const dropId = action.payload

      const index = state.drops.findIndex((item) => item._id === dropId)

      if(index >= 0) {
        state.drops.splice(index, 1)

        localStorage.setItem("drops", JSON.stringify(state.drops))

        toast.success("Drop has been deleted", {
        position: "top-right"
      })
      }
    },
     resetDrops: (state) => {

      state.drops = []

      localStorage.removeItem("drops")
    },
  },
})

// Action creators are generated for each case reducer function
export const { addDrops, updateDrops, resetDrops, removeDrops} = dropSlice.actions

export default dropSlice.reducer