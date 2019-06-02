import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native'
import HotelsComponent from '../components/hotel.component';
import FilterComponent from '../components/filter.component';
import { data, IP_BY_SERVER } from '../consts/consts';

export default class HotelsScreen extends Component {

  state = {
    data,
    loading: false,
    log: null,
    name: '',
    stars: 3,
    loadBackup: false
  }

  componentDidMount() {
    this.loadData(`http://${IP_BY_SERVER}:8080/hotels`);
  }

  loadData = (endpoint) => {
    fetch(encodeURI(endpoint))
      .then(data => {
        data.json().then(data => {
          this.setState({ data: data, loading: false })
        })
          .catch(e => {
            console.log('1e : ', e)
            this.setState({ log: 'Type json error', loading: false, loadBackup: true })
            this.loadBackup();
          })
      }).catch(e => {
        console.log('2e : ', e)
        this.setState({ log: 'Network error', loading: false, loadBackup: true })
        this.loadBackup();
      })
  }

  loadBackup = () => {
    this.setState({ data });
    setTimeout(() => {
      this.setState({ loadBackup: false });
    }, 1500);
  }

  ChangeStars = (stars) => {
    if ((stars <= 5) && (stars >= 0)) {
      this.setState({ stars })
    }
  }

  mountHotel = (hotel, k) => {
    return < HotelsComponent k={k} hotel={hotel} />
  }

  initFilter = () => {
    const { name, stars } = this.state;
    if (name || stars) {
      this.loadData(`http://${IP_BY_SERVER}:8080/filter_hotels?name=${name}&&stars=${stars}`);
    } else alert('You must select at least one filter')
  }


  render() {

    const { data, loading, loadBackup } = this.state;

    if (loadBackup) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Load Backup, please wait ...  </Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Load data  </Text>
        </View>
      );
    }

    if (!data) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error {this.state.log} </Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, margin: 20, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

        <FilterComponent
          valueStars={this.state.stars}
          callbackStars={(stars) => {
            console.log('callbackStars: ', stars);
            if (stars >= 0 && stars <= 5) {
              this.setState({ stars })
            }
          }}
          valueName={this.state.name}
          callbackName={(name) => {
            console.log('callbackName: ', name);
            this.setState({ name })
          }}
          filterButton={() => this.initFilter()}
        />

        <ScrollView style={{ width: '100%' }}>
          {/* {this.mountHotel(data[0], 1)}
          {this.mountHotel(data[1], 2)}
          {this.mountHotel(data[2], 3)} */}


          {
            data.map((hotel, k) => {
              return this.mountHotel(hotel, k)
            })
          }

        </ScrollView>

      </View>
    );
  }

}