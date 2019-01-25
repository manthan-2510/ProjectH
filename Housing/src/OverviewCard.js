import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

class OverviewCard extends Component{
    constructor(props){
        super(props)
    }

    renderRow = (title, text, unit=null) => (
        <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.titleText}> {title} </Text>
                <Text style={styles.dataText}> {text} {unit}</Text>
        </View>
    )
    render(){
        const { index, info } = this.props
        if(info[index]){
            const { bhk, avgSqftPrice, projectSize,possessDate } = info[index]
            return(
                <View style={{alignContent:'stretch', marginTop: 10}}>
                    {this.renderRow('Configurations',bhk)}
                    {this.renderRow('Average Price',avgSqftPrice,' / sqft')}
                    {this.renderRow('Project Size',projectSize,' units')}
                    {this.renderRow('Possession',possessDate)}
                </View>
            )
        }
    }
}

mapStateToProps = ({details}) => ({
    info: details.infoCard
})
export default connect(mapStateToProps)(OverviewCard)

const styles=StyleSheet.create({ 
    price: {
        marginTop: 5,
        fontSize: 20,
    },
    titleText: {
        fontSize: 14,
        marginTop: 3,
        marginLeft: 10,
        alignItems: 'flex-start',
        color: '#AAAAAA'

    },
    dataText: {
        fontSize: 14,
        alignItems: 'flex-start',
        marginTop: 3,
        marginRight: 10
    },
})