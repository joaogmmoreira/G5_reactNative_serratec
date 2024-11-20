import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchFeaturedPlaylists, createSpotifySession, setToken } from "../../services/spotifyApi";
import { PlaylistCard } from "../../components/PlaylistCard";

export default function PlaylistsPage() {
    const [playlists, setPlaylists] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPlaylists = async () => {
            const token = await createSpotifySession();
            setToken(token);
            const response = await fetchFeaturedPlaylists();
            setPlaylists(response.playlists.items);
        };
        fetchPlaylists();
    }, []);

    return (
        <LinearGradient colors={['#065055', '#000000']} style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for playlists..."
                onChangeText={setSearchTerm}
                value={searchTerm}
            />
            <FlatList
                data={playlists}
                renderItem={({ item }) => <PlaylistCard item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.flatListContainer}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: 'white',
    },
    flatListContainer: {
        justifyContent: 'space-between',
    },
});
