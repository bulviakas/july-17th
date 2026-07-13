import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useChallenges } from '../contexts/map-challenge-context';
import { MapChallenge } from '../types/map-challenge';

interface ChallengeModalProps {
  challenge: MapChallenge | null;
  visible: boolean;
  onClose: () => void;
}

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
          <Text style={styles.description}>{challenge.description}</Text>

          {/* Chellenge stuff to be done */}

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
    backgroundColor: '#3F194D',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFCA06'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
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
});