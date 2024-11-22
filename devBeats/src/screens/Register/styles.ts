import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
    fontFamily: "Poppins_100Thin",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ffff",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: "#ffff",
    borderRadius: 20,
    width: 300,
  },
  button: {
    backgroundColor: "#4EAEA4",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 300,
    alignItems: "center",
  },
});
