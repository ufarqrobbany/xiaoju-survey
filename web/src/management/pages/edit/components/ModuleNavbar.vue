<template>
  <div class="unified-navbar">
    <div class="left-group">
      <LogoIcon class="logo-icon" @click="navigateToHome" />
      <div class="divider"></div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link project-title-dropdown">
          {{ title }}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="tab in projectTabs" :key="tab.text">
              <router-link :to="tab.to" class="project-nav-link">
                <el-dropdown-item>
                  <i :class="['iconfont', tab.icon]"></i>
                  <span>{{ tab.text }}</span>
                </el-dropdown-item>
              </router-link>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="center-group">
      <NavPanel />
    </div>

    <div class="right-group">
      <PreviewPanel />
      <PublishPanel :update-logic-conf="updateLogicConf" :update-white-conf="updateWhiteConf" :seize="seize" />
      <el-dropdown trigger="click" class="actions-dropdown">
        <span class="el-dropdown-link">
          <el-icon class="more-icon"><MoreFilled /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <CooperationPanel />
            </el-dropdown-item>
            <el-dropdown-item>
              <HistoryPanel />
            </el-dropdown-item>
            <el-dropdown-item>
              <SavePanel :update-logic-conf="updateLogicConf" :update-white-conf="updateWhiteConf" :seize="seize" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useEditStore } from '@/management/stores/edit'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import { MoreFilled, ArrowDown } from '@element-plus/icons-vue'
import { SurveyPermissions } from '@/management/utils/workSpace'
import { storeToRefs } from 'pinia'

// Import semua komponen yang dibutuhkan
// Pastikan path-path ini sesuai dengan struktur proyek Anda
import LogoIcon from '@/management/components/LogoIcon.vue' 
import NavPanel from '../modules/generalModule/NavPanel.vue'
import HistoryPanel from '../modules/contentModule/HistoryPanel.vue'
import PreviewPanel from '../modules/contentModule/PreviewPanel.vue'
import SavePanel from '../modules/contentModule/SavePanel.vue'
import PublishPanel from '../modules/contentModule/PublishPanel.vue'
import CooperationPanel from '../modules/contentModule/CooperationPanel.vue'
import { seizeSession } from '@/management/api/survey'

const router = useRouter()
const route = useRoute()
const editStore = useEditStore()
const { schema, changeSchema } = editStore
const title = computed(() => (editStore.schema?.metaData as any)?.title || 'Nama Proyek')

// --- LOGIKA DARI LEFTMENU LAMA PINDAH KE SINI ---
const projectTabs = ref([])
const allProjectTabs = [
  { text: 'Kirim kuesioner', icon: 'icon-toufang', to: { name: 'channel' } },
  { text: 'Statistik', icon: 'icon-shujutongji', to: { name: 'analysisPage' } }
]

watch(() => editStore.cooperPermissions, (newVal) => {
  const tabs = [];
  if (newVal && newVal.includes(SurveyPermissions.SurveyManage)) {
    tabs.push(allProjectTabs[0]);
  }
  if (newVal && newVal.includes(SurveyPermissions.DataManage)) {
    tabs.push(allProjectTabs[1]);
  }
  projectTabs.value = tabs;
}, { immediate: true, deep: true });

const navigateToHome = () => {
  router.push({ name: 'survey' }); // Arahkan ke halaman daftar proyek
}
// --- END OF LOGIKA DARI LEFTMENU ---

const { showLogicEngine, jumpLogicEngine } = storeToRefs(editStore)

// Fungsi helper lainnya (updateLogicConf, updateWhiteConf, seize) tetap sama
const updateLogicConf = () => {
  const { active } = route.query
  let res = { validated: true, message: '' }
  if ((showLogicEngine.value?.rules?.length && active === 'jumpLogic') || (jumpLogicEngine.value.rules?.length && active === 'showLogic')) {
    return { validated: false, message: active === 'jumpLogic' ? 'Logika Tampilan ada, hapus dulu untuk atur Logika Lompatan' : 'Logika Lompatan ada, hapus dulu untuk atur Logika Tampilan' }
  }
  if (showLogicEngine.value?.rules?.length) {
    try {
      showLogicEngine.value.validateSchema()
    } catch (error) {
      return { validated: false, message: 'Konfigurasi logika tidak boleh kosong' }
    }
    const showLogicConf = showLogicEngine.value.toJson()
    if (JSON.stringify(schema.value.logicConf.showLogicConf) !== JSON.stringify(showLogicConf)) {
      changeSchema({ key: 'logicConf', value: { showLogicConf } })
    }
  } else {
    const jumpLogicConf = jumpLogicEngine.value.toJson()
    if (JSON.stringify(schema.value.logicConf.jumpLogicConf) !== JSON.stringify(jumpLogicConf)) {
      changeSchema({ key: 'logicConf', value: { jumpLogicConf } })
    }
  }
  return res
}

const updateWhiteConf = () => {
  const baseConf = (schema.value?.baseConf as any) || {}
  if (baseConf.passwordSwitch && !baseConf.password) {
    return { validated: false, message: 'Kata sandi akses tidak boleh kosong' }
  }
  if (baseConf.whitelistType != 'ALL' && !baseConf.whitelist?.length) {
    return { validated: false, message: 'Whitelist tidak boleh kosong' }
  }
  return { validated: true, message: '' }
}

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

.unified-navbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid #e7e9eb;
  box-sizing: border-box;
}

.left-group, .right-group {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.left-group {
  justify-content: flex-start;
}

.right-group {
  justify-content: flex-end;
}

.center-group {
  flex: 0 1 auto;
  display: flex;
  justify-content: center;
}

.logo-icon {
  cursor: pointer;
}

.divider {
  width: 1px;
  height: 20px;
  background-color: #e7e9eb;
  margin: 0 8px;
}

.project-title-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  outline: none;

  .el-icon--right {
    margin-left: 4px;
    transition: transform 0.2s;
  }

  &:hover {
    color: $primary-color;
  }
}

.project-nav-link {
  text-decoration: none;
  color: inherit;
  width: 100%;
  
  .el-dropdown-item {
    display: flex;
    align-items: center;
  }

  .iconfont {
    margin-right: 8px;
    font-size: 16px;
    color: #606266;
  }
}

.actions-dropdown {
  .more-icon {
    font-size: 24px;
    cursor: pointer;
    color: #606266;
  }
  :deep(.el-dropdown-menu__item) {
    padding: 0;
    & > * {
      padding: 5px 16px;
      width: 100%;
    }
  }
}

@media (max-width: 992px) {
  .center-group {
    display: none;
  }
}
</style>