<script lang="ts">
import { defineComponent } from 'vue'

const ActivityPanel = defineComponent({
  name: 'ActivityPanel',
  setup() {
    // ActivityPanel - Composition API

    return {}
  },
})

export default ActivityPanel
</script>

<template>
  <div class="panel-body is-activity">
    <div class="panel-body-inner">
      <!--Loader-->
      <div class="loader-wrap">
        <div class="loader loader-4"></div>
      </div>

      <div class="block-title">
        <h4>New</h4>
        <div class="line"></div>
      </div>

      <div class="activity-items">
        <div class="activity-item">
          <img
            loading="lazy"
            :src="'/uploads/avatars/ben.jpg'"
            alt=""
            @error="$event.target.src = 'https://via.placeholder.com/32x32'"
          />
          <div class="meta">
            <p>
              <span>Ben Walsh</span> posted <a href="#" @click.prevent>an update</a> in a
              project's team space
            </p>
            <small>5 minutes ago</small>
          </div>
        </div>

        <div class="activity-item">
          <img
            loading="lazy"
            :src="'/uploads/avatars/mike.jpg'"
            alt=""
            @error="$event.target.src = 'https://via.placeholder.com/32x32'"
          />
          <div class="meta">
            <p>
              <span>Mike Baggio</span> Uploaded a
              <a href="#" @click.prevent>new file</a> in the document library
            </p>
            <small>1 hour ago</small>
          </div>
        </div>
      </div>

      <div class="block-title">
        <h4>Recent</h4>
        <div class="line"></div>
      </div>

      <div class="activity-items">
        <div class="activity-item">
          <img
            loading="lazy"
            :src="'/uploads/avatars/audrey.jpg'"
            alt=""
            @error="$event.target.src = 'https://via.placeholder.com/32x32'"
          />
          <div class="meta">
            <p>
              <span>Audrey Sacks</span> marked <a href="#" @click.prevent>3 tasks</a> as
              complete in a project board
            </p>
            <small>3 hours ago</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
