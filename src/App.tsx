"use client"
import { ReactFlowProvider } from "@xyflow/react"
import { useFlowStore } from "./store/flowStore"
import FlowCanvas from "./components/FlowCanvas"
import NodesPanel from "./components/panels/NodesPanel"
import SettingsPanel from "./components/panels/SettingsPanel"
import { Toaster } from "./components/ui/toaster"

function App() {
  const { selectedNodeId, validateAndSave } = useFlowStore()

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Header with Save button */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Chatbot Flow Builder</h1>
          <button
            onClick={validateAndSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Changes
          </button>
        </header>

        {/* Main content area */}
        <div className="flex-1 flex">
          {/* Left sidebar - either Nodes Panel or Settings Panel */}
          {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}

          {/* Main canvas area */}
          <FlowCanvas />
        </div>
      </div>
      <Toaster />
    </ReactFlowProvider>
  )
}

export default App
