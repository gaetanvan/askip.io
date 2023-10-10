import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';
import {Entypo, Ionicons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Link} from "expo-router";
import {PaperProvider} from "react-native-paper";
import {getUserInfoFromToken} from "../components/AuthUtils";
import { AntDesign } from '@expo/vector-icons';


export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUserInfo() {
            const userInfo = await getUserInfoFromToken();
            if (userInfo) {
                setUser(userInfo);
            }
        }
        fetchUserInfo();
    }, []);

    return (
        <PaperProvider>
            <View style={styles.container}>
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
                        {user ? (
                            <View>
                                <Link href="/">
                                    <FontAwesome name="user-o" size={24} color="black" />
                                </Link>
                            </View>
                        ) : (
                            <Link href="/login">
                                <AntDesign name="form" size={24} color="black" />
                            </Link>
                        )}
                    </View>
                </View>
                <View style={styles.bottomNav}>
                    <Link href="/map" style={styles.tab}>
                        <FontAwesome name="map-marker" size={24} color="black" />
                    </Link>
                    <Link href="/" style={styles.tab}>
                        <Entypo name="home" size={24} color="black" />
                    </Link>
                    <Link href="/map" style={styles.tab} >
                        <AntDesign name="appstore1" size={24} color="black" />
                    </Link>
                </View>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
    },
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
