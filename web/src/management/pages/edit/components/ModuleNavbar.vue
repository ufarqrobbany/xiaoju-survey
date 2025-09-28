<template>
  <div class="nav-responsive">
    <div class="left-group">
      <BackPanel />
      <TitlePanel class="title-panel" :title="title" />
    </div>

    <div class="center-group">
      <NavPanel />
    </div>

    <div class="right-group">
      <CooperationPanel>
        <template #content="{ onCooper }">
          <div class="btn" @click="onCooper">
            <i-ep-connection class="view-icon" />
            <span class="btn-txt">Kolaborasi</span>
          </div>
        </template>
      </CooperationPanel>
      <PreviewPanel />

      <div class="desktop-only-actions">
        <HistoryPanel />
      </div>
      
      <SavePanel :update-logic-conf="updateLogicConf" :update-white-conf="updateWhiteConf" :seize="seize" />
      <PublishPanel :update-logic-conf="updateLogicConf" :update-white-conf="updateWhiteConf" :seize="seize" />
      
      <el-dropdown class="mobile-only-actions" trigger="click">
        <span class="el-dropdown-link">
          <el-icon class="more-icon"><MoreFilled /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <HistoryPanel />
            </el-dropdown-item>
            </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useEditStore } from '@/management/stores/edit'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'

import BackPanel from '../modules/generalModule/BackPanel.vue'
import TitlePanel from '../modules/generalModule/TitlePanel.vue'
import NavPanel from '../modules/generalModule/NavPanel.vue'
import HistoryPanel from '../modules/contentModule/HistoryPanel.vue'
import PreviewPanel from '../modules/contentModule/PreviewPanel.vue'
import SavePanel from '../modules/contentModule/SavePanel.vue'
import PublishPanel from '../modules/contentModule/PublishPanel.vue'
import CooperationPanel from '../modules/contentModule/CooperationPanel.vue'
import { seizeSession } from '@/management/api/survey'
import { useRoute } from 'vue-router'

const route = useRoute()
const editStore = useEditStore()
const { schema, changeSchema } = editStore
const title = computed(() => (editStore.schema?.metaData as any)?.title || '')

const { showLogicEngine, jumpLogicEngine } = storeToRefs(editStore)

const updateLogicConf = () => {
  const { active } = route.query
  let res = {
    validated: true,
    message: ''
  }

  // Jika logika tampilan dan logika lompatan keduanya diatur, satu harus dihapus sebelum penyimpanan berhasil
  if (
    (showLogicEngine.value?.rules?.length && active === 'jumpLogic') ||
    (jumpLogicEngine.value.rules?.length && active === 'showLogic')
  ) {
    return {
      validated: false,
      message:
        active === 'jumpLogic'
          ? 'Logika Tampilan ada, hapus dulu untuk atur Logika Lompatan' 
          : 'Logika Lompatan ada, hapus dulu untuk atur Logika Tampilan' 
    }
  }

  if (
    showLogicEngine.value &&
    showLogicEngine.value.rules &&
    showLogicEngine.value.rules.length !== 0
  ) {
    try {
      showLogicEngine.value.validateSchema()
    } catch (error) {
      res = {
        validated: false,
        message: 'Konfigurasi logika tidak boleh kosong' 
      }

      return res
    }

    const showLogicConf = showLogicEngine.value.toJson()
    if (JSON.stringify(schema.logicConf.showLogicConf) !== JSON.stringify(showLogicConf)) {
      changeSchema({ key: 'logicConf', value: { showLogicConf } })
    }

    return res
  }
  const jumpLogicConf = jumpLogicEngine.value.toJson()
  if (JSON.stringify(schema.logicConf.jumpLogicConf) !== JSON.stringify(jumpLogicConf)) {
    changeSchema({ key: 'logicConf', value: { jumpLogicConf } })
  }

  return res
}

const updateWhiteConf = () => {
  let res = {
    validated: true,
    message: ''
  }
  const baseConf = (schema?.baseConf as any) || {}
  if (baseConf.passwordSwitch && !baseConf.password) {
    res = {
      validated: false,
      message: 'Kata sandi akses tidak boleh kosong' 
    }
    return res
  }
  if (baseConf.whitelistType != 'ALL' && !baseConf.whitelist?.length) {
    res = {
      validated: false,
      message: 'Whitelist tidak boleh kosong' 
    }
    return res
  }
  return res
}

// 重新获取sessionid
const seize = async (sessionId: string) => {
  const seizeRes: Record<string, any> = await seizeSession({ sessionId })
  if (seizeRes.code === 200) {
    location.reload()
  } else {
    ElMessage.error('Gagal mendapatkan hak akses, silakan coba lagi')
  }
}
</script>
<style lang="scss" scoped>
@import url('@/management/styles/edit-btn.scss');

.nav-responsive {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid #e7e9eb;
  box-sizing: border-box;
}

// Styling untuk setiap grup
.left-group,
.center-group,
.right-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.left-group {
  // Biarkan lebar menyesuaikan konten
  flex-shrink: 0;
  .title-panel {
    // Agar judul tidak terpotong tiba-tiba
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px; // Batasi lebar maksimum judul
  }
}

.center-group {
  flex-grow: 1; // Biarkan grup tengah mengisi ruang kosong
  justify-content: center;
  min-width: 0; // Penting agar bisa menyusut!
}

.right-group {
  // Biarkan lebar menyesuaikan konten
  flex-shrink: 0;
  justify-content: flex-end;
}

.view-icon {
  font-size: 20px;
}

// Sembunyikan/tampilkan elemen berdasarkan ukuran layar
.desktop-only-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-only-actions {
  display: none; // Sembunyikan dropdown di desktop
  .more-icon {
    font-size: 24px;
    cursor: pointer;
    color: #555;
    margin-left: 8px;
  }
}

// --- Media Queries untuk Responsivitas ---

// Tablet (misal < 1024px)
@media (max-width: 1024px) {
  .desktop-only-actions {
    display: none; // Sembunyikan aksi desktop
  }
  .mobile-only-actions {
    display: block; // Tampilkan dropdown "more"
  }
}

// Mobile (misal < 768px)
@media (max-width: 768px) {
  .nav-responsive {
    padding: 0 12px; // Perkecil padding
  }
  
  .center-group {
    display: none; // Sembunyikan navigasi tengah
  }
  
  .left-group .title-panel {
    max-width: 120px; // Perkecil lagi lebar judul
  }
  
  // Sembunyikan teks pada tombol agar lebih ringkas
  .right-group .btn-txt {
    display: none;
  }
  
  // Sesuaikan tombol agar hanya ikon
  .right-group .btn {
    padding: 6px;
  }
}
</style>
