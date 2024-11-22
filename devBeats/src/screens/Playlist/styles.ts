import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 5,
  },
  containerText: {
    flex: 1,
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "45%",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  description: {
    fontWeight: "400",
    fontSize: 12,
    color: "#fff",
  },
});
