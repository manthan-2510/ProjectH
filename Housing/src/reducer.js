import { createStore, combineReducers } from 'redux'
import R from 'ramda'

const initialState = {
    list: [],
    ids:[],
    isLastPage: false,
    lastIndex: 0,
    page: 1
}

const initialDetailState = {
    images: [],
    priceCard: [],
    infoCard: [],
    configCard: [],
    ameneties: [],
    developerInfo: [],
    idToIndex: new Map(),
    index: 0
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
                page: state.page+1,
                lastIndex: state.lastIndex+action.payload.hits.length - 1
            })
        default:
            return state
    }
}

function extractImages(data){
    const {gallery_images: galleryImages} = data
    galleryImages.unshift(data.cover_photo_url)
    return {urls: galleryImages}
}

function extractPriceCard(data){
    let developername
    if(data.developer_information && data.developer_information.length){
        let {name} = data.developer_information[0]
        developerName = name
    }
    const { name: projectName, formatted_min_price: minPrice, formatted_max_price: maxPrice } = data
    return {projectName, developerName, minPrice, maxPrice}
}

function extractInfoCard(data){
    const {title: bhk, formatted_avg_per_sqft_rate: avgSqftPrice, number_of_flats: projectSize, possession_date: possessDate} = data
    return {bhk, avgSqftPrice, projectSize,possessDate}
}

function extractDeveloperInfo(data){
    const { name: developer, profile_picture_url: developerImg, description } = data.developer_information[0]
    return {developer, developerImg, description}
}

function DetailsReducer(state=initialDetailState, action){
    switch(action.type){
        case 'SET_DETAILS':
            const { data } = action.payload
            currentImages = extractImages(data)
            currentPriceCard = extractPriceCard(data)
            currentInfoCard = extractInfoCard(data)
            currentDeveloperInfo = extractDeveloperInfo(data)

            currentConfigCard = {configs: data.inventory_configs}
            const { ameneties_hash: projectAmeneties } = data.clubhouse
            const { inventory_ameneties: flatAmeneties } = data
            currentAmeneties = { projectAmeneties, flatAmeneties}

            const { id } = data
            currentMap = new Map(state.idToIndex)
            currentMap.set(id,state.index)
            return({
                images: state.images.concat(currentImages),
                priceCard: state.priceCard.concat(currentPriceCard),
                infoCard: state.infoCard.concat(currentInfoCard),
                configCard: state.configCard.concat(currentConfigCard),
                ameneties: state.ameneties.concat(currentAmeneties),
                developerInfo: state.developerInfo.concat(currentDeveloperInfo),
                idToIndex: currentMap,
                index: state.index+1
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({serp: listReducer, details: DetailsReducer})
const store=createStore(rootReducer)
export default store