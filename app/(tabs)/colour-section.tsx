import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RainbowStrip from '@/components/RainbowStrip';
import ColorChallengeModal from '@/components/ColorChallengeModal';
import { ColorChallenge } from '@/types/ColorChallenge';

export default function ColorSectionScreen() {
  const [selectedColor, setSelectedColor] = useState<ColorChallenge | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openColor = (color: ColorChallenge): void => {
    setSelectedColor(color);
    setModalVisible(true);
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Color Catch</Text>
      <RainbowStrip onSelectColor={openColor} />
      <ColorChallengeModal
        color={selectedColor}
        visible={modalVisible}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F184D',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#FFCA06',
  },
});