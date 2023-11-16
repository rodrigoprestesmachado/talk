<script lang="ts">
import { defineComponent } from 'vue'

import {
  loading,
  activeConversation,
} from '/@src/composition/state/workspace/activeConversationState'
import { getUser } from '/@src/composition/state/user/authState'

import ParticipantItem from '/@src/components/users/ParticipantItem.vue'

const PeoplePanel = defineComponent({
  name: 'PeoplePanel',
  components: {
    ParticipantItem,
  },
  setup() {
    // PeoplePanel - Composition API

    return {
      getUser,
      loading,
      activeConversation,
    }
  },
})

export default PeoplePanel
</script>

<template>
  <div class="panel-body is-people">
    <div class="panel-body-inner has-slimscroll">
      <!--Loader-->
      <div class="loader-wrap">
        <div class="loader loader-4"></div>
      </div>

      <div v-if="loading" class="placeloaders-wrap participants-placeloaders">
        <div class="participants-block">
          <div class="block-title">
            <h4>Started by</h4>
            <div class="line"></div>
          </div>
          <div class="block-content">
            <div class="placeloader-block">
              <div class="img loads"></div>
              <div class="meta">
                <div class="content-shape loads"></div>
                <div class="content-shape loads"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="participants-block">
          <div class="block-title">
            <h4>In the conversation</h4>
            <div class="line"></div>
          </div>
          <div class="block-content">
            <div class="placeloader-block">
              <div class="img loads"></div>
              <div class="meta">
                <div class="content-shape loads"></div>
                <div class="content-shape loads"></div>
              </div>
            </div>
            <div class="placeloader-block">
              <div class="img loads"></div>
              <div class="meta">
                <div class="content-shape loads"></div>
                <div class="content-shape loads"></div>
              </div>
            </div>
            <div class="placeloader-block">
              <div class="img loads"></div>
              <div class="meta">
                <div class="content-shape loads"></div>
                <div class="content-shape loads"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading" class="participants-wrap">
        <div class="participants-block started-by">
          <div class="block-title">
            <h4>Started by</h4>
            <div class="line"></div>
          </div>

          <div class="block-content">
            <ParticipantItem
              :user="getUser(activeConversation.ownerId)"
              class="is-owner"
            />
          </div>
        </div>

        <div class="participants-block other-participants">
          <div class="block-title">
            <h4>In The Conversation</h4>
            <div class="line"></div>
          </div>
          <div class="block-content is-owner-editable">
            <template v-for="userId in activeConversation.participantIds" :key="userId">
              <ParticipantItem
                v-if="userId !== activeConversation.ownerId"
                :user="getUser(userId)"
                class="is-participant"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
