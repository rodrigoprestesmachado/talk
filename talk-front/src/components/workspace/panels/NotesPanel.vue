<script lang="ts">
import { defineComponent } from 'vue'

const NotesPanel = defineComponent({
  name: 'NotesPanel',
  setup() {
    // NotesPanel - Composition API

    return {}
  },
})

export default NotesPanel
</script>

<template>
  <div class="panel-body is-details">
    <div class="panel-body-inner">
      <!--Loader-->
      <div class="loader-wrap">
        <div class="loader loader-4"></div>
      </div>

      <div>Details</div>
    </div>
  </div>
</template>
