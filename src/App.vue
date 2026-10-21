<script setup lang="ts">
import { Button } from '@fisherrjd/ui/button'
import { Toaster } from '@fisherrjd/ui/sonner'
import { LOCKED, THEME, ThemeToggle, useTheme } from '@fisherrjd/ui/theme'
import {
  FileTextIcon,
  KanbanSquareIcon,
  LayoutDashboardIcon,
  MenuIcon,
  PaletteIcon,
  SettingsIcon,
  SparklesIcon,
  XIcon,
} from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const { mode } = useTheme()
const route = useRoute()

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboardIcon },
  { to: '/project', label: 'Project', icon: KanbanSquareIcon },
  { to: '/blog', label: 'Blog', icon: FileTextIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
  { to: '/styleguide', label: 'Styleguide', icon: PaletteIcon },
]

// manual active check: `/` must not light up for every route
function isActive(to: string) {
  return to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(`${to}/`)
}
const current = computed(() => links.find((link) => isActive(link.to))?.label ?? '')

// phones: the sidebar is a drawer, closed again on every navigation
const navOpen = ref(false)
watch(() => route.path, () => (navOpen.value = false))
</script>

<template>
  <div class="flex min-h-screen bg-background text-foreground">
    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r bg-sidebar transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0"
      :class="navOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-14 shrink-0 items-center gap-2.5 px-4">
        <RouterLink to="/" class="flex items-center gap-2.5 font-heading font-bold tracking-tight">
          <span class="grid size-6 place-items-center rounded-sm bg-primary text-primary-foreground">
            <SparklesIcon class="size-3.5" />
          </span>
          app-template
        </RouterLink>
        <Button variant="ghost" size="icon-sm" class="ml-auto md:hidden" aria-label="Close navigation" @click="navOpen = false">
          <XIcon />
        </Button>
      </div>

      <nav aria-label="Main" class="flex-1 space-y-0.5 overflow-y-auto px-2 py-3 font-mono text-[13px]">
        <p class="px-2 pb-2 text-[11px] tracking-widest text-muted-foreground">NAVIGATE</p>
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-2.5 rounded-md px-2 py-1.5 lowercase transition-colors"
          :class="isActive(link.to) ? 'bg-muted font-medium text-primary-text' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'"
          :aria-current="isActive(link.to) ? 'page' : undefined"
        >
          <component :is="link.icon" class="size-4" />
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="space-y-1 border-t px-4 py-3 font-mono text-[11px] text-muted-foreground">
        <p class="flex items-center gap-2">
          <span class="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          {{ THEME.palette }} · {{ THEME.style }} · {{ mode }}
        </p>
        <p>built from app-template</p>
      </div>
    </aside>

    <!-- phones: dim the page behind the open drawer; tap to close -->
    <div
      v-if="navOpen"
      class="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm md:hidden"
      aria-hidden="true"
      @click="navOpen = false"
    />

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur md:px-6">
        <Button variant="ghost" size="icon" class="md:hidden" aria-label="Open navigation" @click="navOpen = true">
          <MenuIcon />
        </Button>
        <p class="font-mono text-xs text-muted-foreground">
          app-template / <span class="lowercase text-foreground">{{ current }}</span>
        </p>
        <div class="ml-auto flex items-center gap-1">
          <!-- a locked mode (ui({ lockMode: true }) in vite.config.ts) leaves nothing to toggle -->
          <ThemeToggle v-if="!LOCKED" />
        </div>
      </header>

      <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>

    <Toaster position="bottom-right" />
  </div>
</template>
