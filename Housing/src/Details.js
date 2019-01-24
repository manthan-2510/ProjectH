import React, {Component} from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import R from 'ramda'
import Gallery from './Gallery'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Details extends Component{
    constructor(props){
        super(props)
    }
    componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        //console.log(this.props)
    }

    renderItem = ({item}) => {
        return(
        <Gallery id={item}/>)
    }
    render(){
        if(this.props.ids[0]){
            const { scrollIndex } =this.props.navigation.state.params
            return(
                <View  style={{ flex: 1 }}>
                    <FlatList data={this.props.ids}
                    style={{flex: 1}}
                    horizontal
                    initialScrollIndex={scrollIndex}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderItem}
                    keyExtractor = {(id,index)=>(R.toString(id))}
                    />
                </View>
            )
        }
        else{
            return(
                <View style={{flex:1, justifyContent:'center', backgroundColor: 'red'}}/>
            )
        }
    }
}

const mapStatetoProps = (state) => ({ids: state.ids})
export default connect(mapStatetoProps)(Details)