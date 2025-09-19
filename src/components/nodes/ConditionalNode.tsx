"use client"

import type React from "react"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { GitBranch, Copy, Trash2 } from "lucide-react"
import { useFlowStore } from "../../store/flowStore"
import type { ConditionalNodeData } from "../../types/flow"

const ConditionalNode = memo(({ id, data, selected }: NodeProps<ConditionalNodeData>) => {
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
        relative group bg-card border-2 rounded-xl p-4 min-w-[240px] cursor-pointer
        transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
        ${selected ? "border-chart-2 shadow-xl ring-2 ring-chart-2/20 node-glow" : "border-border"}
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
        className="w-3 h-3 bg-chart-2 border-2 border-background hover:bg-chart-2/80 transition-colors"
      />

      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-chart-2/10 rounded-lg flex items-center justify-center">
          <GitBranch className="w-4 h-4 text-chart-2" />
        </div>
        <div>
          <span className="text-sm font-semibold text-foreground">Condition</span>
          <p className="text-xs text-muted-foreground">Decision point</p>
        </div>
      </div>

      <div className="text-xs text-foreground bg-muted/50 rounded-lg p-2 border border-border/50 mb-3 font-mono">
        {data.condition}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-muted-foreground">{data.trueLabel || "True"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{data.falseLabel || "False"}</span>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ top: "60%" }}
        className="w-3 h-3 bg-green-500 border-2 border-background hover:bg-green-400 transition-colors"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ top: "80%" }}
        className="w-3 h-3 bg-red-500 border-2 border-background hover:bg-red-400 transition-colors"
      />
    </div>
  )
})

ConditionalNode.displayName = "ConditionalNode"
export default ConditionalNode
