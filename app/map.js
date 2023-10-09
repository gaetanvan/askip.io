import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { url } from '../components/url';

export default function App() {

    const [markers, setMarkers] = useState([]);
    const [region, setRegion] = useState({
        latitude: 45.188477100449155,
        longitude: 5.7136845,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const maxoffset = 1044 / 100;
    let offset = 100;

    const fetchData = async () => {
        const newMarkers = [];
        for (let e = 1; e < maxoffset; e++) {
            try {
                const response = await fetch(url + '&offset=' + offset);
                const data = await response.json();
                const locations = data['results'];

                for (let i = 0; i < locations.length; i++) {
                    const location = locations[i];
                    const marker = {
                        latlng: {
                            latitude: location["geo_point_2d"].lat,
                            longitude: location["geo_point_2d"].lon
                        },
                        title: location.commune + ', ' + location.code_commune + ', ' + location.name,
                        id: offset + i
                    };

                    const tolerance = 0.003;

                    if (
                        marker.latlng.latitude >= region.latitude - tolerance &&
                        marker.latlng.latitude <= region.latitude + tolerance &&
                        marker.latlng.longitude >= region.longitude - tolerance &&
                        marker.latlng.longitude <= region.longitude + tolerance
                    ) {
                        newMarkers.push(marker);
                    }
                }
                offset += 100;
            } catch (error) {
                console.log(error);
            }
        }
        setMarkers(newMarkers);
    };

    useEffect(() => {
        fetchData();
    }, [region]);


    return (
        <View style={styles.map}>
            <MapView
                style={{ flex: 1 }}
                region={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            >
                {markers.map(marker => (
                    <Marker key={marker.id}
                            coordinate={{
                                latitude: parseFloat(marker.latlng.latitude),
                                longitude: parseFloat(marker.latlng.longitude),}}
                            title={marker.title}/>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});