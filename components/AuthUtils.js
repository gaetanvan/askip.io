
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export const getUserInfoFromToken = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
            const decodedToken = jwt_decode(token);
            return decodedToken;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur depuis le token :', error);
    }

    return null;
};