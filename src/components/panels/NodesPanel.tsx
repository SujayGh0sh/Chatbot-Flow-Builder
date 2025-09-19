"use client"

import type React from "react"
import { MessageSquare, GitBranch, Clock, Globe, Webhook } from "lucide-react"

// Panel showing available node types for drag & drop
const NodesPanel = () => {
  // Handle drag start for node creation
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  const nodeTemplates = [
    {
      type: "textMessage",
      label: "Message",
      icon: MessageSquare,
      color: "teal",
      description: "Send text message",
    },
    {
      type: "conditional",
      label: "Condition",
      icon: GitBranch,
      color: "purple",
      description: "Decision point",
    },
    {
      type: "delay",
      label: "Wait",
      icon: Clock,
      color: "orange",
      description: "Add delay",
    },
    {
      type: "apiCall",
      label: "API Call",
      icon: Globe,
      color: "blue",
      description: "External request",
    },
    {
      type: "webhook",
      label: "Webhook",
      icon: Webhook,
      color: "green",
      description: "Send data",
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Nodes Panel</h3>

      <div className="space-y-2">
        {nodeTemplates.map((template) => {
          const Icon = template.icon
          return (
            <div
              key={template.type}
              className={`flex items-center gap-3 p-3 bg-${template.color}-50 border border-${template.color}-200 rounded-lg cursor-grab hover:bg-${template.color}-100 transition-colors`}
              draggable
              onDragStart={(e) => onDragStart(e, template.type)}
            >
              <Icon className={`w-5 h-5 text-${template.color}-600`} />
              <div className="flex-1">
                <span className={`text-sm font-medium text-${template.color}-800`}>{template.label}</span>
                <p className={`text-xs text-${template.color}-600`}>{template.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NodesPanel
