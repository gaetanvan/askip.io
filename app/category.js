import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native';
import axios from 'axios';
import {urlAPI} from "../components/url";

export default function App() {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get(urlAPI + '/api/categories')
            .then(response => {
                setCategories(response.data['hydra:member']);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories :', error);
            });
    }, []);
    

    return (
        <View>
            <TextInput
                placeholder="Rechercher une catégorie"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <ScrollView contentContainerStyle={styles.grid}>
                {categories.map((category) => (
                    <View style={styles.gridItem} key={category.id}>
                        <View style={styles.categoryItem}>
                            <Text style={styles.fontMontserrat}>{category.name}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        width: '40%',
        margin: 19,
        padding: 8,
    },
    categoryItem: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    fontMontserrat: {
        fontFamily: 'Montserrat',
    },
});

