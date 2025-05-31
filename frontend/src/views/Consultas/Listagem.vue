<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Listagem de Consultas</h1>
        <v-data-table
          :headers="headers"
          :items="pacientes"
          class="elevation-1"
        >
          <template #item.nome="{ item }">
            {{ item.nome }}
          </template>
          <template #item.idade="{ item }">
            {{ item.idade }} anos
          </template>
          <template #item.especie="{ item }">
            {{ item.especie }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'ConsultaList',
})

const headers = ref([
  { text: 'Nome', value: 'nome' },
  { text: 'Idade', value: 'idade' },
  { text: 'Espécie', value: 'especie' },
])

const pacientes = ref([
  { nome: 'Rex', idade: 5, especie: 'Cachorro' },
  { nome: 'Mimi', idade: 3, especie: 'Gato' },
  { nome: 'Lola', idade: 2, especie: 'Coelho' },
])
</script>
