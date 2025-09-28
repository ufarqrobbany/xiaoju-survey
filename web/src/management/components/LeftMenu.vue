<template>
  <div class="nav-wrapper">
    <LogoIcon class="logo-icon" />
    <div class="tabs-container">
      <template v-for="(tab, index) in tabs" :key="tab.text + index">
        <router-link :to="tab.to" v-slot="{ isActive }" :replace="true">
          <div :class="['tab-btn', { 'router-link-active': isTabActive(tab, isActive) }]">
            <div class="icon">
              <i class="iconfont" :class="tab.icon"></i>
            </div>
            <p>{{ tab.text }}</p>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
// ... (Bagian <script> tidak perlu diubah, hanya ditambahkan fungsi helper)
import { useRoute } from 'vue-router'
// ... (sisa script setup Anda)
const route = useRoute()

// Helper function agar lebih bersih
const isTabActive = (tab, isActive) => {
  const editRoutes = [
    'QuestionEditIndex',
    'QuestionEditSetting',
    'QuestionSkinSetting',
    'QuestionEditResultConfig'
  ]
  if (editRoutes.includes(route.name) && tab.to.name === 'QuestionEditIndex') {
    return true
  }
  return isActive
}
</script>

<style lang="scss" scoped>
// --- Base Style (Mobile First: Bottom Navigation) ---
.nav-wrapper {
  order: 2; // Posisikan di bawah .main-content dalam flex-direction: column
  display: flex;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(173, 200, 218, 0.2);
  z-index: 1000; // Pastikan di atas segalanya
  
  .logo-icon {
    display: none; // Sembunyikan logo di mobile
  }

  .tabs-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
}

.tab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60px; // Tinggi bottom nav
  padding: 0 16px;
  color: $normal-color-light;
  flex-grow: 1; // Bagi rata ruang

  .icon {
    width: auto;
    height: auto;
    margin-bottom: 4px;
    .iconfont {
      font-size: 20px;
    }
  }

  p {
    font-size: 10px; // Perkecil font untuk mobile
  }

  &.router-link-active {
    color: $primary-color;
    .icon {
      background-color: transparent; // Hapus background di mobile
    }
  }
}

// --- Desktop Styles (> 768px) ---
@media (min-width: 768px) {
  .nav-wrapper {
    order: 1; // Posisikan di kiri dalam flex-direction: row
    flex-direction: column; // Kembali ke vertikal
    width: 80px;
    height: 100%;
    box-shadow: 2px 0 10px 0 rgba(173, 200, 218, 0.26);
    padding-top: 20px;

    .logo-icon {
      display: block; // Tampilkan lagi logo
      margin-bottom: 20px;
    }

    .tabs-container {
      flex-direction: column;
    }
  }

  .tab-btn {
    width: 80px;
    height: 80px;
    padding: 0;

    .icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
      border-radius: 4px;
    }
    
    p {
      font-size: 12px; // Kembalikan ukuran font
    }

    &:hover {
      color: $normal-color;
      .icon {
        background-color: $disable-color;
      }
    }
    
    &.router-link-active {
      background-color: $background-color-light;
      color: #2b2c33;
      .icon {
        background-color: $primary-color;
        color: #fff;
      }
    }
  }
}
</style>