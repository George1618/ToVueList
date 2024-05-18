<script setup lang="ts">
import {ref} from 'vue';

import strings from '@/assets/strings';
import { useTasksStore } from '@/store/tasks';
import TextButton from '@/components/TextButton.vue';

const { createTask } = useTasksStore();

const title = ref("");
const description = ref("");

// data atual
let now = new Date();
// ano, mês e dia da data atual (formato usado para input[type="date"]: yyyy-mm-dd)
let dateNow = now.toISOString().split("T")[0];
// horas e minutos da data atual (formato usado para input[type="time"]: hh:mm)
let timeNow = now.toTimeString().split(" ")[0].slice(0, -3);

const deadlineDate = ref(dateNow);
const deadlineTime = ref(timeNow);

const alreadyDone = ref(false);
const doneDate = ref<string | undefined>(undefined);
const doneTime = ref<string | undefined>(undefined);

// adiciona nova tarefa à lista
function addNewTask() {
    try {
        // primeiro valida os formatos dos valores dos inputs de Date e Time 
        // (apenas para criação: os números podem estar fora do intervalo de dia, mês, hora ou minuto)
        let datetimeFormat = new RegExp('\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}');
        // Data e hora de done e deadline no formato acima
        let deadlineDateTime = `${deadlineDate.value} ${deadlineTime.value}`;
        let doneDateTime = alreadyDone.value ? `${doneDate.value} ${doneTime.value}` : undefined
        if (datetimeFormat.test(deadlineDateTime)===false) {
            throw `${strings.dateTimeFormatError} (${deadlineDateTime})`
        }
        if (doneDateTime!==undefined && datetimeFormat.test(doneDateTime)===false ) {
            throw `${strings.dateTimeFormatError} (${doneDateTime})`
        }
        /* Depois da validação */
        // cria uma nova data com a timezone local usando o formato "yyyy-mm-dd hh:mm" da junção de Date com Time
        let deadline = new Date(deadlineDateTime);
        let done = doneDateTime ? new Date(doneDateTime) : undefined;
        // adiciona a nova tarefa com os valores calculados
        createTask(title.value, description.value, deadline.getTime(), done?.getTime());
        // navegar para a tela de tarefas
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

        <label for="nt_deadline_date">{{ strings.deadline }}</label>
        <input id="nt_deadline_date" type="date" v-model="deadlineDate"/>
        <input id="nt_deadline_time" type="time" step="60" v-model="deadlineTime"/>

        <label for="nt_already_done">{{ strings.already_done }}</label>
        <input id="nt_already_done" type="checkbox" v-model="alreadyDone" />
        
        <label v-if="alreadyDone" for="nt_done_date">{{ strings.done }}</label>
        <input v-if="alreadyDone" id="nt_done_date" type="date" v-model="doneDate"/>
        <input v-if="alreadyDone" id="nt_done_time" type="time" step="60" v-model="doneTime"/>

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
        grid-row: 14 / 15;
        
    }

    #nt {
        grid-row: 15 / 17;
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