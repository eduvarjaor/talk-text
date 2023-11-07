<template>
    <font-awesome-icon :icon="['fas', 'microphone']" class="text-6xl" :class="{'animate-pulse': isRecording}" />
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

  library.add(faMicrophone)
  
  export default {
  name: 'MicrophoneIcon',
  components: {
    FontAwesomeIcon
  },
  props: {
    isRecording: {
      type: Boolean,
      default: false
    }
  }
}
</script>
