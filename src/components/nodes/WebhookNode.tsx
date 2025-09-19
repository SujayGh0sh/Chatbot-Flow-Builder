"use client"

import type React from "react"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Webhook, Copy, Trash2 } from "lucide-react"
import { useFlowStore } from "../../store/flowStore"
import type { WebhookNodeData } from "../../types/flow"

const WebhookNode = memo(({ id, data, selected }: NodeProps<WebhookNodeData>) => {
  const { setSelectedNode, duplicateNode, deleteNode } = useFlowStore()

  const handleClick = () => {
    setSelectedNode(id)
  }

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation()
    duplicateNode(id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteNode(id)
  }

  return (
    <div
      className={`
        relative group bg-card border-2 rounded-xl p-4 min-w-[220px] cursor-pointer
        transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
        ${selected ? "border-chart-5 shadow-xl ring-2 ring-chart-5/20 node-glow" : "border-border"}
        glass-effect
      `}
      onClick={handleClick}
    >
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <button
          onClick={handleDuplicate}
          className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <Copy className="w-3 h-3" />
        </button>
        <button
          onClick={handleDelete}
          className="w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-chart-5 border-2 border-background hover:bg-chart-5/80 transition-colors"
      />

      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-chart-5/10 rounded-lg flex items-center justify-center">
          <Webhook className="w-4 h-4 text-chart-5" />
        </div>
        <div>
          <span className="text-sm font-semibold text-foreground">Webhook</span>
          <p className="text-xs text-muted-foreground">Send data</p>
        </div>
      </div>

      <div className="text-xs text-foreground bg-muted/50 rounded-lg p-2 border border-border/50 font-mono truncate">
        {data.webhookUrl}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-chart-5 border-2 border-background hover:bg-chart-5/80 transition-colors"
      />
    </div>
  )
})

WebhookNode.displayName = "WebhookNode"
export default WebhookNode
