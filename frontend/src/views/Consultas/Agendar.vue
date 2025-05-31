<template>
  <v-container>
    <v-row>

      <v-col>
        <h1>Agendar Consulta</h1>
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
defineOptions({
  name: 'AgendarConsulta',
})
</script>