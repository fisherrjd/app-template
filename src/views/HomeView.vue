<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <div class="mx-auto max-w-xl pt-12">
    <Card>
      <CardHeader>
        <CardTitle>This is your new app</CardTitle>
        <CardDescription>
          Start by editing
          <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/views/HomeView.vue</code>.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex items-center gap-3">
        <Button as-child>
          <RouterLink to="/styleguide">Open the styleguide</RouterLink>
        </Button>
        <p class="text-sm text-muted-foreground">Theme presets and every component, live.</p>
      </CardContent>
    </Card>
  </div>
</template>
