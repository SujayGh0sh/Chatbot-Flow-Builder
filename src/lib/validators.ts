import type { FlowNode } from "../types/flow"
import type { Edge } from "@xyflow/react"

export interface ValidationResult {
  isValid: boolean
  error?: string
}

// Validate the flow according to the requirements
export function validateFlow(nodes: FlowNode[], edges: Edge[]): ValidationResult {
  // If there's only one node or no nodes, it's valid
  if (nodes.length <= 1) {
    return { isValid: true }
  }

  // Find nodes with no incoming edges (root nodes)
  const nodesWithIncomingEdges = new Set(edges.map((edge) => edge.target))
  const rootNodes = nodes.filter((node) => !nodesWithIncomingEdges.has(node.id))

  // If there are more than one root nodes, it's invalid
  if (rootNodes.length > 1) {
    return {
      isValid: false,
      error: "Multiple root nodes detected. Flow must have only one starting point.",
    }
  }

  return { isValid: true }
}
