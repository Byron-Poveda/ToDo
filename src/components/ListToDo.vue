<template>
  <div class="task flex w-full h-12 py-2 px-2 items-center justify-between">
    <div class="flex gap-2 items-center">
      <input type="checkbox" class="task__checkbox w-4 h-4" />
      <!-- mensaje q saca del array -->
      <p class="task__description text-white text-xl/8 font-semibold">
        {{ task.title }}
      </p>
    </div>
    <!-- boton q toma el index del elemento al q se la da click y se la pasa a la funcion verify -->
    <nav>
      <button
        type="button"
        id="idBtnDelete"
        class="task__btn mr-2"
        @click="taskStore.delete(task.id)"
      >
        <i
          class="ri-delete-bin-line ri-lg task__delete duration-700 text-white hover:text-blue-500"
        ></i>
      </button>
      <button @click="taskStore.toggleFav(task.id)" id="idBtnFavs">
        <i
          :style="`color:${task.isFav === true ? 'rgb(239 68 68)' : 'white'}`"
          class="ri-heart-fill ri-lg duration-500"
        ></i>
      </button>
    </nav>
  </div>
</template>

<script>
import { useTaskStore } from '@/stores/TaskStore';
export default {
  // aceptando los props enviados por FormToDo
  setup() {
    const taskStore = useTaskStore();
    return {
      taskStore,
    };
  },
  props: ['task'],
};
</script>

<style lang="css" scoped></style>
