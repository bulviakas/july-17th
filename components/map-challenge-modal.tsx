import React from 'react';
import { Image } from 'expo-image';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useChallenges } from '../contexts/map-challenge-context';
import { MapChallenge } from '../types/map-challenge';

interface ChallengeModalProps {
  challenge: MapChallenge | null;
  visible: boolean;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function ChallengeModal({
  challenge,
  visible,
  onClose,
}: ChallengeModalProps) {
  const { completeChallenge, isCompleted } = useChallenges();

  if (!challenge) return null;

  const done = isCompleted(challenge.id);

  const handleComplete = (): void => {
    completeChallenge(challenge.id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{challenge.title}</Text>
          <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>{challenge.placeDescription}</Text>
            <Image source={challenge.image} style={styles.image} contentFit='cover' />
            <Text style={styles.description}>{challenge.quest}</Text>
          </ScrollView>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={onClose}>
              <Text style={styles.secondaryBtnText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleComplete}
              disabled={done}
            >
              <Text style={styles.primaryBtnText}>
                {done ? 'Done' : 'Mark Complete'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    maxHeight: SCREEN_HEIGHT * 0.75,
    backgroundColor: '#3F194D',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFCA06'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#FFCA06'
  },
  description: {
    fontSize: 14,
    color: '#ed9bbd',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  secondaryBtnText: {
    color: '#FFCA06',
  },
  primaryBtn: {
    backgroundColor: '#FFCA06',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  primaryBtnText: {
    color: '#68097E',
    fontWeight: '600',
  },
  image: {
    height: 400,
    margin: 6,
    marginBottom: 10,
    borderRadius: 18,
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingBottom: 8,
  }
});