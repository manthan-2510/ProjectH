import React, {Component} from 'react'
import { View, Image, FlatList } from 'react-native'
import MyCarousel from './MyCarousel'
import { connect } from 'react-redux'

class Gallery extends Component{
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.imageUrls[this.props.index]){
            const {urls: images} = this.props.imageUrls[this.props.index]
            return(
                <MyCarousel images={images}/>
            )
        }
        else{
            return(
                //<View style={{flex: 1, justifyContent: 'center', backgroundColor: 'red'}}/>
                <View/>
            )
        }
    }
}

mapStateToProps = ({details}) => ({
    imageUrls: details.images
})
export default connect(mapStateToProps)(Gallery)

