<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <MicrophoneIcon :isRecording="isRecording" />
      <AudioRecorder @recording="handleRecording" @audio="handleAudio" />
      <TranscriptionOutput :transcription="transcription" />
    </div>
  </div>
</template>

<script>
  import AudioRecorder from "./components/AudioRecorder.vue";
  import MicrophoneIcon from "./components/Microphone.vue";
  import TranscriptionOutput from './components/TranscriptionOutput.vue'
  
  export default {
    name: 'App',
    components: {
      AudioRecorder,
      MicrophoneIcon,
      TranscriptionOutput,
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
        this.transcribeAudio(audioBlob);
      },
      async transcribeAudio(audioBlob) {
        try {
          const formData = new FormData();
          formData.append('file', audioBlob, 'recording.wav');

          const response = await fetch('http://localhost:5000/talk-text-21c1b/us-central1/transcriptAudio', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          this.transcription = data.data;
          } catch (error) {
            console.error('There was an error transcribing the audio:', error);
          }
      }
    }
  }
</script>
