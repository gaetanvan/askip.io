import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Link} from "expo-router";
import {AntDesign, Entypo, FontAwesome} from "@expo/vector-icons";
import React from "react";

const BottomNav =  () => {
    return (
        <View style={styles.bottomNav}>
            <Link href="/map" style={styles.tab}>
                <FontAwesome name="map-marker" size={24} color="black" />
            </Link>
            <Link href="/" style={styles.tab}>
                <Entypo name="home" size={24} color="black" />
            </Link>
            <Link href="/category" style={styles.tab} >
                <AntDesign name="appstore1" size={24} color="black" />
            </Link>
        </View>

);
}

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '80%',
        borderWidth: 1,
        borderColor: "grey",
        marginBottom: 10,
        borderRadius: 15,
    },
    tab: {
        padding: 10,
    },
});

export default BottomNav;
