import {
  describe,
  it,
  expect,
  beforeEach /*importo beforEach para el uso de pinia con testing*/,
} from 'vitest';
import formToDo from '@/components/FormToDo.vue';
import { setActivePinia, createPinia } from 'pinia'; //para q funcione el codigo para usar pinia con testing
import { useTaskStore } from '@/stores/TaskStore.js';
import { mount } from '@vue/test-utils';

describe('Test ToDo', () => {
  beforeEach(() => {
    // con este codigo activo pinia con testing
    setActivePinia(createPinia());
  });
  it('notify verify test ', async () => {
    // asigno una varibale al uso de mi store
    const taskStore = useTaskStore();
    const wrapper = mount(formToDo);
    // busco el input e ingreso un valor
    await wrapper.find('#idInput').setValue('12345');
    // le doy click al btn
    await wrapper.find('#idBtn').trigger('click');
     //aqui ya reviso en el array q esta en mi store y verifico si pasa o no pasa el valor del input q ingrese
    expect(taskStore.tasks.length === 1 ? true : false).toBe(false);
  });
});
