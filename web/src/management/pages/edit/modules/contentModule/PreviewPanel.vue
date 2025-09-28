<template>
  <div class="preview-wrapper">
    <div class="btn preview-btn" @click="dialogTableVisible = true">
      <i-ep-view class="view-icon" />
      <span class="btn-txt">Pratinjau</span>
    </div>

    <el-dialog
      :z-index="99999"
      top="0"
      class="preview-dialog"
      :class="dialogClass"
      :destroy-on-close="true"
      :show-close="false"
      @open="openDialog"
      @closed="closedDialog"
      v-model="dialogTableVisible"
      align-center
      fullscreen
    >
      <template #header="{ close }">
        <div class="preview-header">
          <el-radio-group v-model="previewTab" size="large">
            <el-radio-button :label="1">
              <el-icon><Iphone /></el-icon>
              <span>Ponsel</span>
            </el-radio-button>
            <el-radio-button :label="2">
              <el-icon><Monitor /></el-icon>
              <span>PC</span>
            </el-radio-button>
            <el-radio-button :label="3">
              <el-icon><FullScreen /></el-icon>
              <span>SDK</span>
            </el-radio-button>
          </el-radio-group>
          <el-button class="close-btn" :icon="Close" circle plain @click="close"></el-button>
        </div>
      </template>

      <div class="preview-content" v-loading="loading" element-loading-text="Memuat Pratinjau...">
        <div v-if="previewTab !== 3" class="iframe-container">
          <div class="tips-bar">
            <i-ep-WarningFilled />
            <span>Mode pratinjau, data tidak akan disimpan!</span>
          </div>
          <iframe
            id="iframe-preview"
            :src="`/management/preview/${surveyId}`"
            frameborder="0"
            width="100%"
            height="100%"
          ></iframe>
        </div>
        <div v-else class="sdk-container">
          <el-image :src="sdkImages[sdkType]" fit="contain" />
          <el-button class="sdk-preview-btn" type="primary" @click="changeSdkType" :icon="Switch">
            Ganti Mode Pratinjau
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Iphone, Monitor, FullScreen, Close, Switch } from '@element-plus/icons-vue'

const route = useRoute()

const dialogTableVisible = ref(false)
const previewTab = ref(1)
const surveyId = route.params.id
const loading = ref(true)
const sdkType = ref(0)

const sdkImages = [
  '/imgs/sdk-1.png',
  '/imgs/sdk-2.png',
  '/imgs/sdk-3.png'
]

const dialogClass = computed(() => {
  switch (previewTab.value) {
    case 1: return 'mode-phone'
    case 2: return 'mode-pc'
    case 3: return 'mode-sdk'
    default: return ''
  }
})

const changeSdkType = () => {
  sdkType.value = (sdkType.value + 1) % 3
}

const openDialog = () => {
  // Tunggu iframe dirender
  setTimeout(() => {
    const iframePreview = document.getElementById('iframe-preview')
    if (iframePreview) {
      iframePreview.onload = () => {
        loading.value = false
      }
    } else if (previewTab.value !== 3) {
      // Jika iframe tidak ada tapi seharusnya ada, hentikan loading
      loading.value = false
    }
  }, 100)

  // Hentikan loading untuk SDK mode
  if (previewTab.value === 3) {
    loading.value = false
  }
}

const closedDialog = () => {
  loading.value = true // Reset status loading saat dialog ditutup
}
</script>

<style lang="scss" scoped>
@import url('@/management/styles/edit-btn.scss');

// Global styling untuk dialog
.preview-dialog {
  display: flex;
  flex-direction: column;
  background: #f0f2f5; // Latar belakang netral

  :deep(.el-dialog__header) {
    padding: 16px;
    margin: 0;
    border-bottom: 1px solid #e0e2e7;
    background: #fff;
  }

  :deep(.el-dialog__body) {
    padding: 0;
    flex-grow: 1;
    overflow: auto;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .close-btn {
    margin-left: 20px;
  }

  .preview-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 24px;
    box-sizing: border-box;
  }
}

// Styling spesifik per mode
.preview-dialog.mode-phone {
  .iframe-container {
    width: 375px;
    height: 812px;
    background: url('/imgs/preview-phone.png') no-repeat center center;
    background-size: contain;
    padding: 66px 18px 24px 18px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    
    iframe {
      border-radius: 0 0 30px 30px;
    }
  }
}

.preview-dialog.mode-pc {
  .iframe-container {
    width: 100%;
    height: 100%;
    max-width: 1200px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
  }
}

.tips-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: $primary-bg-color;
  color: $primary-color;
  font-size: 13px;
  padding: 8px 12px;
  flex-shrink: 0;
}

.iframe-container {
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}

.sdk-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  .el-image {
    max-width: 80%;
    max-height: 70vh;
  }
}

// Responsivitas untuk header
@media (max-width: 600px) {
  .preview-header {
    .el-radio-button__inner {
      span {
        display: none; // Sembunyikan teks di mobile, hanya ikon
      }
    }
  }
  .preview-dialog.mode-phone .iframe-container {
      width: 100%;
      height: 90%;
      padding: 12% 4% 4% 4%;
  }
}
</style>