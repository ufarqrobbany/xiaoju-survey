<template>
  <div class="top-nav">
    <div class="left-group">
      <img class="logo-img" src="/imgs/Logo.webp" alt="logo" />
      <el-menu router default-active-index="survey" class="desktop-menu" mode="horizontal">
        <el-menu-item index="survey">
          <router-link :to="{ name: 'survey' }">Daftar Survei</router-link>
        </el-menu-item>
        <el-menu-item index="download">
          <router-link :to="{ name: 'download' }">Pusat Unduhan</router-link>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="right-group">
      <div class="user-info">
        <span class="welcome-text">Halo, {{ userInfo?.username }}</span>
        <img class="user-avatar" src="/imgs/avatar.webp" />
      </div>

      <span class="desktop-logout" @click="handleLogout">Keluar</span>

      <div class="mobile-menu-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <i-ep-expand v-if="!isMobileMenuOpen" />
        <i-ep-fold v-else />
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu-drawer">
        <router-link :to="{ name: 'survey' }" @click="isMobileMenuOpen = false">Daftar Survei</router-link>
        <router-link :to="{ name: 'download' }" @click="isMobileMenuOpen = false">Pusat Unduhan</router-link>
        <div class="drawer-logout" @click="handleLogout">Keluar</div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/management/stores/user'
import { computed, ref } from 'vue' // [BARU] Tambahkan ref
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// [BARU] State untuk mengontrol menu mobile
const isMobileMenuOpen = ref(false)

const userInfo = computed(() => {
  return userStore.userInfo
})

const handleLogout = () => {
  isMobileMenuOpen.value = false // Tutup menu saat logout
  userStore.logout()
  router.replace({ name: 'login' })
}
</script>

<style lang="scss" scoped>
.top-nav {
  position: relative; // Untuk positioning drawer menu
  background: #fff;
  color: #4a4c5b;
  padding: 0 24px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px_4px 0 rgba(0, 0, 0, 0.04);
  z-index: 100;
}

.left-group {
  display: flex;
  align-items: center;
  flex-grow: 1; // Biarkan grup kiri tumbuh
  min-width: 0; // Agar bisa menyusut
}

.logo-img {
  width: 90px;
  height: auto;
  margin-right: 20px;
}

.desktop-menu {
  height: 56px;
  border: none !important;
  background: transparent;

  :deep(.el-menu-item) {
    border: none !important;
    &:hover, &:focus {
      background-color: #f5f7fa;
    }
  }

  .router-link-active {
    color: $primary-color;
    font-weight: 500;
  }
}

.right-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;

  .user-avatar {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
}

.desktop-logout {
  cursor: pointer;
  color: #888;
  transition: color 0.2s;

  &:hover {
    color: $primary-color;
  }
}

.mobile-menu-toggle {
  display: none; // Sembunyikan di desktop
  font-size: 24px;
  cursor: pointer;
}

// --- Styling untuk Drawer Menu Mobile ---
.mobile-menu-drawer {
  position: fixed;
  top: 56px; // Tepat di bawah navbar
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;

  a, .drawer-logout {
    padding: 12px;
    border-radius: 6px;
    text-align: center;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #f5f7fa;
    }
  }

  .drawer-logout {
    border-top: 1px solid #eee;
    margin-top: 8px;
    color: #F56C6C; // Warna merah untuk aksi keluar
  }
}

// Transisi untuk slide-down
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

// --- Media Queries untuk Responsivitas ---
@media (max-width: 768px) {
  .desktop-menu, .desktop-logout {
    display: none; // Sembunyikan menu desktop & tombol logout
  }

  .mobile-menu-toggle {
    display: block; // Tampilkan tombol hamburger
  }

  .user-info .welcome-text {
    display: none; // Sembunyikan teks sambutan
  }
}
</style>