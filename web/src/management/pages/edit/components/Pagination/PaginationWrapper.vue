<template>
  <div class="page-controls-strip">
    <div class="controls-group left">
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
        <el-button
          :icon="Top"
          circle
          :disabled="schema.pageEditOne === 1"
          @click="movePage('up')"
        />
      </el-tooltip>
      <el-tooltip content="Pindah ke Bawah" placement="top">
        <el-button
          :icon="Bottom"
          circle
          :disabled="schema.pageEditOne === pageCount"
          @click="movePage('down')"
        />
      </el-tooltip>
      <el-tooltip content="Salin Halaman" placement="top">
        <el-button :icon="CopyDocument" circle @click="copyPage(schema.pageEditOne)" />
      </el-tooltip>
      <el-tooltip content="Hapus Halaman" placement="top">
        <el-button
          :icon="Delete"
          circle
          type="danger"
          plain
          :disabled="pageCount <= 1"
          @click="deletePage(schema.pageEditOne)"
        />
      </el-tooltip>
    </div>
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
.page-controls-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.controls-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

// Di mobile, tombol aksi pindah ke kiri agar lebih hemat tempat
@media (max-width: 768px) {
  .page-controls-strip {
    flex-wrap: wrap; // Biarkan item turun jika tidak muat
    gap: 12px;
    padding: 12px;
    justify-content: center;
  }
  .left {
    order: 2;
  }
  .right {
    order: 1;
    flex-grow: 1;
    justify-content: center;
  }
  // Sembunyikan tombol "Halaman Baru"
  .left .el-button {
    display: none;
  }
}
</style>