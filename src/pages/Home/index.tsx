import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
} from "react-native";
import { Tarefas } from "../../components/Tarefas";
import { styles } from "./styles";
import { useCallback, useState } from "react";
import { executeSql } from "../../../db";
import { useFocusEffect } from "@react-navigation/native";

interface Tarefa {
  id: number;
  descricao: string;
  isCheck?: boolean;
  isComplete?: boolean;
}

export default function Home() {
  const [tarefa, setTarefa] = useState<Tarefa[]>([] as Tarefa[]);
  const [conteudoTarefa, setConteudoTarefa] = useState("");
  const [qtdConcluido, setQtdConcluido] = useState(0);

  async function handleDelete(id: number) {
    executeSql("DELETE FROM tarefas WHERE id = ?", [id])
      .then(() => {
        fetchData();
      })
      .catch((err) => console.error("Erro ao remover tarefa:", err));
  }

  function handleAlertRemoveTarefa(id: number) {
    Alert.alert(
      "Remover tarefa ",
      ` Deseja remover a seguinte tarefa:  ${id}?`,
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => handleDelete(id),
        },
      ]
    );
  }

  async function handleConclusao(id: any, conc: boolean) {
    executeSql("UPDATE tarefas SET isComplete = ? WHERE id = ?", [conc, id])
      .then(() => {
        fetchData();
      })
      .catch((err) => console.error("Erro ao concluir tarefa:", err));
  }

  async function getAllTarefas() {
    executeSql("SELECT * FROM tarefas")
      .then((result) => {
        const data = result;
        setTarefa(data);
      })
      .catch((err) => console.error("Erro ao buscar tarefas:", err));
  }

  async function countCompleted() {
    executeSql("SELECT COUNT(*) as count FROM tarefas WHERE isComplete = 1")
      .then((result) => {
        const data = result[0].count;
        setQtdConcluido(data);
      })
      .catch((err) => console.error("Erro ao buscar tarefas concluidas:", err));
  }

  async function fetchData() {
    await getAllTarefas();
    await countCompleted();
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <View style={styles.info}>
        <View style={styles.infoTask}>
          <Text style={styles.criadas}>Criadas</Text>
          <View style={styles.circulo}>
            <Text style={{ color: "#fff" }}>{tarefa?.length}</Text>
          </View>
        </View>

        <View style={styles.infoTask}>
          <Text style={styles.concluidas}>Concluídas</Text>
          <View style={styles.circulo}>
            <Text style={{ color: "#fff" }}>{qtdConcluido}</Text>
          </View>
        </View>
      </View>
      <View style={styles.listaView}>
        <FlatList
          contentContainerStyle={styles.conteudoLista}
          data={tarefa}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Tarefas
              key={item.id}
              descricao={item.descricao}
              onRemove={() => handleAlertRemoveTarefa(item.id)}
              onConcluir={() =>
                handleConclusao(item.id, !item.isComplete ?? false)
              }
              isConcluida={item.isComplete ?? false}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <View style={styles.emptyListLine}>
                <View style={styles.separador}>
                  <View style={styles.linha}></View>
                </View>
              </View>
              <Text style={styles.vazioListaTitulo}>
                {" "}
                Você ainda não tem tarefas cadastradas
              </Text>
            </View>
          )}
        />
      </View>
      <StatusBar style="light" />
    </View>
  );
}
