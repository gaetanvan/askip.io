import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Pressable} from 'react-native';
import { Text } from 'react-native-paper';
import {Link, router} from 'expo-router';
import {PaperProvider} from "react-native-paper";
import axios from 'axios';
import {urlAPI} from "../components/url";


export default function App() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');

    const handleRegistration = async () => {
        try {
            const userData = {
                name: name,
                email: email,
                password: password,
                surname: surname,
                username: username,
            };
            const response = await axios.post(urlAPI + '/api/register', userData);
            console.log('Inscription réussie :', response.data);

            router.replace('/');
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Inscription</Text>
                <TextInput
                    placeholder="Nom d'utilisateur"
                    placeholderTextColor="#1275A7"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Prénom"
                    placeholderTextColor="#1275A7"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Nom"
                    placeholderTextColor="#1275A7"
                    value={surname}
                    onChangeText={(text) => setSurname(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#1275A7"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
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
                <Pressable style={styles.button} onPress={handleRegistration}>
                    <Text style={styles.text}>S'inscrire</Text>
                </Pressable>
                <Link href="/login">
                    <Text style={styles.link}>Déjà inscrit ? Connectez-vous</Text>
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
        fontFamily: 'Blinker-Regular',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: "#F1C36E",
        fontFamily: 'MontserratAlternates-Bold',
    },
    input: {
        width: '80%',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#1275A7",
        color: "#1275A7",
        padding : 5,
        height: 40,
        fontFamily: 'Blinker-Regular',

    },
    link: {
        marginTop: 16,
        color: "#1275A7",
        fontFamily: 'Blinker-Regular',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#1275A7',
        fontFamily: 'MontserratAlternates-Bold',
    },
    text: {
        color: "#F1C36E",
        fontFamily: 'Blinker-Regular',
    }
});
