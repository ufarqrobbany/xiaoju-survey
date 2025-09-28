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

    <aside :class="['side-panel', 'left-panel', { 'is-visible': uiStore.isCatalogVisible }]">
      <CatalogPanel />
    </aside>
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
const { isCatalogVisible, isSetterVisible } = storeToRefs(uiStore)
const isPanelOpen = computed(() => isCatalogVisible.value || isSetterVisible.value)
const isMobile = computed(() => window.innerWidth < 768)
</script>

<style lang="scss" scoped>
.content-page-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.center-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* --- PERBAIKAN RESPONSIVITAS PANEL --- */

/* Style Mobile (Default) */
.side-panel {
  position: fixed;
  /* KUNCI PERBAIKAN: Beri jarak dari atas sebesar tinggi toolbar (64px) */
  top: 64px;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  z-index: 999;
  transition: transform 0.3s ease-in-out;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  
  transform: translateX(-100%);
  &.right-panel {
    right: 0;
    transform: translateX(100%);
  }
  &.is-visible {
    transform: translateX(0);
  }
}

.backdrop {
  position: fixed;
  top: 64px; /* Backdrop juga harus mulai di bawah toolbar */
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

/* Style Desktop */
@media (min-width: 768px) {
  .content-page-wrapper {
    display: flex;
    justify-content: center;
  }
  .side-panel {
    position: relative; /* Kembalikan ke layout normal */
    top: auto; /* Hapus offset atas */
    bottom: auto;
    flex-shrink: 0;
    box-shadow: none;
    transition: width 0.3s ease;
    transform: none !important;

    &:not(.is-visible) {
      width: 0;
    }
  }
  .backdrop {
    display: none;
  }
}
</style>