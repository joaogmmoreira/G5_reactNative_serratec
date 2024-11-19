import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    // backgroundColor: "#000000",
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: -5,
  },
  appName: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 10,
    fontFamily: "Poppins_100Thin",
    textAlign: "center",
  },
  appDescription: {
    fontSize: 30,
    color: "#4EAEA4",
    marginBottom: 40,
    fontFamily: "Silkscreen_400Regular",
  },
  inputContainer: {
    width: "100%",
    height: "35%",
    backgroundColor: "#231F1E",
    padding: 25,
    borderRadius: 8,
    marginBottom: 50,
  },
  login: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ffff",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: "#ffff",
    borderRadius: 20,
  },
  line2: {
    width: "100%",
    height: 2,
    backgroundColor: "#4EAEA4",
    marginVertical: 3,
    alignSelf: "center",
  },
  linesContainer2: {
    marginBottom: 10,
  },

  buttonContainer: {
    marginTop: 40,
    alignSelf: "center",
    width: "100%",
  },
});
