<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ThemePicker from '@/components/ThemePicker.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <header class="border-b bg-card">
      <div class="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-4">
        <RouterLink to="/" class="font-semibold tracking-tight">app-template</RouterLink>
        <nav class="flex items-center gap-4 text-sm text-muted-foreground">
          <RouterLink
            to="/"
            class="transition-colors hover:text-foreground"
            active-class="text-foreground"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/styleguide"
            class="transition-colors hover:text-foreground"
            active-class="text-foreground"
          >
            Styleguide
          </RouterLink>
        </nav>
        <div class="ml-auto flex items-center gap-1">
          <ThemePicker />
          <ThemeToggle />
        </div>
      </div>
    </header>
    <main class="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <RouterView />
    </main>
    <footer class="border-t">
      <div class="mx-auto w-full max-w-5xl px-4 py-4 text-xs text-muted-foreground">
        built from app-template
      </div>
    </footer>
    <Toaster position="bottom-right" />
  </div>
</template>
