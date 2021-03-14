import cidadesEstados from '../cidades-estados.js'

function finalizarCompra(req, res) {
  console.log(req.body)
  res.send('ok')
}

function obterCidadesPorEstado(req, res) {
  const siglaEstado = req.params['siglaEstado'].toUpperCase()
  const dadosEstado = cidadesEstados.estados.filter(estado => estado.sigla === siglaEstado)
  if (dadosEstado.length === 0) {
    res.status(404).json({ erro: `${siglaEstado} não um estado válido` })
  } else {
    res.json(dadosEstado[0].cidades)
  }
}

export {
  finalizarCompra,
  obterCidadesPorEstado
}