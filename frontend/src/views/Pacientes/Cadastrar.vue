<template>
  <v-card>
    <p class="title-page">Cadastro do Paciente 
              <img src="/./src/assets/icons/iconLapisCadastro.png" alt="Ícone" class="menu-title-icon" /></p>
    <v-tabs
      v-model="tab"
    >
      <v-tab value="one">Informações do Paciente</v-tab>
      <v-tab value="two">Proprietário/Responsável</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
           <form @submit.prevent="submit">
                <v-radio-group inline>
                  <v-radio label="Doméstico" value="domestico"></v-radio>
                  <v-radio label="Resgatado" value="resgatado"></v-radio>
                </v-radio-group>

                <p>Espécie</p>
                  <v-radio-group inline>
                  <v-radio label="Can" value="especieCan"></v-radio>
                  <v-radio label="Fel" value="especieFel"></v-radio>
                  <v-radio label="Outra" value="especieOutra"></v-radio>
                </v-radio-group>

                
                <p>Informações Básicas</p>
                <v-col>
                <v-row class="row-info-basicas">
                <v-text-field
                v-model="name.value.value"
                :counter="10"
                :error-messages="name.errorMessage.value"
                label="Nome"
                max-width="300px"
                ></v-text-field>

                <v-text-field
                v-model="phone.value.value"
                :counter="7"
                :error-messages="phone.errorMessage.value"
                label="Idade"
                max-width="150px"
                ></v-text-field>
                </v-row>
                <v-row class="row-info-basicas">
                <v-text-field
                v-model="peso.value.value"
                :error-messages="peso.errorMessage.value"
                label="Peso"
                max-width="150px"
                ></v-text-field>

                   <v-text-field
                v-model="raca.value.value"
                :error-messages="raca.errorMessage.value"
                label="Raça"
                max-width="300px"
                ></v-text-field>

                
                   <v-text-field
                v-model="pelagem.value.value"
                :error-messages="pelagem.errorMessage.value"
                label="Pelagem"
                max-width="300px"
                ></v-text-field>
                </v-row>
              </v-col>
                <v-select
                v-model="select.value.value"
                :error-messages="select.errorMessage.value"
                :items="items"
                label="Select"
                ></v-select>

                <v-checkbox
                v-model="checkbox.value.value"
                :error-messages="checkbox.errorMessage.value"
                label="Option"
                type="checkbox"
                value="1"
                ></v-checkbox>

                <v-btn
                class="me-4"
                type="submit"
                >
                submit
                </v-btn>

                <v-btn @click="handleReset">
                clear
                </v-btn>
            </form>
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          Two
        </v-tabs-window-item>

      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

defineOptions({
  name: 'PacienteCadastro',
})

const tab = ref(null)

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value) {
        if (value?.length >= 2) return true

        return 'Name needs to be at least 2 characters.'
      },
         raca (value) {
        if (value?.length >= 2) return true

        return 'Name needs to be at least 2 characters.'
      },
        peso (value) {
        if (value?.length >= 2) return true

        return 'Name needs to be at least 2 characters.'
      },  pelagem (value) {
        if (value?.length >= 2) return true

        return 'Name needs to be at least 2 characters.'
      },
      phone (value) {
        if (/^[0-9-]{7,}$/.test(value)) return true

        return 'Phone number needs to be at least 7 digits.'
      },
      email (value) {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

        return 'Must be a valid e-mail.'
      },
      select (value) {
        if (value) return true

        return 'Select an item.'
      },
      checkbox (value) {
        if (value === '1') return true

        return 'Must be checked.'
      },
    },
  })
  const name = useField('name')
  const raca = useField('raca')
  const peso = useField('peso')
  const pelagem = useField('pelagem')
  const phone = useField('phone')
  const email = useField('email')
  const select = useField('select')
  const checkbox = useField('checkbox')

  const items = ref([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ])

  const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
  })
</script>

<style lang="scss">
.v-slide-group {
  border-bottom: 1px solid #ABABAB;
}
.v-tab__slider {
  background: #d31b2773!important;
  border-radius: 5px;
  height: 3px!important;
}

.v-btn {
  text-transform: initial;

}

.v-tab-item--selected {
  .v-btn__content {
    color: #d31b27;
  }
}

.v-card {
  box-shadow: none!important;
}

.row-info-basicas {
  gap: 30px;
}
</style>