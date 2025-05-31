<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app permanent width="250">
      <v-list density="compact" nav>
        <v-list-item>
          <v-list-item-title class="text-h6 title-menu-lateral">
            VetClinic
            <v-list-item-icon>
              <img src="../assets/icons/logo.jpeg" alt="Ícone" class="menu-title-icon" />
            </v-list-item-icon>
          </v-list-item-title>
        </v-list-item>

        <v-list-group
          v-for="(item, index) in menuItems"
          :key="index"
        >
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-icon>
                <img :src="item.icon" alt="Ícone" class="menu-icon" />
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.to"
            link
            nav
          >
            <v-list-item-icon>
              <img :src="child.icon" alt="Ícone" class="submenu-icon" />
            </v-list-item-icon>
            <v-list-item-title>{{ child.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- Rodapé -->      
      <div class="menu-footer">
       <v-divider class="divider-Menu-Lateral"></v-divider>

        <span>by NatiBernini</span>
      </div>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-toolbar-title>Natália Bernini 
              <img src="../assets/icons/fotoPerfil.jpg" alt="Ícone" class="menu-user-icon" /></v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="container-conteudo"><router-view /></div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

import iconePacientes from '../assets/icons/iconePacientes.png'
import iconListagemPaciente from '../assets/icons/iconeLista.png'
import iconCadastrarPaciente from '../assets/icons/iconeCadastro.png'

import iconeVeterinarios from '../assets/icons/iconeVeterinarios.png'
import iconeConsulta from '../assets/icons/iconeConsulta.png'
import iconeAdocaoGato from '../assets/icons/iconeAdocaoGato.png'
import iconeFormulario from '../assets/icons/iconeFormulario.png'

const drawer = ref(true)

const menuItems = [
  {
    title: 'Pacientes',
    icon: iconePacientes,
    children: [
      { title: 'Listagem', to: '/pacientes', icon: iconListagemPaciente },
      { title: 'Cadastrar', to: '/pacientes/cadastrar', icon: iconCadastrarPaciente },
    ],
  },
  {
    title: 'Veterinários',
    icon: iconeVeterinarios,
    children: [
      { title: 'Listagem', to: '/veterinarios' },
      { title: 'Cadastrar', to: '/veterinarios/cadastrar' },
    ],
  },
  {
    title: 'Consultas',
    icon: iconeConsulta,
    children: [
      { title: 'Listagem', to: '/consultas' },
      { title: 'Agendar', to: '/consultas/agendar' },
    ],
  },
  {
    title: 'Adoção',
    icon: iconeAdocaoGato,
    children: [
      { title: 'Listagem', to: '/adocao' },
      { title: 'Cadastrar', to: '/adocao/cadastrar' },
    ],
  },
  {
    title: 'Relatórios',
    icon: iconeFormulario,
    children: [
      { title: 'Listagem', to: '/relatorios' },
      { title: 'Cadastrar', to: '/relatorios/cadastrar' },
    ],
  },
]
</script>

<style lang="scss">
* {
  font-family: 'Poppins', sans-serif !important;
}

.title-page {
  font-size: 26px;
  font-weight: 500;
  color: #434343;
}

.container-conteudo {
  padding: 30px;
  padding-left: 80px;
  padding-right: 80px;
}
.v-navigation-drawer {
  background: rgb(245, 245, 245) !important;
  border: none !important;
  box-shadow: rgba(0, 0, 0, 0.12) 1px 2px 20px 0px !important;
  position: relative;

  .divider-Menu-Lateral {
    margin-top: 20px;
    margin-bottom: 20px !important;
  }

  .title-menu-lateral {
    padding-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .v-list-group {
    margin-bottom: 15px;
  }

  .v-list-item__content {
    display: flex !important;
    align-items: center !important;
  }

  .v-list-group .v-list-item .v-list-item-title {
    font-size: 15px !important;
  }

  .v-list-group__items .v-list-item {
    margin-inline-start: calc(10px + var(--indent-padding)) !important;
    padding-inline-start: 15px !important;
    border-radius: 10px;

    .v-list-item-title {
      font-size: 14px !important;
    }
  }

  .v-list-item--active {
    color: #D31B27;
  }

  .menu-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
    margin-right: 10px;
  }

  .menu-title-icon {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }

  .submenu-icon {
    display: flex !important;
    align-items: center;
    width: 18px;
    height: 18px;
    object-fit: contain;
    margin-right: 8px;
  }

  .menu-footer {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #888;
    padding-bottom: 10px;
  }
}

.menu-user-icon {
  width: 40px;
  border-radius: 50%;
}
.v-toolbar {
  box-shadow: none!important;
  border-bottom: 1px solid #E8E8E8 !important;
}
.v-toolbar-title {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  flex-wrap: nowrap;
  padding-right: 20px;

    .v-toolbar-title__placeholder {
      display: flex;
      align-items: center;
      gap: 15px;
    }
}

.v-field__overlay {
 background-color: unset!important; 
}
.v-field__field {
     border: 1px solid #ABABAB!important;
     border-radius: 10px;

}
.v-field__outline {
  display: none!important;
}
</style>
