import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../styles/UserDashboardStyles";

type RootStackParamList = {
  SignUp: undefined;
  Login: { role: "admin" | "user" };
  AdminDashboard: undefined;
  UserDashboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "UserDashboard">;

const UserDashboardScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text variant="headlineMedium" style={styles.title}>
        User Dashboard
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Placeholder screen for standard users.
      </Text>
      <Button mode="contained" onPress={() => navigation.replace("Login", { role: "user" })}>
        Log out
      </Button>
    </View>
  </View>
);

export default UserDashboardScreen;
