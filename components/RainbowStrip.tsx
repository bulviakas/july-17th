import { COLOR_CATEGORIES } from '@/assets/data/color-categories';
import { COLOR_CHALLENGES } from '@/assets/data/color-challenges';
import { ColorChallenge } from '@/types/ColorChallenge';
import { useChallenges } from '@/utils/ChallengeProvider';
import { getSlotId } from '@/utils/ColorSlotId';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RainbowStripProps {
  onSelectColor: (color: ColorChallenge) => void;
}

export default function RainbowStrip({ onSelectColor }: RainbowStripProps) {
  const { isCompleted } = useChallenges();

  return (
    <View style={styles.strip}>
      {COLOR_CHALLENGES.map((color) => {
        const doneCount = COLOR_CATEGORIES.filter((cat) =>
          isCompleted(getSlotId(color.id, cat.id))
        ).length;
        const isFullyDone = doneCount === COLOR_CATEGORIES.length;

        return (
          <TouchableOpacity
            key={color.id}
            style={[styles.band, { backgroundColor: color.hex }]}
            onPress={() => onSelectColor(color)}
            activeOpacity={0.75}
          >
            <Text style={styles.bandLabel}>{color.title}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {doneCount}/{COLOR_CATEGORIES.length}
              </Text>
            </View>
            {isFullyDone && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  band: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  bandLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  badge: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  checkmark: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
  },
});