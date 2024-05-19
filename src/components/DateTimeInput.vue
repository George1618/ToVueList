<script setup lang="ts">
    const props = defineProps<{
        labelId: string,
        dateId: string,
        timeId: string,
        date: string,
        time: string
    }>();
</script>

<template>
    <input :id="props.dateId" type="date" v-model="props.date" :aria-labelledby="props.labelId"/>
    <input :id="props.timeId" type="time" step="60" v-model="props.time" :aria-labelledby="props.labelId"/>
</template>

<style scoped>

</style>