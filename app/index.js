import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput, ScrollView, Dimensions} from 'react-native';
import {Entypo, Ionicons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Link} from "expo-router";
import {PaperProvider} from "react-native-paper";
import {getUserInfoFromToken} from "../components/AuthUtils";
import { AntDesign } from '@expo/vector-icons';
import { eachDayOfInterval, format , isToday} from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import {useFonts} from "expo-font";
import {urlAPI} from "../components/url";
import axios from "axios";
import {Image} from "expo-image";
import BottomNav from "../components/navBar"


export default function App() {
    const [user, setUser] = useState(null);
    const [hotCompanies, setHotCompanies] = useState([]);

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



    useEffect(() => {
        axios.get(urlAPI + '/api/companies')
            .then((response) => {
                const companies = response.data['hydra:member'];
                const hotCompaniesData = companies.filter((company) => company.IsHot === true);

                setHotCompanies(hotCompaniesData);
            })
            .catch((error) => {
                console.error('Une erreur s\'est produite lors de la récupération des entreprises :', error);
            });
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
                                <Link href="/profile">
                                    <FontAwesome name="user-o" size={24} color="black"/>
                                </Link>
                            </View>
                        ) : (
                            <Link href="/register">
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
                <View style={styles.middleNav}>
                    <View style={styles.middleNavTab}>
                        <Link href="/">
                            <Text style={styles.fontBold}>Agenda</Text>
                        </Link>
                    </View>
                    <View style={styles.middleNavTab}>
                        <Link href="/">
                            <Text style={styles.fontBold}>Chaud</Text>
                        </Link>
                    </View>
                    <View style={styles.middleNavTab}>
                        <Link href="/">
                            <Text style={styles.fontBold}>Autour de moi</Text>
                        </Link>
                    </View>
                </View>
                <View style={styles.scrollContainer}>
                    <ScrollView style={styles.scrollViewContainer}>
                        {hotCompanies.map((company) => (
                            <View style={styles.itemContainer} key={company.id}>
                                <Image
                                    style={styles.picture}
                                    source={urlAPI + '/uploads/picture/'+ company.picture}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.fontMontserrat}>{company.name}</Text>
                                    <Text style={styles.fontMontserrat}>{company.description}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <BottomNav/>
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
    calendarContainer: {
        height: '9%',
        alignSelf: 'center',
        marginBottom: 5,
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
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: 'Blinker-Regular'
    },
    fontMontserrat: {
        fontFamily: 'MontserratAlternates-Bold',
    },
    middleNav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    middleNavTab: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 15,
        width: "30%",
        height: 45,
        margin: 5,
        marginBottom: 15,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        marginBottom: 3,
    },
    textContainer: {
        flex: 3,
        alignItems: "center",
    },
    picture: {
        flex: 2,
        marginRight: 10,
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "lightgray",
        width: 150,
        height: 130,
        alignItems: "center",

    },
    scrollContainer: {
        width: '90%',
        height: Dimensions.get('screen').height * 0.60,
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius : 25,
        paddingBottom : 0,
        paddingTop : 0,
    }
});
