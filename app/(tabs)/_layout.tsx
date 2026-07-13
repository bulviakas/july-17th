import { ChallengeProvider } from '@/contexts/map-challenge-context';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <ChallengeProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#3F184D" }}}></Stack>
    </ChallengeProvider>
  );
}
