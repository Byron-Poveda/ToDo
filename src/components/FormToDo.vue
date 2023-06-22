<template>
  <!-- Primer ToDo -->
  <div class="justify-center gap-4 flex-col flex">
    <div class="wrap flex items-center gap-4 flex-col">
      <h2
        class="title font-semibold text-white text-5xl font-serif text-center"
      >
        <!-- {{ taskStore.name }} use TaskStore -->
        ToDo
      </h2>
      <!-- Input con evento y v-model para poder usar su valor -->
      <input
        type="text"
        id="idInput"
        class="py-2 px-4 rounded-md w-full text-xl/8"
        v-model="inputValue"
        @keyup.enter="handleSubmit"
        placeholder="I need to... 🤔"
      />
      <!-- boton con evento q ejecuta la creacion de los item en la lista-->
      <div class="navegation flex gap-4">
        <button
          id="idBtn"
          type="button"
          @click="handleSubmit"
          class="btn bg-blue-200 py-4 px-5 rounded-md hover:bg-blue-400 duration-700"
        >
          <b>Add</b>
        </button>
        <button
          class="bg-cyan-100 py-2 px-3 rounded-md hover:bg-blue-200 duration-700"
          @click="filter = 'all'"
        >
          <p class="font-semibold">
            All Tasks <i class="ri-survey-fill ri-lg text-black"></i>
          </p>
        </button>
        <button
          class="bg-cyan-100 py-2 px-3 rounded-md hover:bg-blue-200 duration-700"
          @click="filter = 'favs'"
        >
          <p class="font-semibold">
            Favs Tasks <i class="ri-heart-fill ri-lg text-red-500"></i>
          </p>
        </button>
        <button
          class="bg-cyan-100 py-2 px-3 rounded-md hover:bg-blue-200 duration-700"
          @click="filter = 'checkbox'"
        >
          <p class="font-semibold">
            Checkbox Tasks <i class="ri-checkbox-line ri-lg text-blue-500"></i>
          </p>
        </button>
      </div>
    </div>
    <!-- lista donde se generaran las tareas -->
    <ul
      class="tasks__list gap-4 flex flex-col text-right"
      v-if="filter === 'all'"
    >
      <h2 class="text-white font-bold text-xl">
        You have {{ taskStore.countTotal }} task
      </h2>
      <!-- uso del componente importado (Coloca los item segun los elementos del array) y enviando props al archivo (ListToDo.vue) -->
      <li
        v-for="(task, index) in taskStore.tasks"
        :key="index"
        class="tasks__item bg-stone-900 rounded-md w-full h-12 relative items-center flex"
      >
        <ListToDo :task="task" />
      </li>
    </ul>
    <ul
      class="tasks__list gap-4 flex flex-col text-right"
      v-if="filter === 'favs'"
    >
      <h1 class="text-white font-bold text-xl">
        You have {{ taskStore.countFavs }}
        <span class="text-red-300">Favs</span> tasks
      </h1>
      <!-- uso del componente importado (Coloca los item segun los elementos del array) y enviando props al archivo (ListToDo.vue) -->
      <li
        v-for="(task, index) in taskStore.favs"
        :key="index"
        class="tasks__item bg-stone-900 rounded-md w-full h-12 relative items-center flex"
      >
        <ListToDo :task="task" />
      </li>
    </ul>
    <ul
      class="tasks__list gap-4 flex flex-col text-right"
      v-if="filter === 'checkbox'"
    >
      <h1 class="text-white font-bold text-xl">
        You have {{ taskStore.countCheckbox }}
        <span class="text-blue-500">Checkbox</span> tasks
      </h1>
      <!-- uso del componente importado (Coloca los item segun los elementos del array) y enviando props al archivo (ListToDo.vue) -->
      <li
        v-for="(task, index) in taskStore.checkbox"
        :key="index"
        class="tasks__item bg-stone-900 rounded-md w-full h-12 relative items-center flex"
      >
        <ListToDo :task="task" />
      </li>
    </ul>
  </div>
</template>

<script>
// Importacion de las libreria de notificaciones
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// importacion de cosas para el uso de vue
import { ref } from 'vue';
// Importacion de un componente
import ListToDo from './ListToDo.vue';
// import stores
import { useTaskStore } from '@/stores/TaskStore';
export default {
  // especie de return para el uso de los componentes en el template
  components: { ListToDo },
  setup() {
    const taskStore = useTaskStore();
    // variable q guarda la info del input
    let inputValue = ref('');
    // array donde se guarda los mensajes para la creacion de los li
    let filter = ref('all');
    let cont = ref(0);
    // funcion del boton
    const handleSubmit = async () => {
      // restricciones usando if y Notify
      if (inputValue.value.length <= 5) {
        Notify.failure('Please enter more than 5 characters!', {
          backOverlay: true,
          backOverlayColor: 'rgba(0,0,0,0.2)',
          timeout: 1000,
          pauseOnHover: false,
        });
        return;
      }
      if (inputValue.value.length >= 20) {
        return Notify.failure('Please enter less than 20 characters!', {
          backOverlay: true,
          backOverlayColor: 'rgba(0,0,0,0.2)',
          timeout: 1000,
          pauseOnHover: false,
        });
      }
      for (let id in taskStore.tasks) {
        if (inputValue.value === taskStore.tasks[id].title) {
          return Notify.warning('You already created this task', {
            backOverlay: true,
            backOverlayColor: 'rgba(0,0,0,0.2)',
            timeout: 1000,
            pauseOnHover: false,
          });
        }
      }
      // pusheando el valor del input al array taskArray
      await taskStore.addTask({
        title: inputValue.value,
        id: cont.value,
        idFav: false,
        idCheckbox: false,
      });
      // devolviendo el input a si estado natural
      inputValue.value = '';
      console.log(taskStore.tasks);
      return cont.value++;
    };
    // retorno de todas las varibales incluendo las funciones de flecha o normales
    return {
      inputValue,
      handleSubmit,
      taskStore,
      filter,
      cont,
    };
  },
};
</script>

<style lang="css" scoped></style>
