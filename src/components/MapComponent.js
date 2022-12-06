import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_API, MBOX_URL } from '@env';
import { useSelector } from 'react-redux';
import { selectDropAddress, selectPickupAddress } from '../slices/navSlice';


MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_API);

//here we will define map components which will show the location and route info on map...
const pickupCordinates1 = [76.9799513, 28.1231292];

//Double map will show both pickup and drop location on map...
const DoubleMapComponent = () => {
    const pickupCordinates = useSelector(selectPickupAddress);
    const dropCordinates = useSelector(selectDropAddress);
    // const centerCordinates = [(Number(pickupCordinates[0]) + Number(dropCordinates[0])) / 2,
    // (Number(pickupCordinates[1]) + Number(dropCordinates[1])) / 2];

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '100%', height: '100%' }}>
                <MapboxGL.MapView style={{ flex: 1, }}
                    styleURL={MBOX_URL}
                    padding={4}
                    attributionEnabled={false}
                    centerCoordinate={pickupCordinates}
                    zoomEnabled={true}
                    animated={true}
                    followUserLocation
                >
                    <MapboxGL.Camera
                        animationMode='flyTo'
                        centerCoordinate={pickupCordinates}
                        followUserLocation
                    />

                    <MapboxGL.PointAnnotation
                        followUserLocation
                        id='pickup'
                        coordinate={pickupCordinates}

                    />
                    <MapboxGL.PointAnnotation
                        id='drop'
                        coordinate={dropCordinates} />
                </MapboxGL.MapView>

            </View>
        </View>
    )
}
const MapComponent = () => {
    const pickupCordinates = useSelector(selectPickupAddress);
    const dropCordinates = useSelector(selectDropAddress)


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '100%', height: '100%' }}>
                <MapboxGL.MapView style={{ flex: 1 }}
                    styleURL={MBOX_URL}
                    attributionEnabled={false}
                    centerCoordinate={pickupCordinates}
                    zoomEnabled={true}
                    animated={true}
                    followUserLocation
                >
                    <MapboxGL.Camera
                        zoomLevel={12}
                        centerCoordinate={pickupCordinates}
                        followUserLocation
                    />
                    <MapboxGL.PointAnnotation
                        id='point'
                        coordinate={pickupCordinates} />
                </MapboxGL.MapView>

            </View>
        </View>
    );
}

export { DoubleMapComponent }
export default MapComponent;

const styles = StyleSheet.create({});
