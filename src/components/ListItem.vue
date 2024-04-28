<script setup lang="ts">
    import strings from '@/assets/strings';

    const props = defineProps<{
        title: string,
        description: string,
        done: boolean
    }>();
</script>

<template>
    <li>
        <p class="checked" v-if="done">✔</p>
        <h2>{{ props.title }}</h2>
        <p v-if="!props.description">{{ strings.no_desc }}</p>
        <p v-else>{{ props.description }}</p>
        <slot />
    </li>
</template>

<style scoped>
    li {
        background-color: var(--neutral-color-D);
        color: var(--primary-color-D);

        padding: 1rem 0.75rem;
        margin: 1rem 0.75rem;
        border: 0.2rem dashed var(--primary-color-L);
        list-style: none;
    }

    li > h2 {
        background-color: var(--neutral-color-D);
    }
</style>