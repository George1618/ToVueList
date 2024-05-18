import { createRouter, createWebHistory } from 'vue-router';

import Tasks from '@/views/Tasks.vue';
import Task from '@/views/Task.vue';
import NewTask from '@/views/NewTask.vue';

const routes = [
    {path: '/', component: Tasks },
    {path: '/:id/', component: Task},
    {path: '/new/', component: NewTask}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;