import React, { Component } from 'react'
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import R from 'ramda'

export default class Grid extends Component{
    constructor(props){
        super(props)
    }

    renderItem = (item,icon) => (
        <View style={{ flex: 1, flexDirection: 'column'}}>
            <Image source={icon} resizeMode='contain'
            style={styles.imageThumbnail} />
            <Text style={{fontSize: 7, flexGrow: 1, textAlign: 'center', width: 50}}>{item}</Text>
        </View>
    )

    render(){
        const { projAmenity, flatAmenity, projIcons, flatIcons } = this.props.data
        return(
            <View style={{backgroundColor: 'white'}}>
                <TouchableOpacity onPress={this.props.onClose} 
                style={{left: 20, top: 40}}>
                    <Text style={{fontSize: 20}}>x</Text>
                </TouchableOpacity>

                {   (projAmenity && projAmenity[0]) ?
                    (<View style={{marginTop: 50}}>
                        <Text style={styles.title}>Project Amenities</Text>
                        <FlatList data={projAmenity}
                        keyExtractor={(item,index) => R.toString(index)}
                        numColumns={4}
                        scrollEnabled={false} renderItem={ ({item,index}) => this.renderItem(
                         item, projIcons[index] )}/>
                    </View>) : <View/>
                }

                {   (flatAmenity && flatAmenity[0]) ?
                    (<View style={{marginTop: 50}}>
                        <Text style={styles.title}>Flat Amenities</Text>
                        <FlatList data={flatAmenity}
                        keyExtractor={(item,index) => R.toString(index)}
                        numColumns={4}
                        contentContainerStyle={{margin:20}}
                        scrollEnabled={false} renderItem={ ({item,index}) => this.renderItem(
                            item, flatIcons[index] )}/>
                    </View>) : <View/>
                }
            </View>
        )
    }
}

const styles=StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 10
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50
      },
})