import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  songCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  songButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#333",
    width: "90%",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  songInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  songTitle: {
    flexDirection: "column",
  },
  songText: {
    color: "white",
    fontFamily: "Roboto, sans-serif",
    fontSize: 17,
  },
  songArtist: {
    resizeMode: 'cover',
    color: "#999",
    paddingTop: 5,
    width: 270,
    fontFamily: "Roboto, sans-serif",
    fontWeight: 'bold',
    fontSize: 10,
  },
  bottomTres: {
    
  }
});
