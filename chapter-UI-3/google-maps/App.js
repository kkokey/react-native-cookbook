import React from 'react';
import { Location, Permissions, MapView } from 'expo';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default class App extends React.Component {
  state = {
    location: null
  }

  async getLocation() {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location
    });
    console.log(location.coords);
  }

  async componentDidMount() {
    const permission = await Permissions.askAsync(Permissions.LOCATION);
    if (permission.status === 'granted') {
      this.getLocation();
    }
  }

  renderMap() {
    return this.state.location ?
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView> : null
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMap()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1
  }
});
