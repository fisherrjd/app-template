<script setup lang="ts">
import { Badge } from '@fisherrjd/ui/badge'
import { Card } from '@fisherrjd/ui/card'
import { CalendarIcon, ClockIcon } from '@lucide/vue'
import { computed } from 'vue'

// presentational — wrap it in a RouterLink (class="block h-full") to
// make it navigate; card-hover supplies the affordance.
const props = defineProps<{
  title: string
  excerpt: string
  /** already formatted for display */
  date: string
  tags?: string[]
  readingTime?: string
}>()

// deterministic cover gradient from the title — no images required
const GRADS = [
  'from-chart-1/35 via-chart-2/15 to-transparent',
  'from-chart-3/35 via-chart-1/15 to-transparent',
  'from-chart-2/35 via-chart-4/15 to-transparent',
  'from-chart-4/35 via-chart-3/15 to-transparent',
]
const grad = computed(() => {
  let h = 0
  for (const ch of props.title) h = (h * 31 + ch.charCodeAt(0)) | 0
  return GRADS[Math.abs(h) % GRADS.length]
})
</script>

<template>
  <Card class="card-hover h-full gap-3 p-5">
    <div class="relative h-20 overflow-hidden rounded-lg bg-gradient-to-br" :class="grad">
      <span
        class="absolute -right-1 -bottom-4 font-serif text-7xl font-bold text-foreground/10 select-none"
        aria-hidden="true"
      >
        {{ title[0] }}
      </span>
    </div>
    <div v-if="tags?.length" class="flex flex-wrap gap-1.5">
      <Badge v-for="t in tags" :key="t" variant="secondary" class="text-[10px]">{{ t }}</Badge>
    </div>
    <h3 class="text-lg leading-snug font-semibold tracking-tight">{{ title }}</h3>
    <p class="line-clamp-3 text-sm text-muted-foreground">{{ excerpt }}</p>
    <p class="mt-auto flex items-center gap-3 pt-1 text-xs text-muted-foreground">
      <span class="inline-flex items-center gap-1">
        <CalendarIcon class="size-3.5" />
        {{ date }}
      </span>
      <span v-if="readingTime" class="inline-flex items-center gap-1">
        <ClockIcon class="size-3.5" />
        {{ readingTime }}
      </span>
    </p>
  </Card>
</template>
