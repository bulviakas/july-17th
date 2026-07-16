import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useChallenges } from '@/utils/ChallengeProvider';
import { ColorChallenge } from '@/types/ColorChallenge';
import { COLOR_CATEGORIES } from '@/assets/data/color-categories';
import { getSlotId } from '@/utils/ColorSlotId';

interface ColorChallengeModalProps {
  color: ColorChallenge | null;
  visible: boolean;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function ColorChallengeModal({
  color,
  visible,
  onClose,
}: ColorChallengeModalProps) {
  const { completeChallenge, isCompleted, setChallengePhoto, getChallengePhoto } =
    useChallenges();

  const [pickingSlotId, setPickingSlotId] = useState<string | null>(null);

  if (!color) return null;

  const doneCount = COLOR_CATEGORIES.filter((cat) =>
    isCompleted(getSlotId(color.id, cat.id))
  ).length;

  const handlePickForSlot = async (categoryId: string): Promise<void> => {
    const slotId = getSlotId(color.id, categoryId);

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission needed',
        'Please allow access to your photo gallery to complete this challenge.'
      );
      return;
    }

    setPickingSlotId(slotId);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setChallengePhoto(slotId, uri);
        completeChallenge(slotId);
      }
    } catch (err) {
      console.warn('Image picker error:', err);
      Alert.alert(
        'Something went wrong',
        'Could not open your gallery. Please try again.'
      );
    } finally {
      setPickingSlotId(null);
    }
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
          <View style={styles.headerRow}>
            <View
              style={[styles.colorDot, { backgroundColor: color.hex }]}
            />
            <Text style={styles.title}>{color.title}</Text>
            <Text style={styles.progressText}>
              {doneCount}/{COLOR_CATEGORIES.length}
            </Text>
          </View>

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          >
            {COLOR_CATEGORIES.map((category) => {
              const slotId = getSlotId(color.id, category.id);
              const slotDone = isCompleted(slotId);
              const slotPhoto = getChallengePhoto(slotId);
              const isPicking = pickingSlotId === slotId;

              return (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.slot, slotDone && styles.slotDone]}
                  onPress={() => handlePickForSlot(category.id)}
                  disabled={isPicking}
                  activeOpacity={0.8}
                >
                  {slotPhoto ? (
                    <>
                      <Image
                        source={{ uri: slotPhoto }}
                        style={styles.slotImage}
                        contentFit="cover"
                      />
                      <View style={styles.slotLabelOverlay}>
                        <Text style={styles.slotLabelOnPhoto} numberOfLines={2}>
                          {category.label}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={styles.slotIcon}>
                        {isPicking ? '…' : '📷'}
                      </Text>
                      <Text style={styles.slotLabel} numberOfLines={2}>
                        {category.label}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Close</Text>
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
    width: '88%',
    maxHeight: SCREEN_HEIGHT * 0.78,
    backgroundColor: '#3F194D',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFCA06',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFCA06',
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ED9BBD',
  },
  scrollArea: {
    flexGrow: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  slot: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 6,
  },
  slotDone: {
    borderColor: '#34c759',
  },
  slotImage: {
    ...StyleSheet.absoluteFillObject,
  },
  slotLabelOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  slotLabelOnPhoto: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
  },
  slotIcon: {
    fontSize: 26,
    marginBottom: 6,
    opacity: 0.7,
  },
  slotLabel: {
    fontSize: 11,
    color: '#ED9BBD',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  closeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  closeBtnText: {
    color: '#ED9BBD',
  },
});