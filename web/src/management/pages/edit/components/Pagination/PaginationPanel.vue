<template>
  <div class="pagination-container">
    <div class="mobile-display">
      Hal. {{ modelValue }} dari {{ totalPage }}
    </div>

    <div class="desktop-display">
      <span :class="['nav-arrow', { disabled: modelValue === 1 }]" @click="changePage(modelValue - 1)">
        <i-ep-ArrowLeft />
      </span>
      <div
        v-for="page in pagesToDisplay"
        :key="page"
        :class="['page-item', { current: modelValue === page, ellipsis: page === '...' }]"
        @click="typeof page === 'number' && changePage(page)"
      >
        {{ page }}
      </div>
      <span :class="['nav-arrow', { disabled: modelValue === totalPage }]" @click="changePage(modelValue + 1)">
        <i-ep-ArrowRight />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  totalPage?: number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  totalPage: 1
})
const emit = defineEmits(['change-page', 'update:modelValue'])

const changePage = (page: number) => {
  if (page < 1 || page > props.totalPage) {
    return
  }
  emit('update:modelValue', page)
  emit('change-page', page)
}

// Logika baru yang lebih sederhana untuk menampilkan halaman
const pagesToDisplay = computed(() => {
  const total = props.totalPage
  const current = props.modelValue
  const pageNumbers = []
  const maxPagesToShow = 7 // Total item, termasuk elipsis

  if (total <= maxPagesToShow) {
    for (let i = 1; i <= total; i++) {
      pageNumbers.push(i)
    }
  } else {
    pageNumbers.push(1)
    if (current > 4) {
      pageNumbers.push('...')
    }
    let start = Math.max(2, current - 1)
    let end = Math.min(total - 1, current + 1)

    if (current <= 4) {
      start = 2
      end = 4
    }
    if (current >= total - 3) {
      start = total - 3
      end = total - 1
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }
    if (current < total - 3) {
      pageNumbers.push('...')
    }
    pageNumbers.push(total)
  }
  return pageNumbers
})
</script>

<style lang="scss" scoped>
.pagination-container {
  user-select: none;
}

.desktop-display {
  display: none; // Sembunyikan di mobile
  align-items: center;
  gap: 4px;
}

.mobile-display {
  display: block; // Tampilkan di mobile
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.page-item, .nav-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f0f2f5;
  }
}

.nav-arrow {
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: transparent;
  }
}

.page-item {
  &.current {
    background-color: $primary-color;
    color: #fff;
    font-weight: 500;
  }
  &.ellipsis {
    cursor: default;
    background-color: transparent;
  }
}

// Tampilkan paginasi desktop di layar yang lebih besar
@media (min-width: 768px) {
  .desktop-display {
    display: flex;
  }
  .mobile-display {
    display: none;
  }
}
</style>