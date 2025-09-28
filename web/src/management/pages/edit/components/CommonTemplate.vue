<template>
  <div class="main-template-layout">
    <div class="nav" v-if="slots.nav">
      <slot name="nav"></slot>
    </div>
    <div class="body">
      <div class="body-content-wrapper">
        <slot v-if="slots.body" name="body"></slot>
        <template v-else>
          </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from 'vue'
const slots = useSlots()
</script>

<style lang="scss" scoped>
.main-template-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f6f7f9;
}

.nav {
  flex-shrink: 0; /* Pastikan navbar tidak menyusut */
  position: sticky; /* Buat navbar tetap di atas saat scroll */
  top: 0;
  z-index: 100;
}

.body {
  flex: 1;
  min-height: 0; /* Kunci agar flexbox tidak overflow */
  
  /* --- PERBAIKAN UTAMA DI SINI --- */
  /* Aktifkan scrolling vertikal pada container body */
  overflow-y: auto;

  /* Styling untuk scrollbar agar lebih modern (opsional) */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
}

.body-content-wrapper {
  /* Wrapper ini memastikan padding dan layout konten utama benar */
  width: 100%;
  /* Anda bisa menambahkan padding di sini jika ingin ada jarak 
     antara konten dengan tepi area scroll, contoh: */
  // padding: 24px; 
  // box-sizing: border-box;
}
</style>