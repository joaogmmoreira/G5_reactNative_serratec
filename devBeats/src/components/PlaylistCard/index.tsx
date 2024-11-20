import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

interface Playlist {
    images: { url: string }[];
    name: string;
    type: string;
    id?: string;
}

interface SearchItems {
    images: { url: string }[];
    name: string;
    type?: string;
    album?: { images: { url: string }[] };
    id: string;
}

interface PlaylistCardProps {
    item: Playlist | SearchItems;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ item }) => {
    const navigation = useNavigation<any>();

    const handlePress = (type: string) => {
        if (type === 'playlist') {
            return navigation.navigate('PlaylistDetails', { playlistId: item.id });
        }
        return navigation.navigate('Artist', { artistId: item.id });
    };

    const imageUrl = () => {
        if (
            item.type === 'track' &&
            'album' in item &&
            item.album?.images?.[0]?.url
        ) {
            return item.album.images[0].url;
        } else {
            return item.images?.[0]?.url || 'default_image_url';
        }
    };

    const artistOrPlaylist = () => {
        if (item.type === 'artist') {
            return 'artist';
        } else if (item.type === 'playlist') {
            return 'playlist';
        }
        return 'artist';
    };

    return (
        <TouchableOpacity
            onPress={() => handlePress(artistOrPlaylist())}
            style={styles.item}
        >
            <Image source={{ uri: imageUrl() }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );
};
