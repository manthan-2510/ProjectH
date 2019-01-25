/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, FlatList, View, Dimensions} from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import R from 'ramda'
import SerpCard from './SerpCard'

const WIDTH = Dimensions.get('window').width

class Root extends Component {
	constructor(props){
    super(props)
    this.state={
      isLoading: false,
      page: 0
    }
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

	componentDidMount(){
		this.fetchRequest()
	}

	componentWillReceiveProps(nextProps){
		//console.log(nextProps)
	}

  processCardDetails = (item) => {
    const {formatted_min_price: minPrice, formatted_max_price: maxPrice, title, 
      formatted_per_sqft_rate:sqftRate, show_per_sqft_rate: showSqftRate, id, name: projectName} =item
    const { name: developer } = item.developer_information[0]
    const locality = R.join(', ',item.display_neighbourhood)
    const cardProps = {minPrice, maxPrice, title, sqftRate, showSqftRate, id, projectName, developer, locality}
    return cardProps
  }

	renderItem = (obj) => {
    const {item} = obj
    cardProps = this.processCardDetails(item)
    let images=[]
    item.gallery_images.forEach((image) => {
      images.push(image.absolute_url)
    })
    return(
      <View style={{flexDirection: 'row'}}>
        <SerpCard images={images} {...cardProps} index={obj.index} navigation={this.props.navigation}/>
      </View>
    )
  }

  renderSeparator = () => (
    <View 
    style={{margin: 10, height: 7, width: WIDTH, backgroundColor: '#BBBBBB'}}
    />
  )

  renderFooter = () => (
    <View>
          <ActivityIndicator size="small" color="#BBBBBB" />
        </View>
  )
  
  render() {
    if(this.props.list && this.props.list.length){
    return (
      <View style={{marginTop: 20, alignContent: 'center', justifyContent: 'center'}}>
        <FlatList
        //style={{flex: 1}}
        contentContainerStyle = {{justifyContent: 'center', alignItems: 'center'}}
        data={this.props.list}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        // ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        keyExtractor={(item,index) => R.toString(item.id)}
        onEndReached={this.handleLoadMore}
        onEndThreshold={0}
        />
      </View>
    );
    }
    else{
      return(
        <View>
          <ActivityIndicator size="small" color="#BBBBBB" />
        </View>
      )
    }
  }
}

Root.propTypes = {
	list: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired
}

mapStatetoProps = ({serp}) => 
  ({list: serp.list, isLastPage: serp.isLastPage, page: serp.page})
export default connect(mapStatetoProps)(Root)

