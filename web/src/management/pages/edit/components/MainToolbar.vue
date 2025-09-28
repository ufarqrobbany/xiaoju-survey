<template>
    <header class="main-toolbar">
        <div class="toolbar-left">
        <el-button 
            :type="uiStore.isCatalogVisible ? 'primary' : 'default'" 
            circle 
            @click="uiStore.toggleCatalog"
        >
            <el-icon><Brush /></el-icon>
        </el-button>
        </div>

        <div class="toolbar-center">
        <el-radio-group v-model="activeRouter">
            <el-radio-button 
            v-for="item in routes" 
            :key="item.router" 
            :label="item.router"
            >
            {{ item.text }}
            </el-radio-button>
        </el-radio-group>
        </div>

        <div class="toolbar-right">
        <el-button 
            :type="uiStore.isSetterVisible ? 'primary' : 'default'" 
            circle 
            @click="uiStore.toggleSetter"
        >
            <el-icon><Setting /></el-icon>
        </el-button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUiStore } from '@/management/stores/ui'
import { Brush, Setting } from '@element-plus/icons-vue' // Pastikan ikon diimpor

const uiStore = useUiStore()
const router = useRouter()
const route = useRoute()

const routes = [
    { text: 'Konten', router: 'QuestionSkinSetting' },
    { text: 'Hasil', router: 'QuestionEditResultConfig' }
]

const activeRouter = ref(route.name)

watch(() => route.name, (newName) => {
    activeRouter.value = newName
})

watch(activeRouter, (newRoute) => {
    if (newRoute && newRoute !== route.name) {
        router.push({ name: newRoute })
    }
})
</script>

<style lang="scss" scoped>
.main-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 64px;
    background-color: #ffffff;
    border-bottom: 1px solid #e7e9eb;
    flex-shrink: 0;
    z-index: 100; // Pastikan di atas konten

    .toolbar-left, .toolbar-right {
        flex-basis: 150px; // Beri ruang di sisi
    }
    .toolbar-right {
        text-align: right;
    }
}

// Responsivitas untuk mobile
@media (max-width: 768px) {
    .main-toolbar {
        padding: 0 16px;
    }
    .toolbar-center {
        :deep(.el-radio-button__inner) {
        padding: 8px 12px; // Perkecil padding tab
        font-size: 13px;
        }
    }
}
</style>