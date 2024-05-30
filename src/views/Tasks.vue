<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import strings from '../assets/strings';

import ListItem from '../components/ListItem.vue';
import TextButton from '../components/TextButton.vue';

import { useTasksStore } from '@/store/tasks';

const tasksStore = useTasksStore();
const tasks = tasksStore.tasks;

// atualiza apenas o atributo "done" ("feito") de uma tarefa
function updateTaskDone(i: number, newDone: number | undefined) {
    tasksStore.updateTask(i, null, null, null, newDone );
}

// apaga uma tarefa
function deleteTask(i: number) {
    // de maneira old-school, faz uma pergunta de confirmação antes de apagar
    let confirmedDelete = confirm(strings.confirm_delete);
    if (confirmedDelete) tasksStore.deleteTask(i);
}

const router = useRouter();

// vai para a página própria da tarefa com índice i
function navToTask(i: number) {
    router.push(`${strings.task_route}/${i}`)
}

</script>

<template>
    <h2 id="tasks_header">{{ strings.tasks }}</h2>
    <p v-if="tasks.length===0" >{{ strings.no_tasks }}</p>
    <ul v-else id="list">
        <ListItem 
            v-for="(task, i) in tasks" 
                :title="task.title" :description="task.description" 
                :deadline="task.deadline" :done="task.done" 
                :onDone="(newDone: number | undefined) => updateTaskDone(i, newDone)"
            class="ListItem"
        >
            <div class="ListItemActions">
                <TextButton 
                    :text="strings.delete"
                    :click="() => deleteTask(i)" />
                <TextButton
                    :text="strings.view_task"
                    :click="() => navToTask(i)" />
            </div>
        </ListItem>
    </ul>
</template>

<style scoped>

    #tasks_header {
        background: var(--primary-color-L);
        color: var(--neutral-color-D);
        border: 2px double var(--secondary-color);

        height: calc(2rem - 4px);
        text-align: center;
        align-self: center;
        align-content: center;

        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    p {
        font-size: 1.2rem;
        height: calc(100% - 2rem);
        text-align: center;
        align-content: center;
    }

    #list {
        background: var(--neutral-color-L);

        height: calc(100% - 2rem);
        width: 100%;
        max-width: 100%;
        overflow: auto;

        display: flex;
        flex-direction: column;

        align-self: center;
        align-items: center;
    }

    .ListItem {
        height: 15%;
        width: calc(100% - 20px);
        margin-top: 5px;
    }

    .ListItemActions {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-content: space-between;
    }

    .ListItemActions > * {
        height: 50%;
        width: 100%;
        font-size: 1.1rem;
        text-overflow: ellipsis;
    }

</style>
