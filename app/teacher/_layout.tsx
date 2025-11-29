import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayoutTeacher() {
  return (
    <Stack>
        <Stack.Screen name="(dashboard)/home" options={ { headerShown: false }}  />
    </Stack>
  )
}