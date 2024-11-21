import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#03A9F4",
    // borderWidth: 0.5,
    // borderStyle: 'solid',
    // borderColor: '#fff',
    borderBottomWidth: 5,
    borderBottomColor: '#3e5954',
    borderBottomEndRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    width: '45%',
    height: 70,
    marginLeft: 10,
    // padding: 20,
    margin: 5,
  },
  title: {
    color: '#fff',
    top: 25,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  image: {
    width: 59,
    height: 63.8,
    // marginLeft: 40,
    // transform: [{ rotate: "30deg" }],
    borderTopEndRadius: 10,
    alignSelf: "flex-end",
    
  },
});
