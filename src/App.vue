<script setup lang="ts">
import { AppShell, type NavSection } from '@fisherrjd/ui/layout'
import {
  FileTextIcon,
  KanbanSquareIcon,
  LayoutDashboardIcon,
  PaletteIcon,
  SettingsIcon,
  SparklesIcon,
} from '@lucide/vue'
import { RouterView } from 'vue-router'

const nav: NavSection[] = [
  {
    label: 'Navigate',
    links: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboardIcon },
      { to: '/project', label: 'Project', icon: KanbanSquareIcon },
      { to: '/blog', label: 'Blog', icon: FileTextIcon },
      { to: '/settings', label: 'Settings', icon: SettingsIcon },
      { to: '/styleguide', label: 'Styleguide', icon: PaletteIcon },
    ],
  },
]
</script>

<template>
  <AppShell brand="app-template" :icon="SparklesIcon" :nav="nav">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </AppShell>
</template>
