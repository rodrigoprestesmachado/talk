<script lang="ts">
import { defineComponent, reactive } from 'vue'
import {
  FileTextIcon,
  DownloadCloudIcon,
  XIcon,
  ImageIcon,
  CodeIcon,
} from '@zhuowenli/vue-feather-icons'

import { closeDrawer } from '/@src/composition/state/ui/workspaceDrawerState'
import { getUser, getUserAvatar } from '/@src/composition/state/user/authState'

type File = {
  id: number
  type: 'text' | 'image' | 'code'
  name: string
  size: string
}
type SharedFiles = {
  userId: string
  files: File[]
}

const SharedFilesDrawer = defineComponent({
  name: 'SharedFilesDrawer',
  components: {
    FileTextIcon,
    DownloadCloudIcon,
    XIcon,
    ImageIcon,
    CodeIcon,
  },
  emits: ['close'],
  setup() {
    // SharedFilesDrawer - Composition API

    const sharedFiles = reactive<SharedFiles[]>([
      {
        userId: '3',
        files: [
          {
            id: 1,
            type: 'image',
            name: 'modal_component.jpg',
            size: '1.1 Mb',
          },
          {
            id: 21,
            type: 'code',
            name: 'modal.js',
            size: '0.2 Mb',
          },
        ],
      },
      {
        userId: '6',
        files: [
          {
            id: 3,
            type: 'image',
            name: 'hero_illustration.png',
            size: '2.4 Mb',
          },
        ],
      },
      {
        userId: '5',
        files: [
          {
            id: 42,
            type: 'text',
            name: 'internal_review.docx',
            size: '1.1 Mb',
          },
          {
            id: 33,
            type: 'text',
            name: 'timesheets.xslsx',
            size: '0.9 Mb',
          },
        ],
      },
    ])

    const stopSharing = (userId: string, fileId: number) => {
      const sharedFileIndex = sharedFiles.findIndex(
        (sharedFile) => sharedFile.userId === userId
      )

      if (sharedFileIndex < 0) {
        // no files shared with this user

        return
      }

      const fileIndex = sharedFiles[sharedFileIndex].files.findIndex(
        (file) => file.id === fileId
      )

      if (fileIndex < 0) {
        // requested file is not shared with this user

        return
      }

      sharedFiles[sharedFileIndex].files.splice(fileIndex, 1)

      if (sharedFiles[sharedFileIndex].files.length === 0) {
        // no files are shared with this user, cleaning up

        sharedFiles.splice(sharedFileIndex, 1)
      }
    }

    return {
      closeDrawer,
      sharedFiles,
      getUserAvatar,
      getUser,
      stopSharing,
    }
  },
})

export default SharedFilesDrawer
</script>

<template>
  <div class="slide-panel is-right is-small">
    <div class="slide-panel-header">
      <h3>Shared Files</h3>
      <a class="slide-panel-close" @click="$emit('close')">
        <i class="material-icons">close</i>
      </a>
    </div>

    <div class="slide-panel-body has-slimscroll">
      <!--File List-->
      <div class="slide-panel-list">
        <!--Placeholder-->
        <div
          v-if="sharedFiles.length === 0"
          class="slide-panel-placeholder has-text-centered"
        >
          <img
            class="sidebar-illustration"
            src="/img/illustrations/sharedfiles.svg"
            alt=""
          />
          <h3>Nothing to show</h3>
          <p>You don't have any shared files.</p>
        </div>

        <template v-else></template>
        <!--Group-->
        <div
          v-for="sharedFile of sharedFiles"
          :key="sharedFile.userId"
          class="slide-panel-list-group"
        >
          <div class="slide-panel-list-group-header">
            <div class="header-icon">
              <img
                loading="lazy "
                :src="getUserAvatar(sharedFile.userId)"
                alt=""
                @error="$event.target.src = 'https://via.placeholder.com/32x32'"
              />
            </div>
            <span>{{ getUser(sharedFile.userId)?.nickname }}</span>
            <div class="header-line"></div>
          </div>

          <!--File-->
          <div
            v-for="file of sharedFile.files"
            :key="file.id"
            class="slide-panel-list-item"
          >
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
                data-hint="Stop sharing"
                @click="stopSharing(sharedFile.userId, file.id)"
              >
                <XIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
