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
        <p class="ItemDone" v-if="done">✔</p>
        <p class="ItemDone" v-else></p>
        <div>
            <h2 class="ItemTitle" v-if="!props.title">{{ strings.no_title }}</h2>
            <h2 class="ItemTitle" v-else>{{ props.title }}</h2>
            <p class="ItemDescription" v-if="!props.description">{{ strings.no_desc }}</p>
            <p class="ItemDescription" v-else>{{ props.description }}</p>
        </div>
        <slot></slot>
    </li>
</template>

<style scoped>
    li {
        background-color: var(--neutral-color-D);
        color: var(--primary-color-D);

        border: 0.2rem dashed var(--primary-color-L);
        list-style: none;

        display: flex;
        text-align: center;
        justify-items: center;
        align-items: center;

        justify-content: space-evenly;
    }

    .ItemDone {
        font-size: 25px;
        border: 1px solid inherit;
    }

    .ItemTitle {
        height: 20%;
        border-bottom: 1px solid var(--secondary-color);
    }

    .ItemDescription {
        height: calc(80% - 10px);
        margin: 5px 0;
    }

    li > *:last-child {
        width: 25%;
    }
</style>