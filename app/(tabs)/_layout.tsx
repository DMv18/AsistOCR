import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="crear-asistencia" />
      <Stack.Screen name="config" />
      <Stack.Screen name="editar-evento" />
    </Stack>
  );
}

