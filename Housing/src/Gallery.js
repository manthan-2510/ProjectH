import React, {Component} from 'react'
import { View, Image, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import R from 'ramda'
import { connect } from 'react-redux'

const WIDTH = Dimensions.get('screen').width

export class InnerGallery extends Component{
    constructor(props){
        super(props)
    }
    renderItem = (obj) => {
        const {item} = obj
        let imgUrl = ''
        if(item){
            imgUrl = R.replace('version','medium',item)
        }
        const {length: maxNum} = this.props.navigation.state.params.data
        return(
            <View style={{alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                    {obj.index+1} of {maxNum}
                </Text>
                <Image
                    source={{uri: imgUrl}}
                    resizeMode='cover'
                    style={{height: 200, width: WIDTH}}
                />
            </View>
        )
    }
    render(){
        const { index, data } = this.props.navigation.state.params
        return(
            <View style={{justifyContent: "center", backgroundColor:'black', flex: 1}}>
                <FlatList
                data={data}
                renderItem={this.renderItem}
                horizontal
                pagingEnabled
                initialScrollIndex={index}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item,index)=>R.toString(index)}
                />
            </View>
        )
    }
}

class Gallery extends Component{
    constructor(props){
        super(props)
    }

    renderItem = (obj) => {
        const {item} = obj
        let imgUrl = ''
        if(item){
            imgUrl = R.replace('version','medium',item)
        }
        return(
            <TouchableOpacity style={{margin: 5}}
            onPress={() => this.props.navigation.navigate('InnerScreen',
                    {data: this.data, index:obj.index})}>
                <Image
                    source={{ uri: imgUrl }}
                    resizeMode='cover'
                    style={styles.propertyImg}
                />
            </TouchableOpacity>
        )
    }

    render(){
        if(this.props.imageUrls[this.props.index]){
            const {urls: images} = this.props.imageUrls[this.props.index]
            this.data=images
            return(
                <FlatList
                data={images}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderItem}
                horizontal
                keyExtractor={(item,index)=>R.toString(index)}
                />
            )
        }
        else{
            return(<View/>)
        }
    }
}

mapStateToProps = ({details}) => ({
    imageUrls: details.images
})
export default connect(mapStateToProps)(Gallery)

const styles=StyleSheet.create({
    propertyImg: {
        height: 200,
        width: 350,
        borderRadius: 15,
        marginTop: 10,
        alignSelf: 'flex-start'
    }
})