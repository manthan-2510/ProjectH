import React, {Component} from 'react';
import { View, Dimensions, Text, Animated, TouchableOpacity } from 'react-native'
import ConfigCard from './ConfigCard'
import PriceCard from './PriceCard'
import Gallery from './Gallery'
import OverviewCard from './OverviewCard'
import { connect } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures';
import Amenities from './Amenities';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

class Details extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentIndex: props.index,
            id: props.id,
        }
    }

    onSwipeLeft = (gestureState) => {
        const { handleLoadMore } = this.props
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

    componentWillReceiveProps(nextProps){
        const { idMap } = this.props
        if(nextProps.id!=this.props.id){
            this.setState(()=>({
                currentIndex: nextProps.index,
                id: nextProps.id
                }),()=>{
                    if(!idMap.has(nextProps.id)){
                        this.fetchData(nextProps.id)
                    }
            })
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
                <Animated.ScrollView style={{ position: 'absolute', top: this.props.viewTop, flex: 1, height: HEIGHT-100}}
                opacity={this.props.opacity}>
                    <Animated.View style={{top: this.props.galleryTop, flexDirection: 'row'}}>
                        <Gallery index={index} navigation={this.props.navigation}/>
                        <TouchableOpacity onPress={this.props.onClose} style={{top: 10, left: 10, backgroundColor:'transparent', position: "absolute"}}>
                            <Text style={{fontSize:30, color: '#5A5A5A'}}>x</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={{top: this.props.textTop}}>
                        <GestureRecognizer
                        onSwipeLeft={(state) => this.onSwipeLeft(state)}
                        onSwipeRight={(state) => this.onSwipeRight(state)}
                        config={config}>
                            {this.ItemSeparator()}
                            <PriceCard index={index}/>
                            {this.ItemSeparator()}
                            <OverviewCard index={index}/>
                            {this.ItemSeparator()}
                            <ConfigCard index={index}/>
                            <Amenities index={index}/>
                        </GestureRecognizer>
                    </Animated.View>
                </Animated.ScrollView>
            )
        }
        else{
            return(<View/>)
        }
    }
}

const mapStatetoProps = ({serp, details}) => ({idMap: details.idToIndex, maxIndex: serp.lastIndex, 
    serpIds: serp.ids, })
export default connect(mapStatetoProps)(Details)