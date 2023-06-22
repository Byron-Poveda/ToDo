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
      // busco la tarea segin el id q llegue y si esta idFav === true lo cambio a idFav === false o alreves
      task.idFav = !task.idFav;
      return;
    },
    toggleCheckbox(id) {
      let task = this.tasks.find((t) => t.id === id);
      // busco la tarea segin el id q llegue y si esta idCheckbox === true lo cambio a idCheckbox === false o alreves
      task.idCheckbox = !task.idCheckbox;
      return;
    },
    observeTasks(onChange) {
      return new Proxy(this.tasks, {
        set(target, property, value) {
          target[property] = value;
          onChange(this.tasks);
          return true;
        },
      });
    },
  },
  getters: {
    favs() {
      return this.tasks.filter((t) => t.idFav);
      // filtro todas las tenga idFav === true del array state.tasks
    },
    countFavs() {
      return this.tasks.reduce((p, c) => {
        // sumo a 0 todas los elemento del array de state.tasks q tenga idFav === true
        return c.idFav ? p + 1 : p;
      }, 0);
    },
    checkbox() {
      return this.tasks.filter((t) => t.idCheckbox);
      // filtro todas las tenga idFav === true del array state.tasks
    },
    countCheckbox() {
      return this.tasks.reduce((p, c) => {
        // sumo a 0 todas los elemento del array de state.tasks q tenga idFav === true
        return c.idCheckbox ? p + 1 : p;
      }, 0);
    },
    countTotal: (state) => {
      // cuento todas las tarea con un .length en mi array de state.tasks
      return state.tasks.length;
    },
  },
});
