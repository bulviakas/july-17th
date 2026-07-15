import { PhotoChallenge } from '@/types/PhotoChallenge';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useChallenges } from '../contexts/ChallengeProvider';

interface FilmFrameProps {
  challenge: PhotoChallenge;
  onPress: (challenge: PhotoChallenge) => void;
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
    </TouchableOpacity>
  );
}

const FRAME_HEIGHT = 140;

const styles = StyleSheet.create({
  frameOuter: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  frameInner: {
    width: '85%',
    height: FRAME_HEIGHT,
    backgroundColor: '#ae1368',
    borderWidth: 3,
    borderRadius: 6,
    borderColor: '#ae1368',
  },
  frameInnerDone: {
    borderColor: '#3F184D',
  },
});