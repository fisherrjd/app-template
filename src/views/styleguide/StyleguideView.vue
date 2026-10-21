<script setup lang="ts">
import { Separator } from '@fisherrjd/ui/separator'
import { ColorSwatches, ComponentGallery, ThemeLab, TypeScale } from '@fisherrjd/ui/styleguide'
import ContentPatterns from './ContentPatterns.vue'
import DashboardPatterns from './DashboardPatterns.vue'
import DataPatterns from './DataPatterns.vue'
import FormPatterns from './FormPatterns.vue'
import ProjectPatterns from './ProjectPatterns.vue'
import StatePatterns from './StatePatterns.vue'
</script>

<template>
  <div class="space-y-10">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="space-y-1">
        <p class="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">jade's theme</p>
        <h1 class="text-3xl font-bold tracking-tight">Styleguide</h1>
        <p class="text-muted-foreground">
          The theme lab repaints the whole app live — try palettes, fonts and styles, then
          paste the config into <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">vite.config.ts</code>.
          Colors, type and components come from
          <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">@fisherrjd/ui</code>; the patterns below live in this app.
        </p>
      </div>
    </div>

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />Theme lab</h2>
      <ThemeLab />
    </section>

    <Separator />

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />Colors</h2>
      <ColorSwatches />
    </section>

    <Separator />

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />Typography</h2>
      <TypeScale />
    </section>

    <Separator />

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />Components</h2>
      <ComponentGallery />
    </section>

    <Separator />

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />Dashboard patterns</h2>
      <p class="text-sm text-muted-foreground">
        Reusable pieces from
        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/components/dashboard/</code>
        — the home dashboard is built entirely from these.
      </p>
      <DashboardPatterns />
    </section>

    <Separator />

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />Project patterns</h2>
      <p class="text-sm text-muted-foreground">
        GitHub/orchestration pieces from
        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/components/project/</code>
        — see them working together on the Project page.
      </p>
      <ProjectPatterns />
    </section>

    <Separator />

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />Form patterns</h2>
      <p class="text-sm text-muted-foreground">
        From
        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/components/forms/</code>
        — the Settings page is the full worked example.
      </p>
      <FormPatterns />
    </section>

    <Separator />

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />Data patterns</h2>
      <p class="text-sm text-muted-foreground">
        From
        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/components/data/</code>
        — the dashboard's orders table uses the same DataTable.
      </p>
      <DataPatterns />
    </section>

    <Separator />

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />State patterns</h2>
      <p class="text-sm text-muted-foreground">
        From
        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">@fisherrjd/ui/states</code>
        — empty, error, confirm, and loading.
      </p>
      <StatePatterns />
    </section>

    <Separator />

    <section class="space-y-4">
      <h2 class="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <span class="size-2 rounded-sm bg-primary" aria-hidden="true" />Content patterns</h2>
      <p class="text-sm text-muted-foreground">
        From
        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/components/content/</code>
        — the Blog pages are the worked example.
      </p>
      <ContentPatterns />
    </section>
  </div>
</template>
