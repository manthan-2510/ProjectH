import { createStore } from 'redux'
import R from 'ramda'

const initialState = {
    list: [],
    ids:[],
    isLastPage: false,
    page: 1
}

function listReducer(state=initialState,action){
    switch(action.type){
        case 'SET_DATA':
            let idList = []
            action.payload.hits.forEach(element => {
                idList.push(element.id)
            });
            return ({
                list: R.concat(state.list,action.payload.hits),
                ids: R.concat(state.ids,idList),
                isLastPage: action.payload.isLastPage,
                page: state.page+1
            })
        default:
            return state
    }
}

const store=createStore(listReducer)
export default store