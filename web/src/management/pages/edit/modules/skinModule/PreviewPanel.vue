<template>
  <div class="main-operation">
    <div class="pagination-wrapper">
      <PageWrapper :readonly="true" />
    </div>
    <div class="operation-wrapper">
      <div class="box">
        <HeaderContent v-if="pageEditOne === 1" :banner-conf="schema.bannerConf" :readonly="false" />
        <div class="content">
          <MainTitle
            v-if="pageEditOne === 1"
            :is-selected="false"
            :banner-conf="schema.bannerConf"
            :readonly="false"
          />
          <MaterialGroup :question-data-list="pageQuestionData" />
          <SubmitButton
            :submit-conf="schema.submitConf"
            :skin-conf="schema.skinConf"
            :readonly="false"
            :is-selected="currentEditOne === 'submit'"
            :is-finally-page="isFinallyPage"
          />
          <LogoIcon
            :logo-conf="schema.bottomConf"
            :readonly="false"
            :is-selected="currentEditOne === 'logo'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEditStore } from '@/management/stores/edit'
import communalLoader from '@materials/communals/communalLoader.js'

import MaterialGroup from '@/management/pages/edit/components/MaterialGroup.vue'
import PageWrapper from '@/management/pages/edit/components/Pagination/PaginationWrapper.vue'

const HeaderContent = communalLoader.loadComponent('HeaderContent')
const MainTitle = communalLoader.loadComponent('MainTitle')
const SubmitButton = communalLoader.loadComponent('SubmitButton')
const LogoIcon = communalLoader.loadComponent('LogoIcon')

const editStore = useEditStore()

const {
  schema,
  pageQuestionData,
  currentEditOne,
  isFinallyPage,
  pageEditOne
} = storeToRefs(editStore)
</script>

<style lang="scss" scoped>
.main-operation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--primary-background);
  padding: 24px;
  box-sizing: border-box;
}

.pagination-wrapper {
  position: relative;
  width: 100%;
  max-width: 700px;
  margin-bottom: 24px;
  flex-shrink: 0;
}

.operation-wrapper {
  width: 100%;
  flex-grow: 1;
  
  /* --- PERBAIKAN UTAMA (1/3) --- */
  /* Biarkan scrollbar muncul secara otomatis saat konten meluap */
  overflow-y: auto;
  /* Properti ini mencegah flex item meluap dari containernya saat kontennya terlalu besar */
  min-height: 0;

  /* Styling untuk scrollbar agar lebih modern (opsional) */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }

  .box {
    position: relative;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    /* --- PERBAIKAN UTAMA (2/3) --- */
    /* Ubah border-radius sesuai permintaan */
    border-radius: 10px;
    
    /* overflow: hidden; Dihapus agar shadow dari elemen di dalam (jika ada) bisa terlihat */
  }
}

.content {
  /* --- PERBAIKAN UTAMA (3/3) --- */
  /* Tambahkan padding-bottom agar ada ruang napas di akhir scroll */
  padding: 24px 32px 48px 32px;
}
</style>