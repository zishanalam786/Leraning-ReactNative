import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { AuthProvider } from "../components/AuthProvider";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UserDashboardScreen from "../screens/UserDashboardScreen";
import rootStyles from "../styles/AppRootStyles";

export type RootStackParamList = {
  SignUp: undefined;
  Login: { role: "admin" | "user" };
  AdminDashboard: undefined;
  UserDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#4F46E5",
    secondary: "#6366F1",
  },
};

const Index = () => (
  <GestureHandlerRootView style={rootStyles.root}>
    <PaperProvider theme={theme}>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="SignUp"
          screenOptions={{ headerShown: false, animation: "fade" }}
        >
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
          <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
        </Stack.Navigator>
      </AuthProvider>
    </PaperProvider>
  </GestureHandlerRootView>
);

export default Index;
