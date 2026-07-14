import { ChallengeProvider } from "@/contexts/challenge-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ChallengeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false,  contentStyle: { backgroundColor: "#3F184D" }}} />
      </Stack>
    </ChallengeProvider>
  );
}
