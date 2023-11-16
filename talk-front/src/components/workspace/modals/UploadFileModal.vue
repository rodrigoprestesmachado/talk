<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { SendIcon } from '@zhuowenli/vue-feather-icons'

const UploadFileModal = defineComponent({
  name: 'UploadFileModal',
  components: {
    SendIcon,
  },
  props: {
    file: {
      type: Object,
      default: null,
    },
    message: {
      type: String,
      default: '',
    },
  },
  emits: {
    close: null,
    validate: (payload: { file: File; previewSrc: string; comment: string }) => {
      if (payload.file && payload.previewSrc && payload.comment) {
        return true
      }

      return false
    },
  },
  setup(props) {
    // UploadFileModal - Composition API

    const previewSrc = ref('')
    const previewName = ref('')
    const comment = ref('')
    const isImg = ref(false)

    watch(
      props,
      () => {
        if (props.file) {
          const reader = new FileReader()
          reader.onload = function (event) {
            previewSrc.value = event.target?.result as string
          }
          reader.readAsDataURL(props.file as File)

          previewName.value = props.file.name
          comment.value = props.message

          if (props.file.type.startsWith('image/')) {
            isImg.value = true
          } else {
            isImg.value = false
          }
        }
      },
      { immediate: true, deep: true }
    )

    return {
      isImg,
      previewName,
      previewSrc,
      comment,
    }
  },
})

export default UploadFileModal
</script>

<template>
  <div class="upload-file-modal action-modal">
    <div class="inner" @click="$emit('close')"></div>

    <div v-if="file" class="action-modal-card is-upload">
      <div class="modal-card-inner">
        <div class="preview-block">
          <img v-if="isImg" class="modal-upload-preview" :src="previewSrc" alt="" />
          <img
            v-else
            class="modal-upload-preview"
            src="https://dummyimage.com/300x300"
            alt=""
          />
          <div class="meta">
            <h3>Upload {{ previewName ?? 'File' }}</h3>
            <p class="mb-4">
              Upload this file and attach a message to it. Attached messages are optional.
            </p>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea
              v-model="comment"
              class="textarea"
              rows="2"
              placeholder="Attach a comment"
            ></textarea>
          </div>
        </div>

        <div class="setting-item">
          <label class="form-switch is-primary">
            <input id="share-file-toggle" type="checkbox" class="is-switch" />
            <i></i>
          </label>
          <div class="setting-meta">
            <span>Share with everyone</span>
          </div>
        </div>

        <div class="modal-controls">
          <button class="button action-modal-close" @click="$emit('close')">
            <span>Cancel</span>
          </button>
          <button
            class="button is-primary"
            @click="
              $emit('validate', {
                file,
                previewSrc,
                comment,
              })
            "
          >
            <span class="icon is-small">
              <SendIcon />
            </span>
            <span>Upload</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
