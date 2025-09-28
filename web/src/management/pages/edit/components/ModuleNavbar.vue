<template>
  <div class="unified-navbar">
    <div class="left-group">
      <BackPanel />
      <div class="divider"></div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link project-title-dropdown">
          <span class="project-title-text">{{ title }}</span>
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

    <div class="center-navigation">
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
            <el-dropdown-item><CooperationPanel /></el-dropdown-item>
            <el-dropdown-item><HistoryPanel /></el-dropdown-item>
            <el-dropdown-item><SavePanel :update-logic-conf="updateLogicConf" :update-white-conf="updateWhiteConf" :seize="seize" /></el-dropdown-item>
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

// Import komponen
import BackPanel from '../modules/generalModule/BackPanel.vue'
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

const { showLogicEngine, jumpLogicEngine } = storeToRefs(editStore)

// ... (Fungsi helper updateLogicConf, updateWhiteConf, seize tidak berubah)
const updateLogicConf = () => { /* ... kode asli ... */ };
const updateWhiteConf = () => { /* ... kode asli ... */ };
const seize = async (sessionId: string) => { /* ... kode asli ... */ };
</script>

<style lang="scss" scoped>
@import url('@/management/styles/edit-btn.scss');

/* --- Mobile First Base Styles (Default) --- */

.unified-navbar {
  display: flex;
  flex-wrap: wrap; /* Izinkan item turun ke baris baru */
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  background-color: #fff;
  border-bottom: 1px solid #e7e9eb;
  padding: 0 12px;
  box-sizing: border-box;
}

.left-group, .right-group {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 56px; /* Tinggi baris atas */
}

.left-group { min-width: 0; }
.divider { display: none; }

.project-title-dropdown {
  display: flex;
  align-items: center;
  font-size: 16px;
  max-width: 120px;
  .project-title-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.right-group :deep(.btn-txt) { display: none; }
.right-group :deep(.btn) { padding: 8px; }

.center-navigation {
  order: 3; /* Posisikan di paling bawah pada mode flex-wrap */
  width: 100%; /* Ambil lebar penuh */
  border-top: 1px solid #f0f2f5;
  
  :deep(.content) {
    width: 100%;
    justify-content: space-around;
  }
  :deep(.navbar-btn) {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    &::before { display: none; }
    &.router-link-exact-active {
      color: $primary-color;
      background-color: #f8f9fa;
    }
  }
}

/* ... (Style dropdown tetap sama) ... */
.actions-dropdown, .project-nav-link { /* ... style asli ... */ }

/* --- Tablet & Desktop Styles --- */
@media (min-width: 768px) {
  .unified-navbar {
    flex-wrap: nowrap; /* Kembali ke satu baris */
    height: 56px;
    padding: 0 16px;
  }

  .left-group {
    order: 1;
    flex: 1;
    justify-content: flex-start;
    gap: 12px;
  }

  .center-navigation {
    order: 2;
    width: auto; /* Ukuran sesuai konten */
    border-top: none; /* Hapus garis pemisah */
    
    :deep(.navbar-btn) {
      padding: 0 20px;
      font-size: 16px;
      &::before { display: block; }
      &.router-link-exact-active {
        background-color: transparent;
      }
    }
  }

  .right-group {
    order: 3;
    flex: 1;
    justify-content: flex-end;
    gap: 12px;
  }

  .divider {
    display: block;
    width: 1px;
    height: 20px;
    background-color: #e7e9eb;
    margin: 0 8px;
  }

  .project-title-dropdown {
    max-width: 200px;
  }

  .right-group :deep(.btn-txt) {
    display: inline-block;
  }
}
</style>