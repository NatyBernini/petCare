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
                  <v-row>
                    <v-col sm="12" md="12" lg="3" xl="3">
                  <v-radio-group v-model="radio.Especie" inline>
                    <v-radio label="Canina" value="especieCan"></v-radio>
                    <v-radio label="Felina" value="especieFel"></v-radio>
                    <v-radio label="Outra" value="especieOutra"></v-radio>
                  </v-radio-group>
                    </v-col>
                    
                  <v-col sm="12" md="12" lg="4" xl="3">
                    <v-text-field v-if="radio.Especie === 'especieOutra'"
                    v-model="outraEspecie.value.value"
                    :error-messages="pelagem.errorMessage.value"
                    label="Especificar Outra Espécie"
                    max-width="300px"
                  ></v-text-field>
                  </v-col>
                </v-row>
                
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
                v-model="idade.value.value"
                :counter="7"
                :error-messages="idade.errorMessage.value"
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
                  <p>Porte</p>
                <v-radio-group inline>
                  <v-radio label="Pequeno" value="porteP"></v-radio>
                  <v-radio label="Médio" value="porteM"></v-radio>
                  <v-radio label="Grande" value="porteG"></v-radio>
                </v-radio-group>
              </v-col>
            
               <p>Sexo</p>
                  <v-radio-group inline>
                  <v-radio label="Masculino" value="sexoM"></v-radio>
                  <v-radio label="Feminino" value="sexoF"></v-radio>
                </v-radio-group>

                <p>Castrado?</p>
                <v-radio-group inline>
                  <v-radio label="Sim" value="castradoS"></v-radio>
                  <v-radio label="Não" value="CastradoN"></v-radio>
                </v-radio-group>

                <p>Vermifugado?</p>
                <v-radio-group inline>
                  <v-radio label="Sim" value="vermifugadoS"></v-radio>
                  <v-radio label="Não" value="vermifugadoN"></v-radio>
                </v-radio-group>

                  <p>Vacinado?</p>
                <v-radio-group inline>
                  <v-radio label="Sim" value="vacinadoS"></v-radio>
                  <v-radio label="Não" value="vacinadoN"></v-radio>
                </v-radio-group>

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
        if (value?.length >= 0) return true

        return 'Campo Obrigatório!.'
      }, idade (value) {
        if (value?.length >= 0) return true

        return 'Campo Obrigatório!.'
      },
         raca (value) {
        if (value?.length >= 0) return true

        return 'Campo Obrigatório!.'
      },
        peso (value) {
        if (value?.length >= 0) return true

        return 'Campo Obrigatório!.'
      },  pelagem (value) {
        if (value?.length >= 0) return true

        return 'Campo Obrigatório!.'
      },
      phone (value) {
        if (/^[0-9-]{7,}$/.test(value)) return true

        return 'Campo Obrigatório.'
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
  const name = useField('name', undefined, { validateOnValueUpdate: false });
  const raca = useField('raca', undefined, { validateOnValueUpdate: false });
  const peso = useField('peso', undefined, { validateOnValueUpdate: false });
  const pelagem = useField('pelagem', undefined, { validateOnValueUpdate: false });
  const idade = useField('idade', undefined, { validateOnValueUpdate: false });
  const checkbox = useField('checkbox');
  const outraEspecie = useField('outraEspecie', undefined, { validateOnValueUpdate: false });

  const radio = ref({
    Especie: ''
  })

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
  margin-top: 10px;
}

</style>