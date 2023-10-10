import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput, ScrollView} from 'react-native';
import {Entypo, Ionicons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Link} from "expo-router";
import {PaperProvider} from "react-native-paper";
import {getUserInfoFromToken} from "../components/AuthUtils";
import { AntDesign } from '@expo/vector-icons';
import { eachDayOfInterval, format , isToday} from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import {useFonts} from "expo-font";

export default function App() {
    const [user, setUser] = useState(null);

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const dates = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

    const [fontsLoaded] = useFonts({
        'Blinker-Regular': require('../assets/fonts/Blinker-Regular.ttf'),
        'MontserratAlternates-Bold': require('../assets/fonts/MontserratAlternates-Bold.ttf'),
        'MontserratAlternates-Regular': require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    });

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
                                <Link href="/register">
                                    <FontAwesome name="user-o" size={24} color="black"/>
                                </Link>
                            </View>
                        ) : (
                            <Link href="/login">
                                <AntDesign name="form" size={24} color="black" />
                            </Link>
                        )}
                    </View>
                </View>
                <View style={styles.calendarContainer}>
                    <ScrollView horizontal={true} style={styles.calendar}>
                        {dates.map((date, index) => (
                            <View
                                key={index}
                                style={[styles.date]}
                            >
                                <Text style={isToday(date) ? styles.todayText : styles.dateText}>
                                    {format(date, 'EEE', { locale: frLocale })
                                        .charAt(0)
                                        .toUpperCase() +
                                    format(date, 'EEE', { locale: frLocale }).slice(1)
                                    }
                                </Text>
                                <Text style={isToday(date) ? styles.todayText : styles.dateText}>
                                    {format(date, 'dd/MM')}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
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
    calendarContainer: {
        height: '9%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    calendar: {
        flexDirection: 'row',
    },
    date: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'lightgray',
        borderBottomWidth: 1,
    },
    dateText: {
        fontSize: 15,
        fontFamily: 'MontserratAlternates-Bold',
    },
    todayText: {
        fontFamily: 'MontserratAlternates-Bold',
        fontSize: 16,
        color: 'red',
    },
    fontBold: {
        fontWeight: "bold",
    }
});
