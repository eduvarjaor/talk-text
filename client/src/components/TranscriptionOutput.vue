<template>
    <div class="transcription-output">
        <p v-if="transcription">{{ transcription }}</p>
        <p v-else class="placeholder">Transcription will appear here...</p>
    </div>
</template>

<script>
export default {
    name: 'TranscriptionOutput',
    props: {
        transcription: String,
    },
};
</script>