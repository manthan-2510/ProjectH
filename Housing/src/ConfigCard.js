import React, { Component } from 'react'
import { FlatList, View, Dimensions, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import R from 'ramda'

const WIDTH = Dimensions.get('window').width

class ConfigCard extends Component{
    constructor(props){
        super(props)
    }

    extractData = (list) => {
        const filteredList = list.map(item => {
            const { apartment_group_name: bhk, formatted_price: price, formatted_selected_area: area } = item
            return { bhk, price, area }
        })
        return filteredList
    }

    sortConfigs = (list) => {
        const listSort = R.sortWith([
            R.ascend(R.prop('bhk')),
            R.ascend(R.prop('price')),
            R.descend(R.prop('area'))
        ])
        return listSort(list)
    }

    ItemSeparator = () => (
        <View style={{marginTop: 5, height: 3, width: WIDTH, backgroundColor: '#BBBBBB'}}/>
    )

    renderPrice= (price) =>{
        if(price=== null){
            return(
                <Text style={{textAlign: 'center', margin: 5}}>Price On Request</Text>
            )
        }
        else{
            return(
                <Text style={{textAlign: 'center', margin: 5}}>{price} </Text>
            )
        }
    }
    renderItem = ({item}) => (
        <View style={styles.tableContent}>
            <Text style={{textAlign: 'center', margin: 5}}>{item.bhk}</Text>
            <Text style={{textAlign: 'center'}}>{item.area} sqft</Text>
            {this.renderPrice(item.price)}
        </View>
    )
    /* filterData = (sortedList) => {

    } */
    render(){
        const { index, data } = this.props
        if(data[index]){
            const { configs } = data[index]
            const reqList = this.sortConfigs(this.extractData(configs))
            return(
                <View style={{alignContent: "center",justifyContent: 'center', marginBottom: 20}}>
                    <View style={styles.tableTitle}>
                        <Text style={styles.textTitle}>Type</Text>
                        <Text style={styles.textTitle}>Saleable Area</Text>
                        <Text style={styles.textTitle}>Base price</Text>
                    </View>
                    <FlatList
                    data={reqList}
                    keyExtractor={(item, index) => R.toString(index)}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.ItemSeparator}
                    />
                </View>
            )
        }
        else{
            return(<View/>)
        }
    }

}

mapStateToProps = ({details}) => ({
    data: details.configCard
})
export default connect(mapStateToProps)(ConfigCard)

const styles = StyleSheet.create({
    tableTitle: {
        flexDirection:'row',
        backgroundColor: '#8A8A8A',
        justifyContent: "space-between"
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 12,
        margin: 5,
        color: 'white'
    },
    tableContent: {
        flexDirection:'row',
        justifyContent: "space-around"
    }
})