// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Image, StyleSheet } from "react-native";
// import axios from "axios";
// import { styles } from "../Album/styles";

// interface AlbumDetailProps {
//   route: {
//     params: {
//       albumId: string;
//     };
//   };
// }

// interface Track {
//   id: string;
//   name: string;
// }

// interface Artist {
//   id: string;
//   name: string;
//   images: { url: string }[];
// }

// export function AlbumDetail({ route }: AlbumDetailProps) {
//   const { albumId } = route.params;
//   const [tracks, setTracks] = useState<Track[]>([]);
//   const [artist, setArtist] = useState<Artist | null>(null);
//   const [albumCover, setAlbumCover] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//     useEffect(() => {
//       // Obter o token do Spotify
//       const fetchToken = async () => {
//         const url = "https://accounts.spotify.com/api/token";
//         const headers = {
//           Authorization: `Basic YTMwYzhmODIwNDI2NDNmZTkyZmMzZTk4Nzk0Zjg2OTU6Nzc3MjhjMDI3Y2FlNGUxYmE1YmJlYWRiNDRkY2RiYTM=` /* Substitua com seu CLIENT_SECRET */,
//           "Content-Type": "application/x-www-form-urlencoded",
//         };
//         const data = "grant_type=client_credentials";

//         try {
//           const response = await axios.post(url, data, { headers });
//           setToken(response.data.access_token);
//         } catch (error) {
//           console.error("Erro ao obter o token:", error);
//         }
//       };
//       fetchToken();
//     }, []);

//   useEffect(() => {
//     if (!token) return;

//     const fetchAlbumDetails = async () => {
//       try {
//         // Buscar detalhes do álbum
//         const response = await axios.get(
//           `https://api.spotify.com/v1/albums/${albumId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setTracks(response.data.tracks.items);
//         setArtist(response.data.artists[0]);
//         setAlbumCover(response.data.images[0]?.url);
//       } catch (error) {
//         console.error("Erro ao buscar detalhes do álbum:", error);
//       }
//     };

//     fetchAlbumDetails();
//   }, [token]);

//   return (
//     <View style={styles.container}>
//       {albumCover && (
//         <Image source={{ uri: albumCover }} style={styles.image} />
//       )}
//       {artist && (
//         <View>
//           <Text style={styles.artistName}>{artist.name}</Text>
//           {artist.images?.[0]?.url && (
//             <Image
//               source={{ uri: artist.images[0].url }}
//               style={styles.artistImage}
//             />
//           )}
//         </View>
//       )}

//       <Text style={styles.title}>Músicas do Álbum</Text>
//       <FlatList
//         data={tracks}
//         renderItem={({ item }) => <Text style={styles.track}>{item.name}</Text>}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// }
