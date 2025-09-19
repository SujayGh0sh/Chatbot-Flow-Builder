import { create } from "zustand"
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react"
import type { FlowState, FlowNode, NodeData } from "../types/flow"
import { validateFlow } from "../lib/validators"
import { toast } from "../hooks/use-toast"

let nodeId = 0
const getNodeId = () => `node_${nodeId++}`

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  searchTerm: "",
  isPlaying: false,
  zoomLevel: 1,

  addNode: (type = "textMessage", position = { x: 0, y: 0 }) => {
    const defaultData: Record<FlowNode["type"], NodeData> = {
      textMessage: { text: "New message", label: "Send Message" },
      conditional: { condition: "user.age > 18", trueLabel: "Yes", falseLabel: "No", label: "Condition" },
      delay: { delay: 5, unit: "seconds", label: "Wait" },
      apiCall: { url: "https://api.example.com", method: "GET", label: "API Call" },
      webhook: { webhookUrl: "https://webhook.example.com", label: "Webhook" },
    }

    const newNode: FlowNode = {
      id: getNodeId(),
      type: type as FlowNode["type"],
      position,
      data: defaultData[type as FlowNode["type"]] || defaultData.textMessage,
    }

    set((state) => ({
      nodes: [...state.nodes, newNode],
    }))
  },

  updateNodeData: (nodeId, newData) => {
    set((state) => ({
      nodes: state.nodes.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node)),
    }))
  },

  setSelectedNode: (nodeId) => {
    set({ selectedNodeId: nodeId })
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term })
  },

  setIsPlaying: (playing) => {
    set({ isPlaying: playing })
  },

  setZoomLevel: (level) => {
    set({ zoomLevel: level })
  },

  duplicateNode: (nodeId) => {
    const { nodes } = get()
    const nodeToDuplicate = nodes.find((node) => node.id === nodeId)
    if (nodeToDuplicate && nodeToDuplicate.position) {
      const newNode: FlowNode = {
        ...nodeToDuplicate,
        id: getNodeId(),
        position: {
          x: nodeToDuplicate.position.x + 50,
          y: nodeToDuplicate.position.y + 50,
        },
      }
      set((state) => ({
        nodes: [...state.nodes, newNode],
      }))
    }
  },

  deleteNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    }))
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }))
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }))
  },

  onConnect: (connection) => {
    const { edges } = get()

    const existingEdge = edges.find(
      (edge) => edge.source === connection.source && edge.sourceHandle === connection.sourceHandle,
    )

    if (existingEdge) {
      set((state) => ({
        edges: addEdge(
          connection,
          state.edges.filter((edge) => edge.id !== existingEdge.id),
        ),
      }))
    } else {
      set((state) => ({
        edges: addEdge(connection, state.edges),
      }))
    }
  },

  validateAndSave: () => {
    const { nodes, edges } = get()
    const validation = validateFlow(nodes, edges)

    if (validation.isValid) {
      console.log("Flow saved successfully:", { nodes, edges })
      toast({
        title: "Success!",
        description: "Flow saved successfully.",
        variant: "default",
      })
    } else {
      toast({
        title: "Validation Error",
        description: validation.error || "Please check your flow configuration.",
        variant: "destructive",
      })
    }
  },

  exportFlow: () => {
    const { nodes, edges } = get()
    const flowData = { nodes, edges, version: "1.0" }
    const blob = new Blob([JSON.stringify(flowData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "chatbot-flow.json"
    a.click()
    URL.revokeObjectURL(url)
  },

  importFlow: (flowData) => {
    if (flowData.nodes && flowData.edges) {
      set({
        nodes: flowData.nodes,
        edges: flowData.edges,
        selectedNodeId: null,
      })
    }
  },
}))
