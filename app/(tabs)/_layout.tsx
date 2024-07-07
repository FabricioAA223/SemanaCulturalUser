import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tabla general',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={'podium'} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="GamePositions"
        options={{
          title: 'Puntaje por actividad',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'crown' : 'crown-outline'} size={34} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ScheduleScreen"
        options={{
          title: 'Calendario',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'calendar-month' : 'calendar-month-outline'} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
