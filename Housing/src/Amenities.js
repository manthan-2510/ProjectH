import React, {Component} from 'react'
import { View, Text, Modal, Image, StyleSheet, TouchableOpacity } from 'react-native'
import R from 'ramda'
import Grid from './Grid'
import maptoIcon from './IconMap'
import { connect } from 'react-redux'

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
    
    render(){
        const {index, amenitiesList} = this.props
        if(amenitiesList[index]){
            const { projectAmenities, flatAmenities } = amenitiesList[index]
            const projAmenity = this.filterList(projectAmenities)
            const flatAmenity = this.filterList(flatAmenities)
            const projAmenityList = Object.keys(projAmenity)
            let flatAmenityList = Object.keys(flatAmenity)
            flatAmenityList = flatAmenityList.map( amenity => 
                R.replace('_',' ',R.replace('has_','',amenity))
            )
            const total = projAmenityList.length+flatAmenityList.length
            const projectIcons = maptoIcon(projAmenityList)
            const flatIcons = maptoIcon(flatAmenityList)
            const icons = R.concat(projectIcons,flatIcons)
            let sample = []
            if(total>3){
                sample = R.slice(0,3,R.concat(projAmenityList,flatAmenityList))
            }
            else{
                sample = R.concat(projAmenityList,flatAmenityList)
            }
            sample = sample.map( (amenity,index) => {
                return(
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Image source={icons[index]} resizeMode='contain'
                        style={styles.imageThumbnail} />
                        <Text style={{fontSize: 7, textAlign:'center', flexGrow:1, width: 50}}>{amenity}</Text>
                    </View>
                )
            })
            return(
                <View style={{backgroundColor: 'white', flexDirection: 'row', borderRadius: 15}}>
                    { sample }
                    {   (total>3) ? 
                        (<View style={{justifyContent: 'center', alignContent:'center'}}>
                            <TouchableOpacity onPress={this.onPress}
                            style={styles.moreButton}>
                                <Text style={{color: 'blue'}}>+{total-3}</Text>
                                <Text style={{color:'blue', textAlign: 'left'}}>Amenities</Text>
                            </TouchableOpacity>
                        </View>): <View/>
                    }
                    <Modal animationType='slide'
                    visible={this.state.visible} transparent={false}>
                        <Grid data={{flatAmenity: flatAmenityList, projAmenity: projAmenityList,
                            projIcons: projectIcons, flatIcons: flatIcons}}
                         onClose = {this.onPress}/>
                    </Modal>
                </View>
            )

        }

    }
}

mapStateToProps = ({details}) => ({
    amenitiesList: details.amenities
})
export default connect(mapStateToProps)(Amenities)

const styles = StyleSheet.create({
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width: 50
    },
    moreButton: {
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70
    }
  });