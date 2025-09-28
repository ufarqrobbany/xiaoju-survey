<template>
  <div class="page-controls-strip">
    <div class="controls-group left desktop-only">
      <el-button :icon="Plus" type="primary" plain @click="addPageControls">
        Halaman Baru
      </el-button>
    </div>

    <PaginationPanel
      v-model="schema.pageEditOne"
      :readonly="props.readonly"
      :totalPage="pageCount"
      @changePage="updatePage"
    />

    <div class="controls-group right">
      <el-tooltip content="Pindah ke Atas" placement="top">
        <el-button :icon="Top" circle :disabled="schema.pageEditOne === 1" @click="movePage('up')" />
      </el-tooltip>
      <el-tooltip content="Pindah ke Bawah" placement="top">
        <el-button :icon="Bottom" circle :disabled="schema.pageEditOne === pageCount" @click="movePage('down')" />
      </el-tooltip>
      <el-tooltip content="Salin Halaman" placement="top">
        <el-button :icon="CopyDocument" circle @click="copyPage(schema.pageEditOne)" />
      </el-tooltip>
      <el-tooltip content="Hapus Halaman" placement="top">
        <el-button :icon="Delete" circle type="danger" plain :disabled="pageCount <= 1" @click="deletePage(schema.pageEditOne)" />
      </el-tooltip>
    </div>
  </div>

  <div class="mobile-fab">
    <el-button :icon="Plus" type="primary" circle @click="addPageControls" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEditStore } from '@/management/stores/edit'
import { QUESTION_TYPE } from '@/common/typeEnum.ts'
import { Top, Bottom, Plus, CopyDocument, Delete } from '@element-plus/icons-vue'
import PaginationPanel from './PaginationPanel.vue'

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false
  }
})

const editStore = useEditStore()
const { pageCount, schema, newQuestionIndex } = storeToRefs(editStore)
const { getSorter } = editStore
const {
  updatePageEditOne,
  addPage,
  createNewQuestion,
  addQuestion,
  setCurrentEditOne,
  deletePage,
  swapArrayRanges,
  copyPage
} = editStore

const updatePage = (index) => {
  setCurrentEditOne(null)
  updatePageEditOne(index)
}

const movePage = (type) => {
  const position = schema.value.pageEditOne
  setCurrentEditOne(null)
  const pageIndex = type === 'up' ? position - 1 : position + 1
  updatePageEditOne(pageIndex)
  if (type === 'up') {
    swapArrayRanges(position, position - 1)
  }
  if (type === 'down') {
    swapArrayRanges(position + 1, position)
  }
}

const addPageControls = () => {
  const newQuestion = createNewQuestion({ type: QUESTION_TYPE.TEXT })
  updatePageEditOne(pageCount.value + 1)
  setCurrentEditOne(null)
  addQuestion({ question: newQuestion, index: newQuestionIndex.value })
  setTimeout(() => {
    const { endIndex } = getSorter();
    setCurrentEditOne(endIndex - 1);
  });
  addPage()
}
</script>

<style lang="scss" scoped>
/* --- Mobile First Base Styles --- */

.page-controls-strip {
  display: flex;
  justify-content: center; /* Pusatkan item di mobile */
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e7e9eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.controls-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.controls-group.left {
  display: none; /* Sembunyikan tombol "Halaman Baru" versi desktop di mobile */
}

/* Floating Action Button untuk Mobile */
.mobile-fab {
  display: block; /* Tampilkan FAB di mobile */
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  
  .el-button {
    width: 56px;
    height: 56px;
    font-size: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
}

/* --- Tablet & Desktop Styles --- */
@media (min-width: 768px) {
  .page-controls-strip {
    flex-wrap: nowrap; /* Kembali ke satu baris */
    justify-content: space-between;
    padding: 12px 16px;
  }

  .controls-group.left {
    display: flex; /* Tampilkan kembali tombol "Halaman Baru" versi desktop */
  }

  .mobile-fab {
    display: none; /* Sembunyikan FAB di desktop */
  }
}
</style>