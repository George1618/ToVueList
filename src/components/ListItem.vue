<script setup lang="ts">
    import strings from '@/assets/strings';
import Datetime from '@/utils/datetime';

    const props = defineProps<{
        title: string,
        description: string,
        deadline: number,
        done: number | undefined,
        onDone: (done: number | undefined) => void
    }>();

    // como as classes estão listadas no css daqui, e tanto id como class não ficam em strings.ts, lista-se as classes de cor abaixo
    const classUndone = "Undone";
    const classAhead = "Ahead";
    const classOnTime = "OnTime";
    const classLate = "Late";

    // retorna uma classe que muda a cor da tarefa com base no período de conclusão em relação ao prazo
    function deadlineClass() {
        let colorClass = classUndone; // se a tarefa não foi concluída, mantém a cor de Undone
        // se a tarefa foi concluída:
        if (props.done!==undefined) { 
            let done = new Date(props.done);
            let deadline = new Date(props.deadline);
            // checa se prazo e data de conclusão estão próximos
            let doneMonth = done.getMonth(), deadlineMonth = deadline.getMonth();
            let doneYear = done.getFullYear(), deadlineYear = deadline.getFullYear();
            if (doneMonth===deadlineMonth && doneYear===deadlineYear) { // mesmo mês, mesmo ano
                let doneDay = done.getDate(), deadlineDay = deadline.getDate();
                if (doneDay===deadlineDay) { // concluída no mesmo dia do prazo
                    colorClass = classOnTime;
                    // com a introdução de horário no prazo e na conclusão, faz verificação de atraso (apenas)
                    let doneHours = done.getHours(), deadlineHours = deadline.getHours();
                    if (doneHours===deadlineHours) { // mesma hora
                        let doneMinutes = done.getMinutes(), deadlineMinutes = deadline.getMinutes();
                        if (doneMinutes > deadlineMinutes) { // atraso de 1 minuto ou mais
                            colorClass = classLate;
                        }
                    } else if (doneHours > deadlineHours) { // atraso de 1 hora ou mais
                        colorClass = classLate
                    }
                } else if (doneDay > deadlineDay) { // concluída depois
                    colorClass = classLate;
                } else { // concluída antes
                    colorClass = classAhead;
                }
            } else { // estando em mês ou ano diferentes, verifica quem é depois de quem
                if (doneYear > deadlineYear) { // concluída depois do prazo
                    colorClass = classLate
                } else if (doneYear < deadlineYear) { // concluída antes
                    colorClass = classAhead
                } else { // mesmo ano, então a diferença é nos meses
                    if (doneMonth > deadlineMonth) { // concluída depois
                        colorClass = classLate
                    } else if (doneMonth < deadlineMonth) { // concluída antes
                        colorClass = classAhead
                    }
                }
            }
        }
        return colorClass;
    }

    // verifica se o usuário marcou ou desmarcou; 
    // no 1º caso, salva como done a data e hora atual; 
    // no 2º caso, remove a data de done
    function doneCheck(event: Event) {
        if ((event.target as HTMLInputElement).checked) {
            props.onDone(new Date().getTime())
        } else {
            props.onDone(undefined)
        }
    }

    // mostra o prazo, e se houver, a data de conclusão
    function datesText(deadlineValue: number, doneValue: number | undefined) {
        let deadlineDate = new Date(deadlineValue);
        let text = strings.deadline+strings.spacing_colon+Datetime.toDateString(deadlineDate);
        if (doneValue!==undefined) {
            let doneDate = new Date(doneValue);
            text = text+strings.spacing_semicolon+strings.done+strings.spacing_colon+Datetime.toDateString(doneDate);
        }
        return text;
    }
</script>

<template>
    <li :class="deadlineClass()">
        <input type="checkbox" class="ItemDone" :checked="done!==undefined" @change="doneCheck" />
        <div class="ItemInfo">
            <h2 class="ItemTitle" v-if="!props.title">{{ strings.no_title }}</h2>
            <h2 class="ItemTitle" v-else>{{ props.title }}</h2>
            <p class="ItemDescription" v-if="!props.description">{{ strings.no_desc }}</p>
            <p class="ItemDescription" v-else>{{ props.description }}</p>
            <p class="ItemDates">{{ datesText(deadline, done) }}</p>
        </div>
        <slot></slot>
    </li>
</template>

<style scoped>
    li {
        background-color: var(--neutral-color-D);
        color: var(--primary-color-D);

        border: 0.2rem solid var(--primary-color-L);
        list-style: none;

        display: flex;
        text-align: center;
        justify-items: center;
        align-items: center;
    }
    li.Undone {
        border-color: var(--primary-color-L);
    }
    li.Ahead {
        border-color: var(--task-color-green);
    }
    li.OnTime {
        border-color: var(--task-color-yellow);
    }
    li.Late {
        border-color: var(--task-color-red);
    }

    .ItemInfo {
        height: 100%;
        width: 85%;
    }

    .ItemDone {
        width: 5%;
        height: 50%;
        font-size: 25px;
        cursor: pointer;
    }

    .ItemTitle {
        height: 1.7rem;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-bottom: 1px solid var(--secondary-color);
    }

    .ItemDescription {
        height: calc(100% - 3rem - 10px);
        width: 100%;
        overflow: hidden;
        white-space: normal;
        word-break: break-all;
        text-overflow: ellipsis;
        margin: 5px 0;
    }

    .ItemDates {
        height: 1.3rem;
        font-size: 1.1rem;
        border-top: 1px solid var(--secondary-color);
    }

    li > *:last-child {
        width: 10%;
    }

    @media screen and (max-width: 800px) {
        .ItemDone {
            width: 10%;
        }
        .ItemInfo {
            width: 70%;
        }
        .ItemTitle {
            font-size: 1rem;
            height: 1.2rem;
        }
        .ItemDescription {
            width: 100%;
            height: calc(100% - 2rem - 10px);
        }
        .ItemDates {
            height: 0.8rem;
            font-size: 0.5rem;
        }
        li > *:last-child {
            width: 20%;
        }
        li > *:last-child * {
            font-size: 0.9rem;
        }
    }
</style>