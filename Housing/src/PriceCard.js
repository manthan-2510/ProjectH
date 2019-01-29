import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

class PriceCard extends Component{
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

    render(){
        const { index, priceInfo } = this.props
        if(priceInfo[index]){
            const { projectName, developerName, minPrice, maxPrice } = priceInfo[index]
            return(
                <View style={{marginLeft: 10}}>
                    <Text style={styles.projectText}>{projectName}</Text>
                    <Text style={styles.developerText}>by {developerName}</Text>
                    {this.renderPrice(minPrice,maxPrice)}
                </View>
            )
        }
    }
}


mapStateToProps = ({details}) => ({
    priceInfo: details.priceCard
})
export default connect(mapStateToProps)(PriceCard)

const styles=StyleSheet.create({ 
    price: {
        marginTop: 5,
        fontSize: 20,
    },
    projectText: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: 'bold'

    },
    developerText: {
        fontSize: 12,
        marginTop: 2,
        color: '#BBBBBB'
    },
})