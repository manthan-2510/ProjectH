import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

class OverviewCard extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { index, info } = this.props
        if(info[index]){
            const { bhk, avgSqftPrice, projectSize,possessDate } = info[index]
            return(
                <View style={{alignContent:'stretch', flexDirection:'row', marginTop: 10}}>
                    <View style={{marginLeft: 20}}>
                        <Text style={styles.titleText}>Configurations</Text>
                        <Text style={styles.titleText}>Average Price</Text>
                        <Text style={styles.titleText}>Project Size</Text>
                        <Text style={styles.titleText}>Possession</Text>
                    </View>
                    <View style={{marginLeft: 50}}>
                        <Text style={styles.dataText}>{bhk}</Text>
                        <Text style={styles.dataText}>{avgSqftPrice} / sqft</Text>
                        <Text style={styles.dataText}>{projectSize} units</Text>
                        <Text style={styles.dataText}>{possessDate}</Text>
                    </View>
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
    titleText: {
        fontSize: 14,
        marginTop: 3,
        alignItems: 'flex-start',
        color: '#BBBBBB'

    },
    dataText: {
        fontSize: 14,
        alignItems: 'flex-start',
        marginTop: 3
    },
})