import { createRouter, createWebHistory } from 'vue-router'
import PacientesList from '../views/Pacientes/Listagem.vue'
import PacienteCadastro from '../views/Pacientes/Cadastrar.vue'
import VeterinariosList from '../views/Veterinarios/Listagem.vue'
import VeterinarioCadastro from '../views/Veterinarios/Cadastrar.vue'
import ConsultaList from '../views/Consultas/Listagem.vue'
import AgendarConsulta from '../views/Consultas/Agendar.vue'
import RelatorioCadastro from '../views/Relatorios/Cadastrar.vue'
import RelatorioList from '../views/Relatorios/Listagem.vue'
import AdocaoList from '../views/Adocao/Listagem.vue'
import AdocaoCadastro from '../views/Adocao/Cadastrar.vue'

const routes = [
  { path: '/pacientes', component: PacientesList },
  { path: '/pacientes/cadastrar', component: PacienteCadastro },
  { path: '/veterinarios', component: VeterinariosList },
  { path: '/veterinarios/cadastrar', component: VeterinarioCadastro },
  { path: '/consultas', component: ConsultaList },
  { path: '/consultas/agendar', component: AgendarConsulta },
  { path: '/relatorios', component: RelatorioCadastro},
  { path: '/relatorios/cadastrar', component: RelatorioList},
  { path: '/adocao', component: AdocaoList},
  { path: '/adocao/cadastrar', component: AdocaoCadastro}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
