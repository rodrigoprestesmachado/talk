<script lang="ts">
import { defineComponent } from 'vue'

const ConversationLoadingPlaceholder = defineComponent({
  name: 'ConversationLoadingPlaceholder',
  setup() {
    // ConversationLoadingPlaceholder - Composition API

    return {}
  },
})

export default ConversationLoadingPlaceholder
</script>

<template>
  <div class="shadow-dom">
    <div class="date-divider">
      <hr class="date-divider-line" />
      <span class="date-divider-text">loading ...</span>
    </div>

    <div class="chat-message is-received is-placeloader">
      <div class="img loads"></div>
      <div class="message-block">
        <div class="content-shape loads"></div>
        <div class="content-shape loads"></div>
        <div class="content-shape loads"></div>
      </div>
    </div>

    <div class="chat-message is-received is-placeloader">
      <div class="img loads"></div>
      <div class="message-block">
        <div class="content-shape loads"></div>
        <div class="content-shape loads"></div>
        <div class="content-shape loads"></div>
      </div>
    </div>

    <div class="chat-message is-sent is-placeloader">
      <div class="img loads"></div>
      <div class="message-block">
        <div class="content-shape loads"></div>
        <div class="content-shape loads"></div>
        <div class="content-shape loads"></div>
      </div>
    </div>

    <div class="chat-message is-received is-placeloader">
      <div class="img loads"></div>
      <div class="message-block">
        <div class="content-shape loads"></div>
        <div class="content-shape loads"></div>
        <div class="content-shape loads"></div>
      </div>
    </div>
  </div>
</template>
