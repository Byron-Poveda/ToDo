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
describe('test checkbox', () => {
  beforeEach(() => {
    // con este codigo funciona el uso de pinia con testing
    setActivePinia(createPinia());
  });
  it('btn checkbox test', async () => {
    const taskStore = useTaskStore();
    const wrapper = mount(formToDo);
    await wrapper.find('#idInput').setValue('123456');
    await wrapper.find('#idBtn').trigger('click');
    //aqui ya reviso en el array q esta en mi store
    expect(taskStore.tasks.length === 1 ? true : false).toBe(true);
    await wrapper.find('.tasks__item');
    if (wrapper.find('.tasks__item')) {
      wrapper.find('#idCheckbox').trigger('click');
      const checkboxVaribale = taskStore.checkbox;
      expect(checkboxVaribale.length === 1 ? true : false).toBe(true);
    }
  });
});
