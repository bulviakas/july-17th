import { StyleSheet, View } from "react-native";

import Panel from '@/components/Panel';

export default function Index() {
  return (
    <View style={styles.container}>
      <View>
        <Panel label="Panel #1" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2825',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  }
});