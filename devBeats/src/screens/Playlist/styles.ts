import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
    // alignItems: "center",
  },
  containerText: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name1: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff'
  },
  description1: {
    fontWeight: '400',
    fontSize: 12,
    color: '#fff'
  },
  image: {
    left: -35,
    top: -35,
    width: 100,
    height: 90,
    marginRight: 10,
    borderRadius: 5,
  },
});
