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
/* --- Mobile First Base Styles (Default) --- */

.main-operation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--primary-background);
  /* Padding minimal di mobile */
  padding: 16px; 
  box-sizing: border-box;
}

.pagination-wrapper {
  width: 100%;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.operation-wrapper {
  width: 100%;
  flex-grow: 1;
  min-height: 0;

  .box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    
    /* Di mobile, box menyatu dengan layar */
    box-shadow: none;
    border-radius: 0;
    
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar { display: none; }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

.content {
  /* Padding konten yang pas untuk mobile */
  padding: 16px 20px 32px 20px;
}

/* --- Tablet & Desktop Styles --- */
@media (min-width: 768px) {
  .main-operation {
    /* Kembalikan padding yang lebih lega untuk desktop */
    padding: 24px;
  }

  .pagination-wrapper {
    max-width: 700px; /* Batasi lebar paginasi di desktop */
    margin-bottom: 24px;
  }

  .operation-wrapper {
    overflow: hidden; /* Sembunyikan overflow di wrapper luar */
  }
  
  .operation-wrapper .box {
    /* Kembalikan tampilan 'kartu' di desktop */
    max-width: 700px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
  }

  .content {
    /* Kembalikan padding konten yang lebih lega di desktop */
    padding: 24px 32px 48px 32px;
  }
}
</style>