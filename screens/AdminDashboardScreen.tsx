import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../styles/AdminDashboardStyles";

type RootStackParamList = {
  SignUp: undefined;
  Login: { role: "admin" | "user" };
  AdminDashboard: undefined;
  UserDashboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "AdminDashboard">;

const AdminDashboardScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text variant="headlineMedium" style={styles.title}>
        Admin Dashboard
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Placeholder screen for admin users.
      </Text>
      <Button mode="contained" onPress={() => navigation.replace("Login", { role: "admin" })}>
        Log out
      </Button>
    </View>
  </View>
);

export default AdminDashboardScreen;
