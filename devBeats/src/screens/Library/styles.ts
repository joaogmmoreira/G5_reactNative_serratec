import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 25,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "90%",
  },
  pageTitle: {
    marginLeft: 20,
    fontSize: 28,
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
  },
  songsQty: {
    marginLeft: 20,
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    zIndex: 9999,
    alignSelf: "flex-start",
    marginLeft: 25,
    top: 28,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 3,
    padding: 10,
    paddingLeft: 35,
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    fontFamily: "Roboto, sans-serif",
  },
  bottomUp: {
    marginLeft: 20
  },
  containerHeaderMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },
  containerHeaderMenuButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  },
  controlButtonShuffle: {
    marginLeft: 20,
    padding: 15,
    color: "#0b8185",
    fontSize: 24,
  },
  controlButtonPause: {
    marginLeft: 10,
    color: "#0b8185",
    fontSize: 48,
  },
  containerMenu: {
    position: "absolute",
    height: 120,
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  containerMenuBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
    width: "33%",
  },
  menuText: {
    color: "white",
    fontSize: 10,
  },
  menuButton: {
    color: "white",
    fontSize: 24,
  },
  songCardContainer: {
    position: "absolute",
    height: 60,
    bottom: 105,
    width: "98%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#39171b",
    borderRadius: 5,
    marginBottom: 12,
  },
  songCard: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  songButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#333",
    width: "90%",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
  },
  songInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  songTitle: {
    flexDirection: "column",
  },
  songText: {
    color: "#999",
    fontFamily: "Roboto, sans-serif",
    fontSize: 12,
  },
  songArtist: {
    color: "white",
    paddingTop: 5,
    fontFamily: "Roboto, sans-serif",
    fontSize: 10,
  },
  playerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  laptop: {
    color: "#1DB954",
    fontSize: 24,
    marginRight: 20,
  },
  addToLibrary: {
    color: "#1DB954",
    fontSize: 24,
    marginRight: 20,
  },
  pauseButton: {
    color: "white",
    fontSize: 30,
  },
  progressBar: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  progress: {
    height: 5,
    backgroundColor: "#333",
    width: "100%",
    borderRadius: 5,
    marginTop: 10,
  },
  progressLine: {
    justifyContent: "center",
    alignItems: "baseline",
    alignSelf: "flex-start",
    height: 5,
    backgroundColor: "#999",
    width: "52%",
    borderRadius: 5,
    marginTop: -5,
  },
});
