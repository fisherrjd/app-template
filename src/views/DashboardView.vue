<script setup lang="ts">
import {
  CreditCardIcon,
  DollarSignIcon,
  DownloadIcon,
  MessageSquareIcon,
  PackageIcon,
  PercentIcon,
  ShoppingBagIcon,
  UserPlusIcon,
  UsersIcon,
  ZapIcon,
} from '@lucide/vue'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'
import PageHeader from '@/components/PageHeader.vue'
import DataTable from '@/components/data/DataTable.vue'
import type { DataTableColumn } from '@/components/data/types'
import ActivityFeed from '@/components/dashboard/ActivityFeed.vue'
import BarChart from '@/components/dashboard/BarChart.vue'
import ProgressMeter from '@/components/dashboard/ProgressMeter.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import UserAvatar from '@/components/dashboard/UserAvatar.vue'
import { Badge, type BadgeVariants } from '@/components/ui/badge'
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
import { Separator } from '@/components/ui/separator'

// ————— demo data — everything below is fake and lives here on purpose,
// so the components stay pure and reusable —————

type RangeId = '7d' | '30d' | '90d'
const range = ref<RangeId>('7d')

const hour = new Date().getHours()
const greeting =
  hour < 5 ? 'Up late?' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})

const stats: Record<
  RangeId,
  {
    revenue: { value: number; delta: number; data: number[] }
    users: { value: number; delta: number; data: number[] }
    conversion: { value: number; delta: number; data: number[] }
    order: { value: number; delta: number; data: number[] }
  }
> = {
  '7d': {
    revenue: { value: 24830, delta: 12.4, data: [18, 22, 19, 25, 24, 30, 34] },
    users: { value: 1284, delta: 4.1, data: [40, 42, 38, 45, 52, 49, 58] },
    conversion: { value: 3.6, delta: -0.8, data: [4.1, 3.8, 3.9, 3.4, 3.6, 3.5, 3.6] },
    order: { value: 86.2, delta: 6.9, data: [72, 80, 78, 84, 82, 88, 92] },
  },
  '30d': {
    revenue: { value: 98410, delta: 8.2, data: [70, 74, 68, 80, 85, 82, 96] },
    users: { value: 5203, delta: 11.6, data: [130, 150, 145, 160, 175, 190, 210] },
    conversion: { value: 3.9, delta: 1.2, data: [3.4, 3.6, 3.8, 3.7, 4.0, 3.9, 4.1] },
    order: { value: 81.7, delta: -2.3, data: [88, 85, 84, 80, 82, 79, 81] },
  },
  '90d': {
    revenue: { value: 287660, delta: 21.7, data: [180, 200, 195, 230, 250, 245, 290] },
    users: { value: 14980, delta: 18.3, data: [340, 380, 420, 410, 470, 520, 560] },
    conversion: { value: 3.4, delta: 0.4, data: [3.1, 3.2, 3.4, 3.3, 3.5, 3.4, 3.6] },
    order: { value: 79.4, delta: 4.8, data: [70, 74, 72, 78, 76, 80, 82] },
  },
}

const chartData: Record<RangeId, { label: string; value: number }[]> = {
  '7d': [
    { label: 'Mon', value: 3200 },
    { label: 'Tue', value: 4100 },
    { label: 'Wed', value: 2800 },
    { label: 'Thu', value: 5200 },
    { label: 'Fri', value: 4600 },
    { label: 'Sat', value: 6100 },
    { label: 'Sun', value: 5400 },
  ],
  '30d': [
    { label: 'Week 1', value: 21400 },
    { label: 'Week 2', value: 24800 },
    { label: 'Week 3', value: 23100 },
    { label: 'Week 4', value: 29100 },
  ],
  '90d': [
    { label: 'May', value: 88200 },
    { label: 'Jun', value: 94100 },
    { label: 'Jul', value: 105360 },
  ],
}

const current = computed(() => stats[range.value])

const activity = [
  {
    id: 1,
    title: 'New signup',
    description: 'ana@acme.dev created a workspace',
    time: '2m',
    icon: UserPlusIcon,
  },
  {
    id: 2,
    title: 'Payment received',
    description: '$1,240.00 from Northwind Ltd.',
    time: '18m',
    icon: CreditCardIcon,
  },
  {
    id: 3,
    title: 'Deploy finished',
    description: 'v2.4.1 rolled out to production',
    time: '1h',
    icon: ZapIcon,
  },
  {
    id: 4,
    title: 'Order shipped',
    description: '#4832 left the warehouse',
    time: '3h',
    icon: PackageIcon,
  },
  {
    id: 5,
    title: 'New review',
    description: '“Exactly what we needed” — 5 stars',
    time: '5h',
    icon: MessageSquareIcon,
  },
]

