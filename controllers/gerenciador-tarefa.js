import { v4 as uuidv4 } from 'uuid';

let tarefas = [
  { id: '1', nome: 'Tarefa 1 A', concluida: true },
  { id: '2', nome: 'Tarefa 2 B', concluida: false },
  { id: '3', nome: 'Tarefa 3 C', concluida: false },
  { id: '4', nome: 'Tarefa 4 D', concluida: false }
]

function listarTarefas(req, res) {
  const pagina = req.query['pag'] || 1
  const itensPorPagina = req.query['itens-por-pagina'] || 3
  const filtroTarefa = req.query['filtro-tarefa']
  const ordem = req.query['ordem']

  // clonando o array de tarefas
  let tarefasRetorno = [...tarefas]

  // filtrar
  if (filtroTarefa) {
    tarefasRetorno = tarefasRetorno.filter(
      t => t.nome.toLowerCase().indexOf(filtroTarefa.toLocaleLowerCase()) === 0
    )
  }

  // ordenacao
  if (ordem && ordem.toUpperCase === 'ASC') {
    tarefasRetorno.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1))
  } else if (ordem && ordem.toUpperCase === 'DESC') {
    tarefasRetorno.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1))
  }

  // paginacao
  let totalItens = tarefasRetorno.length
  tarefasRetorno = tarefasRetorno.splice((pagina - 1) * itensPorPagina, itensPorPagina)

  res.json({
    pagina: parseInt(pagina),
    totalItens: totalItens,
    tarefas: tarefasRetorno
  })
}

function listarTarefaId(req, res) {
  const id = req.params.id
  const tarefa = tarefas.find(t => t.id === id)
  if (!tarefa) {
    res.status(404).json({ 'erro': 'Tarefa não encontrada' })
  } else {
    res.json(tarefa)
  }
}

function validarBody(body) {
  return (body['nome'] &&
    (body['concluida'] != null && typeof body['concluida'] === 'boolean'))
}

function cadastrarTarefa(req, res) {
  if (!validarBody(req.body)) {
    res.status(400).json({ erro: 'Requisição inválida' })
  } else {
    const tarefa = {
      id: uuidv4(),
      nome: req.body['nome'],
      concluida: req.body['concluida']
    }
    tarefas.push(tarefa)
    res.json(tarefa)
  }
}

function atualizarTarefa(req, res) {
  if (!validarBody(req.body)) {
    res.status(400).json({ erro: 'Requisição inválida' })
  } else {
    const id = req.params.id
    let tarefaAtualizada = null
    tarefas = tarefas.map(t => {
      if (t.id == id) {
        t.nome = req.body['nome']
        t.concluida = req.body['concluida']
        tarefaAtualizada = t
      }
      return t
    })

    if (tarefaAtualizada) {
      res.json(tarefaAtualizada)
    } else {
      res.status(404).json({ erro: 'Tarefa não encontrada' })
    }
  }
}

function excluirTarefa(req, res) {
  const id = req.params.id
  let numTarefas = tarefas.length
  tarefas = tarefas.filter(t => t.id !== id)
  if (numTarefas === tarefas.length) {
    res.status(404).json({ erro: 'Tarefa não encontrada' })
  } else {
    res.json({ msg: 'Tarefa excluída com sucesso' })
  }
}

function concluirTarefa(req, res) {
  const id = req.params.id
  let tarefaConcluida = null
  tarefas = tarefas.map(t => {
    if (t.id == id) {
      t.concluida = true
      tarefaConcluida = t
    }
    return t
  })

  if (tarefaConcluida) {
    res.json(tarefaConcluida)
  } else {
    res.status(404).json({ erro: 'Tarefa não encontrada' })
  }
}

export {
  listarTarefas,
  listarTarefaId,
  cadastrarTarefa,
  atualizarTarefa,
  excluirTarefa,
  concluirTarefa
}