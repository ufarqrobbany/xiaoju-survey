<template>
  <div class="content-page-wrapper">
    <aside :class="['side-panel', 'left-panel', { 'is-visible': uiStore.isCatalogVisible }]">
      <CatalogPanel />
    </aside>

    <main class="center-content">
      <PreviewPanel />
    </main>

    <aside :class="['side-panel', 'right-panel', { 'is-visible': uiStore.isSetterVisible }]">
      <SetterPanel />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/management/stores/ui'
import CatalogPanel from '../../modules/skinModule/CatalogPanel.vue'
import PreviewPanel from '../../modules/skinModule/PreviewPanel.vue'
import SetterPanel from '../../modules/skinModule/SetterPanel.vue'

const uiStore = useUiStore()
// State dari Pinia store akan mengontrol class 'is-visible'
const { isCatalogVisible, isSetterVisible } = storeToRefs(uiStore)
</script>

<style lang="scss" scoped>
.content-page-wrapper {
  display: flex;
  /* KUNCI UTAMA: Pusatkan semua item di dalamnya secara horizontal */
  justify-content: center; 
  align-items: flex-start;
  height: 100%;
  width: 100%;
  padding: 24px;
  /* Beri jarak antar panel saat muncul bersamaan */
  gap: 24px; 
  overflow: hidden;
  box-sizing: border-box;
  /* Transisi untuk semua perubahan layout di dalam wrapper */
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.center-content {
  /* Biarkan konten tengah mengisi ruang sisa & bisa menyusut */
  flex: 1 1 auto;
  min-width: 0; /* Wajib untuk flexbox agar tidak overflow */
  height: 100%;
  display: flex;
  justify-content: center; /* Memastikan isi dari PreviewPanel tetap di tengah */
}

.side-panel {
  width: 360px; /* Lebar standar panel */
  height: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  
  /* PERBAIKAN: Sembunyikan panel dengan mengubah lebarnya */
  flex-shrink: 0; /* Jangan biarkan panel ini menyusut */
  width: 0;
  opacity: 0;
  padding: 0;
  border: 0;

  /* Transisi untuk animasi muncul/hilang yang mulus */
  transition: width 0.35s ease, opacity 0.2s ease, padding 0.35s ease, border 0.35s ease;

  /* Saat panel aktif (class .is-visible ditambahkan) */
  &.is-visible {
    width: 360px;
    opacity: 1;
    border: 1px solid #e8e8e8;
  }
}
</style>