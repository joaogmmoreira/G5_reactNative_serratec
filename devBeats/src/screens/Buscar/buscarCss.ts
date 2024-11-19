import { StyleSheet } from "react-native";

export const buscarCss = StyleSheet.create({


  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  flatListContainer: {
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
})