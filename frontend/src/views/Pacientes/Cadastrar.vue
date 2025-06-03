<template>
  <v-card>
    <p class="title-page">Cadastro do Paciente
      <img src="/./src/assets/icons/iconLapisCadastro.png" alt="Ícone" class="menu-title-icon" />
    </p>
    <v-tabs v-model="tab">
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

            <p>Espécie*</p>
            <div class="row-info-radios">
              <v-radio-group v-model="especie.value.value" :error-messages="especie.errorMessage.value" inline
                max-width="300px">
                <v-radio label="Canina" value="especieCan"></v-radio>
                <v-radio label="Felina" value="especieFel"></v-radio>
                <v-radio label="Outra" value="especieOutra"></v-radio>
              </v-radio-group>

              <v-text-field v-if="especie.value.value === 'especieOutra'" v-model="outraEspecie.value.value"
                :error-messages="outraEspecie.errorMessage.value" label="Especificar Outra Espécie"
                placeholder="Especifique a outra espécie" max-width="300px"></v-text-field>
            </div>

            <p>Informações Básicas</p>
            <v-col>
              <v-row class="row-info-basicas">
                <v-text-field v-model="name.value.value" placeholder='Nome' :error-messages="name.errorMessage.value"
                  label="Nome*" max-width="300px"></v-text-field>

                <v-text-field v-model="idade.value.value" :error-messages="idade.errorMessage.value" placeholder='Idade'
                  label="Idade*" max-width="150px"></v-text-field>
              </v-row>
              <v-row class="row-info-basicas">
                <v-text-field v-model="peso.value.value" :error-messages="peso.errorMessage.value" placeholder='Peso'
                  type="number" label="Peso*" max-width="150px"></v-text-field>

                <v-text-field v-model="raca.value.value" :error-messages="raca.errorMessage.value" placeholder='Raça'
                  label="Raça*" max-width="300px"></v-text-field>


                <v-text-field v-model="pelagem.value.value" :error-messages="pelagem.errorMessage.value"
                  placeholder='Pelagem' label="Pelagem*" max-width="300px"></v-text-field>


              </v-row>

            </v-col>

            <p>Porte</p>
            <v-radio-group inline>
              <v-radio label="Pequeno" value="porteP"></v-radio>
              <v-radio label="Médio" value="porteM"></v-radio>
              <v-radio label="Grande" value="porteG"></v-radio>
            </v-radio-group>
            <p>Sexo*</p>
            <v-radio-group v-model="sexo.value.value" :error-messages="sexo.errorMessage.value" inline>
              <v-radio label="Masculino" value="sexoM"></v-radio>
              <v-radio label="Feminino" value="sexoF"></v-radio>
            </v-radio-group>

            <p>Castrado?*</p>
            <div class="row-info-radios">
              <v-radio-group v-model="castrado.value.value" :error-messages="castrado.errorMessage.value" inline
                max-width="150px">
                <v-radio label="Sim" value="castradoS"></v-radio>
                <v-radio label="Não" value="CastradoN"></v-radio>
              </v-radio-group>

              <!-- <v-text-field
                      v-if="radio.Castrado == 'castradoS'"
                        label="Horário"
                        model-value="12:30:00"
                        type="time"
                        max-width="150px"
                      ></v-text-field> -->
              <v-text-field v-if="castrado.value.value == 'castradoS'" v-model="dataCastrado.value.value"
                :error-messages="dataCastrado.errorMessage.value" label="Data*" type="date" max-width="150px" />
            </div>
            <p>Vermifugado?*</p>
            <div class="row-info-radios">
              <v-radio-group v-model="vermifugado.value.value" :error-messages="vermifugado.errorMessage.value" inline
                max-width="150px">
                <v-radio label="Sim" value="vermifugadoS"></v-radio>
                <v-radio label="Não" value="vermifugadoN"></v-radio>
              </v-radio-group>
              <v-text-field v-if="vermifugado.value.value == 'vermifugadoS'" v-model="dataVermifugado.value.value"
                :error-messages="dataVermifugado.errorMessage.value" label="Data*" type="date" max-width="150px" />
            </div>
            <p>Vacinado?*</p>
            <v-radio-group v-model="vacina.value.value" :error-messages="vacina.errorMessage.value" inline
              max-width="150px">
              <v-radio label="Sim" value="vacinadoS"></v-radio>
              <v-radio label="Não" value="vacinadoN"></v-radio>
            </v-radio-group>

            <v-textarea v-if="vacina.value.value === 'vacinadoS'" v-model="quaisVacinas.value.value"
              :error-messages="quaisVacinas.errorMessage.value" :rules="rules" label="Quais Vacinas?*" counter
              maxlength="300" max-width="500px" placeholder="Detalhe quais vacinas foram tomadas..."></v-textarea>

            <v-textarea :model-value="textarea.ObservacoesGerais" :rules="rules" label="Observações" counter
              maxlength="300" max-width="500px"
              placeholder="Detalhe algum ponto extra sobre o paciente..."></v-textarea>

            <div class="container-btn">

              <v-btn class="btn-padrao" @click="handleReset">
                Limpar Tudo
              </v-btn>

              <v-btn class="me-4 btn-padrao" type="submit">
                Salvar
              </v-btn>
            </div>

          </form>
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          <p>Informações Básicas</p>
          <v-col>
            <v-row class="row-info-basicas">
              <v-text-field v-model="nameTutor.value.value" placeholder='Nome'
                :error-messages="nameTutor.errorMessage.value" label="Nome*" max-width="300px"></v-text-field>

              <v-text-field v-model="cpf.value.value" :error-messages="cpf.errorMessage.value" placeholder='CPF'
                label="CPF*" max-width="150px"></v-text-field>

              <v-text-field v-model="rg.value.value" :error-messages="rg.errorMessage.value" placeholder='RG'
                type="number" label="RG*" max-width="150px"></v-text-field>
            </v-row>
          </v-col>

          <p>Informações para Contato</p>
          <v-col>
            <v-row class="row-info-basicas" v-for="(item, index) in phones" :key="index">
              <v-text-field v-model="item.number" label="Telefone*" placeholder="(00) 00000-0000" maxlength="15"
                max-width="180px" />
              <v-btn icon class="btn-padrao" @click="addPhone" v-if="index === phones.length - 1">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon class="btn-padrao" @click="removePhone(index)" v-if="phones.length > 1" >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>

            <v-row>
              <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"
                max-width="400px"></v-text-field>
            </v-row>
          </v-col>
        </v-tabs-window-item>

      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'

