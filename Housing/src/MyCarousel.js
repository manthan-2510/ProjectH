import React,{ Component } from 'react'
import Carousel  from 'react-native-snap-carousel'
import { Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import R from 'ramda'

export default class MyCarousel extends Component{
    constructor(props){
        super(props)
    }
    renderItem = ({item}) => {
        const imgUrl = R.replace('version','medium',item)
        return(
            <TouchableOpacity style={{margin: 5}}
            onPress={this.props.onPress}>
                <Image
                    source={{ uri: imgUrl }}
                    resizeMode='cover'
                    style={styles.propertyImg}
                />
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <Carousel //ref={c => this._slider1Ref = c}
                //style={{alignContent: 'center', justifyContent:"center"}}
                data={this.props.images}
                renderItem={this.renderItem}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.2}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={350}
                layout={"stack"} layoutCardOffset={10}
            />
        )
    }
}

const styles=StyleSheet.create({
    propertyImg: {
        height: 200,
        width: 350,
        borderRadius: 15,
        marginTop: 10,
        alignSelf: 'flex-start'
    }
})