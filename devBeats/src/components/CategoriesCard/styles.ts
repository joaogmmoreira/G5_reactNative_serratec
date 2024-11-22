import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 5,
    borderBottomColor: "#3e5954",
    borderBottomEndRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    width: "45%",
    height: 70,
    marginLeft: 10,
    marginBottom: 7,
    paddingLeft: 12,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    paddingBottom: 50,
  },
  title: {
    color: "#fff",
    top: 25,
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    width: 59,
    height: 63.8,
    borderTopEndRadius: 10,
  },
});
