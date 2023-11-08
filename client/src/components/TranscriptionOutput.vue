<template>
    <div class="mt-5 border-double border-4 p-[6rem] w-[45rem] bg-white rounded-lg">
        <p v-if="transcription" class="text-xl">{{ transcription }}</p>
        <p v-else class="placeholder text-xl">Transcription will appear here...</p>
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