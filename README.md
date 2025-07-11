# Modern.js Micro-Frontend POC

A proof-of-concept demonstrating micro-frontend architecture using Modern.js with Garfish for module federation. This project showcases two different routing strategies within a unified micro-frontend ecosystem.

## 🏗️ Architecture Overview

This project consists of three independent applications that work together to create a seamless micro-frontend experience:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Host App      │    │  Dashboard      │    │   Table App     │
│  (Port 8080)    │◄──►│  (Port 8082)    │    │  (Port 8081)    │
│                 │    │                 │    │                 │
│ • Orchestrates  │    │ • File-based    │    │ • Self-controlled│
│ • Loads MFs     │    │   routing       │    │   routing       │
│ • Navigation    │    │ • Simple UI     │    │ • Complex UI    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Applications

| Application | Type | Port | Routing Strategy | Purpose |
|-------------|------|------|------------------|---------|
| **host-filebased** | Host | 8080 | File-based | Main orchestrator |
| **dashboard-remote** | Remote | 8082 | File-based | Dashboard functionality |
| **table-remote** | Remote | 8081 | Self-controlled | Table functionality |

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.18.1
- pnpm (for host and table-remote)
- yarn (for dashboard-remote)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd poc-modernjs
   ```

2. **Install all applications**
   ```bash
   # Host application
   cd host-filebased
   pnpm install
   
   # Dashboard remote
   cd ../dashboard-remote
   yarn install
   
   # Table remote
   cd ../table-remote
   pnpm install
   ```

3. **Start all applications**
   ```bash
   # Terminal 1: Start dashboard remote (Port 8082)
   cd dashboard-remote
   yarn dev
   
   # Terminal 2: Start table remote (Port 8081)
   cd table-remote
   pnpm dev
   
   # Terminal 3: Start host application (Port 8080)
   cd host-filebased
   pnpm dev
   ```

4. **Access the application**
   - Open `http://localhost:8080` in your browser
   - Navigate between micro-frontends using the provided links

## 🔗 How Applications Connect

### 1. Host Application (`host-filebased`)

The host application serves as the **orchestrator** and **container** for all micro-frontends.

**Key Responsibilities**:
- Loads and manages micro-frontend applications
- Provides navigation between different micro-frontends
- Handles routing coordination
- Manages shared state and communication

**Configuration** (`src/modern.runtime.ts`):
```typescript
export default defineRuntimeConfig({
  masterApp: {
    apps: [{
      name: 'Table',
      entry: 'http://localhost:8081',
    }, {
      name: 'Dashboard',
      entry: 'http://localhost:8082'
    }]
  },
});
```

**Loading Micro-Frontends**:
```typescript
// In route components
import { useModuleApps } from '@modern-js/plugin-garfish/runtime';

const { Dashboard, Table } = useModuleApps();

// Usage
<Dashboard />
<Table />
```

### 2. Dashboard Remote (`dashboard-remote`)

A **file-based routing** micro-frontend that provides dashboard functionality.

**Key Characteristics**:
- Uses Modern.js file-based routing
- Simple component structure
- Automatically integrated with host routing
- Runs on port 8082

**Integration**:
- Loaded by host application via Garfish
- Routes are automatically prefixed by host
- Minimal configuration required

### 3. Table Remote (`table-remote`)

A **self-controlled routing** micro-frontend that provides table functionality.

**Key Characteristics**:
- Uses React Router with BrowserRouter
- Accepts `basename` prop for proper integration
- More complex routing structure
- Runs on port 8081

**Integration**:
- Loaded by host application via Garfish
- Receives basename prop for routing context
- Manages its own routing independently

## 🛣️ Routing Architecture

### Host Application Routing

The host uses file-based routing with the following structure:

```
/                    → Home page
├── /dashboard      → Loads Dashboard micro-frontend
└── /table          → Loads Table micro-frontend
```

### Micro-Frontend Routing Strategies

#### File-Based Routing (Dashboard)
- **Location**: `dashboard-remote/src/routes/`
- **Structure**: Automatic route generation based on file structure
- **Integration**: Seamless integration with host routing
- **Complexity**: Low - convention-based

#### Self-Controlled Routing (Table)
- **Location**: `table-remote/src/App.tsx`
- **Structure**: Manual route configuration with React Router
- **Integration**: Uses basename prop for proper context
- **Complexity**: High - full control over routing

## 🔄 Communication Flow

```
┌─────────────┐    HTTP Request    ┌─────────────┐
│    Host     │ ──────────────────► │  Dashboard  │
│  (Port 8080) │                    │  (Port 8082) │
│             │ ◄────────────────── │             │
└─────────────┘    Module Load     └─────────────┘
       │                                    ▲
       │                                    │
       │ HTTP Request                       │
       ▼                                    │
┌─────────────┐    HTTP Request    ┌─────────────┐
│    Host     │ ──────────────────► │    Table    │
│  (Port 8080) │                    │  (Port 8081) │
│             │ ◄────────────────── │             │
└─────────────┘    Module Load     └─────────────┘
```

