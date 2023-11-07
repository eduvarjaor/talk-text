<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <MicrophoneIcon :isRecording="isRecording" />
      <AudioRecorder @recording="handleRecording" />
      <TranscriptionOutput :transcription="transcription" />
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
        isRecording: false,
        transcription: ''
      };
    },
    methods: {
      handleRecording(recording) {
        this.isRecording = recording;
      },
      handleAudio(audioBlob) {
        
      },
      async transcribeAudio(audioBlob) {
        
      }
    }
  }
</script>
