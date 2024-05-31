<script setup lang="ts">
    const props = defineProps<{
        labelId: string,
        dateId: string,
        timeId: string,
        date: string,
        time: string
    }>();
    // emits para atualizar os props de date e time no pai
    const emit = defineEmits<{
        (e: 'updateDate', value: string): void
        (e: 'updateTime', value: string): void
    }>();
</script>

<template>
    <input :id="props.dateId" type="date" 
        :value="props.date" @change="({target}) => $emit('updateDate', (target as HTMLInputElement).value)" 
        :aria-labelledby="props.labelId"/>
    <input :id="props.timeId" type="time" step="60" 
        :value="props.time" @change="({target}) => $emit('updateTime', (target as HTMLInputElement).value)"
        :aria-labelledby="props.labelId"/>
</template>

<style scoped>

</style>