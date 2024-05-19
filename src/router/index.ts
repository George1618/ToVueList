import { createRouter, createWebHistory } from 'vue-router';

import Tasks from '@/views/Tasks.vue';
import Task from '@/views/Task.vue';
import NewTask from '@/views/NewTask.vue';

import strings from '@/assets/strings';

const routes = [
    {path: strings.tasks_route, component: Tasks },
    {path: `${strings.task_route}/:id`, component: Task},
    {path: strings.new_task_route, component: NewTask}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;