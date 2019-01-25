import React, {Component} from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import R from 'ramda'
import PriceCard from './PriceCard'
import Gallery from './Gallery'
import OverviewCard from './OverviewCard'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Details extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { id } = this.props.navigation.state.params
        const { idMap } = this.props
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

    /* componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        //console.log(this.props)
    } */

    render(){
        const { idMap } = this.props
        const { id } =this.props.navigation.state.params
        if(idMap.has(id)){
            index=idMap.get(id)
            return(
                <View>
                    <Gallery index={index}/>
                    <PriceCard index={index}/>
                    <OverviewCard index={index}/>
                </View>
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

const mapStatetoProps = ({details}) => ({idMap: details.idToIndex})
export default connect(mapStatetoProps)(Details)