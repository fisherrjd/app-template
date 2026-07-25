<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import ArticleCard from '@/components/content/ArticleCard.vue'
import FilterBar from '@/components/data/FilterBar.vue'
import SearchInput from '@/components/data/SearchInput.vue'
import EmptyState from '@/components/states/EmptyState.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDate, POSTS, readingTime } from '@/lib/posts'

const search = ref('')
const tag = ref('all')

const allTags = [...new Set(POSTS.flatMap((p) => p.tags))].sort()

const filtered = computed(() =>
  POSTS.filter(
    (p) =>
      (tag.value === 'all' || p.tags.includes(tag.value)) &&
      (p.title + p.excerpt).toLowerCase().includes(search.value.trim().toLowerCase()),
  ),
)

const filtersActive = computed(() => search.value !== '' || tag.value !== 'all')

function clearFilters() {
  search.value = ''
  tag.value = 'all'
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Blog" description="Notes from building the template — rendered markdown, themed." />

    <FilterBar :count="filtered.length" :active="filtersActive" @clear="clearFilters">
      <SearchInput v-model="search" placeholder="Search posts…" />
      <Select v-model="tag">
        <SelectTrigger class="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All tags</SelectItem>
          <SelectItem v-for="t in allTags" :key="t" :value="t">{{ t }}</SelectItem>
        </SelectContent>
      </Select>
    </FilterBar>

    <div v-if="filtered.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="(post, i) in filtered"
        :key="post.slug"
        :to="{ name: 'post', params: { slug: post.slug } }"
        class="rise-in block h-full"
        :style="{ animationDelay: `${i * 60}ms` }"
      >
        <ArticleCard
          :title="post.title"
          :excerpt="post.excerpt"
          :date="formatDate(post.date)"
          :tags="post.tags"
          :reading-time="readingTime(post.body)"
        />
      </RouterLink>
    </div>
    <EmptyState
      v-else
      title="No posts match"
      description="Try a different search or clear the filters."
    />
  </div>
</template>
