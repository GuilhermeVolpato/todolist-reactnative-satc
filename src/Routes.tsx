import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CadastroTarefa from "./pages/CadastroTarefa";
import Home from "./pages/Home";
import { Feather } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Tarefas" component={Home} options={{
          tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} />,
        }}/>
        <Screen name="Cadastro de tarefa" component={CadastroTarefa} options={{
          tabBarIcon: ({ size, color }) => <Feather name="plus-circle" size={size} color={color} />,
        }}/>
      </Navigator>
    </NavigationContainer>
  );
}
