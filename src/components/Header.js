/* eslint-disable prettier/prettier */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Header = () => {
    return (
        <View style={styles.section}>
            <Text>Header</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {margin:20, backgroundColor: 'yellow' },

});

export default Header;
