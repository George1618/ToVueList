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
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div v-if="task===null">
        <h1>{{ strings.no_task }}</h1>
        <TextButton :text="strings.go_back" :click="goBack" />
    </div>
    <h1 id="task_header">{{  }}</h1>
    <form id="task" @submit.prevent>
        <label for="title">{{ strings.title }}</label>
        <input id="title" type="text" maxlength="255" v-model="title"/>

        <label for="desc">{{ strings.description }}</label>
        <textarea id="desc" maxlength="4096" v-model="description"></textarea>

        <label id="deadline_label">{{ strings.deadline }}</label>
        <DateTimeInput label-id="deadline_label" date-id="deadline_date" time-id="deadline_time"
            :date="deadlineDate" :time="deadlineTime" />
        
        <label for="done">{{ strings.is_done }}</label>
        <input id="done" type="checkbox" v-model="done" />

        <label id="done_label">{{ strings.done }}</label>
        <DateTimeInput label-id="done_label" date-id="done_date" time-id="done_time"
            :date="doneDate || ''" :time="doneTime || ''" />

        <TextButton :text="changed ? strings.save_changes : strings.go_back" :click="changed ? updateTask : goBack" />
    </form>
</template>

<style scoped>

</style>