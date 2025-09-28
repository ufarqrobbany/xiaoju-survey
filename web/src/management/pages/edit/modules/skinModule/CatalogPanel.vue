<template>
  <div class="panel-container">
    <div class="panel-header">
      <h3 class="panel-title">Pengaturan Tema</h3>
      <el-button :icon="Close" circle plain @click="uiStore.toggleCatalog()"></el-button>
    </div>

    <div class="panel-content">
      <div class="tag-list">
        <el-tag
          :class="['tag', { current: groupName === 'temp' }]"
          type="info"
          @click="() => handleChangeGroup('temp')"
        >
          Semua
        </el-tag>
        <el-tag
          v-for="item in groupList"
          :key="item.value"
          :class="['tag', { current: groupName === item.value }]"
          type="info"
          @click="() => handleChangeGroup(item.value)"
        >
          {{ item.label }}
        </el-tag>
      </div>
      <div class="banner-list-wrapper">
        <div
          class="single-banner-wrapper"
          v-for="banner in currentBannerList"
          :key="banner.src"
        >
          <img class="banner-img" :src="banner.src" loading="lazy" @click="changePreset(banner)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useEditStore } from '@/management/stores/edit'
import { useUiStore } from '@/management/stores/ui'
import { getBannerData } from '@/management/api/skin.js'
import skinPresets from '@/management/config/skinPresets.js'
import { Close } from '@element-plus/icons-vue'

// --- Definisi Tipe untuk Keamanan dan Kejelasan Kode ---
interface BannerItem {
  src: string;
  title: string;
  group: string;
}

interface BannerGroup {
  key: string;
  name: string;
  list: BannerItem[];
}

interface BannerData {
  [key: string]: BannerGroup;
}
// ---

const uiStore = useUiStore()
const editStore = useEditStore()
const { changeThemePreset } = editStore

const groupName = ref<string>('temp')
const bannerList = ref<BannerData>({})

onMounted(async () => {
  const res = await getBannerData()
  bannerList.value = res.data
})

const groupList = computed(() =>
  Object.entries(bannerList.value).map(([key, group]) => ({
    label: group.name,
    value: key
  }))
)

const allBanners = computed(() =>
  Object.values(bannerList.value).flatMap(group =>
    group.list.map(item => ({ ...item, group: group.key }))
  )
)

const currentBannerList = computed(() => {
  if (groupName.value === 'temp') {
    return allBanners.value
  }
  return allBanners.value.filter(item => item.group === groupName.value)
})

const handleChangeGroup = (value: string) => {
  groupName.value = value
}

const changePreset = (banner: BannerItem) => {
  const name = `${banner.group}-${banner.title}`
  let presets = {
    'bannerConf.bannerConfig.bgImage': banner.src,
    'skinConf.themeConf.color': '#faa600',
    'skinConf.backgroundConf.color': '#f6f7f9'
  }

  const presetConfig = (skinPresets as Record<string, any>)[name];

  if (presetConfig) {
    presets = { ...presets, ...presetConfig }
  }

  changeThemePreset(presets)
}
</script>

<style lang="scss" scoped>
.panel-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 20px;
  height: 60px;
  border-bottom: 1px solid #e7e9eb;
  flex-shrink: 0;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.panel-content {
  padding: 12px;
  overflow-y: auto;
  flex-grow: 1;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;

  .tag {
    margin: 0;
    cursor: pointer;
    border-radius: 16px;
    padding: 4px 12px;
    border: 1px solid #dcdfe6;
    background-color: #f4f4f5;
    color: #606266;
    transition: all 0.2s ease;

    &:hover {
      border-color: $primary-color;
    }
    
    &.current {
      color: #fff;
      background-color: $primary-color;
      border-color: $primary-color;
    }
  }
}

.banner-list-wrapper {
  overflow-x: hidden;
  padding-bottom: 50px;

  .banner-img {
    margin-bottom: 10px;
    width: 100%;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border-radius: 8px;
    border: 1px solid #eee;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>