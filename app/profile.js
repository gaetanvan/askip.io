import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
    Feather,
    FontAwesome,
    FontAwesome5,
    Foundation,
    MaterialCommunityIcons,
    MaterialIcons
} from "@expo/vector-icons";
import {ProgressBar, Avatar} from "react-native-paper";
import {Link} from "expo-router";
import BottomNav from "../components/navBar"

export default function App() {

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <View>
                    <Avatar.Icon size={90} icon="account" style={styles.iconContainer}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.usernameText}>Kalinc</Text>
                    <View style={styles.levelContainer}>
                        <Text style={styles.fontMontserrat}>Niv 1</Text>
                        <ProgressBar progress={0.5} color="#49B5F2" style={styles.progressBar}/>
                    </View>
                    <View>
                        <Text>Badge (3)</Text>
                    </View>
                </View>
            </View>
            <View style={styles.navigationContainer}>
                <View style={styles.linkContainer}>
                    <Feather name="settings" size={24} color="black" />
                    <Text style={styles.nameText}>Paramètres</Text>
                </View>
                <View style={styles.linkContainer}>
                    <FontAwesome name="user" size={24} color="black" />
                    <Text style={styles.nameText}>My personality</Text>
                </View>
                <View style={styles.linkContainer}>
                    <FontAwesome name="bell" size={24} color="black" />
                    <Text style={styles.nameText}>Notifications</Text>
                </View>
                <View style={styles.linkContainer}>
                    <Foundation name="mail" size={24} color="black" />
                    <Text style={styles.nameText}>Newsletter</Text>
                </View>
                <View style={styles.linkContainer}>
                    <FontAwesome5 name="map-marker-alt" size={24} color="black" />
                    <Text style={styles.nameText}>Localisation</Text>
                </View>
                <View style={styles.linkContainer}>
                    <FontAwesome name="lock" size={24} color="black" />
                    <Text style={styles.nameText}>Confidentialité</Text>
                </View>
                <View style={styles.linkContainer}>
                    <Feather name="help-circle" size={24} color="black" />
                    <Text style={styles.nameText}>Aide</Text>
                </View>
                <View style={styles.logoutContainer}>
                    <Link href="/index" style={styles.logoutText}>
                        <Text>Déconnexion</Text>
                    </Link>
                    <Link href="/index">
                    <MaterialIcons name="logout" size={24} color="black" />
                    </Link>
                </View>
                <BottomNav />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: "row",
        height: "15%",
    },
    iconContainer: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        margin: 10,

    },
    textContainer: {
        justifyContent: "space-around" ,
        padding: 20,
        paddingTop: 10,
    },
    levelContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    nameText: {
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10,
    },
    usernameText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    progressBar: {
      width: 200,
    },
    navigationContainer : {
        alignItems:"center"
    },
    linkContainer: {
        backgroundColor: "rgba(90, 123, 206, 0.10)",
        flexDirection: "row",
        width: "80%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 20,
        height: "9%",
        margin: 10,
    },
    logoutContainer: {
        flexDirection: "row",
        width: "80%",
        alignItems:"center" ,
        justifyContent: "flex-end",
        paddingLeft: 20,
        margin: 10,
    },
    logoutText: {
        marginRight: 5,
    }
});