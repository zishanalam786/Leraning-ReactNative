import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useAuth, UserRole } from "../components/AuthProvider";
import styles from "../styles/SignUpStyles";

type RootStackParamList = {
  SignUp: undefined;
  Login: { role: UserRole };
  AdminDashboard: undefined;
  UserDashboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const ADMIN_SECRET = "ADMIN-2026";

const SignUpScreen = ({ navigation }: Props) => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const nextErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email.trim())) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validate()) {
      return;
    }

    const role: UserRole = adminKey.trim() === ADMIN_SECRET ? "admin" : "user";

    register({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
    });

    navigation.replace("Login", { role });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text variant="headlineMedium" style={styles.title}>
          Create account
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Sign up to continue
        </Text>

        <TextInput
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          autoCapitalize="words"
        />
        <HelperText type="error" visible={Boolean(errors.name)}>
          {errors.name}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <HelperText type="error" visible={Boolean(errors.email)}>
          {errors.email}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <HelperText type="error" visible={Boolean(errors.password)}>
          {errors.password}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Admin Secret Key (optional)"
          value={adminKey}
          onChangeText={setAdminKey}
          style={styles.input}
          secureTextEntry
        />

        <Button mode="contained" style={styles.primaryButton} onPress={handleSignUp}>
          Sign Up
        </Button>
        <Button
          mode="outlined"
          style={styles.secondaryButton}
          onPress={() => navigation.replace("Login", { role: "user" })}
        >
          Already have an account
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
