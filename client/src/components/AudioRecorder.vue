<template>
    <div class="flex space-x-2 mt-3">
        <button @click="startRecording" :disabled="isRecording" class="bg-green-300 p-2">Start</button>

        <button @click="stopRecording" :disabled="!isRecording" class="bg-red-300 p-2">Stop</button>

        <!-- <audio ref="audioElement" controls></audio> -->
    </div>
</template>

<script>
    export default{
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
