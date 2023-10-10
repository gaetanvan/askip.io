import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Pressable} from 'react-native';
import { Text } from 'react-native-paper';
import {Link, router} from 'expo-router';
import {PaperProvider} from "react-native-paper";
import axios from 'axios';
import {urlAPI} from "../components/url";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        try {
            const userData = {
                password: password,
                username: username,
            };
            const response = await axios.post(urlAPI + '/api/login', userData);

            const token = response.data.token;

            await AsyncStorage.setItem('authToken', token);

            router.replace('/');

        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Connexion</Text>
                <TextInput
                    placeholder="Nom d'utilisateur"
                    placeholderTextColor="#1275A7"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Mot de passe"
                    placeholderTextColor="#1275A7"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.text}>Connexion</Text>
                </Pressable>
                <Link href="/register">
                    <Text style={styles.link}>Pas encore inscrit ? Inscrivez-vous</Text>
                </Link>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: "#F1C36E"
    },
    input: {
        width: '80%',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#1275A7",
        color: "#1275A7",
        padding : 5,
        height: 40,

    },
    link: {
        marginTop: 16,
        color: "#1275A7",
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#1275A7',
    },
    text: {
        color: "#F1C36E",
    }
});
