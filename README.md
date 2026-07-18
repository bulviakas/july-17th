# Mission #1707

A React Native / Expo app built for a single use: a one-day adventure guide with fun challenges prompting to explore the outdoors and bond with friends. This was made as a gift for my partner, so a part of the quests is personalised and in Lithuanian.

[Showcase gif]

## Overview

The app presents a home screen full of **challenge panels**. Complete a task, the global system logs it and adapts the UI to reflect that (colors change, progress bar fills up, etc.). The app currently ships three challenge **categories**, each with a different interaction model, all feeding into one shared, global completion + progress system.

| Category | Screen | Interaction |
|---|---|---|
| **Map Quests(Geoguessr)** | `mapchallenge.tsx` | Tap a panel → read a quest → mark complete |
| **Photo Booth** | `photo-section.tsx` | Scroll a vertical film strip → upload a photo per challenge |
| **Color Catch** | `color-section.tsx` | Tap a color on a horizontal rainbow → fill 6 photo slots per color |


## Quickstart

Go to link https://expo.dev/artifacts/eas/fvAHshrwMN9xxpgl4tA216C1d_zzdI6ELnhhjRGA0aM.apk and install the app.

Mission #0717 requires device **image gallery permissions** to upload photos to challenge modals.

## Features

### Map Quests (Geoguessr)

A simple list of challenge panels. Tapping a panel opens a task, showing a description of a place, its image and quest details, with a "Mark Complete" button. The user has to find and visit the place, and complete the quest to mark the challenge as done.

<img src="assets\images\geoguessr_screen.png" alt="Map Quest Page" width="200"/> 
<img src="assets\images\map_quest.png" alt="Map Challenge" width="200"/> 

---

### Color Catch
 
A horizontal rainbow of 6 colors, each showing an completion badge. Tapping a color opens a task with grid of category slots (e.g. "something in nature," "something edible"). Each slot independently launches the picker and completes just that one slot — progress is tracked per slot, not per color, so partial completion of a color still counts toward the global total. 

<img src="assets\images\color_catch_screen.png" alt="Color Catch Page" width="200"/> 
<img src="assets\images\color_challenge.png" alt="Color Challenge" width="200"/> 

---

### Photo Booth

A vertical, scrollable film strip. Each challenge is rendered as a rectangle that fills with the uploaded photo once one exists — tapping a frame opens the task, which launches the device gallery picker and marks the challenge complete as soon as a photo is selected. 

<img src="assets\images\photo_booth_screen.png" alt="Photo Booth Page" width="200"/> 
<img src="assets\images\photo_challenge.png" alt="Photo Challenge" width="200"/> 

---

### Global Progress Bar

Every challenge across all three categories feeds into one shared total. The home screen shows a single progress bar tracking overall completion — no matter which category a task was finished in, it counts toward the same number, so the whole day's progress is visible at a glance. 

<img src="assets\images\home_screen.png" alt="Home Page" width="200"/>

## Most impressive system :p

The whole app is built on one core insight: **completion tracking doesn't need to know what kind of challenge it's tracking.** A challenge is "done" or "not done," and optionally has a photo attached, regardless of whether it's a map quest, a photo booth frame, or one of 36 individual slots inside the Color Catch rainbow.

This is implemented as:

1. **One global context** (`ChallengeProvider`, in `utils/ChallengeProvider.tsx`) — tracks two maps, keyed by plain `string` id:
   - `completed: Record<string, boolean>`
   - `photos: Record<string, string>` (local URI of an uploaded photo, if any)
2. **One shared base type** (`BaseChallenge`) — `{ id: string; title: string }`. Every challenge category's type extends this, but the context never imports or depends on any category-specific type.
3. **Category-specific types and components** — `MapChallenge`, `PhotoChallenge`, `ColorChallenge` each add their own fields (images, quests, hex colors, etc.), and each has its own modal/screen for rendering, but all of them call the *same* four context functions: `isCompleted(id)`, `completeChallenge(id)`, `getChallengePhoto(id)`, `setChallengePhoto(id, uri)`. Super convenient!

Because of this, adding a fourth, fifth, or sixth challenge category never requires touching the context, the progress bar, or the stats screen — see [Adding a New Challenge Category](#adding-a-new-challenge-category) ;)

## Local Development Setup

```bash
npx expo install @react-native-async-storage/async-storage expo-image-picker expo-image expo-file-system
```

Add the iOS photo library usage description to `app.json`, or the picker will silently fail on iOS:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "We need access to your photos so you can upload proof of completing a challenge."
      }
    }
  }
}
```

Then run as usual:

```bash
npx expo start
```

Works in Expo Go — none of the packages used require a custom native build.

## Adding a New Challenge Category

1. **Type**: create `types/YourChallenge.ts`, extending `BaseChallenge`.
2. **Data**: create `assets/data/your-challenges.ts` with an array of that type.
3. **Components**: build whatever screen/modal makes sense for the interaction — but every read/write of completion or photo state should go through `useChallenges()`, using the challenge's own `id` (or a composite id via a `getSlotId`-style helper, if it's a multi-part challenge like Color Catch).
4. **Wire into the global total**: add your ids to `data/all-challenges.ts`'s `ALL_CHALLENGE_IDS` array.

Nothing else changes. The context, progress bar, and stats screen are all id-agnostic by design!