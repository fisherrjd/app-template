<script setup lang="ts">
import { ArrowLeftIcon } from '@lucide/vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import MarkdownView from '@/components/content/MarkdownView.vue'
import PostMeta from '@/components/content/PostMeta.vue'
import ErrorState from '@/components/states/ErrorState.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatDate, POSTS, readingTime } from '@/lib/posts'

const route = useRoute()
const post = computed(() => POSTS.find((p) => p.slug === route.params.slug))
</script>

<template>
  <article v-if="post" class="mx-auto max-w-2xl space-y-6">
    <RouterLink
      to="/blog"
      class="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeftIcon class="size-4" />
      All posts
    </RouterLink>

    <div class="space-y-4">
      <div class="flex flex-wrap gap-1.5">
        <Badge v-for="t in post.tags" :key="t" variant="secondary" class="text-[10px]">
          {{ t }}
        </Badge>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-balance">{{ post.title }}</h1>
      <PostMeta
        :author="post.author"
        :date="formatDate(post.date)"
        :reading-time="readingTime(post.body)"
      />
    </div>

    <Separator />

    <MarkdownView :source="post.body" />
  </article>

  <div v-else class="mx-auto max-w-2xl pt-8">
    <ErrorState
      title="Post not found"
      description="It may have been renamed or deleted."
    >
      <template #action>
        <Button variant="outline" size="sm" as-child>
          <RouterLink to="/blog">Back to the blog</RouterLink>
        </Button>
      </template>
    </ErrorState>
  </div>
</template>
