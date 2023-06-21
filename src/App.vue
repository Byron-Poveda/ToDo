<template>
  <div class="container-ToDo flex gap-20 justify-center flex-wrap">
    <FormToDo />
  </div>
</template>

<script>
import FormToDo from '@/components/FormToDo.vue';
export default {
  components: {
    // llamado para uso de los componentes (especie de return)
    FormToDo,
  },
};
</script>

<style lang="css" scoped></style>
