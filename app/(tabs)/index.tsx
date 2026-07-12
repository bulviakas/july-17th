import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import Panel from '@/components/Panel';

export default function Index() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Panel label="Geoguesser" onPress={() => router.push("/(tabs)/map-challenge")}/>
        <Panel label="Colour Catch" onPress={() => router.push("/(tabs)/colour-challenge")}/>
        <Panel label="Photo Booth" onPress={() => router.push("/(tabs)/photo-challenge")}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070304',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  }
});