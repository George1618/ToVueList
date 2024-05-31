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
            :date="deadlineDate" @updateDate="(date) => {deadlineDate=date}" 
            :time="deadlineTime" @updateTime="(time) => {deadlineTime=time}" />

        <input id="nt_already_done" type="checkbox" v-model="alreadyDone" />
        <label for="nt_already_done">{{ strings.already_done }}</label>
        
        <label v-if="alreadyDone" id="nt_done_label">{{ strings.done }}</label>
        <DateTimeInput v-if="alreadyDone" label-id="nt_done_label" date-id="nt_done_date" time-id="nt_done_time"
            :date="doneDate || ''" @updateDate="(date) => {doneDate=date}"
            :time="doneTime || ''" @updateTime="(time) => {doneTime=time}" />

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

        height: calc(2rem - 4px);
        width: calc(100% - 4px);
        text-align: center;
        align-content: center;
    }

    #nt {
        height: calc(100% - 2rem);
        width: 100%;
        background: var(--primary-color-D);
        color: var(--neutral-color-L);

        overflow: hidden;
        display: grid;
        grid-template-areas:    "ltit itit itit itit itit itit"
                                "ldsc idsc idsc idsc idsc idsc"
                                "lddl iddd iddt .    .    .   "
                                "iald lald .    ldnl idnd idnt"
                                ".    .    .    .    .    .   "
                                ".    bt   bt   bt   bt   .   ";
    }
    /**  l___ ou ___l: label; i___: input; 
        tit: title; dsc: desc; dd_: deadline; ald: already_done; dn_: done; 
        ___d: date; ___t: time. */
    label[for="nt_title"]           {grid-area: ltit;}
    #nt_title                       {grid-area: itit;}
    label[for="nt_desc"]            {grid-area: ldsc;}
    #nt_desc                        {grid-area: idsc;}
    #nt_deadline_label              {grid-area: lddl;}
    #nt :deep(#nt_deadline_date)    {grid-area: iddd;}
    #nt :deep(#nt_deadline_time)    {grid-area: iddt;}
    label[for="nt_already_done"]    {grid-area: lald;}
    #nt_already_done                {grid-area: iald;}
    #nt_done_label                  {grid-area: ldnl;}
    #nt :deep(#nt_done_date)        {grid-area: idnd;}
    #nt :deep(#nt_done_time)        {grid-area: idnt;}
    #nt > button                    {grid-area: bt;}

    #nt > * {
        height: 3rem;
        max-width: 100%;
    }

    #nt label {
        display: block;
        font-size: 1.1rem;
        text-align: center;
        align-content: center;
        border-bottom: 1px solid var(--neutral-color-D);
    }

    #nt label[for="nt_already_done"] {
        text-align: start;
    }

    #nt input, #nt textarea {
        font-size: 1.1rem;
        width: 95%;
        background: var(--neutral-color-L);
    }

    #nt_desc, #nt label[for="nt_desc"] {
        height: 9rem;
    }

    #nt button {
        font-size: 1.1rem;
        color: var(--neutral-color-D);
        border-radius: 2%;
    }
</style>