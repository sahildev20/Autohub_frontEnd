/* eslint-disable prettier/prettier */

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import * as React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { MAPBOX_API } from "@env";
import { useDispatch } from 'react-redux';
import { setDropAddress, setDropPlace } from '../slices/navSlice';

const DATA = [
    { id: 1, title: "Bus Stand", city: "Nuh, Haryana" },
    { id: 2, title: "Mewat Engineering College", city: "Palla, Nuh" },
    { id: 3, title: "Nuh Wala Adda", city: "Tapukara" },
    { id: 4, title: "Sonf mod", city: "Nuh, Haryana" },
];

const SearchView = ({ route }) => {
    const dispatch = useDispatch();
    const { target } = route.params;
    const navigation = useNavigation();
    const [place, setPlace] = React.useState('');
    const [filterData, setFilterData] = React.useState(null);
    const [MasterData, setMasterData] = React.useState(null);

    // fetching data from an api
    React.useEffect(() => {
        // getDestination();
    }, []);


    const handleSubmit = async () => {
        const coords = await getDestination()
        dispatch(setDropPlace(place))
        dispatch(setDropAddress(coords))

        navigation.navigate('Home')

    }

    const getDestination = async () => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?proximity=77,28.1&access_token=${MAPBOX_API}`);
            const json = await response.json();
            let coords = json.features[0].geometry.coordinates
            return coords
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 p-5 bg-white`}>

            <View style={tw`flex-1`}>
                <FlatList
                    ListHeaderComponent={
                        <TextInput
                            style={tw`bg-gray-300 rounded-full pl-5 text-16px text-black`}
                            placeholderTextColor='black'
                            placeholder='Search a place'
                            value={place}
                            onChangeText={text => setPlace(text)}
                            onSubmitEditing={text => handleSubmit()}
                        />
                    }
                    data={DATA}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TouchableOpacity style={tw`pl-8 p-3 `}>
                        <Text style={tw`text-black text-4 font-bold mb-2 `}>{item.title}</Text>
                        <Text style={tw`text-black text-4  `}>{item.city}</Text>
                    </TouchableOpacity>}
                />

            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Booking', {

                initialLocation: 'Mewat Engg College'
            })} style={tw`rounded-full p-3 bg-orange-500 mt-5`}>
                <Text>
                    Till than explore the app {target}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SearchView;

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 20,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: 10, width: '95%',
        position: 'absolute', top: 20
    },
});
