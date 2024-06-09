import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { executeSql } from "../../../db";
import { styles } from "./styles";

export default function CadastroTarefa() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleAddTarefa(descricao: string) {
    const isCheck = false;
    const isComplete = false;

    await executeSql(
      "INSERT INTO tarefas (descricao, isCheck, isComplete) VALUES (?, ?, ?)",
      [descricao, isCheck, isComplete]
    )
      .then(() => {
        setDescricao("");
        Alert.alert("Tarefa adicionada com sucesso");
      })
      .catch((err) => console.error("Erro ao adicionar tarefa:", err));
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Tarefa</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
        placeholderTextColor="#999"
      />
      <Button
        title="Adicionar Tarefa"
        onPress={() => handleAddTarefa(descricao)}
      />
    </View>
  );
}

