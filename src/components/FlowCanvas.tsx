"use client"

import type React from "react"
import { useCallback } from "react"
import { ReactFlow, Background, Controls, MiniMap, useReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useFlowStore } from "../store/flowStore"
import TextNode from "./nodes/TextNode"
import ConditionalNode from "./nodes/ConditionalNode"
import DelayNode from "./nodes/DelayNode"
import ApiNode from "./nodes/ApiNode"
import WebhookNode from "./nodes/WebhookNode"

// Custom node types mapping
const nodeTypes = {
  textMessage: TextNode,
  conditional: ConditionalNode,
  delay: DelayNode,
  apiCall: ApiNode,
  webhook: WebhookNode,
}

// Main flow canvas component
const FlowCanvas = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, setSelectedNode } = useFlowStore()

  const { screenToFlowPosition } = useReactFlow()

  // Handle drop events for creating new nodes
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow")

      if (!type) {
        return
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      addNode(type as any, position)
    },
    [addNode, screenToFlowPosition],
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  // Clear selection when clicking on empty canvas
  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [setSelectedNode])

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Background />
        <Controls />
        <MiniMap className="bg-white border border-gray-300" nodeColor="#14b8a6" />
      </ReactFlow>
    </div>
  )
}

export default FlowCanvas
