import React, { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Panel from '../../components/Panel';
import ChallengeModal from '../../components/map-challenge-modal';
import { CHALLENGES } from '../../assets/data/map-challenges';
import { MapChallenge } from '../../types/map-challenge';

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
      <Text style={styles.header}>Today's Challenges</Text>
      <FlatList<MapChallenge>
        data={CHALLENGES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Panel challenge={item} onPress={openChallenge} />
        )}
      />
      <ChallengeModal
        challenge={selectedChallenge}
        visible={modalVisible}
        onClose={closeChallenge}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070304', paddingTop: 20 },
  header: { fontSize: 22, fontWeight: '700', marginLeft: 16, marginBottom: 8 },
});