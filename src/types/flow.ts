import type { Node, Edge } from "@xyflow/react"

export interface BaseNodeData {
  label?: string
  description?: string
}

export interface TextNodeData extends BaseNodeData {
  text: string
}

export interface ConditionalNodeData extends BaseNodeData {
  condition: string
  trueLabel?: string
  falseLabel?: string
}

export interface DelayNodeData extends BaseNodeData {
  delay: number
  unit: "seconds" | "minutes" | "hours"
}

export interface ApiNodeData extends BaseNodeData {
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  headers?: Record<string, string>
}

export interface WebhookNodeData extends BaseNodeData {
  webhookUrl: string
  payload?: string
}

export type NodeData = TextNodeData | ConditionalNodeData | DelayNodeData | ApiNodeData | WebhookNodeData

export interface FlowNode extends Node {
  data: NodeData
  type: "textMessage" | "conditional" | "delay" | "apiCall" | "webhook"
}

export interface FlowState {
  nodes: FlowNode[]
  edges: Edge[]
  selectedNodeId: string | null
  searchTerm: string
  isPlaying: boolean
  zoomLevel: number

  // Actions
  addNode: (type: FlowNode["type"], position: { x: number; y: number }) => void
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void
  setSelectedNode: (nodeId: string | null) => void
  setSearchTerm: (term: string) => void
  setIsPlaying: (playing: boolean) => void
  setZoomLevel: (level: number) => void
  duplicateNode: (nodeId: string) => void
  deleteNode: (nodeId: string) => void
  onNodesChange: (changes: any[]) => void
  onEdgesChange: (changes: any[]) => void
  onConnect: (connection: any) => void
  validateAndSave: () => void
  exportFlow: () => void
  importFlow: (flowData: any) => void
}

export interface NodeTemplate {
  type: FlowNode["type"]
  label: string
  description: string
  icon: string
  color: string
  category: "message" | "logic" | "integration" | "utility"
  defaultData: NodeData
}