type OrderStatus = 'paid' | 'pending' | 'refunded'

const orders: { id: string; customer: string; status: OrderStatus; amount: number }[] = [
  { id: '#4832', customer: 'Maya Okafor', status: 'paid', amount: 412 },
  { id: '#4831', customer: 'Liam Chen', status: 'pending', amount: 96.5 },
  { id: '#4830', customer: 'Sofia Reyes', status: 'paid', amount: 1240 },
  { id: '#4829', customer: 'Noah Patel', status: 'refunded', amount: 88 },
  { id: '#4828', customer: 'Emma Fournier', status: 'paid', amount: 310.75 },
]

const orderColumns: DataTableColumn[] = [
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'id', label: 'Order' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
]

const statusVariant: Record<OrderStatus, BadgeVariants['variant']> = {
  paid: 'default',
  pending: 'secondary',
  refunded: 'destructive',
}

function exportReport() {
  toast.success('Export started', { description: 'The report will land in your inbox.' })
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader :title="greeting" :description="`${today} — here's what's happening across the store.`">
      <template #actions>
        <Select v-model="range">
          <SelectTrigger class="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <Button @click="exportReport">
          <DownloadIcon />
          Export
        </Button>
      </template>
    </PageHeader>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        class="rise-in"
        label="Revenue"
        :value="current.revenue.value"
        :delta="current.revenue.delta"
        :data="current.revenue.data"
        :format="(n) => `$${Math.round(n).toLocaleString('en-US')}`"
        :icon="DollarSignIcon"
      />
      <StatCard
        class="rise-in"
        style="animation-delay: 60ms"
        label="Active users"
        :value="current.users.value"
        :delta="current.users.delta"
        :data="current.users.data"
        :icon="UsersIcon"
      />
      <StatCard
        class="rise-in"
        style="animation-delay: 120ms"
        label="Conversion"
        :value="current.conversion.value"
        :delta="current.conversion.delta"
        :data="current.conversion.data"
        :format="(n) => `${n.toFixed(1)}%`"
        :icon="PercentIcon"
      />
      <StatCard
        class="rise-in"
        style="animation-delay: 180ms"
        label="Avg. order"
        :value="current.order.value"
        :delta="current.order.delta"
        :data="current.order.data"
        :format="(n) => `$${n.toFixed(2)}`"
        :icon="ShoppingBagIcon"
      />
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <Card class="rise-in lg:col-span-2" style="animation-delay: 240ms">
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Totals per {{ range === '7d' ? 'day' : range === '30d' ? 'week' : 'month' }}, hover a bar for the exact figure.</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            :data="chartData[range]"
            :format="(n) => `$${n.toLocaleString('en-US')}`"
          />
        </CardContent>
      </Card>

      <Card class="rise-in" style="animation-delay: 280ms">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            Activity
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
              />
              <span class="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
          </CardTitle>
          <CardDescription>Live feed from across the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityFeed :items="activity" />
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <Card class="rise-in lg:col-span-2" style="animation-delay: 320ms">
        <CardHeader>
          <CardTitle>Recent orders</CardTitle>
          <CardDescription>The last five orders across all channels.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable :columns="orderColumns" :rows="orders" row-key="id">
            <template #cell-customer="{ row }">
              <div class="flex items-center gap-2">
                <UserAvatar :name="row.customer" size="sm" />
                <span class="font-medium whitespace-nowrap">{{ row.customer }}</span>
              </div>
            </template>
            <template #cell-id="{ value }">
              <code class="font-mono text-xs text-muted-foreground">{{ value }}</code>
            </template>
            <template #cell-status="{ row }">
              <Badge :variant="statusVariant[row.status]" class="capitalize">
                {{ row.status }}
              </Badge>
            </template>
            <template #cell-amount="{ row }">
              <span class="tabular-nums">${{ row.amount.toFixed(2) }}</span>
            </template>
          </DataTable>
        </CardContent>
      </Card>

      <Card class="rise-in" style="animation-delay: 360ms">
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Plan limits for this workspace.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <ProgressMeter label="Storage" :value="72" detail="14.4 / 20 GB" />
          <ProgressMeter label="API calls" :value="38" detail="19k / 50k" />
          <ProgressMeter label="Seats" :value="90" detail="9 / 10" />
          <Separator />
          <Button variant="outline" class="w-full" @click="toast('This is where the money would go')">
            Upgrade plan
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
