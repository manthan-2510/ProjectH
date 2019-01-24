/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux'
import Root from './Root'
import Details from './Details'
import store from './reducer'
import { StackNavigator } from 'react-navigation'

const Navigator = StackNavigator({
  Home: {
    screen: Root
  },
  Detail: {
    screen: Details
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