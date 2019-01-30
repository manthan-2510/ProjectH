import React,{ Component } from 'react'
import { Animated, View, Dimensions } from 'react-native'
import HomeScreen from './HomeScreen'
import DetailScreen from './Details'
import { connect } from 'react-redux'

const HEIGHT = Dimensions.get('window').height
const duration = 800

class Root extends Component{
  constructor(props){
    super(props)
    this.state={
      serpTop: new Animated.Value(0),
      galleryTop: new Animated.Value(HEIGHT),
      textTop: new Animated.Value(HEIGHT),
      viewTop: new Animated.Value(HEIGHT),
      serpOpacity: new Animated.Value(1),
      detailOpacity: new Animated.Value(0),
      isLoading: false,
      page: 0,
      id: 0,
      index: 0
    }
  }
  
  componentDidMount(){
		this.fetchRequest()
	}

  fetchRequest = (page=1) => {
    const api = `https://search.housing.com/api/v4/buy/index/filter?show_aggregations=false&routeType=search&routing_range=10&isCollection=true&collection_name=Luxury&city_uuid=a0fd32816f73961748cf&poly=a0fd32816f73961748cf&radius=500&routing_range_type=time&collection_ids=1&source=android&sort_key=relevance&p=${page}&results_per_page=10`
    fetch(api)
			.then( (response) => response.json())
      .then( (responseJson) => 
        this.props.dispatch( {type: 'SET_DATA',payload: {hits: responseJson.hits, isLastPage: responseJson.is_last_page}} 
      ))
      .then( () => this.setState( () => ({isLoading: false}) ))
			.catch( (error) => console.error(error) )
  }

	handleLoadMore = () => {
    const { page } = this.props
		if(!this.props.isLastPage && !this.state.isLoading && page>this.state.page){
      this.setState( () => ({isLoading: true, page: page}), () => this.fetchRequest(page))
		}
  }
  
  onPress = (id, index, itemRef) => {
    itemRef.measure((sourceX, sourceY, width, height, pageX, pageY) => {
    this.pos=pageY
    this.setState((prevState)=>({
      serpTop: prevState.serpTop,
      galleryTop: new Animated.Value(pageY),
      id: id,
      index: index
    }), () => Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.serpOpacity,{
          toValue: 0,
          duration: duration,
        }),
        Animated.timing(this.state.galleryTop,{
          toValue: 0,
          duration: duration,
        }),
        Animated.timing(this.state.viewTop,{
          toValue: 0,
          duration: 1
        }),
        Animated.timing(this.state.detailOpacity,{
          toValue: 1,
          duration: duration
        }),
        Animated.timing(this.state.textTop,{
          toValue: 0,
          duration: duration
        })
      ])
      ],
      Animated.timing(this.state.serpTop,{
        toValue: HEIGHT,
        duration: 1,
      })
    ).start() )
  })
}

onClose = () => {
  Animated.sequence([
    Animated.parallel([
    Animated.timing(this.state.serpTop,{
      toValue: 0,
      duration: duration,
    }),
    Animated.timing(this.state.galleryTop,{
      toValue: this.pos,
      duration: duration,
    }),
    Animated.timing(this.state.detailOpacity,{
      toValue: 0,
      duration: duration
    }),
    Animated.timing(this.state.serpOpacity,{
      toValue: 1,
      duration: duration
    }),
    Animated.timing(this.state.textTop,{
      toValue: HEIGHT,
      duration: duration
    })
  ]),
    Animated.timing(this.state.viewTop,{
      toValue: HEIGHT,
      duration: 1
    }),
    Animated.timing(this.state.galleryTop,{
      toValue: HEIGHT,
      duration: 1
    })]
).start()
}
  render(){
    return(
      <View>
          <Animated.View style={{top: this.state.serpTop}}
          opacity={this.state.serpOpacity}>
            <HomeScreen onPress={this.onPress} 
            handleLoadMore={this.handleLoadMore}/>
          </Animated.View>
          
            <DetailScreen
            navigation ={this.props.navigation} id={this.state.id} index={this.state.index} 
            onClose={this.onClose} handleLoadMore={this.handleLoadMore}
            galleryTop={this.state.galleryTop} viewTop={this.state.viewTop}
            textTop={this.state.textTop} opacity={this.state.detailOpacity}
            />
      </View>
    )
  }
}

mapStatetoProps = ({serp}) => 
  ({isLastPage: serp.isLastPage, page: serp.page})
export default connect(mapStatetoProps)(Root)