import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import AuthProvider, { useAuth } from "./AuthContext";

const Stack = createNativeStackNavigator();

const Navigator = () => {

  const [user] = useAuth();

  if (!user) {
    return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />        
        <Stack.Screen name="Register" component={Register} />              
      </Stack.Navigator>
    );
  }

  return(
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
  );
};

const App = () => {
  return(
    <NavigationContainer>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;