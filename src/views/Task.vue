<script setup lang="ts">
    import { useTasksStore } from '@/store/tasks';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const i : number = parseInt((route.params as {id: string}).id);

    const tasksStore = useTasksStore();
    const task = tasksStore.tasks[i];
</script>

<template>
    <p>{{ task.title }}</p>
</template>

<style scoped>

</style>