<template>
  <div class="h-screen bg-gradient-to-r from-blue-900 to-blue-500">
    <div class="text-center">
      <div class="flex flex-col lg:mb-[4rem] xx:mb-[3rem]">
        <span class="lg:text-6xl lg:mt-[3rem] font-bold text-white mb-3 xx:text-5xl xx:mt-[3rem] md:mt-[4rem] md:text-6xl sm:text-6xl">Talk Text</span>

        <span class="lg:text-xl font-medium text-white xx:text-base md:text-xl sm:text-xl">Don't waste your time writing, let AI do it for you</span>
      </div>

      <div class="flex flex-col justify-center items-center">
        <div class="inline-flex items-center justify-center rounded-full bg-white p-5  shadow-xl">
        <MicrophoneIcon :isRecording="isRecording" />
        </div>
      
        <AudioRecorder @recording="handleRecording" @audio="handleAudio" />
        <TranscriptionOutput :transcription="transcription" :isLoading="isLoading" />
        </div>
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
        transcription: '',
        isLoading: false
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
          this.isLoading = true;
          const formData = new FormData();
          formData.append('file', audioBlob, 'recording.wav');

          const response = await fetch('https://us-central1-talk-text-21c1b.cloudfunctions.net/transcriptAudio', {
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
          } finally {
            this.isLoading = false;
          }
      }
    }
  }
</script>
