import React, {Component} from 'react';
import { ActivityIndicator, FlatList, View, Dimensions} from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import R from 'ramda'
import SerpCard from './SerpCard'

const WIDTH = Dimensions.get('window').width

class Home extends Component {
  constructor(props){
    super(props)
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
        <SerpCard images={images} {...cardProps} index={obj.index} 
        onPress={this.props.onPress}
        navigation={this.props.navigation} handleLoadMore={this.props.handleLoadMore}/>
      </View>
    )
  }

  renderSeparator = () => (
    <View 
    style={{margin: 10, marginBottom: 0, height: 7, width: WIDTH, backgroundColor: '#BBBBBB'}}
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
        <FlatList
        contentContainerStyle = {{justifyContent: 'center', alignItems: 'center'}}
        data={this.props.list}
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        keyExtractor={(item,index) => R.toString(item.id)}
        onEndReached={this.props.handleLoadMore}
        onEndThreshold={0}
        />
    );
    }
    else{
      return(
        <View>
          <ActivityIndicator size="large" color="#BBBBBB" />
        </View>
      )
    }
  }
}

Home.propTypes = {
	list: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired
}

mapStatetoProps = ({serp}) => 
  ({list: serp.list, isLastPage: serp.isLastPage, page: serp.page})
export default connect(mapStatetoProps)(Home)