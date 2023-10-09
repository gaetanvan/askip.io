import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Link} from "expo-router";


export default function App() {

    return (
        <View style={styles.navBar}>
            <View style={styles.leftIcon}>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
            <View style={styles.searchBar}>
                <TextInput
                    placeholder="Recherche"
                    style={styles.input}
                    onChangeText={(text) => {
                        // Gérez la recherche ici
                    }}
                />
            </View>
            <View style={styles.rightIcon}>
                <FontAwesome name="user-o" size={24} color="black" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    leftIcon: {
        flex: 1,
        alignItems: 'flex-start',
    },
    searchBar: {
        flex: 3,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 10,
    },
    rightIcon: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
