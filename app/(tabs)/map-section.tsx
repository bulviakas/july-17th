import React, { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MAP_CHALLENGES } from '../../assets/data/map-challenges';
import MapChallengeModal from '../../components/MapChallengeModal';
import Panel from '../../components/Panel';
import { MapChallenge } from '../../types/MapChallenge';

export default function MapSection() {
  const [selectedChallenge, setSelectedChallenge] = useState<MapChallenge | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openChallenge = (challenge: MapChallenge): void => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const closeChallenge = (): void => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Geoguessr</Text>
      <FlatList<MapChallenge>
        data={MAP_CHALLENGES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Panel challenge={item} onPress={openChallenge} />
        )}
      />
      <MapChallengeModal
        challenge={selectedChallenge}
        visible={modalVisible}
        onClose={closeChallenge}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3F184D', paddingTop: 20 },
  header: { fontSize: 22, fontWeight: '700', marginLeft: 16, marginBottom: 8, color: '#FFCA06' },
}); 