import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import {ProgressBar} from "react-native-paper";

export default function App() {

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <View>
                    <FontAwesome name="user-o" size={24} color="black"/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.fontMontserrat}>Kalinc</Text>
                    <View>
                        <Text style={styles.fontMontserrat}>Niv 1</Text>
                        <ProgressBar progress={0.5} color="#49B5F2" />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});