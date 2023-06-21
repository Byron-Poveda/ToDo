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
    // con este codigo funciona el uso de pinia con testing
    setActivePinia(createPinia());
  });
  it('btn favs test', async () => {
    const taskStore = useTaskStore();
    const wrapper = mount(formToDo);
    await wrapper.find('#idInput').setValue('123456');
    await wrapper.find('#idBtn').trigger('click');
    //aqui ya reviso en el array q esta en mi store
    expect(taskStore.tasks.length === 1 ? true : false).toBe(true);
    await wrapper.find('.tasks__item');
    if (wrapper.find('.tasks__item')) {
      wrapper.find('#idBtnFavs').trigger('click');
      const favsVaribale = taskStore.favs;
      expect(favsVaribale.length === 1 ? true : false).toBe(true);
    }
  });
});
