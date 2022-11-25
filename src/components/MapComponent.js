import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_API, comment } from '@env'

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_API);
const MapComponent = () => {
    const myLocation = [76.9799513, 28.1231292];
    const myHome = []
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '100%', height: '100%' }}>
                <MapboxGL.MapView style={{ flex: 1 }}
                    attributionEnabled={false}
                    centerCoordinate={myLocation}
                    zoomEnabled={true}
                    animated={true}
                >
                    <MapboxGL.Camera
                        zoomLevel={12}
                        centerCoordinate={myLocation}
                    />
                    <MapboxGL.PointAnnotation
                        id='point'
                        coordinate={myLocation} />
                </MapboxGL.MapView>

            </View>
        </View>
    );
}

export default MapComponent;

const styles = StyleSheet.create({});
