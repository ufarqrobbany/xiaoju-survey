<template>
  <div class="edit-layout">
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
import { onMounted, watch } from 'vue'
import { useEditStore } from '@/management/stores/edit'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'

// Import LeftMenu sudah tidak diperlukan lagi
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
.edit-layout {
  display: flex;
  /* Layout sekarang hanya satu kolom utama yang membentang secara horizontal */
  flex-direction: row; 
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f6f7f9;
}

.main-content {
  flex: 1;
  min-width: 0; 
  height: 100%;
  overflow: hidden;
  display: flex; /* Memastikan CommonTemplate mengisi semua ruang */
}

.navbar {
  border-bottom: 1px solid #e7e9eb;
}
</style>