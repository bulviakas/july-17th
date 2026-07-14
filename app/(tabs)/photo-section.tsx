import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilmFrame from '../../components/Filmframe';
import SprocketStrip from '../../components/Sprocketstrip';
import ChallengeModal from '../../components/map-challenge-modal';
import { CHALLENGES } from '@/assets/data/challenges';
import { MapChallenge } from '@/types/map-challenge';

export default function PhotoBoothScreen() {
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

  const sprocketLength = Math.max(40, CHALLENGES.length * 8);
 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Photo Booth</Text>
 
      <View style={styles.reel}>
        <ScrollView
          style={styles.filmScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.filmContent}
        >
          <SprocketStrip orientation="vertical" length={sprocketLength} />
 
          <View style={styles.frameColumn}>
            {CHALLENGES.map((challenge) => (
              <FilmFrame
                key={challenge.id}
                challenge={challenge}
                onPress={openChallenge}
              />
            ))}
          </View>
 
          <SprocketStrip orientation="vertical" length={sprocketLength} />
        </ScrollView>
      </View>
 
      <ChallengeModal
        challenge={selectedChallenge}
        visible={modalVisible}
        onClose={closeChallenge}
      />
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F184D',
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 16,
    marginBottom: 16,
    color: '#FFCA06',
  },
  reel: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 36,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden', 
  },
  filmScroll: {
    flex: 1,
  },
  filmContent: {
    flexDirection: 'row', 
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  frameColumn: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
