<script setup lang="ts">

import { RouterLink } from 'vue-router';
import strings from '@/assets/strings';

</script>

<template>
    <nav>
        <h1 id="header">{{ strings.appname }}</h1>
        <menu>
            <RouterLink style="text-decoration: none; color: inherit; display: block;"
                :to="strings.tasks_route">{{ strings.home_screen }}</RouterLink>
            <RouterLink style="text-decoration: none; color: inherit; display: block;"
                :to="strings.new_task_route">{{ strings.add_task }}</RouterLink>
        </menu>
    </nav>
    <main>
        <RouterView />
    </main>
</template>

<style scoped>
    nav {
        height: 5%;
        width: 100%;
        display: flex;
    }
    #header {
        height: 100%;
        width: 50%;

        font-size: 2rem;
        text-align: center;
        align-self: center;
    }
    nav > menu {
        width: 50%;
        display: flex;
        justify-content: space-around;

        color: var(--neutral-color-L);
    }
    nav > menu > * {
        height: calc(100% - 0.2rem);
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        width: 40%;
        background: var(--primary-color-L);

        text-align: center;
        align-content: center;
    }
    main {
        height: 95%;
        width: 100%;
    }
</style>