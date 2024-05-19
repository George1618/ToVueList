<script setup lang="ts">
import {ref} from 'vue';

import strings from '@/assets/strings';
import { useTasksStore } from '@/store/tasks';
import TextButton from '@/components/TextButton.vue';
import { useRouter } from 'vue-router';
import DateTimeInput from '@/components/DateTimeInput.vue';
import Datetime from '@/utils/datetime';

const router = useRouter();
const { createTask } = useTasksStore();

const title = ref("");
const description = ref("");

// data atual
let now = new Date();
// ano, mês e dia da data atual (formato usado para input[type="date"]: yyyy-mm-dd)
let dateNow = Datetime.yyyymmdd(now);
// horas e minutos da data atual (formato usado para input[type="time"]: hh:mm)
let timeNow = Datetime.hhmm(now);

const deadlineDate = ref(dateNow);
const deadlineTime = ref(timeNow);

const alreadyDone = ref(false);
const doneDate = ref<string | undefined>(undefined);
const doneTime = ref<string | undefined>(undefined);

// adiciona nova tarefa à lista
function addNewTask() {
    try {
        // primeiro valida os formatos dos valores dos inputs de Date e Time 
        let deadlineDateTime = Datetime.toDate(deadlineDate.value, deadlineTime.value);
        if (deadlineDateTime===null) {
            throw `${strings.dateTimeFormatError} (@${strings.deadline})`
        }
        let doneDateTime = Datetime.toDate(doneDate.value || '', doneTime.value || '');
        if (alreadyDone.value && doneDateTime===null) {
            throw `${strings.dateTimeFormatError} (@${strings.done})`
        }
        // adiciona a nova tarefa com os valores calculados
        createTask(title.value, description.value, deadlineDateTime.getTime(), doneDateTime?.getTime());
        // navega para a tela de tarefas
        router.push(strings.tasks_route)
    }
    catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <h2 id="nt_header">{{ strings.new_task }}</h2>
    <form id="nt" @submit.prevent>
        <label for="nt_title">{{ strings.title }}</label>
        <input id="nt_title" type="text" maxlength="255" v-model="title"/>

        <label for="nt_desc">{{ strings.description }}</label>
        <textarea id="nt_desc" maxlength="4096" v-model="description"></textarea>

        <label id="nt_deadline_label">{{ strings.deadline }}</label>
        <DateTimeInput label-id="nt_deadline_label" date-id="nt_deadline_date" time-id="nt_deadline_time"
            :date="deadlineDate" :time="deadlineTime" />

        <label for="nt_already_done">{{ strings.already_done }}</label>
        <input id="nt_already_done" type="checkbox" v-model="alreadyDone" />
        
        <label v-if="alreadyDone" id="nt_done_label">{{ strings.done }}</label>
        <DateTimeInput v-if="alreadyDone" label-id="nt_done_label" date-id="nt_done_date" time-id="nt_done_time"
            :date="doneDate || ''" :time="doneTime || ''" />

        <TextButton :text="strings.add" :click="addNewTask" />
    </form>
</template>

<style scoped>
    #nt_header {
        background: var(--primary-color-L);
        color: var(--neutral-color-L);

        border: 2px double var(--secondary-color);
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;

        height: calc(100% - 4px);
        text-align: center;
        align-self: center;
        align-content: center;
    }
    
    #nt_header {
        grid-row: 1 / 3;
        
    }

    #nt {
        grid-row: 3 / 17;
        background: var(--primary-color-D);
        color: var(--neutral-color-L);

        display: grid;
        grid-template-columns: 1fr 3fr 1fr 3fr 2fr;
    }

    #nt > * {
        align-self: center;
        justify-self: center;
    }

    #nt label {
        font-size: 1.1rem;
        text-align: center;
    }

    #nt input, #nt textarea {
        font-size: 1.1rem;
        height: 80%;
        width: 90%;
    }

    #nt button {
        font-size: 1.1rem;
        color: var(--neutral-color-D);
        height: 50%;
        width: 50%;
    }
</style>