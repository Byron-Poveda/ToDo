// importando cosas para q funcionen ciertas funciones de vue
import {
  describe,
  it,
  expect,
  beforeEach /*importo beforEach para el uso de pinia con testing*/,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'; //para q funcione el codigo para usar pinia con testing
// importando los componentes para realizar el test
import App from '@/App.vue';
import FormToDo from '../FormToDo.vue';
// inicializando el test con describe
describe('App.vue', () => {
  beforeEach(() => {
    // con este codigo funciona el uso de pinia con testing
    setActivePinia(createPinia());
  });
  // primer test (viendo si existen estos 2 componentes en App.vue)
  it('See if the components are well linked', () => {
    const wrapper = mount(App);
    expect(wrapper.exists('FormToDo')).toBe(true);
  });
  // segundo test viendo si al dar click aumenta los elementos li en el ul
  it('test button click and add li', async () => {
    // wrapper es mi App
    const wrapper = mount(App);
    // busco el input de mi app y le coloco un valor
    await wrapper.find('#idInput').setValue('Task 1');
    // automatizo el evento click del btn
    await wrapper.findComponent(FormToDo).find('#idBtn').trigger('click');
    // busco el componente FormToDo
    const liElements = wrapper.findComponent(FormToDo);
    // reviso si en el ul se creo el li
    expect(liElements.findAll('ul li').length === 1 ? true : false).toBe(true);
  });
});
