import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import Section from '@/components/section';

export default function Index() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Section label="Geoguesser" onPress={() => router.push("/(tabs)/map-section")}/>
        <Section label="Colour Catch" onPress={() => router.push("/(tabs)/colour-section")}/>
        <Section label="Photo Booth" onPress={() => router.push("/(tabs)/photo-section")}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F184D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  }
});