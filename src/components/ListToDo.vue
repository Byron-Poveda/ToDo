<template>
  <input
    type="text"
    class="task flex ml-10 h-12 py-2 items-center justify-between bg-transparent absolute text-white text-xl/8 font-semibold focus:outline-none border-transparent shadow-transparent"
    v-model="task.title"
    @keyup.enter="$refs.inputTask.blur()"
    ref="inputTask"
  />
  <div class="flex items-center w-full justify-between px-3">
    <div class="flex items-center gap-2">
      <button
        @click="taskStore.toggleCheckbox(task.id)"
        class="w-4 h-4 duration-700 flex items-center"
        id="idCheckbox"
        :style="`background-color:${
          task.idCheckbox === true ? 'rgb(23 68 688)' : 'white'
        }`"
      >
        <i class="ri-check-fill ri-1x text-white"></i>
      </button>
      <!-- mensaje q saca del array -->
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
          :style="`color:${task.idFav === true ? 'rgb(239 68 68)' : 'white'}`"
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
