import { Poppins_100Thin, Poppins_300Light, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#000000',
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    color: '#ffffff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
  },
  input: {
    backgroundColor: "#ffffff",
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 15,
    textAlignVertical: "center",
    width: 360,
    marginLeft: 15,
  },
  
  flatListContainer: {
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    margin: 5,
    alignItems: "center",
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
  teste: {
    width: '100%',
    marginTop: -20,
  },
});
