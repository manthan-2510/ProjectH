import React, {Component} from 'react';
import { View, Dimensions} from 'react-native'
import R from 'ramda'
import PriceCard from './PriceCard'
import Gallery from './Gallery'
import OverviewCard from './OverviewCard'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const WIDTH = Dimensions.get('window').width

const config = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 30
  };

class Details extends Component{
    constructor(props){
        super(props)
        const {id, serpIndex} = props.navigation.state.params
        this.state = {
            currentIndex: serpIndex,
            id: id,
        }
    }

    onSwipeLeft = (gestureState) => {
        const { handleLoadMore } = this.props.navigation.state.params
        const { idMap, maxIndex, serpIds } = this.props
        const { currentIndex } = this.state
        const nextIdIndex = currentIndex + 1
        if(nextIdIndex > maxIndex){
            handleLoadMore()
        }
        if(nextIdIndex<=maxIndex){
            const nextId=serpIds[nextIdIndex]
            if(!idMap.has(nextId)){
                this.fetchData(nextId)
            }
            this.setState({
                id: nextId,
                currentIndex: nextIdIndex
            })
        }
    }

    onSwipeRight = (gestureState) => {
        const { idMap, serpIds } = this.props
        const { currentIndex } = this.state
        const prevIdIndex = currentIndex - 1
        if(prevIdIndex >= 0){
            const prevId=serpIds[prevIdIndex]
            if(!idMap.has(prevId)){
                this.fetchData(prevId)
            }
            this.setState({
                id: prevId,
                currentIndex: prevIdIndex
            })
        }
    }

    componentDidMount(){
        const { idMap } = this.props
        const { id } = this.state
        if(!idMap.has(id)){
            this.fetchData(id)
        }
    }

    fetchData= (id) => {
        let api = `https://newprojects.housing.com/api/v3/new-projects/${id}/android`
        fetch(api)
        .then( (response) => (
            response.json()
        ))
        .then( (responseJson) => {
            this.props.dispatch({type: 'SET_DETAILS', payload: {data: responseJson}})
        })
        .catch( (error) => {
            console.log(error)
        })
    }

    ItemSeparator = () => (
        <View style={{marginTop: 20, height: 7, width: WIDTH, backgroundColor: '#BBBBBB'}}/>
    )

    render(){
        const { idMap } = this.props
        const { id } =this.state
        if(idMap.has(id)){
            index=idMap.get(id)
            return(
                <GestureRecognizer
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}>
                    <Gallery index={index}/>
                    {this.ItemSeparator()}
                    <PriceCard index={index}/>
                    {this.ItemSeparator()}
                    <OverviewCard index={index}/>
                </GestureRecognizer>
            )
        }
        else{
            return(
                //<View style={{flex:1, justifyContent:'center', backgroundColor: 'red'}}/>
                <View/>
            )
        }
    }
}

const mapStatetoProps = ({serp, details}) => ({idMap: details.idToIndex, maxIndex: serp.lastIndex, 
    serpIds: serp.ids, })
export default connect(mapStatetoProps)(Details)