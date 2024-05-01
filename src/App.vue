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
    <h1 id="header">To Vue List</h1>
    <h2 id="tasks_header">{{ strings.tasks }}</h2>
    <ul id="list">
        <p v-if="tasks.length===0" >{{ strings.no_tasks }}</p>
        <ListItem v-else 
            v-for="(task, i) in tasks" 
                :title="task.title" :description="task.description" :done="task.done" 
            class="ListItem"
        >
            <div class="ListItemActions">
                <TextButton 
                    :text="task.done? strings.mark_undone : strings.mark_done" 
                    :click="() => updateTaskDone(i)" />
                <TextButton 
                    :text="strings.delete" 
                    :click="() => deleteTask(i)" />
            </div>
        </ListItem>
    </ul>
    <h2 id="new_task_header">{{ strings.new_task }}</h2>
    <form id="new_task" @submit.prevent>
        <label for="new_task_title">{{ strings.title }}</label>
        <input id="new_task_title" type="text" maxlength="255" v-model="newTaskTitle"/>
        <label for="new_task_desc">{{ strings.desc }}</label>
        <textarea id="new_task_desc" maxlength="4096" v-model="newTaskDescription"></textarea>
        <TextButton :text="strings.add" :click="addNewTask" />
    </form>
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

    #tasks_header, #new_task_header {
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

    #new_task_header {
        grid-row: 14 / 15;
        
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }

    #new_task {
        grid-row: 15 / 17;
        background: var(--primary-color-D);
        color: var(--neutral-color-L);

        display: grid;
        grid-template-columns: 1fr 3fr 1fr 3fr 2fr;
    }

    #new_task > * {
        align-self: center;
        justify-self: center;
    }

    #new_task label {
        font-size: 1.1rem;
        text-align: center;
    }

    #new_task input, #new_task textarea {
        font-size: 1.1rem;
        height: 80%;
        width: 90%;
    }

    #new_task button {
        font-size: 1.1rem;
        color: var(--neutral-color-D);
        height: 50%;
        width: 50%;
    }
</style>
