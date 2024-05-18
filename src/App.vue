<script setup lang="ts">

import { RouterLink } from 'vue-router';
import strings from '@/assets/strings';

</script>

<template>
    <nav>
        <RouterLink id="header" to="/">{{ strings.appname }}</RouterLink>
        <menu>
            
        </menu>
    </nav>
    <RouterView />
</template>

<style scoped>

</style>