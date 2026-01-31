import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  secondaryButton: {
    marginTop: 10,
    borderRadius: 12,
  },
});

export default styles;
