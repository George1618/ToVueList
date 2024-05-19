<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import strings from '../assets/strings';

import ListItem from '../components/ListItem.vue';
import TextButton from '../components/TextButton.vue';

import { useTasksStore } from '@/store/tasks';

const tasksStore = useTasksStore();
const tasks = tasksStore.tasks;

// atualiza apenas o atributo "done" ("feito") de uma tarefa
function updateTaskDone(i: number) {
    let doneTime = new Date().getDate()
    tasksStore.updateTask(i, null, null, null, doneTime );
}

const router = useRouter();

// vai para a página própria da tarefa com índice i
function navToTask(i: number) {
    router.push(`${strings.task_route}/${i}`)
}

</script>

<template>
    <h2 id="tasks_header">{{ strings.tasks }}</h2>
    <ul id="list">
        <p v-if="tasks.length===0" >{{ strings.no_tasks }}</p>
        <ListItem v-else 
            v-for="(task, i) in tasks" 
                :title="task.title" :description="task.description" :done="task.done!==undefined" 
            class="ListItem"
        >
            <div class="ListItemActions">
                <TextButton 
                    :text="task.done? strings.mark_undone : strings.mark_done" 
                    :click="() => updateTaskDone(i)" />
                <TextButton
                    :text="strings.view_task"
                    :click="() => navToTask(i)" />
            </div>
        </ListItem>
    </ul>
    <RouterLink :to="strings.new_task_route">{{ strings.add_task }}</RouterLink>
</template>

<style scoped>
    #header {
        grid-row: 1 / 2;
        background: var(--primary-color-D);
        color: var(--neutral-color-L);

        height: 100%;
        text-align: center;
        align-self: center;
    }

    #tasks_header {
        background: var(--primary-color-L);
        color: var(--neutral-color-L);
        border: 2px double var(--secondary-color);

        height: calc(100% - 4px);
        text-align: center;
        align-self: center;
        align-content: center;
    }

    #tasks_header {
        grid-row: 2 / 3;

        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    #list {
        grid-row: 3 / 14;
        background: var(--neutral-color-L);

        height: 100%;
        width: 100%;
        max-width: 100%;
        overflow: auto;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        align-self: center;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
    }

    #list > p {
        font-size: 1.2rem;
    }

    .ListItem {
        height: 25%;
        width: calc(50% - 20px);
        max-width: calc(50% - 20px);
    }

    .ListItemActions {
        display: flex;
        flex-direction: column;
    }

    .ListItemActions > * {
        height: 30%;
        margin-bottom: 10%;
        font-size: 1.1rem;
    }

</style>
