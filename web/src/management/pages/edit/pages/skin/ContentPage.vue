<template>
  <div class="content-page-wrapper">
    <main class="center-content">
      <PreviewPanel />
    </main>

    <div 
      v-if="isPanelOpen && isMobile"
      class="backdrop" 
      @click="uiStore.closeAllPanels"
    ></div>

    <aside :class="['side-panel left-panel', { 'is-visible': uiStore.isCatalogVisible }]">
      <CatalogPanel />
    </aside>

    <aside :class="['side-panel right-panel', { 'is-visible': uiStore.isSetterVisible }]">
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
// Buat state reaktif dari store
const { isCatalogVisible, isSetterVisible } = storeToRefs(uiStore)

// Helper untuk mengetahui apakah ada panel yang terbuka
const isPanelOpen = computed(() => isCatalogVisible.value || isSetterVisible.value)

// Mengetahui ukuran layar (opsional, bisa dengan CSS saja)
const isMobile = computed(() => window.innerWidth < 768)
</script>

<style lang="scss" scoped>
.content-page-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #f7f9fc; // Latar belakang untuk area konten
}

// --- 1. Base Styles (Mobile First) ---
.side-panel {
  position: fixed; // Gunakan fixed agar tidak terpengaruh scroll body
  top: 64px; // Beri ruang untuk toolbar
  bottom: 0;
  width: 360px;
  max-width: 85vw; // Jangan terlalu lebar di mobile
  background-color: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  border: none;

  &.left-panel {
    left: 0;
    transform: translateX(-100%);
  }

  &.right-panel {
    right: 0;
    transform: translateX(100%);
  }

  &.is-visible {
    transform: translateX(0);
  }
}

.center-content {
  height: 100%;
  width: 100%;
  overflow-y: auto; // Biarkan konten utama bisa di-scroll
}

.backdrop {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 998;
}

// --- 2. Desktop Styles (Layar Besar > 1200px) ---
@media (min-width: 1200px) {
  .content-page-wrapper {
    display: flex;
  }

  .side-panel {
    // Override gaya mobile: Kembalikan panel ke flow dokumen
    position: relative; // Bukan 'fixed' lagi
    top: auto;
    bottom: auto;
    flex-shrink: 0;
    box-shadow: none; // Hilangkan shadow karena sudah menyatu
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); // Animasikan lebar
    transform: none !important; // Hapus transform
    width: 0; // Sembunyi dengan lebar 0
    overflow: hidden; // Sembunyikan konten saat lebar 0

    &.left-panel {
      border-right: 1px solid #e8e8e8;
    }
    
    &.right-panel {
      order: 3; // Pindahkan ke paling kanan dalam flexbox
      border-left: 1px solid #e8e8e8;
    }

    &.is-visible {
      width: 360px; // Tampilkan dengan lebar sebenarnya
    }
  }

  .center-content {
    flex-grow: 1;
    // Padding tidak lagi diperlukan karena ada panel fisik
  }

  // Backdrop tidak diperlukan di desktop
  .backdrop {
    display: none;
  }
}
</style>