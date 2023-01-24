import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API, MBOX_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDropAddress,
  selectPickupAddress,
  setDropAddress,
  setPickupAddress,
  setRideInformation,
} from '../slices/navSlice';
import {LOC_DROP, LOC_PIN} from '../assets';
import {UpdateAddress} from './Constants.js/Constants';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_API);

//here we will define map components which will show the location and route info on map...
const pickupCordinates1 = [76.9799513, 28.1231292];

//Double map will show both pickup and drop location on map...
const DoubleMapComponent = () => {
  const [routes, setRoutes] = React.useState();
  const pickupCordinates = useSelector(selectPickupAddress);
  const dropCordinates = useSelector(selectDropAddress);
  const dispatch = useDispatch();

  const centerCordinates = [
    (Number(pickupCordinates[0]) + Number(dropCordinates[0])) / 2,
    (Number(pickupCordinates[1]) + Number(dropCordinates[1])) / 2,
  ];
  const route = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routes,
        },
        style: {},
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8,
        },
      },
    ],
  };
  React.useEffect(() => {
    getDirections();
  }, []);
  const getDirections = async () => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCordinates[0]}%2C${pickupCordinates[1]}%3B${dropCordinates[0]}%2C${dropCordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_API}`,
      );
      const json = await res.json();
      const data = json.routes[0];
      const routeCoordinates = data.geometry.coordinates;
      const {distance, duration} = data;
      const formattedDistance = `${(distance / 1000).toFixed(2)} kilometers`;
      const formattedDuration = `${(duration / 60).toFixed(0)} minutes`;
      setRoutes(routeCoordinates);
      dispatch(setRideInformation([formattedDistance, formattedDuration]));
    } catch (error) {
      console.error(error);
    }
  };
  if (routes == undefined) {
    return null;
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '100%', height: '100%'}}>
        <MapboxGL.MapView
          style={{flex: 1}}
          styleURL={MBOX_URL}
          attributionEnabled={false}
          centerCoordinate={pickupCordinates}
          zoomEnabled={true}
          animated={true}
          followUserLocation>
          <MapboxGL.Camera
            zoomLevel={10}
            animated={true}
            animationMode="moveTo"
            allowUpdates
            centerCoordinate={centerCordinates}
            animationDuration={1500}
          />
          <MapboxGL.PointAnnotation
            followUserLocation
            animated={true}
            id="p"
            key="pickup"
            coordinate={pickupCordinates}>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: '#FFFF3F',
                borderColor: '#EDF2FB',
                borderRadius: 50,
                borderWidth: 8,
              }}></View>
          </MapboxGL.PointAnnotation>
          <MapboxGL.PointAnnotation
            id="d"
            key="drop"
            coordinate={dropCordinates}></MapboxGL.PointAnnotation>
          <MapboxGL.ShapeSource id="route1" shape={route}>
            <MapboxGL.LineLayer
              id="route1layer"
              style={{lineColor: '#FFFF3F', lineWidth: 4, lineCap: 'round'}}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
    </View>
  );
};
const MapComponent = () => {
  const pickupCordinates = useSelector(selectPickupAddress);
  const dropCordinates = useSelector(selectDropAddress);
  const pointAnnotation = React.useRef({refresh: () => null});
  const pointAnnotationDrop = React.useRef({refresh: () => null});
  const dispatch = useDispatch();
  async function handleDrag(feature) {
    console.log('dragend', feature.geometry.coordinates);
    if (feature.properties.id == 'PICKUP') {
      dispatch(setPickupAddress(feature.geometry.coordinates));
      console.log('dragend PICKUP', feature.geometry.coordinates);
    } else {
      dispatch(setDropAddress(feature.geometry.coordinates));
      console.log('dragend DROP', feature.geometry.coordinates);
    }
  }
  async function onPress(e) {
    dispatch(setPickupAddress(e.geometry.coordinates));
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '100%', height: '100%'}}>
        {pickupCordinates.length !== 0 && (
          <MapboxGL.MapView
            style={{flex: 1}}
            styleURL={MBOX_URL}
            ref={c => (this._map = c)}
            onPress={e => onPress(e)}
            attributionEnabled={false}
            centerCoordinate={pickupCordinates}
            zoomEnabled={true}
            animated={true}
            followUserLocation
            // draggable
            // onDragEnd={feature => handleDrag(feature)}
          >
            <MapboxGL.Camera
              zoomLevel={16}
              maxZoomLevel={16}
              minZoomLevel={8}
              animated={true}
              animationDuration={1200}
              animationMode="flyTo"
              centerCoordinate={pickupCordinates}
            />
            {/* <MapboxGL.PointAnnotation
         id="point" coordinate={pickupCordinates} /> */}

            <MapboxGL.PointAnnotation
              id="PICKUP"
              key="PICKUP"
              coordinate={pickupCordinates}
              title="PICKUP"
              draggable
              onDragEnd={feature => handleDrag(feature)}
              ref={pointAnnotation}>
              <View style={{}}>
                <Image
                  source={{uri: LOC_PIN}}
                  style={{width: 100, height: 100}}
                  onLoad={() => pointAnnotation.current?.refresh()}
                />
              </View>
              <MapboxGL.Callout
                id="pickupcall"
                key="pickupcall"
                title="Your Pickup Location"
              />
            </MapboxGL.PointAnnotation>
            {dropCordinates.length !== 0 && (
              <MapboxGL.PointAnnotation
                id="DROP"
                key="DROP"
                coordinate={dropCordinates}
                title="DROP"
                draggable
                onDragEnd={feature => handleDrag(feature)}
                ref={pointAnnotationDrop}>
                <View>
                  <Image
                    source={{uri: LOC_DROP}}
                    style={{width: 40, height: 40}}
                    onLoad={() => pointAnnotationDrop.current?.refresh()}
                  />
                </View>
                <MapboxGL.Callout
                  id="dropcall"
                  key="dropcall"
                  title="Your Drop Location"
                />
              </MapboxGL.PointAnnotation>
            )}
          </MapboxGL.MapView>
        )}
      </View>
    </View>
  );
};

export {DoubleMapComponent};
export default MapComponent;

const styles = StyleSheet.create({});
