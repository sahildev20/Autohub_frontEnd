/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MapVieww = () => {
    return (
        <View style={styles.container}>
            <MapView style={styles.mapview}
                showUserLocation={false}
                followUserLocation={false} />
            zoomEnabled={true}
        </View>
    );
}

export default MapVieww;

const styles = StyleSheet.create({
    container: {},
    mapview: { height: height, width: width },

});
