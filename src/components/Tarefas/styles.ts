import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#262626",
    borderRadius: 5,
    flexDirection: "row", // alinhar em linha, se stiver em column, alinhado em coluna
    alignItems: "center",
    marginBottom: 10,
    height: 64,
  },
  name: {
    color: "#FFF",
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  nameConcluida: {
    color: "#808080",
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
    textDecorationLine: "line-through",
  },
  circulo: {
    marginLeft: 10,
    height: 17.45,
    width: 17.45,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#4EA8DE",
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },
  circuloConcluida: {
    marginLeft: 10,
    height: 17.45,
    width: 17.45,
    borderRadius: 24,
    borderColor: "#5E60CE",
    backgroundColor: "#5E60CE",
    alignItems: "center",
    justifyContent: "center",
  },
  imageVector: {
    backgroundColor: "#5E60CE",
    height: 7.31,
    width: 12.03,
  },
  imageTrash: {
    marginRight: 10,
    height: 32,
    width: 32,
  },
});
