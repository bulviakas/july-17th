import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MapChallenge } from '../types/MapChallenge';
import { useChallenges } from '../utils/ChallengeProvider';

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
      <Text style={styles.status}>{done ? 'Yippee!' : 'To Be Sidequested'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#FFCB06',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    borderWidth: 3,
    borderColor: '#05080E',
  },
  panelDone: {
    backgroundColor: '#ed9bbd',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#05080E'
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    color: '#5F0872',
  },
});