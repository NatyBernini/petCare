<template><v-dialog max-width="700">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      v-bind="activatorProps"
      class="btn-padrao"
      text="Cadastrar Tutor"
      variant="flat"
    ></v-btn>
  </template>

  <template v-slot:default="{ isActive }">

    <v-card title="Cadastrar Tutor">
        
      <v-card-text>
        <form  @submit.prevent="submit">
         <p>Informações Básicas</p>
          <v-col>
            <v-row class="row-info-basicas">
              <v-text-field v-model="nameTutor.value.value" placeholder='Nome'
                :error-messages="nameTutor.errorMessage.value" label="Nome*" max-width="300px"></v-text-field>

            </v-row>
            <v-row class="row-info-basicas">
              <v-text-field v-model="cpf.value.value" :error-messages="cpf.errorMessage.value" placeholder='CPF'
                label="CPF*" max-width="150px" maxLength="14"></v-text-field>

              <v-text-field v-model="rg.value.value" :error-messages="rg.errorMessage.value" placeholder='RG'
                type="number" label="RG*" max-width="150px"></v-text-field>
            </v-row>
          </v-col>

          <p>Informações para Contato</p>
          <v-col>
            <v-row class="row-info-basicas" v-for="(item, index) in phones" :key="index">
              <v-text-field v-model="item.number" label="Telefone*" placeholder="(00) 00000-0000" maxlength="15"
                max-width="180px" />
              <v-btn icon class="btn-padrao btn-plus-phone" @click="addPhone" v-if="index === phones.length - 1">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon class="btn-padrao btn-plus-phone" @click="removePhone(index)" v-if="phones.length > 1" >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>

            <v-row class="row-info-basicas">
              <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"
                max-width="400px"></v-text-field>
            </v-row>
          </v-col>

           <p>Informações de Endereço</p>
          <v-col>
            <v-row class="row-info-basicas">
              <v-text-field v-model="estado.value.value" placeholder='Estado'
                :error-messages="estado.errorMessage.value" label="Estado*" max-width="150px"></v-text-field>

              <v-text-field v-model="cidade.value.value" :error-messages="cidade.errorMessage.value" placeholder='Cidade'
                label="Cidade*" max-width="250px"></v-text-field>

           </v-row> 
            <v-row class="row-info-basicas">    
              <v-text-field v-model="bairro.value.value" :error-messages="bairro.errorMessage.value" placeholder='Bairro'
                label="Bairro*" max-width="150px"></v-text-field>

                
              <v-text-field v-model="rua.value.value" :error-messages="rua.errorMessage.value" placeholder='Rua'
                label="Rua*" max-width="250px"></v-text-field>
            </v-row> 
            <v-row class="row-info-basicas">    
              <v-text-field v-model="numero.value.value" :error-messages="numero.errorMessage.value" placeholder='N'
                type="number" label="N*" max-width="70px"></v-text-field>

                <v-text-field v-model="complemento.value.value" :error-messages="complemento.errorMessage.value" placeholder='Complemento'
                label="Complemento*" max-width="250px"></v-text-field>

            </v-row>
          </v-col>
            <div class="container-btn mt-5">
                <p class="msg-auxiliar">Campos Obrigatório*</p>
            </div>
            <div class="mt-5 container-btn">
            <v-btn class="me-4 btn-padrao" text="Cancelar"
                    @click="isActive.value = false"
                    ></v-btn>
            <v-btn class="me-4 btn-padrao" type="submit">
                Salvar
            </v-btn>
            </div>
          </form>
    </v-card-text>

  
    </v-card>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'

defineOptions({
  name: 'ModalCadastrarTutor',
})

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    nameTutor: value => value?.length > 0 || 'Campo obrigatório.',
    rg: value => value?.length > 0 || 'Campo obrigatório.',
    cpf: value => value?.length > 0 || 'Campo obrigatório.',
    phone(value) {
      if (/^[0-9-]{7,}$/.test(value)) return true

      return 'Insira um telefone válido..'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Insira um email válido.'
    },
    estado: value => value?.length > 0 || 'Campo obrigatório.',
    cidade: value => value?.length > 0 || 'Campo obrigatório.',
    bairro: value => value?.length > 0 || 'Campo obrigatório.',
    rua: value => value?.length > 0 || 'Campo obrigatório.',
    numero: value => value?.length > 0 || 'Campo obrigatório.',
    complemento: value => value?.length > 0 || 'Campo obrigatório.',


  }
})

// CAMPOS TUTOR
const nameTutor = useField('nameTutor', undefined, { validateOnValueUpdate: false });
const rg = useField('rg', undefined, { validateOnValueUpdate: false });
const cpf = useField('cpf', undefined, { validateOnValueUpdate: false });
const email = useField('email', undefined, { validateOnValueUpdate: false });

// CAMPOS DE CONTATO
const phones = ref([{ number: '' }])

// CAMPOS DE ENDEREÇO
const estado = useField('estado', undefined, { validateOnValueUpdate: false });
const cidade = useField('cidade', undefined, { validateOnValueUpdate: false });
const bairro = useField('bairro', undefined, { validateOnValueUpdate: false });
const rua = useField('rua', undefined, { validateOnValueUpdate: false });
const numero = useField('numero', undefined, { validateOnValueUpdate: false });
const complemento = useField('complemento', undefined, { validateOnValueUpdate: false });

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


const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})

function formatCPF(value: string): string {
  value = value.replace(/\D/g, ''); // Remove tudo que não for dígito

  if (value.length > 11) {
    value = value.slice(0, 11); // Limita a 11 dígitos
  }

  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4').replace(/[-.]$/, '');
}


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
watch(
  cpf.value,
  (newValue) => {
    const formatted = formatCPF(newValue);
    if (formatted !== newValue) {
      cpf.value.value = formatted;
    }
  }
);

</script>

<style  lang="scss">
.v-overlay__content {
    background-color: #fff;
    border-radius: 50px;

    .v-card {
        
    border-radius: 20px!important;
    max-height: 85vh;
    }
}

.btn-plus-phone {
        width: 30px!important;
    height: 30px!important;
}

</style>