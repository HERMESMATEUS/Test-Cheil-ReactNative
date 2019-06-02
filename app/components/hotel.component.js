import React, { Component } from 'react';
import { View, Image, Text } from 'react-native'
import Styles from './styles';
export default class HotelsComponent extends Component {

  render() {

    const { hotel, k } = this.props;

    return (
      <View key={k} style={Styles.View1} >
        <Image style={Styles.Image1} source={{ uri: 'https://q-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg' }} />

        <Text style={{ fontWeight: 'bold' }}>{hotel.name}</Text>
        <Text>{hotel.stars}</Text>
        <Text>{hotel.price}</Text>

        <Text style={{ fontWeight: 'bold' }}>amenities</Text>

        {
          hotel.amenities.map((item, k) => {
            return (
              <Text key={k}> * {item}</Text>
            );
          })
        }

      </View>
    );
  }

}