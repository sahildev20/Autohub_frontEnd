import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { React, useState } from 'react';
import { Avatar } from 'react-native-elements';
import tw from 'twrnc';
import { } from 'react-native';
import { Image } from 'react-native';

const data = [

    {
        Id: 1, Title: 'Ride to Tapukara',
        Date: '01/12/22', Time: '12.30 AM',
        Amount: 60, Age: 'Today',
        From: 'Mewat engineering college', To: 'Tapukara'
    },
    {
        Id: 2, Title: 'Ride to Malab',
        Date: '01/12/22', Time: '12.30 AM',
        Amount: 60, Age: 'Yesterday',
        From: 'Mewat engineering college', To: 'Malab'
    },
    {
        Id: 3, Title: 'Ride to Sohna',
        Date: '01/12/22', Time: '12.30 AM',
        Amount: 60, Age: '3 days ago',
        From: 'Mewat engineering college', To: 'Sohna'
    },
    {
        Id: 4, Title: 'Ride to Tauru',
        Date: '01/12/22', Time: '12.30 AM',
        Amount: 60, Age: '4 days ago',
        From: 'Mewat engineering college', To: 'Tauru'
    },

]

const HistoryScreen = () => {
    const [showCard, setShowCard] = useState(false);

    const Card = ({ item }) => {
        return (
            <TouchableOpacity style={tw`flex-row items-center justify-between bg-yellow-400 mt-4 p-4`}>
                <Avatar style={tw`w-50px h-50px mr-4 rounded-full bg-white`} />
                <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center justify-between`} >
                        <View>
                            <Text style={tw`text-16px font-bold`} >{item.Title}</Text>
                            <Text style={tw`text-12px`}>From: {item.From}</Text>
                        </View>
                        <Text style={tw`text-18px font-bold `}>{item.Amount}</Text>

                    </View>
                    <View style={tw` flex-row justify-between pt-4`}>
                        <Text style={tw` text-12px`}>{item.Age}</Text>

                        <Text style={tw`text-12px`}>{item.Time}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={tw`flex-1 p-8 bg-white`}>
            <View>
                {/* there will be an image vector to inhance style , i will create it later */}
            </View>

            <View>
                <Text style={tw`text-7 text-black`}>Recent Rides</Text>
            </View>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={item => item.Id}
                    renderItem={({ item }) => <Card item={item} />

                    }

                />
            </View>
            <Text style={tw`self-center mt-8`}>Your future rides will appear here !</Text>
        </SafeAreaView>

    );
}

export default HistoryScreen;

const styles = StyleSheet.create({});
