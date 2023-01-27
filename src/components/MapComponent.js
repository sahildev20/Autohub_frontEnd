import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API, MBOX_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDropAddress,
  selectPickupAddress,
  selectRideInformation,
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
  const [regionFeature, setRegionFeature] = React.useState(undefined);
  const [bounds, setBounds] = React.useState(undefined);
  const pickupCordinates = useSelector(selectPickupAddress);
  const dropCordinates = useSelector(selectDropAddress);
  const rideInfo = useSelector(selectRideInformation);
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
      setRoutes(routeCoordinates);
      dispatch(setRideInformation([distance / 1000, duration / 60]));
    } catch (error) {
      console.error(error);
    }
  };
  if (routes == undefined) {
    return null;
  }

  // function renderRegionChange() {
  //   if (!regionFeature) {
  //     return (
  //       <View>
  //         <Text>Move the map!</Text>
  //       </View>
  //     );
  //   }

  //   const {geometry, properties} = regionFeature;

  //   const neCoord = properties.visibleBounds[0]
  //     .map(n => n.toPrecision(6))
  //     .join(', ');
  //   const swCoord = properties.visibleBounds[1]
  //     .map(n => n.toPrecision(6))
  //     .join(', ');

  //   return (
  //     <View>
  //       <Text>Visible Bounds NE: {neCoord}</Text>
  //       <Text>Visible Bounds SW: {swCoord}</Text>
  //       {/* <Text>changing</Text>
  //       <Text>Latitude: {geometry.coordinates[1]}</Text>
  //       <Text>Longitude: {geometry.coordinates[0]}</Text>

  //       <Text>Zoom Level: {properties.zoomLevel}</Text>
  //       <Text>Heading: {properties.heading}</Text>
  //       <Text>Pitch: {properties.pitch}</Text>
  //       <Text>
  //         Is User Interaction: {properties.isUserInteraction ? 'true' : 'false'}
  //       </Text>
  //       <Text>Animated: {properties.animated ? 'true' : 'false'}</Text> */}
  //     </View>
  //   );
  // }
  function onRegionDidChange(regionFeat) {
    setRegionFeature(regionFeat);
    console.log({zoom: regionFeat.properties.zoomLevel});
    console.log({bounds: regionFeat.properties.visibleBounds});
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '100%', height: '100%'}}>
        <MapboxGL.MapView
          // bounds={[pickupCordinates, dropCordinates]}
          style={{flex: 1}}
          attributionEnabled={false}
          centerCoordinate={
            centerCordinates !== undefined ? centerCordinates : pickupCordinates
          }
          zoomEnabled={true}
          animated={true}
          onRegionDidChange={regionFeat => onRegionDidChange(regionFeat)}
          followUserLocation>
          <MapboxGL.Camera
            minZoomLevel={8}
            allowUpdates
            animated={true}
            centerCoordinate={
              centerCordinates !== undefined
                ? centerCordinates
                : pickupCordinates
            }
            animationMode="flyTo"
            animationDuration={2000}
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
            <MapboxGL.Callout
              id="pick"
              key="pickup"
              title={`Distance: ${rideInfo[0]} Kms`}
              focusable={true}
              collapsable={false}
              hasTVPreferredFocus
            />
          </MapboxGL.PointAnnotation>
          <MapboxGL.PointAnnotation
            id="d"
            key="drop"
            coordinate={dropCordinates}></MapboxGL.PointAnnotation>
          <MapboxGL.ShapeSource id="route1" shape={route}>
            <MapboxGL.LineLayer
              id="route1layer"
              style={{
                lineColor: '#FFFF3F',
                lineWidth: 6,
                lineCap: 'round',
                lineGradient: [
                  'interpolate',
                  ['linear'],
                  ['line-progress'],
                  0,
                  'yellow',
                  0.5,
                  'orange',
                  0.7,
                  'orange',
                ],
              }}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
        {/* {renderRegionChange()} */}
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
                onDragEnd={feature => handleDrag(feature)}>
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
