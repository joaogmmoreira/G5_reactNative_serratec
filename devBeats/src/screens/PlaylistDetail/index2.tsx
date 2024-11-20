import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { fetchPlaylistDetails, createSpotifySession, setToken } from "../../services/spotifyApi";

const PlaylistDetailsPage = ({ route }) => {
    const { playlistId } = route.params;
    const [playlistDetails, setPlaylistDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const token = await createSpotifySession();
            setToken(token);
            const response = await fetchPlaylistDetails(playlistId);
            setPlaylistDetails(response);
        };

        fetchDetails();
    }, [playlistId]);

    if (!playlistDetails) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: playlistDetails.images[0]?.url }} style={styles.image} />
            <Text style={styles.title}>{playlistDetails.name}</Text>
            <Text style={styles.description}>{playlistDetails.description}</Text>
            <FlatList
                data={playlistDetails.tracks.items}
                renderItem={({ item }) => (
                    <View style={styles.track}>
                        <Text>{item.track.name}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.track.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    track: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default PlaylistDetailsPage;
