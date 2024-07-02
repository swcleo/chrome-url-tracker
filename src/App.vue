<template>
  <div class="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold text-center text-blue-600 mb-6">Chrome URL Tracker</h1>
    <button class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mb-6 w-full" @click="handleClick">
      Clear Record
    </button>
    <div>
      <div v-if="visitedUrls.length === 0" class="text-center text-gray-600">
        No visited URLs found.
      </div>
      <div v-else>
        <div v-for="(url, index) in visitedUrls" :key="url" class="border-b border-gray-200 py-2 cursor-pointer hover:bg-gray-100 transition duration-300">
          <div @click="toggleExpanded(index)" class="flex justify-between items-center">
            <span class="font-medium text-gray-800">#{{ index + 1 }}:</span>
            <span class="text-blue-500">{{ extractDomain(url) }}</span>
          </div>
          <div v-if="expandedIndex === index" class="mt-2 ml-4 text-gray-600 overflow-x-auto">
            <span>{{ isEncoded(url) ? decodeUrl(url) : url }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { extractDomain, isEncoded, decodeUrl } from './common/utils'

const visitedUrls = ref<string[]>([])
const expandedIndex = ref<number | null>(null)

async function displayVisitedUrls() {
  try {
    const result = await chrome.storage.local.get('visitedUrls')
    const urls: string[] = result.visitedUrls || []
    visitedUrls.value = urls
  } catch (error) {
    console.error('Error retrieving visited URLs:', error)
  }
}

displayVisitedUrls()

async function handleClick() {
  try {
    await chrome.storage.local.remove('visitedUrls')
    console.log('visitedUrls removed from storage')
    await displayVisitedUrls()
  } catch (error) {
    console.error('Error removing visited URLs:', error)
  }
}

function toggleExpanded(index: number) {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
</script>

<style scoped lang="scss">
body {
  @apply bg-gray-100;
}

</style>
