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
import {
  finalizarCompra,
  obterCidadesPorEstado
} from './controllers/mini-ecommerce.js'

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

const pathGerTar = '/gerenciador-tarefas'
app.get(pathGerTar, listarTarefas)
app.get(`${pathGerTar}/:id`, listarTarefaId)
app.post(pathGerTar, cadastrarTarefa)
app.put(`${pathGerTar}/:id`, atualizarTarefa)
app.delete(`${pathGerTar}/:id`, excluirTarefa)
app.put(`${pathGerTar}/:id/concluir`, concluirTarefa)

const pathMiniEcomm = '/mini-ecommerce'
app.get(`${pathMiniEcomm}/estado/:siglaEstado/cidades`, obterCidadesPorEstado)
app.post(`${pathMiniEcomm}/checkout/finalizar-compra`, finalizarCompra)

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`))