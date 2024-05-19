import { defineStore } from "pinia";
import { ref } from "vue";

export const useTasksStore = defineStore("Tasks", () => {
     // lista [] vazia de objetos do tipo {title, description, deadline, done}
    const tasks = ref(<{
        title: string, // título da tarefa, em texto simples
        description: string, // descrição da tarefa, em texto simples
        deadline: number, // prazo da tarefa, como uma timestamp numérica da data
        done?: number // data de conclusão da tarefa, como uma timestamp numérica da data
    }[]>[]);

    // retorna uma tarefa, ou null se não houver tarefa com o índice i dado
    function readTask(i: number) {
        return (i>=0 && i<tasks.value.length) ? 
            tasks.value[i]
        : null
    }

    // cria uma nova tarefa (done pode ser undefined para indicar que ainda não foi concluída, ou seja, done: false)
    function createTask(title: string, description: string, deadline: number, done?: number) {
        tasks.value.push({
            title, 
            description, 
            deadline, 
            done
        }
    )}

    // atualiza dados de uma tarefa (null é usado para não mudar o dado da tarefa e permitir que a string vazia "" possa ser uma mudança)
    function updateTask(
        i: number, 
        newTitle: string | null, 
        newDescription: string | null, 
        newDeadline: number | null, 
        newDone: number | undefined | null
    ) {
        let task = tasks.value[i]
        if (newTitle!==null) {task.title = newTitle}
        if (newDescription!==null) {task.description = newDescription}
        if (newDeadline!==null) {task.deadline = newDeadline}
        if (newDone!==null) {task.done = newDone}
        tasks.value.splice(i, 1, task)
    }
        
    // remove uma tarefa da lista tasks
    function deleteTask(i: number) {tasks.value.splice(i, 1);}

    return {tasks, createTask, readTask, updateTask, deleteTask}
})