<template>
  <span type="primary" :loading="isPublishing" class="publish-btn" @click="handlePublish">
    Publikasikan
  </span>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditStore } from '@/management/stores/edit'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import { publishSurvey, saveSurvey } from '@/management/api/survey'
import buildData from './buildData'
import { storeToRefs } from 'pinia'
import { CODE_MAP } from '@/management/api/base'

interface Props {
  updateLogicConf: any
  updateWhiteConf: any
  seize: any
}

const props = defineProps<Props>()

const isPublishing = ref<boolean>(false)
const editStore = useEditStore()
const { getSchemaFromRemote } = editStore
const { schema, sessionId } = storeToRefs(editStore)
const saveData = computed(() => {
  return buildData(schema.value, sessionId.value)
})

const router = useRouter()

const validate = () => {
  let checked = true
  let msg = ''
  const { validated, message } = props.updateLogicConf()
  if (!validated) {
    checked = validated
    msg = `Periksa halaman "Pengaturan Kuesioner > Logika Tampil": ${message}`
  }
  const { validated: whiteValidated, message: whiteMsg } = props.updateWhiteConf()
  if (!whiteValidated) {
    checked = whiteValidated
    msg = `Periksa halaman "Pengaturan Kuesioner > Batasan Jawaban": ${whiteMsg}`
  }

  return {
    checked,
    msg
  }
}

const onSave = async () => {
  if (!saveData.value.sessionId) {
    ElMessage.error('sessionId tidak ditemukan, silakan segarkan halaman')
    return null
  }
  if (!saveData.value.surveyId) {
    ElMessage.error('surveyId tidak ditemukan, silakan segarkan halaman')
    return null
  }

  try {
    const res: any = await saveSurvey(saveData.value)
    if (!res) {
      return null
    }
    if (res.code === 200) {
      ElMessage.success('Berhasil disimpan')
      return res
    } else if (res.code === 3006) {
      ElMessageBox.alert(res.errmsg, 'Info', {
        confirmButtonText: 'Sinkronkan Ulang',
        callback: (action: string) => {
          if (action === 'confirm') {
            props.seize(sessionId.value)
          }
        }
      })
      return null
    } else {
      ElMessage.error(res.errmsg)
      return null
    }
  } catch (error) {
    ElMessage.error('Gagal menyimpan survei')
    return null
  }
}
const handlePublish = async () => {
  if (isPublishing.value) {
    return
  }

  isPublishing.value = true

  // 发布检测
  const { checked, msg } = validate()
  if (!checked) {
    isPublishing.value = false
    ElMessage.error(msg)
    return
  }

  try {
    const saveRes: any = await onSave()
    if (!saveRes || saveRes.code !== CODE_MAP.SUCCESS) {
      return
    }
    const publishRes: any = await publishSurvey({ surveyId: saveData.value.surveyId })
    if (publishRes.code === 200) {
      ElMessage.success('Berhasil dipublikasikan')
      getSchemaFromRemote()
      router.push({ name: 'channel' })
    } else {
      ElMessage.error(`Gagal mempublikasikan ${publishRes.errmsg}`)
    }
  } catch (err) {
    ElMessage.error(`Gagal mempublikasikan`)
  } finally {
    isPublishing.value = false
  }
}
</script>
<style>
.publish-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: 500;
  vertical-align: middle;
  background-color: #ffa600;
  border: #ffa600;
  border-color: #ffa600;
  border-radius: 5px;
  width: 100px;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  padding: 0;
  font-size: 14px;
  user-select: auto!important;
}
</style>
