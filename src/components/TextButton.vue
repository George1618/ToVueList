<script setup lang="ts">
    const props = defineProps<{
        text: string,
        click: Function
    }>();
</script>

<template>
    <button @click="props.click" >{{ props.text }}</button>
</template>

<style scoped>
    
</style>