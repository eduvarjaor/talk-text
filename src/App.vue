<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <MicrophoneIcon :isRecording="isRecording" />
      <AudioRecorder @recording="handleRecording" />
    </div>
  </div>
</template>

<script>
  import AudioRecorder from "./components/AudioRecorder.vue";
  import MicrophoneIcon from "./components/Microphone.vue";
  
  export default {
    name: 'App',
    components: {
      AudioRecorder,
      MicrophoneIcon,
    },
    data() {
      return {
        isRecording: false
      };
    },
    methods: {
      handleRecording(recording) {
        this.isRecording = recording;
      }
    }
  }
</script>
