import React, {Component} from 'react'
import { View, Text, Modal, Image, FlatList } from 'react-native'
import R from 'ramda'
import { connect } from 'react-redux'

const sampleIcon = require('../assets/icons/icon-bed.png')

class Amenities extends Component{
    constructor(props){
        super(props)
        this.state={
            visible: false
        }
    }
    filterList = (list) =>{
        const isTrue = value => value
        return R.filter(isTrue, list)
    }
    onPress = () => {
        this.setState( (prevState) => ({
            visible: !prevState.visible
        }))
    }
    renderItem = ({item}) => (
        <View>
            <Image source={sampleIcon} resizeMode='contain'
            style={{height: 30, width: 30}} />
            <Text style={{fontSize: 9, textAlign: 'center', justifyContent:'center', width: 40}}>{item}</Text>
        </View>
    )
    render(){
        const {index, amenitiesList} = this.props
        if(amenitiesList[index]){
            const { projectAmenities, flatAmenities } = amenitiesList[index]
            const projAmenity = this.filterList(projectAmenities)
            const flatAmenity = this.filterList(flatAmenities)
            const projAmenityList = Object.keys(projAmenity)
            const flatAmenityList = Object.keys(flatAmenity)
            const total = projAmenityList.length+flatAmenityList.length
            let flatListData = []
            if(total>4){
                flatListData = R.slice(0,3,R.concat(projAmenityList,flatAmenityList))
            }
            else{
                flatListData = R.concat(projAmenityList,flatAmenityList)
            }
            return(
                <View style={{backgroundColor: 'white', height: 60}}>
                    <FlatList data={flatListData}
                    keyExtractor={(item,index) => R.toString(index)}
                    horizontal contentContainerStyle={{alignContent:'center', justifyContent:'space-evenly'}}
                    scrollEnabled={false} renderItem={this.renderItem}/>
                </View>
            )

        }

    }
}

mapStateToProps = ({details}) => ({
    amenitiesList: details.amenities
})
export default connect(mapStateToProps)(Amenities)