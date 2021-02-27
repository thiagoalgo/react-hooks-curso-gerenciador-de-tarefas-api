import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  listarTarefaId,
  listarTarefas,
  cadastrarTarefa,
  atualizarTarefa, 
  excluirTarefa,
  concluirTarefa
} from './controllers/gerenciador-tarefa.js'

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

const path = '/gerenciador-tarefas'

app.get(path, listarTarefas)
app.get(`${path}/:id`, listarTarefaId)
app.post(path, cadastrarTarefa)
app.put(`${path}/:id`, atualizarTarefa)
app.delete(`${path}/:id`, excluirTarefa)
app.put(`${path}/:id/concluir`, concluirTarefa)

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`))