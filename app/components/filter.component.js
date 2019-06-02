import React, { Component } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import Styles from './styles';

export default class FilterComponent extends Component {

  render() {
    const { callbackStars, valueStars, valueName, callbackName, filterButton } = this.props;
    return (
      <View style={Styles.div1} >
        <TextInput
          placeholder={'Enter number stars'}
          value={valueStars}
          keyboardType={'numeric'}
          onChangeText={callbackStars}
        />
        <TextInput
          placeholder={'Enter name'}
          value={valueName}
          onChangeText={callbackName}
        />

        <TouchableOpacity
          style={Styles.TouchableOpacity1}
          onPress={filterButton}
        >
          <Text>filter</Text>
        </TouchableOpacity>
      </View>
    );
  }

}