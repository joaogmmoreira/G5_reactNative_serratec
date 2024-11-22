import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  containerText: {
    flex: 1,
    justifyContent: "center",
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  artistTitle: {
    fontSize: 16,
    color: "#999",
  },
  containerTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleButtonDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  titleButton: {
    fontSize: 24,
  },
  songDuration: {
    fontSize: 18,
    color: "gray",
  },
  playedTime: {
    fontSize: 18,
    color: "gray",
  },
  songControls: {
    alignItems: "center",
    marginVertical: 20,
  },
  progressLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressDot: {
    height: "100%",
    backgroundColor: "#000",
  },
  progressTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  time: {
    fontSize: 14,
    color: "gray",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  controlButtonShuffle: {
    fontSize: 24,
  },
  controlButtonNextPrevious: {
    fontSize: 24,
  },
  controlButtonPause: {
    fontSize: 48,
  },
  controlButtonRepeat: {
    fontSize: 24,
  },
});
