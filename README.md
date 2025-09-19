
## 🚀 Overview

Chatbot Flow Builder is a modern, interactive web application for designing chatbot conversation flows visually. It allows you to create, edit, and manage complex chatbot logic using a node-based interface. Each node represents a message, condition, delay, API call, or webhook, making it easy to build sophisticated conversational experiences without code.

## ✨ Features

- **Drag-and-drop Node Editor**: Add, move, and connect nodes visually.
- **Node Types**: Text Message, Condition, Delay, API Call, Webhook.
- **Customizable Node Settings**: Edit node properties in a sidebar.
- **Flow Validation**: Built-in validation before saving.
- **Export/Import**: Save and load flows as JSON.
- **Modern UI**: Built with Tailwind CSS and Radix UI components.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [@xyflow/react](https://xyflow.com/) (React Flow)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

## 📦 Project Structure

```
├── app/                # Next.js app directory
├── components/         # Theme and shared components
├── public/             # Static assets
├── src/
│   ├── App.tsx         # Main app entry (for SPA mode)
│   ├── components/     # FlowCanvas, nodes, panels, UI
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities and validators
│   ├── store/          # Zustand store
│   ├── types/          # TypeScript types
├── styles/             # Global styles
├── package.json        # Project metadata and scripts
```

## 🖥️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SujayGh0sh/Chatbot-Flow-Builder.git
cd Chatbot-Flow-Builder
```

### 2. Install dependencies

> **Note:** This project uses React 19. Some dependencies may show peer warnings. Use `--force` if needed.

```bash
npm install --force
# or
pnpm install --force
```

### 3. Run the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### 4. Build for production

```bash
npm run build
npm start
```

## 🧩 Usage

1. **Add Nodes**: Drag node types from the left panel onto the canvas.
2. **Connect Nodes**: Click and drag from one node's handle to another to create edges.
3. **Edit Nodes**: Click a node to open its settings panel and edit properties.
4. **Save Flow**: Click "Save Changes" in the header to validate and save your flow.
5. **Export/Import**: Use the export/import features to save or load flows as JSON files.

## 📝 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint codebase

## ⚠️ Notes

- If you see peer dependency warnings for React, use `--force` as shown above.
- The UI is optimized for modern browsers and desktop screens.
- For issues or feature requests, open an issue on GitHub.

**Portfolio Website** - https://sujayghosh.in

2025 © Made with ❤️ by Sujay Ghosh
