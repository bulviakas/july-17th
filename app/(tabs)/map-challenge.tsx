import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map challenge</Text>
      <Link href="/(tabs)" style={styles.button}>Go Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070304',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    color: 'green'
  }
});