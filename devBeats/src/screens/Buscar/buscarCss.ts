import { StyleSheet } from "react-native";

export const buscarCss = StyleSheet.create({

    bodySearch:{
        flex: 1,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
      },
      container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      item: {
        width: '48%', // Tamanho dos itens no FlatList
        marginBottom: 20,
        alignItems: 'center',
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 10,
      },
      text: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
      },
})