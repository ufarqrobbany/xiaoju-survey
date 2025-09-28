<template>
  <div class="edit-layout">
    <LeftMenu class="left-menu"></LeftMenu>
    <div class="main-content">
      <CommonTemplate style="background-color: #f6f7f9">
        <template #nav>
          <Navbar class="navbar"></Navbar>
        </template>
        <template #body>
          <router-view></router-view>
        </template>
      </CommonTemplate>
    </div>
  </div>
</template>

<script setup lang="ts">
// --- Bagian <script> tidak perlu diubah, sudah sangat baik ---
import { onMounted, watch } from 'vue'
import { useEditStore } from '@/management/stores/edit'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'

import LeftMenu from '@/management/components/LeftMenu.vue'
import CommonTemplate from './components/CommonTemplate.vue'
import Navbar from './components/ModuleNavbar.vue'

const editStore = useEditStore()
const { init, setSurveyId, schema } = editStore

const router = useRouter()
const route = useRoute()

watch(
  () => schema.skinConf,
  (skinConfig) => {
    const root = document.documentElement
    const { themeConf, backgroundConf, contentConf } = skinConfig

    if (themeConf?.color) {
      root.style.setProperty('--primary-color', themeConf?.color)
    }

    const { color, type, image } = backgroundConf || {}
    root.style.setProperty(
      '--primary-background',
      type === 'image' ? `url(${image}) no-repeat center / cover` : color
    )

    if (contentConf?.opacity.toString()) {
      root.style.setProperty('--opacity', `${contentConf.opacity / 100}`)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(async () => {
  const surveyId = route.params.id as string
  setSurveyId(surveyId)

  try {
    await init()
  } catch (err: any) {
    ElMessage.error(err.message)

    setTimeout(() => {
      router.replace({ name: 'survey' })
    }, 1000)
  }
})
</script>

<style lang="scss" scoped>
// --- REFAKTOR TOTAL STYLE DENGAN PENDEKATAN MOBILE-FIRST ---
.edit-layout {
  display: flex;
  // Awalnya, layout disusun vertikal untuk mobile
  flex-direction: column;
  height: 100vh; // Mengisi seluruh tinggi layar
  width: 100%;
  overflow: hidden;
}

.main-content {
  // Konten utama akan mengisi sisa ruang yang tersedia
  flex-grow: 1;
  // Penting agar CommonTemplate bisa mengisi 100% tinggi
  height: 100%;
  overflow: hidden;
}

.navbar {
  border-bottom: 1px solid #e7e9eb;
}

// --- Media Query untuk layar lebih besar (Tablet & Desktop) ---
@media (min-width: 768px) {
  .edit-layout {
    // Ubah layout menjadi horizontal (sidebar di kiri, konten di kanan)
    flex-direction: row;
  }
}

// --- CATATAN PENTING ---
// Pastikan LeftMenu.vue juga sudah memiliki style responsif
// seperti yang pernah kita diskusikan sebelumnya, agar bisa
// berubah menjadi bottom-nav di mobile dan sidebar di desktop.
</style>