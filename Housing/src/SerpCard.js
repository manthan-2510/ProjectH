import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import R from 'ramda'
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
    renderImages = ({item}) => {
        const imgUrl = R.replace('version','medium',item)
        const { id, index } = this.props
        return(
            <TouchableOpacity style={{margin: 5}}
            onPress={() => this.props.onPress(id,index,this.card)}>
                <Image
                    source={{ uri: imgUrl }}
                    resizeMode='cover'
                    style={styles.propertyImg}
                />
            </TouchableOpacity>
        )
    }

    render(){
        const {minPrice, maxPrice, title, sqftRate, showSqftRate,
            projectName, developer, locality, id, index} = this.props
        return(
            <View ref = { card => this.card = card}>
                <FlatList data={this.props.images}
                style={{marginLeft: 10}}
                renderItem={this.renderImages}
                showsHorizontalScrollIndicator={false}
                horizontal keyExtractor={(item,index)=>R.toString(index)}/>
                <TouchableOpacity style={{margin: 5}}
                onPress={() => this.props.onPress(id, index, this.card)}>
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
    propertyImg: {
        height: 200,
        width: 350,
        borderRadius: 15,
        marginTop: 10,
        alignSelf: 'flex-start'
    },
    price: {
        marginTop: 5,
        fontSize: 17,
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