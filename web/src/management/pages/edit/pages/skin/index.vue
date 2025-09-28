<template>
  <div class="page-container">
    <MainToolbar />
    
    <div class="content-view-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainToolbar from '../../components/MainToolbar.vue' 
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f7f9fc;
  overflow: hidden; /* Mencegah body dari scrolling */
}

.content-view-wrapper {
  flex-grow: 1;
  position: relative; /* Penting agar child dengan position:absolute/fixed terkunci di sini */
  min-height: 0; /* Kunci agar flexbox tidak 'mendorong' layout */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>