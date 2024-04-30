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
        <slot ></slot>
    </li>
</template>

<style scoped>
    li {
        background-color: var(--neutral-color-D);
        color: var(--primary-color-D);

        border: 0.2rem dashed var(--primary-color-L);
        list-style: none;

        text-align: center;
        align-content: center;
    }

    li > h2 {
        background-color: var(--neutral-color-D);
    }
</style>