defineOptions({
  name: 'PacienteCadastro',
})

const tab = ref(null)

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name: value => value?.length > 0 || 'Campo obrigatório.',
    idade: value => value?.length > 0 || 'Campo obrigatório.',
    raca: value => value?.length > 0 || 'Campo obrigatório.',
    peso: value => value?.length > 0 || 'Campo obrigatório.',
    pelagem: value => value?.length > 0 || 'Campo obrigatório.',
    especie: value => !!value || 'Selecione uma espécie.',
    outraEspecie(value) {
      if (castrado.value.value === 'especieOutra') {
        return !!value || 'Campo Obrigatório.';
      }
      return true;
    },
    sexo: value => !!value || 'Informe o sexo.',
    castrado: value => !!value || 'Informe se é castrado.',
    vermifugado: value => !!value || 'Informe se é vermifugado.',
    vacina: value => !!value || 'Informe se é vacinado.',
    dataCastrado(value) {
      if (castrado.value.value === 'castradoS') {
        return !!value || 'Informe a data.';
      }
      return true;
    },
    dataVermifugado(value) {
      if (vermifugado.value.value === 'vermifugadoS') {
        return !!value || 'Informe a data.';
      }
      return true;
    },
    quaisVacinas(value) {
      if (vacina.value.value === 'vacinadoS') {
        return !!value || 'Informe as vacinas.';
      }
      return true;
    },


    nameTutor: value => value?.length > 0 || 'Campo obrigatório.',
    rg: value => value?.length > 0 || 'Campo obrigatório.',
    cpf: value => value?.length > 0 || 'Campo obrigatório.',
    phone(value) {
      if (/^[0-9-]{7,}$/.test(value)) return true

      return 'Phone number needs to be at least 7 digits.'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },
  }
})

// CAMPOS PACIENTE
const name = useField('name', undefined, { validateOnValueUpdate: false });
const raca = useField('raca', undefined, { validateOnValueUpdate: false });
const peso = useField('peso', undefined, { validateOnValueUpdate: false });
const pelagem = useField('pelagem', undefined, { validateOnValueUpdate: false });
const idade = useField('idade', undefined, { validateOnValueUpdate: false });
const outraEspecie = useField('outraEspecie', undefined, { validateOnValueUpdate: false });
const especie = useField('especie', undefined, { validateOnValueUpdate: false })
const castrado = useField('castrado', undefined, { validateOnValueUpdate: false })
const sexo = useField('sexo', undefined, { validateOnValueUpdate: false })
const vermifugado = useField('vermifugado', undefined, { validateOnValueUpdate: false })
const vacina = useField('vacina', undefined, { validateOnValueUpdate: false })
const quaisVacinas = useField('quaisVacinas', undefined, { validateOnValueUpdate: false })
const dataCastrado = useField('dataCastrado', undefined, { validateOnValueUpdate: false });
const dataVermifugado = useField('dataVermifugado', undefined, { validateOnValueUpdate: false });

// CAMPOS TUTOR
const nameTutor = useField('nameTutor', undefined, { validateOnValueUpdate: false });
const rg = useField('rg', undefined, { validateOnValueUpdate: false });
const cpf = useField('cpg', undefined, { validateOnValueUpdate: false });
const phone = useField('phone', undefined, { validateOnValueUpdate: false });
const email = useField('email', undefined, { validateOnValueUpdate: false });

const phones = ref([{ number: '' }])

function formatPhoneNumber(value: string): string {
  value = value.replace(/\D/g, ''); // remove não-dígitos

  if (value.length > 11) {
    value = value.slice(0, 11); // limita a 11 dígitos
  }

  if (value.length <= 10) {
    // Formato fixo ou celular antigo: (00) 0000-0000
    return value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
  } else {
    // Formato celular atual: (00) 00000-0000
    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
  }
}

function addPhone() {
  phones.value.push({ number: '' })
}

function removePhone(index: number) {
  phones.value.splice(index, 1)
}


const rules = [v => v.length <= 300 || 'Máximo 300 caracteres']

const textarea = ref({
  ObservacoesGerais: ''
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

watch(
  phones,
  (newPhones) => {
    newPhones.forEach((item, index) => {
      const formatted = formatPhoneNumber(item.number);
      if (formatted !== item.number) {
        phones.value[index].number = formatted;
      }
    });
  },
  { deep: true }
)

</script>

<style lang="scss">
.v-slide-group {
  border-bottom: 1px solid #ABABAB;
}

.v-tab__slider {
  background: #d31b2773 !important;
  border-radius: 5px;
  height: 3px !important;
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
  box-shadow: none !important;
}

.row-info-basicas {
  gap: 30px;
  margin-top: 10px;
}

.row-info-radios {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>