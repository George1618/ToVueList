<script setup lang="ts">

import strings from '@/assets/strings';
import DateTimeInput from '@/components/DateTimeInput.vue';
import TextButton from '@/components/TextButton.vue';

import { useTasksStore } from '@/store/tasks';
import Datetime from '@/utils/datetime';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const i : number = parseInt((route.params as {id: string}).id);

const tasksStore = useTasksStore();
const task = tasksStore.readTask(i);

// volta à tela inicial
function goBack() {
    // verifica se a rota passada é a inicial (com as tasks)
    if (router.options.history.state.back===strings.tasks_route) {
        router.back(); // volta no histórico sem aumentar a pilha de navegação
    } else { // a rota passada não é a inicial
        router.push(strings.tasks_route); // vai para a tela inicial
    }
}

// salvando os dados da tarefa entregues no início
const ogTitle = task?.title || "";
const ogDescription = task?.description || "";
const ogDeadline = task===null ? new Date() : new Date(task.deadline)
const ogDeadlineDate = Datetime.yyyymmdd(ogDeadline)
const ogDeadlineTime = Datetime.hhmm(ogDeadline)
const ogDone = task===null ? new Date() : (task.done ? new Date(task.done) : undefined)
const ogDoneDate = ogDone && Datetime.yyyymmdd(ogDone)
const ogDoneTime = ogDone && Datetime.hhmm(ogDone)

// associados a possíveis mudanças para alterações
const title = ref(ogTitle);
const description = ref(ogDescription);
const deadlineDate = ref(ogDeadlineDate);
const deadlineTime = ref(ogDeadlineTime);
const done = ref(ogDone!==undefined);
const doneDate = ref(ogDoneDate);
const doneTime = ref(ogDoneTime);

// verifica se há mudança(s) em algum(ns) valor(es)
const changed = computed(()  => 
    title.value!==ogTitle ||
    description.value!==ogDescription ||
    deadlineDate.value!==ogDeadlineDate ||
    deadlineTime.value!==ogDeadlineTime ||
    done.value!==(ogDone!==undefined) ||
    doneDate.value!==ogDoneDate ||
    doneTime.value!==ogDoneTime 
);

// atualiza a tarefa
function updateTask() {
    try {
        // obtém os valores novos
        let uTitle = title.value,
            uDescription = description.value,
            uDeadline = Datetime.toDate(deadlineDate.value, deadlineTime.value)?.getTime() || null,
            uDone = (done.value) ?
                    ((doneDate.value!==undefined && doneTime.value!==undefined) ? 
                        Datetime.toDate(doneDate.value, doneTime.value)?.getTime() || null
                    : undefined)
                : undefined
        // valida as datas do prazo e do feito
        if (uDeadline===null) {
            throw `${strings.dateTimeFormatError} (@${strings.deadline})`;
        }
        if (uDone===null) {
            throw `${strings.dateTimeFormatError} (@${strings.done})`;
        }
        // faz a atualização sem sair da tela
        tasksStore.updateTask(i, uTitle, uDescription, uDeadline, uDone);
        // pergunta se volta à tela inicial
        let confirmNav = confirm(strings.go_back+strings.question_mark);
        if (confirmNav) router.push(strings.tasks_route);
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div id="no_task" v-if="task===null">
        <h1>{{ strings.no_task }}</h1>
        <TextButton :text="strings.go_back" :click="goBack" />
    </div>
    <h1 v-else id="task_header">{{ title }}</h1>
    <form v-else id="task" @submit.prevent>
        <label for="title">{{ strings.title }}</label>
        <input id="title" type="text" maxlength="255" v-model="title"/>

        <label for="desc">{{ strings.description }}</label>
        <textarea id="desc" maxlength="4096" v-model="description"></textarea>

        <label id="deadline_label">{{ strings.deadline }}</label>
        <DateTimeInput label-id="deadline_label" date-id="deadline_date" time-id="deadline_time"
            :date="deadlineDate" @update-date="(date) => {deadlineDate = date;}"
            :time="deadlineTime" @update-time="(time) => {deadlineTime = time;}" />
        
        <label for="done">{{ strings.is_done }}</label>
        <input id="done" type="checkbox" v-model="done" />

        <label id="done_label">{{ strings.done }}</label>
        <DateTimeInput label-id="done_label" date-id="done_date" time-id="done_time"
            :date="doneDate || ''" @update-date="(date) => {doneDate = date;}"
            :time="doneTime || ''" @update-time="(time) => {doneTime = time;}" />

        <TextButton :text="changed ? strings.save_changes : strings.go_back" :click="changed ? updateTask : goBack" />
    </form>
</template>

<style scoped>
    #no_task {
        background: var(--neutral-color-D);
        height: 100%;
        width: 100%;
    }
    #no_task > h1, #no_task > button {
        height: 50%;
        width: 100%;
        text-align: center;
        align-content: center;
        align-self: center;
    }
    #no_task > button {
        display: block;
        margin: 0 auto;
        font-size: 1rem;
        height: 2rem;
        width: 50%;
    }

    #task_header {
        background: var(--primary-color-L);
        color: var(--neutral-color-L);

        border: 2px double var(--secondary-color);

        height: calc(2.5rem - 4px);
        width: calc(100% - 4px);
        text-align: center;
        align-content: center;
    }

    #task {
        height: calc(100% - 2.5rem);
        width: 100%;
        background: var(--primary-color-D);
        color: var(--neutral-color-L);

        overflow: hidden;
        display: grid;
        grid-template-areas:    "ltit itit itit itit itit itit"
                                "ldsc idsc idsc idsc idsc idsc"
                                "lddl iddd iddt .    .    .   "
                                "idon ldon .    ldnl idnd idnt"
                                ".    .    .    .    .    .   "
                                ".    bt   bt   bt   bt   .   ";
    }
    /**  l___ ou ___l: label; i___: input; 
        tit: title; dsc: desc; dd_: deadline; don: done (checkbox); dn_: done; 
        ___d: date; ___t: time. */
    label[for="title"]           {grid-area: ltit;}
    #title                       {grid-area: itit;}
    label[for="desc"]            {grid-area: ldsc;}
    #desc                        {grid-area: idsc;}
    #deadline_label              {grid-area: lddl;}
    #task :deep(#deadline_date)  {grid-area: iddd;}
    #task :deep(#deadline_time)  {grid-area: iddt;}
    label[for="done"]            {grid-area: ldon;}
    #done                        {grid-area: idon;}
    #done_label                  {grid-area: ldnl;}
    #task :deep(#done_date)      {grid-area: idnd;}
    #task :deep(#done_time)      {grid-area: idnt;}
    #task > button               {grid-area: bt;}

    #task > * {
        height: 3rem;
        max-width: 100%;
    }

    #task label {
        display: block;
        font-size: 1.1rem;
        text-align: center;
        align-content: center;
        border-bottom: 1px solid var(--neutral-color-D);
    }

    #task label[for="already_done"] {
        text-align: start;
    }

    #task input, #task textarea {
        font-size: 1.1rem;
        width: 95%;
        background: var(--neutral-color-L);
    }

    #desc, #task label[for="desc"] {
        height: 9rem;
    }

    #task button {
        font-size: 1.1rem;
        color: var(--neutral-color-D);
        border-radius: 2%;
    }
</style>