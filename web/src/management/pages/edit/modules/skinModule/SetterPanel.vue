<template>
  <div class="setter-wrapper">
    <div class="panel-header">
      <h3 class="panel-title">Gaya Visual</h3>
      <el-button :icon="Close" circle plain @click="uiStore.toggleSetter()"></el-button>
    </div>

    <div class="setter-content">
      <el-collapse v-model="collapse">
        <el-collapse-item
          v-for="(collapseItem, index) in skinConfig"
          :key="index"
          :title="collapseItem.name"
          :name="collapseItem.key"
        >
          <SetterField
            :form-config-list="collapseItem.formConfigList"
            :module-config="_get(schema, collapseItem.key, {})"
            @form-change="handleFormChange($event, collapseItem.key)"
          />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditStore } from '@/management/stores/edit'
import { useUiStore } from '@/management/stores/ui'
import { get as _get } from 'lodash-es'
import { Close } from '@element-plus/icons-vue'

import skinConfig from '@/management/pages/edit/setterConfig/skinConfig'
import SetterField from '@/management/pages/edit/components/SetterField.vue'

const uiStore = useUiStore()
const editStore = useEditStore()
const { schema, changeSchema } = editStore
const collapse = ref<string>('skinsettings')

const handleFormChange = (data: any, collapseKey: string) => {
  const { key, value } = data
  const resultKey = `${collapseKey}.${key}`
  changeSchema({ key: resultKey, value })
}
</script>

<style lang="scss" scoped>
.setter-wrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
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

.setter-content {
  padding: 10px 20px;
  overflow-y: auto;
  flex-grow: 1;

  .el-collapse {
    border-top: none;
    border-bottom: none;
    & > .el-collapse-item {
      border-radius: 8px;
      margin-bottom: 10px;
      overflow: hidden;
    }
    :deep(.el-collapse-item__header) {
      font-size: 14px;
      color: #333;
      font-weight: 600;
      height: 48px;
      padding: 0 15px;
      background-color: #fff;
      border-bottom: none;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: #f0f4f8;
      }
    }
    :deep(.el-collapse-item__wrap) {
      border-bottom: none;
      .el-collapse-item__content {
        padding: 15px 25px 20px 25px;
        background-color: #fff;
      }
    }
  }
}
</style>