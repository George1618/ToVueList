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
    button {
        border-radius: 10%;
        background: var(--white-shade-L);
    }
</style>