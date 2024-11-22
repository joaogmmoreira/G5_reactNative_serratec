import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 50,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
    color: "#fff",
  },
  photoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  gear: {
    marginRight: 20,
  },
  secondaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    color: "#fff",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginLeft: 10,
  },
  container: {
    flex: 1,
  },
});
