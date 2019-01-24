import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
//import R from 'ramda'
import MyCarousel from './MyCarousel'
import PropTypes from 'prop-types'

export default class SerpCard extends React.PureComponent{
    constructor(props){
        super(props)
    }

    renderPrice = (minPrice,maxPrice) => {
        if(minPrice && maxPrice){
            return(
                <Text style={styles.price}>{'\u20B9'} {minPrice} - {maxPrice}</Text>
            )
        }
        else{
            return(
                <Text style={styles.price}>Price On Request</Text>
            )
        }
    }

    renderShowSqftRate = (showSqftRate, sqftRate) => {
        if(showSqftRate && sqftRate){
            return(
                <View style={{flexDirection: 'row'}}>
                    <View style={{height: 12, width: 1, backgroundColor: '#BBBBBB'}}/>
                    <Text style={{fontSize: 10}}>  {sqftRate} / sq.ft</Text>
                </View>
            )
        }
        else{
            return null
        }
    }
    
    onPress = () => this.props.navigation.navigate('Detail',{scrollIndex: this.props.index})

    render(){
        const {minPrice, maxPrice, title, sqftRate, showSqftRate,
            projectName, developer, locality} = this.props
        return(
            <View>
                <MyCarousel images={this.props.images} onPress={this.onPress}/>
                <TouchableOpacity style={{margin: 5}}
                onPress={this.onPress}>
                    <View style={{marginLeft: 10}}>
                        {this.renderPrice(minPrice,maxPrice)}
                        <Text style={styles.projectText}>{projectName}</Text>
                        <Text style={styles.developerText}>by {developer}</Text>
                        <Text style={styles.localityText}>{locality}</Text>
                        <View style={{flexDirection: 'row', marginTop: 3}}>
                            <Text style={{fontSize: 10}}>{title}  </Text>
                            {this.renderShowSqftRate(showSqftRate,sqftRate)}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

SerpCard.propTypes = {
    minPrice: PropTypes.string,
    maxPrice: PropTypes.string,
    images: PropTypes.array.isRequired,
    id: PropTypes.any.isRequired,
    sqftRate: PropTypes.string,
    showSqftRate: PropTypes.bool.isRequired,
    title: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    developer: PropTypes.string.isRequired,
    locality: PropTypes.string
}

const styles=StyleSheet.create({ 
    price: {
        marginTop: 5,
        fontSize: 17,
        //fontWeight: 'bold',
    },
    projectText: {
        fontSize: 15,
        marginTop: 5,
        fontWeight: 'bold'

    },
    developerText: {
        fontSize: 12,
        marginTop: 2,
        color: '#BBBBBB'
    },
    localityText: {
        fontSize: 12,
        marginTop: 7,
        color: '#CCCCCC'
    }
})