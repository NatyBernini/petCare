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

<script>
export default {
  name: 'ConsultaList',
  data() {
    return {
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Idade', value: 'idade' },
        { text: 'Espécie', value: 'especie' },
      ],
      pacientes: [
        { nome: 'Rex', idade: 5, especie: 'Cachorro' },
        { nome: 'Mimi', idade: 3, especie: 'Gato' },
        { nome: 'Lola', idade: 2, especie: 'Coelho' },
      ],
    }
  },
}
</script>
