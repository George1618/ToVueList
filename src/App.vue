<script setup lang="ts">
import { ref } from 'vue';

import strings from './assets/strings';

import ListItem from './components/ListItem.vue';
import TextButton from './components/TextButton.vue';

const tasks = ref(<{
    title: string, 
    description: string,
    done: boolean
}[]>[]); // lista [] vazia de objetos do tipo {title, description, done}

// para a criação de uma nova tarefa
const newTaskTitle = ref("");
const newTaskDescription = ref("");

function addNewTask() {tasks.value.push({
    title: newTaskTitle.value, description: newTaskDescription.value, done: false
})}

// para remover uma tarefa da lista tasks
function deleteTask(i: number) {tasks.value.splice(i, 1);}

// para atualizar o done de uma tarefa
function updateTaskDone(i: number) {
    tasks.value[i].done = !tasks.value[i].done
    // const {title, description, done} = tasks.value[i];
    // tasks.value.splice(i, 1, {title: title, description: description, done: !done});
}

</script>

<template>
    <h1>To Vue List</h1>
    <label for="list">{{ strings.tasks }}</label>
    <ul id="list">
        <p v-if="tasks.length===0" >{{ strings.no_tasks }}</p>
        <ListItem v-else 
            v-for="(task, i) in tasks" 
                :title="task.title" :description="task.description" :done="task.done" 
        >
            <div class="TaskActions">
                <TextButton 
                    :text="task.done? strings.mark_undone : strings.mark_done" 
                    :click="() => updateTaskDone(i)" />
                <TextButton 
                    :text="strings.delete" 
                    :click="() => deleteTask(i)" />
            </div>
        </ListItem>
    </ul>
    <label for="new_task">{{ strings.new_task }}</label>
    <form id="new_task" @submit.prevent>
        <label for="new_task_title">
            {{ strings.title }}
            <input id="new_task_title" type="text" maxlength="255" v-model="newTaskTitle"/>
        </label>
        <label for="new_task_desc">
            {{ strings.desc }}
            <textarea id="new_task_desc" maxlength="4096" v-model="newTaskDescription"></textarea>
        </label>
        <TextButton :text="strings.add" :click="addNewTask" />
    </form>
</template>

<style scoped>
    h1 {
        grid-row: 1 / 2;
        grid-column: 1 / 13;
        background: var(--primary-color-D);
        color: var(--neutral-color-L);

        text-align: center;
        align-self: center;
    }

    label[for="list"] {
        grid-row: 2 / 3;
        grid-column: 1 / 9;
        background: var(--neutral-color-D);
        color: var(--primary-color-L);
    }

    #list {
        grid-row: 3 / 13;
        grid-column: 1 / 9;
        background: var(--neutral-color-L);

        display: flex;
        flex-direction: column;
    }

    label[for="new_task"] {
        grid-row: 2 / 3;
        grid-column: 9 / 13;
        background: var(--secondary-color);
    }

    #new_task {
        grid-row: 3 / 13;
        grid-column: 9 / 13;
        background: var(--neutral-color-D);
    }
</style>
