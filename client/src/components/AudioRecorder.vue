<template>
    <div class="flex space-x-4 mt-9 justify-center mb-[1rem]">
      <ButtonComponent :disabled="isRecording" @click="startRecording" class="bg-green-400 hover:bg-green-500">Start</ButtonComponent>

      <ButtonComponent color="red" :disabled="!isRecording" @click="stopRecording" class="bg-red-400 hover:bg-red-500">Stop</ButtonComponent>
    </div>
</template>

<script>
  import ButtonComponent from './Button.vue';

    export default{
      components: {
      ButtonComponent,
    },
      data() {
        return {
          isRecording: false,
          mediaRecorder: null,
          audioChunks: [],
          audioUrl: ''
        };
  },
  methods: {
    async startRecording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.ondataavailable = event => {
              this.audioChunks.push(event.data);
          };

          this.mediaRecorder.onstop = () => {
              const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
              this.audioUrl = URL.createObjectURL(audioBlob);
              this.$emit('audio', audioBlob);
              this.audioChunks = [];
          };

          this.mediaRecorder.start();
          this.isRecording = true;

          this.$emit('recording', true);
      } catch (err) {
        console.error('Error starting the recording:', err);
      }
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.isRecording = false;

        this.$emit('recording', false);
      }
    }
  }
};
</script>
