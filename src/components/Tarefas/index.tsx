import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";

type Props = {
  descricao: string;
  isConcluida: boolean;
  onRemove: () => void;
  onConcluir: () => void;
};

export function Tarefas({descricao, onRemove, onConcluir, isConcluida }: Props) {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onConcluir}>
        <View style={isConcluida ? styles.circuloConcluida : styles.circulo}>
          {isConcluida ? (
            <View>
              <Image
                style={styles.imageVector}
              />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
      <Text style={isConcluida ? styles.nameConcluida : styles.name}>
        {descricao}
      </Text>
      <TouchableOpacity onPress={onRemove} style={{paddingRight: 15}}>
        <Feather name="trash" size={18} />
      </TouchableOpacity>
    </View>
  );
}
