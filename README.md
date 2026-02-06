# SimPad 📝

**SimPad** is a lightweight, aesthetically pleasing notepad application designed for simplicity and focus. Built with **Tauri**, **React**, and **TypeScript**, it offers a fast and native experience on Windows.

## ✨ Features

- **Document Modes**:
  - 📄 **Text**: Standard plain text editing.
  - 💻 **Code**: Syntax highlighting for snippets (JavaScript default).
  - ☑️ **Checklist**: Interactive to-do lists with drag-and-drop reordering.
- **Auto-Save**: Never lose your work. Changes are saved automatically to local storage.
- **Global Theme**: A soothing "Warm Paper" theme (`#F1E9D2`) designed for comfort.
- **Tabbed Interface**: Work on multiple documents simultaneously.
- **Find & Replace**: Robust search functionality.
- **Keyboard Shortcuts**:
  - `Ctrl + N`: New Document
  - `Ctrl + W`: Close Tab
  - `Ctrl + S`: Save (Quick Save)
  - `Ctrl + Tab`: Cycle Next Tab
  - `Ctrl + Shift + Tab`: Cycle Previous Tab

## 🚀 Setup Guide

To set up the project locally for development:

### Prerequisites

1.  **Node.js**: Install from [nodejs.org](https://nodejs.org/).
2.  **Rust & Cargo**: Required for Tauri. Install from [rustup.rs](https://rustup.rs/).
3.  **Visual Studio C++ Build Tools**: Required for Rust on Windows.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Priyatham-Konda/SimPad.git
cd Notepad-simple
npm install
```

### Development

Run the application in development mode (with hot-reloading):

```bash
npm run tauri dev
```

## 📦 Building for Production

To create a standalone MSI installer for Windows:

```bash
npm run tauri build
```

The installer will be generated in `src-tauri/target/release/bundle/msi/`.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend / Core**: Tauri (Rust)
- **Icons**: Lucide React
- **Editor**: Monaco Editor (for Code mode)
- **Drag & Drop**: @dnd-kit

---
*Created by Priyatham Konda*
