import { defineStore } from 'pinia';

export const useTaskStore = defineStore('TaskStore', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(task) {
      // la tarea q llega la pushea al array de state.tasks (this.tasks)
      return this.tasks.push(task);
    },
    delete(id) {
      this.tasks = this.tasks.filter((t) => {
        // filtro y asigno un nuveo valor al array de state.tasks y filtro todas las q sean distinta al id q llego
        return (this.tasks = t.id !== id);
      });
    },
    toggleFav(id) {
      let task = this.tasks.find((t) => t.id === id);
      // busco la tarea segin el id q llegue y si esta isFav === true lo cambio a isFav === false o alreves
      task.isFav = !task.isFav;
    },
  },
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
      // filtro todas las tenga isFav === true del array state.tasks
    },
    countFavs() {
      return this.tasks.reduce((p, c) => {
        // sumo a 0 todas los elemento del array de state.tasks q tenga isFav === true
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    countTotal: (state) => {
      // cuento todas las tarea con un .length en mi array de state.tasks 
      return state.tasks.length;
    },
  },
});
