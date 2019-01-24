import React, {Component} from 'react'
import { View, Image, FlatList } from 'react-native'
import MyCarousel from './MyCarousel'

export default class Gallery extends Component{
    constructor(props){
        super(props)
        //console.log(props)
        this.state = {
            images: []
        }
    }

    fetchData= (id) => {
        let api = `https://newprojects.housing.com/api/v3/new-projects/${id}/android`
        galleryImages = []
        fetch(api)
        .then( (response) => (
            response.json()
        ))
        .then( (responseJson) => {
            galleryImages = responseJson.gallery_images
            galleryImages.unshift(responseJson.cover_photo_url)
            return galleryImages
        })
        .then( (galleryImages) => {
            this.setState( ()=> ({images: galleryImages}))
        })
        .catch( (error) => {
            console.log(error)
        })
    }

    componentDidMount(){
        this.fetchData(this.props.id)
    }

    /* renderItem = ({item}) => {
        //console.log(item)
        const newImgUrl = R.replace('version','medium',item)
        return(
            <Image source={{uri: newImgUrl}} resizeMode='contain'
            style={{width: 370,height: 200}}
            />
        )
    } */
    render(){
        if(this.state.images[0]){
            //console.log(this.state.images)
            return(
                <MyCarousel images={this.state.images}/>
            )
        }
        else{
            return(
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'red'}}/>
            )
        }
    }
}