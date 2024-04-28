<script setup lang="ts">
    import strings from '@/assets/strings';

    const props = defineProps<{
        title: string,
        description: string
    }>();
</script>

<template>
    <li>
        <h3>{{ props.title }}</h3>
        <p v-if="!props.description">{{ strings.no_desc }}</p>
        <p v-else>{{ props.description }}</p>
    </li>
</template>

<style scoped>

</style>