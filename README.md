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

SimPad can be built as a standalone **MSI Installer** or **Executable** for Windows.

### 1. Generate the Build
Run the build command to compile the React frontend and Rust backend:

```bash
npm run tauri build
```

### 2. Locate the Installer
Once completed, you will find the installers in the following directory:

`src-tauri/target/release/bundle/msi/`

> **Note**: The `.msi` file is the standard installer. You may also find a `.exe` setup file in the `nsis` folder if configured.

### 🛠️ Troubleshooting Builds
- **Error: "WiX Toolset not found"**: You need to install the WiX Toolset to build MSI installers.
  - Run: `winget install verify return -e --id Robware.WiXToolset`
- **Error: "WebView2 not found"**: Ensure your Windows environment has the WebView2 runtime installed (standard on Windows 10/11).

## 🚀 Releasing Updates

SimPad supports auto-updates via GitHub Releases.

1.  **Update Version**: Bump version in `tauri.conf.json` and `package.json`.
2.  **Build & Sign**:
    ```bash
    npm run tauri build
    ```
    (Ensure `TAURI_SIGNING_PRIVATE_KEY` environment variable is set or `private.key` is present).
3.  **Update `latest.json`**:
    - Update `latest.json` in your repository with the new version details and signature from the build output.
    - The signature can be found in `src-tauri/target/release/bundle/msi/SimPad_x.x.x_x64_en-US.msi.sig` (or similar).

## 📄 License

This project is licensed under the [MIT License](LICENSE).
- **Free to use**
- **Open Source**

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend / Core**: Tauri (Rust)
- **Icons**: Lucide React
- **Editor**: Monaco Editor (for Code mode)
- **Drag & Drop**: @dnd-kit

---
*Created by Priyatham Konda*
