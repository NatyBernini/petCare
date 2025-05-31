<template>
  <v-container>
    <v-row>

      <v-col>
        <h1>Adoções</h1>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'AdocaoList',
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
