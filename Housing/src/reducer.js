import { createStore } from 'redux'
import R from 'ramda'

const initialState = {
    list: [],
    isLastPage: false,
    page: 1
}

function listReducer(state=initialState,action){
    switch(action.type){
        case 'SET_DATA':
            return ({
                list: R.concat(state.list,action.payload.hits),
                isLastPage: action.payload.isLastPage,
                page: state.page+1
            })
        default:
            return state
    }
}

const store=createStore(listReducer)
export default store