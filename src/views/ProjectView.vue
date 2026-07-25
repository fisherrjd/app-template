<script setup lang="ts">
import { PlusIcon, RotateCcwIcon } from '@lucide/vue'
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import PageHeader from '@/components/PageHeader.vue'
import { uid } from '@/lib/utils'
import KanbanBoard from '@/components/project/KanbanBoard.vue'
import NotesPanel from '@/components/project/NotesPanel.vue'
import PullRequestItem from '@/components/project/PullRequestItem.vue'
import type { KanbanColumnData } from '@/components/project/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ————— demo data; the repo picker and PR list are where the GitHub
// backend will plug in later —————

const repo = ref('app-template')

const defaultBoard: KanbanColumnData[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    cards: [
      { id: 'c1', title: 'Wire GitHub OAuth for the backend', tags: ['backend'], priority: 'high', assignee: 'Jade Fisher' },
      { id: 'c2', title: 'Webhook → PR status sync', tags: ['backend', 'github'], priority: 'medium' },
      { id: 'c3', title: 'Markdown support in notes', tags: ['notes'], priority: 'low' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In progress',
    cards: [
      { id: 'c4', title: 'Kanban drag & drop on mobile', tags: ['ui'], priority: 'high', assignee: 'Jade Fisher' },
      { id: 'c5', title: 'Repo picker hooked to real repos', tags: ['github'], priority: 'medium' },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      { id: 'c6', title: 'Dashboard landing page', tags: ['ui'], priority: 'medium', assignee: 'Jade Fisher' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'c7', title: 'Theme presets + styleguide', tags: ['ui'] },
      { id: 'c8', title: 'Publish on the tailnet at :3000', tags: ['infra'] },
    ],
  },
]

const board = useLocalStorage<KanbanColumnData[]>('app.board', () =>
  structuredClone(defaultBoard),
)

const prs = [
  { number: 42, title: 'Add GitHub webhook receiver', branch: 'feat/webhooks', status: 'open', checks: 'passing', assignees: ['Jade Fisher'] },
  { number: 41, title: 'Kanban board component', branch: 'feat/kanban', status: 'open', checks: 'pending', assignees: ['Jade Fisher'] },
  { number: 40, title: 'Fix theme flash on first paint', branch: 'fix/theme-flash', status: 'merged', checks: 'passing', assignees: [] },
  { number: 39, title: 'Experiment: oklch tokens', branch: 'spike/oklch', status: 'draft', checks: 'failing', assignees: ['Jade Fisher'] },
] as const

function newTask() {
  board.value = board.value.map((c, i) =>
    i === 0
      ? {
          ...c,
          cards: [
            { id: uid(), title: 'New task', priority: 'medium' as const },
            ...c.cards,
          ],
        }
      : c,
  )
  toast('Task added to Backlog', { description: 'Drag it where it belongs.' })
}

function resetBoard() {
  board.value = structuredClone(defaultBoard)
  toast('Board reset to the demo data')
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Project" description="GitHub status, tasks, and notes in one place.">
      <template #actions>
        <Select v-model="repo">
          <SelectTrigger class="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="app-template">app-template</SelectItem>
            <SelectItem value="project-orchestrator">project-orchestrator</SelectItem>
            <SelectItem value="dotfiles">dotfiles</SelectItem>
          </SelectContent>
        </Select>
        <Button @click="newTask">
          <PlusIcon />
          New task
        </Button>
      </template>
    </PageHeader>

    <section class="space-y-2">
      <KanbanBoard v-model="board" />
      <div class="flex justify-end">
        <Button variant="ghost" size="xs" class="text-muted-foreground" @click="resetBoard">
          <RotateCcwIcon />
          Reset demo board
        </Button>
      </div>
    </section>

    <div class="grid gap-4 lg:grid-cols-3">
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle>Pull requests</CardTitle>
          <CardDescription>
            Mock data for now — this list is where the GitHub backend plugs in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PullRequestItem v-for="pr in prs" :key="pr.number" v-bind="pr" :assignees="[...pr.assignees]" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardDescription>Scratchpad — persists in this browser.</CardDescription>
        </CardHeader>
        <CardContent>
          <NotesPanel
            :seed="[
              { text: 'Kanban + notes state is localStorage for now; backend later.', at: Date.now() - 3600_000 },
              { text: 'Try dragging cards by the grip handle — works on touch.', at: Date.now() - 7200_000 },
            ]"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
