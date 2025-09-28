import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
    const isCatalogVisible = ref(false)
    const isSetterVisible = ref(false)

    function toggleCatalog() {
        isCatalogVisible.value = !isCatalogVisible.value
        // Pastikan hanya satu panel yang terbuka di mobile
        if (isCatalogVisible.value) {
        isSetterVisible.value = false
        }
    }

    function toggleSetter() {
        isSetterVisible.value = !isSetterVisible.value
        // Pastikan hanya satu panel yang terbuka di mobile
        if (isSetterVisible.value) {
        isCatalogVisible.value = false
        }
    }

    function closeAllPanels() {
        isCatalogVisible.value = false
        isSetterVisible.value = false
    }

    return {
        isCatalogVisible,
        isSetterVisible,
        toggleCatalog,
        toggleSetter,
        closeAllPanels
    }
})