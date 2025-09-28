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

// Komponen dinamis
const HeaderContent = communalLoader.loadComponent('HeaderContent')
const MainTitle = communalLoader.loadComponent('MainTitle')
const SubmitButton = communalLoader.loadComponent('SubmitButton')
const LogoIcon = communalLoader.loadComponent('LogoIcon')

// --- Logika Setup yang Lebih Bersih ---
const editStore = useEditStore()

// Menggunakan storeToRefs untuk menjaga reaktivitas
const { 
  schema, 
  pageQuestionData, 
  currentEditOne, 
  isFinallyPage, 
  pageEditOne 
} = storeToRefs(editStore)

// Tidak perlu lagi `toRefs` yang terpisah karena `schema` dari store sudah reaktif.
// Cukup akses properti langsung di template: schema.bannerConf, dll.
</script>

<style lang="scss" scoped>
.main-operation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--primary-background);
  // Tambahkan padding untuk memberi nafas di layar kecil
  padding: 16px; 
  box-sizing: border-box;
}

.pagination-wrapper {
  position: relative;
  top: 0; // Hapus `top` agar mengikuti flow
  width: 100%;
  max-width: 600px; // Batasi lebar maksimum pagination
  margin-bottom: 20px;
  flex-shrink: 0;
}

.operation-wrapper {
  width: 100%;
  flex-grow: 1; // Biarkan wrapper ini mengisi sisa ruang
  overflow-y: auto; // Hanya scroll vertikal yang diizinkan
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  .box {
    position: relative;
    // --- Perbaikan Kunci ---
    width: 100%; // Selalu isi kontainer
    max-width: 450px; // Tapi jangan lebih lebar dari ini
    margin: 0 auto; // Selalu pusatkan box
    background: #fff;
    // Tambahkan shadow untuk efek 'page'
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    overflow: hidden; // Pastikan konten di dalam tidak keluar dari border-radius
  }
}
</style>