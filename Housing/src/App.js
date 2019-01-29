import React, {Component} from 'react';
import { Provider } from 'react-redux'
import Root from './Root'
import {InnerGallery} from './Gallery'
import store from './reducer'
import { StackNavigator } from 'react-navigation'

const Navigator = StackNavigator({
  Home: {
    screen: Root
  },
  InnerScreen: {
    screen: InnerGallery
  }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
}