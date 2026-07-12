import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useChallenges } from '../contexts/map-challenge-context';
import { MapChallenge } from '../types/map-challenge';

interface PanelProps {
  challenge: MapChallenge;
  onPress: (challenge: MapChallenge) => void;
}

export default function Panel({ challenge, onPress }: PanelProps) {
  const { isCompleted } = useChallenges();
  const done = isCompleted(challenge.id);

  return (
    <TouchableOpacity
      style={[styles.panel, done && styles.panelDone]}
      onPress={() => onPress(challenge)}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.status}>{done ? '✓ Completed' : 'Tap to start'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#81021f',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  panelDone: {
    backgroundColor: '#FFA531',
    borderColor: '#34c759',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    color: '#666',
  },
});