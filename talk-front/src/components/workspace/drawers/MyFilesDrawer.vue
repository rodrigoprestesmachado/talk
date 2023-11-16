<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import {
  FileTextIcon,
  DownloadCloudIcon,
  Trash2Icon,
  ImageIcon,
  CodeIcon,
} from '@zhuowenli/vue-feather-icons'

import { closeDrawer } from '/@src/composition/state/ui/workspaceDrawerState'

type File = {
  id: number
  type: 'text' | 'image' | 'code'
  name: string
  size: string
}

const MyFilesDrawer = defineComponent({
  name: 'MyFilesDrawer',
  components: {
    FileTextIcon,
    DownloadCloudIcon,
    Trash2Icon,
    ImageIcon,
    CodeIcon,
  },
  emits: ['close'],
  setup() {
    // MyFileDrawer - Composition API

    const files = reactive<File[]>([
      {
        id: 1,
        type: 'text',
        name: 'Project_budget.docx',
        size: '0.8 Mb',
      },
      {
        id: 21,
        type: 'text',
        name: 'script_review.docx',
        size: '1.2 Mb',
      },
      {
        id: 3,
        type: 'image',
        name: 'home_screenshot.jpg',
        size: '1.8 Mb',
      },
      {
        id: 14,
        type: 'text',
        name: 'project_budget.xlsx',
        size: '0.6 Mb',
      },
      {
        id: 5,
        type: 'code',
        name: 'home.js',
        size: '0.7 Mb',
      },
    ])

    const deleteFile = async (id: number) => {
      const fileIndex = files.findIndex((file) => file.id === id)
      if (fileIndex < 0) {
        // file not found

        return
      }

      files.splice(fileIndex, 1)
    }

    const deleteAllFiles = async () => {
      const ids = files.reduce<number[]>((accumulator, file) => {
        accumulator.push(file.id)

        return accumulator
      }, [])

      for (const fileId of ids) {
        await deleteFile(fileId)

        // simulate time
        await new Promise((resolve) => {
          setTimeout(resolve, 200)
        })
      }
    }

    return {
      closeDrawer,
      files,
      deleteFile,
      deleteAllFiles,
    }
  },
})

export default MyFilesDrawer
</script>

<template>
  <div class="slide-panel is-right is-small">
    <div class="slide-panel-header">
      <h3>My Files</h3>
      <a class="slide-panel-close" @click="$emit('close')">
        <i class="material-icons">close</i>
      </a>
    </div>

    <div class="slide-panel-body">
      <!--File List-->
      <div class="slide-panel-list">
        <!--Placeholder-->
        <div v-if="files.length === 0" class="slide-panel-placeholder has-text-centered">
          <img class="sidebar-illustration" src="/img/illustrations/myfiles.svg" alt="" />
          <h3>Nothing to show</h3>
          <p>You don't have any uploaded files.</p>
        </div>

        <template v-else>
          <!--File-->
          <div v-for="file of files" :key="file.id" class="slide-panel-list-item">
            <div class="icon-container">
              <FileTextIcon v-if="file.type === 'text'" />
              <ImageIcon v-else-if="file.type === 'image'" />
              <CodeIcon v-else-if="file.type === 'code'" />
            </div>
            <div class="meta">
              <span>{{ file.name }}</span>
              <span>{{ file.size }}</span>
            </div>
            <div class="actions">
              <div class="loader-wrap">
                <div class="loader"></div>
              </div>
              <button class="action hint--top hint--rounded" data-hint="Download">
                <DownloadCloudIcon />
              </button>
              <button
                class="action hint--top hint--rounded"
                data-hint="Delete"
                @click="deleteFile(file.id)"
              >
                <Trash2Icon />
              </button>
            </div>
          </div>
        </template>
      </div>

      <div v-if="files.length > 0" class="clear-all has-text-centered">
        <button class="button" @click="deleteAllFiles">
          <span class="icon is-small">
            <Trash2Icon />
          </span>
          <span>Delete All Files</span>
        </button>
      </div>
    </div>
  </div>
</template>
