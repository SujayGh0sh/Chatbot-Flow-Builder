"use client"
import { ArrowLeft, Save } from "lucide-react"
import { useFlowStore } from "../../store/flowStore"
import type { TextNodeData, ConditionalNodeData, DelayNodeData, ApiNodeData, WebhookNodeData } from "../../types/flow"
import { toast } from "../../hooks/use-toast"

// Panel for editing selected node properties
const SettingsPanel = () => {
  const { nodes, selectedNodeId, updateNodeData, setSelectedNode } = useFlowStore()

  const selectedNode = nodes.find((node) => node.id === selectedNodeId)

  if (!selectedNode) {
    return null
  }

  const handleBack = () => {
    setSelectedNode(null)
  }

  const handleSaveNode = () => {
    toast({
      title: "Node Updated",
      description: "Node settings have been saved successfully.",
      variant: "default",
    })
  }

  const handleUpdateNodeData = (nodeId: string, newData: any) => {
    updateNodeData(nodeId, newData)
    // Show toast for significant changes (like text content, URLs, etc.)
    if (newData.text || newData.url || newData.webhookUrl || newData.condition) {
      toast({
        title: "Node Updated",
        description: "Changes saved automatically.",
        variant: "default",
      })
    }
  }

  const renderNodeSettings = () => {
    switch (selectedNode.type) {
      case "textMessage":
        const textData = selectedNode.data as TextNodeData
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
            <textarea
              value={textData.text || ""}
              onChange={(e) => handleUpdateNodeData(selectedNode.id, { text: e.target.value })}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your message..."
            />
          </div>
        )

      case "conditional":
        const conditionalData = selectedNode.data as ConditionalNodeData
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <input
                type="text"
                value={conditionalData.condition || ""}
                onChange={(e) => handleUpdateNodeData(selectedNode.id, { condition: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="e.g., user.age > 18"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">True Label</label>
              <input
                type="text"
                value={conditionalData.trueLabel || ""}
                onChange={(e) => updateNodeData(selectedNode.id, { trueLabel: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="True"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">False Label</label>
              <input
                type="text"
                value={conditionalData.falseLabel || ""}
                onChange={(e) => updateNodeData(selectedNode.id, { falseLabel: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="False"
              />
            </div>
          </div>
        )

      case "delay":
        const delayData = selectedNode.data as DelayNodeData
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delay Amount</label>
              <input
                type="number"
                value={delayData.delay || 0}
                onChange={(e) => updateNodeData(selectedNode.id, { delay: Number.parseInt(e.target.value) || 0 })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="5"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Unit</label>
              <select
                value={delayData.unit || "seconds"}
                onChange={(e) =>
                  updateNodeData(selectedNode.id, { unit: e.target.value as "seconds" | "minutes" | "hours" })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
          </div>
        )

      case "apiCall":
        const apiData = selectedNode.data as ApiNodeData
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API URL</label>
              <input
                type="url"
                value={apiData.url || ""}
                onChange={(e) => handleUpdateNodeData(selectedNode.id, { url: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="https://api.example.com/endpoint"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">HTTP Method</label>
              <select
                value={apiData.method || "GET"}
                onChange={(e) =>
                  updateNodeData(selectedNode.id, { method: e.target.value as "GET" | "POST" | "PUT" | "DELETE" })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headers (JSON)</label>
              <textarea
                value={JSON.stringify(apiData.headers || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const headers = JSON.parse(e.target.value)
                    updateNodeData(selectedNode.id, { headers })
                    toast({
                      title: "Headers Updated",
                      description: "API headers have been updated.",
                      variant: "default",
                    })
                  } catch {
                    toast({
                      title: "Invalid JSON",
                      description: "Please enter valid JSON for headers.",
                      variant: "destructive",
                    })
                  }
                }}
                className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm"
                placeholder='{"Content-Type": "application/json"}'
              />
            </div>
          </div>
        )

      case "webhook":
        const webhookData = selectedNode.data as WebhookNodeData
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
              <input
                type="url"
                value={webhookData.webhookUrl || ""}
                onChange={(e) => handleUpdateNodeData(selectedNode.id, { webhookUrl: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="https://webhook.example.com/endpoint"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payload (JSON)</label>
              <textarea
                value={webhookData.payload || ""}
                onChange={(e) => {
                  updateNodeData(selectedNode.id, { payload: e.target.value })
                  // Validate JSON and show appropriate toast
                  if (e.target.value.trim()) {
                    try {
                      JSON.parse(e.target.value)
                      toast({
                        title: "Payload Updated",
                        description: "Webhook payload has been updated.",
                        variant: "default",
                      })
                    } catch {
                      toast({
                        title: "Invalid JSON",
                        description: "Please enter valid JSON for the payload.",
                        variant: "destructive",
                      })
                    }
                  }
                }}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm"
                placeholder='{"message": "Hello from chatbot"}'
              />
            </div>
          </div>
        )

      default:
        return <div className="text-gray-500">No settings available for this node type.</div>
    }
  }

  const getNodeTitle = () => {
    switch (selectedNode.type) {
      case "textMessage":
        return "Text Message"
      case "conditional":
        return "Condition"
      case "delay":
        return "Delay"
      case "apiCall":
        return "API Call"
      case "webhook":
        return "Webhook"
      default:
        return "Node Settings"
    }
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-800">{getNodeTitle()}</h3>
      </div>

      <div className="space-y-4">{renderNodeSettings()}</div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleSaveNode}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Save className="w-4 h-4" />
          Save Node
        </button>
      </div>
    </div>
  )
}

export default SettingsPanel