### Loading Process

1. **User Navigation**: User clicks a link in the host application
2. **Route Matching**: Host application matches the route to a micro-frontend
3. **Module Loading**: Garfish loads the appropriate micro-frontend
4. **Component Rendering**: Micro-frontend component renders within the host
5. **Routing Context**: Micro-frontend receives proper routing context

## 🛠️ Development Workflow

### Adding New Features

1. **Host Application**:
   - Add new routes in `src/routes/`
   - Configure new micro-frontends in `modern.runtime.ts`
   - Update navigation in layout component

2. **Dashboard Remote**:
   - Add new files in `src/routes/` for automatic routing
   - Create components and import them
   - Update styles in `index.css`

3. **Table Remote**:
   - Add new routes in `App.tsx`
   - Create components for route elements
   - Implement navigation using React Router hooks

### Development Commands

All applications support the same set of commands:

```bash
# Development
pnpm dev          # or yarn dev
pnpm build        # or yarn build
pnpm start        # or yarn start
pnpm serve        # or yarn serve

# Code Quality
pnpm lint         # or yarn lint
pnpm new          # or yarn new
pnpm upgrade      # or yarn upgrade
```

## 📁 Project Structure

```
poc-modernjs/
├── host-filebased/          # Main host application
│   ├── src/
│   │   ├── routes/
│   │   │   ├── layout.tsx   # Main layout with navigation
│   │   │   ├── page.tsx     # Home page
│   │   │   ├── dashboard/
│   │   │   │   └── $.tsx    # Dashboard micro-frontend loader
│   │   │   └── table/
│   │   │       └── $.tsx    # Table micro-frontend loader
│   │   └── modern.runtime.ts # Runtime configuration
│   └── modern.config.ts     # Modern.js configuration
├── dashboard-remote/         # Dashboard micro-frontend
│   ├── src/
│   │   └── routes/
│   │       ├── layout.tsx   # Dashboard layout
│   │       ├── page.tsx     # Dashboard component
│   │       └── index.css    # Global styles
│   └── modern.config.ts     # Modern.js configuration
└── table-remote/            # Table micro-frontend
    ├── src/
    │   └── App.tsx          # Main app with routing
    └── modern.config.ts     # Modern.js configuration
```

## 🔧 Configuration

### Port Configuration

Each application runs on a specific port to avoid conflicts:

- **Host**: 8080 (default Modern.js port)
- **Dashboard**: 8082 (explicitly configured)
- **Table**: 8081 (explicitly configured)

### Micro-Frontend Configuration

All applications use the Garfish plugin for micro-frontend functionality:

```typescript
// In modern.config.ts
plugins: [appTools(), garfishPlugin()],
deploy: {
  microFrontend: true,
}
```

## 🚀 Deployment

### Build Process

1. **Build all micro-frontends**:
   ```bash
   # Dashboard
   cd dashboard-remote
   yarn build
   
   # Table
   cd table-remote
   pnpm build
   ```

2. **Build host application**:
   ```bash
   cd host-filebased
   pnpm build
   ```

3. **Deploy all applications** to your hosting platform

### Production Considerations

- Update entry URLs in host configuration for production
- Configure proper CORS settings
- Set up proper domain routing
- Ensure all micro-frontends are accessible

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**:
   - Ensure ports 8080, 8081, and 8082 are available
   - Check if other applications are using these ports

2. **Module Loading Issues**:
   - Verify all micro-frontends are running
   - Check browser console for module federation errors
   - Ensure proper CORS configuration

3. **Routing Issues**:
   - Verify basename configuration for table-remote
   - Check route paths and navigation
   - Ensure proper integration with host routing

### Debugging

- **Browser Console**: Check for JavaScript errors and module loading issues
- **Network Tab**: Verify HTTP requests to micro-frontend entries
- **React DevTools**: Debug component hierarchy and props
- **Modern.js Dev Tools**: Use Modern.js debugging features

## 📚 Documentation

Each application has its own detailed documentation:

- [Host Application Documentation](./host-filebased/README.md)
- [Dashboard Remote Documentation](./dashboard-remote/DOCUMENTATION.md)
- [Table Remote Documentation](./table-remote/DOCUMENTATION.md)
- [General Project Documentation](./DOCUMENTATION.md)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test all applications**
5. **Submit a pull request**

### Development Guidelines

- Follow the existing code structure and patterns
- Maintain micro-frontend isolation
- Use consistent naming conventions
- Add appropriate documentation
- Test integration between applications

## 📖 Resources

- [Modern.js Documentation](https://modernjs.dev/en)
- [Garfish Documentation](https://garfish.bytedance.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Module Federation Guide](https://webpack.js.org/concepts/module-federation/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:

1. Check the application-specific documentation
2. Review the Modern.js and Garfish documentation
3. Check browser console for detailed error messages
4. Verify all applications are running on correct ports
5. Ensure proper integration between applications

---

**Note**: This is a proof-of-concept demonstrating micro-frontend architecture. For production use, consider additional security, performance, and monitoring requirements. 