const input = [
  "1 2",
  "1 3",
  "2 4",
  "3 5",
  "7 8"
]

function getCost(N, edges) {
  const graph = buildGraph(edges)
  const visited = new Set()
  let cost = 0

  for (let i = 1; i <= N; i++) {
    const connectedComp = getConnectedComponent(i.toString(), graph, visited)
    if (connectedComp && connectedComp.size > 0) {
      cost += Math.ceil(Math.sqrt(connectedComp.size))
    }
  }
  
  console.log(cost)
  return cost
}

function buildGraph(edges) {
  const graph = new Map()

  for (const edge of edges) {
    const [source, destination] = edge.split(' ')
    
    if (graph.has(source)) {
      graph.get(source).add(destination)
    } else {
      graph.set(source, new Set([destination]))
    }

    if (graph.has(destination)) {
      graph.get(destination).add(source)
    } else {
      graph.set(destination, new Set([source]))
    }
  }

  return graph
}

function getConnectedComponent(node, graph, visited) {
  const connectedComp = new Set()
  
  if (visited.has(node)) {
    return new Set()
  }

  const queue = []
  queue.push(node)
  connectedComp.add(node)
  visited.add(node)

  while (queue.length > 0) {
    const cur = queue.shift()
    const connectedNodes = graph.get(cur)
    if (connectedNodes) {
      for (const neighbor of connectedNodes) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
          connectedComp.add(neighbor)
        }
      }
    }

  }

  console.log(connectedComp)
  return connectedComp
}

getCost(10, input)