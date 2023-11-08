<template>
    <div class="mt-5 border-solid border-1 lg:p-[6rem] md:p-[4.5rem] lg:w-[55rem] bg-white rounded-lg xx:p-[4rem] border-black xx:mr-[1rem] xx:ml-[1rem] md:w-[45rem] sm:w-[40rem] shadow-xl">
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