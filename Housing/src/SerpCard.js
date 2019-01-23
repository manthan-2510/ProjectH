import React, {Component} from 'react';
import { Image, View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import R from 'ramda'
import PropTypes from 'prop-types'

export default class SerpCard extends Component{
    constructor(props){
        super(props)
    }

    renderitem = ({item}) => {
        const imgUrl = R.replace('version','medium',item.absolute_url)
        return(
            <Image
                source={{ uri: imgUrl }}
                resizeMode='cover'
                style={styles.propImg}
            />
        )
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

    render(){
        const {minPrice, maxPrice, title, sqftRate, showSqftRate,
             id, projectName, developer, locality} = this.props
        return(
            <TouchableOpacity style={{margin: 5}}>
                <Carousel //ref={c => this._slider1Ref = c}
                //style={{alignContent: 'center', justifyContent:"center"}}
                data={this.props.images}
                renderItem={this.renderitem}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.2}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={350}
                layout={'stack'} layoutCardOffset={10}
                />
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
    propImg: {
        height: 200,
        width: 350,
        borderRadius: 15,
        marginTop: 10,
        alignSelf: 'flex-start'
    },
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