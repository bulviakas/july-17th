import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useChallenges } from '../contexts/challenge-context';
import { MapChallenge } from '../types/map-challenge';

interface FilmFrameProps {
  challenge: MapChallenge;
  onPress: (challenge: MapChallenge) => void;
}

export default function FilmFrame({ challenge, onPress }: FilmFrameProps) {
  const { isCompleted } = useChallenges();
  const done = isCompleted(challenge.id);

  return (
    <TouchableOpacity
      style={styles.frameOuter}
      onPress={() => onPress(challenge)}
      activeOpacity={0.8}
    >
      <View style={[styles.frameInner, done && styles.frameInnerDone]}>
        {/* */}
      </View>
      <Text style={styles.caption} numberOfLines={1}>
        {challenge.title}
      </Text>
    </TouchableOpacity>
  );
}

const FRAME_HEIGHT = 140;

const styles = StyleSheet.create({
  frameOuter: {
    width: '100%',
    marginVertical: 6,
    alignItems: 'center',
  },
  frameInner: {
    width: '100%',
    height: FRAME_HEIGHT,
    backgroundColor: '#C91C7A',
    borderWidth: 3,
    borderColor: '#555',
  },
  frameInnerDone: {
    borderColor: '#34c759',
  },
  caption: {
    marginTop: 6,
    fontSize: 12,
    color: '#ddd',
    textAlign: 'center',
  },
});