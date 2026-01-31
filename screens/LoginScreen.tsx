import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useAuth, UserRole } from "../components/AuthProvider";
import styles from "../styles/LoginStyles";

type RootStackParamList = {
  SignUp: undefined;
  Login: { role: UserRole };
  AdminDashboard: undefined;
  UserDashboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation, route }: Props) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    const resolvedRole = result.role ?? route.params?.role ?? "user";
    const destination = resolvedRole === "admin" ? "AdminDashboard" : "UserDashboard";

    navigation.reset({
      index: 0,
      routes: [{ name: destination }],
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome back
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Log in to your account
        </Text>

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <HelperText type="error" visible={Boolean(error)}>
          {error}
        </HelperText>

        <Button mode="contained" style={styles.primaryButton} onPress={handleLogin}>
          Login
        </Button>
        <Button
          mode="outlined"
          style={styles.secondaryButton}
          onPress={() => navigation.replace("SignUp")}
        >
          Create a new account
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
