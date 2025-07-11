# Modern.js Micro-Frontend Project Documentation

## Overview

This project demonstrates a micro-frontend architecture using Modern.js with Garfish for module federation. The project consists of three applications:

1. **Host Application** (`host-filebased`) - The main application that loads and orchestrates micro-frontends
2. **Dashboard Remote** (`dashboard-remote`) - A file-based routing micro-frontend
3. **Table Remote** (`table-remote`) - A self-controlled routing micro-frontend

## Architecture

### Technology Stack

- **Framework**: Modern.js 2.68.2
- **Micro-frontend Solution**: Garfish Plugin
- **Bundler**: Rspack (configurable to Webpack)
- **Language**: TypeScript
- **Package Manager**: pnpm (host and table-remote), yarn (dashboard-remote)
- **Linting**: Biome
- **Git Hooks**: simple-git-hooks with lint-staged

### Project Structure

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
├── dashboard-remote/         # Dashboard micro-frontend
│   └── src/
│       └── routes/
│           └── page.tsx     # Dashboard component
└── table-remote/            # Table micro-frontend
    └── src/
        └── App.tsx          # Self-controlled routing app
```

## Applications

### 1. Host Application (`host-filebased`)

**Purpose**: Main application that serves as the container for micro-frontends.

**Key Features**:
- Uses Garfish plugin for micro-frontend orchestration
- Implements file-based routing with React Router
- Provides navigation between different micro-frontends
- Configures remote applications in runtime configuration

**Configuration**:
- **Port**: Default Modern.js port (likely 8080)
- **Bundler**: Rspack (configurable to Webpack)
- **Runtime**: Router enabled

**Remote Apps Configuration**:
```typescript
masterApp: {
  apps: [{
    name: 'Table',
    entry: 'http://localhost:8081',
  }, {
    name: 'Dashboard',
    entry: 'http://localhost:8082'
  }]
}
```

### 2. Dashboard Remote (`dashboard-remote`)

**Purpose**: File-based routing micro-frontend for dashboard functionality.

**Key Features**:
- Uses Modern.js file-based routing
- Simple component-based architecture
- Integrated with host application via Garfish

**Configuration**:
- **Port**: 8082
- **Routing**: File-based (Modern.js default)
- **Package Manager**: Yarn

### 3. Table Remote (`table-remote`)

**Purpose**: Self-controlled routing micro-frontend for table functionality.

**Key Features**:
- Implements self-controlled routing with React Router
- Accepts `basename` prop for proper routing integration
- More complex routing structure with sub-routes

**Configuration**:
- **Port**: 8081
- **Routing**: Self-controlled with BrowserRouter
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js >= 16.18.1
- pnpm (for host and table-remote)
- yarn (for dashboard-remote)

### Installation

1. **Install Host Application**:
   ```bash
   cd host-filebased
   pnpm install
   ```

2. **Install Dashboard Remote**:
   ```bash
   cd dashboard-remote
   yarn install
   ```

3. **Install Table Remote**:
   ```bash
   cd table-remote
   pnpm install
   ```

### Development

1. **Start Dashboard Remote** (Port 8082):
   ```bash
   cd dashboard-remote
   yarn dev
   ```

2. **Start Table Remote** (Port 8081):
   ```bash
   cd table-remote
   pnpm dev
   ```

3. **Start Host Application** (Port 8080):
   ```bash
   cd host-filebased
   pnpm dev
   ```

4. **Access the Application**:
   - Open `http://localhost:8080` in your browser
   - Navigate between micro-frontends using the provided links

### Available Scripts

All applications support the following scripts:

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `serve` - Preview production build
- `lint` - Run Biome linter
- `new` - Add new features or entries
- `upgrade` - Upgrade Modern.js dependencies

## Routing Architecture

### Host Application Routing

The host application uses file-based routing with the following structure:

- `/` - Home page
- `/dashboard` - Loads Dashboard micro-frontend
- `/table` - Loads Table micro-frontend

### Micro-Frontend Integration

#### File-Based Routing (Dashboard)
- Uses Modern.js file-based routing
- Automatically integrated with host routing
- Simple component structure

#### Self-Controlled Routing (Table)
- Uses React Router with BrowserRouter
- Accepts `basename` prop for proper integration
- Supports sub-routes (`/path`)

## Development Workflow

### Code Quality

All applications use:
- **Biome** for linting and formatting
- **simple-git-hooks** for pre-commit hooks
- **lint-staged** for staged file processing

### TypeScript Configuration

- Uses `@modern-js/tsconfig` for consistent TypeScript configuration
- Strict type checking enabled
- Modern.js type definitions included

### Build Configuration

- **Development**: Hot module replacement enabled
- **Production**: Optimized builds with Rspack
- **Runtime**: Router and Garfish integration

## Deployment

### Build Process

1. **Build Micro-Frontends**:
   ```bash
   # Dashboard
   cd dashboard-remote
   yarn build
   
   # Table
   cd table-remote
   pnpm build
   ```

2. **Build Host Application**:
   ```bash
   cd host-filebased
   pnpm build
   ```

### Production Considerations

- Ensure all micro-frontends are built and deployed
- Update entry URLs in host configuration for production
- Configure proper CORS settings
- Set up proper domain routing

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 8080, 8081, and 8082 are available
2. **Module Loading**: Check that all micro-frontends are running
3. **Routing Issues**: Verify basename configuration for self-controlled routing
4. **Build Errors**: Ensure all dependencies are properly installed

### Debugging

- Check browser console for module federation errors
- Verify network requests to micro-frontend entries
- Use Modern.js dev tools for debugging

## Best Practices

### Micro-Frontend Development

1. **Isolation**: Keep micro-frontends as independent as possible
2. **Shared Dependencies**: Use module federation for shared libraries
3. **Routing**: Choose appropriate routing strategy (file-based vs self-controlled)
4. **State Management**: Implement proper state isolation

### Host Application

1. **Configuration**: Centralize micro-frontend configuration
2. **Error Handling**: Implement proper error boundaries
3. **Loading States**: Provide loading indicators for micro-frontends
4. **Performance**: Optimize loading and caching strategies

## Future Enhancements

### Potential Improvements

1. **Shared Component Library**: Create a shared component library
2. **State Management**: Implement global state management solution
3. **Testing**: Add comprehensive testing strategy
4. **CI/CD**: Set up automated deployment pipeline
5. **Monitoring**: Add application performance monitoring

### Scalability Considerations

1. **Dynamic Loading**: Implement dynamic micro-frontend loading
2. **Caching**: Add proper caching strategies
3. **Security**: Implement proper security measures
4. **Performance**: Optimize bundle sizes and loading times

## Resources

- [Modern.js Documentation](https://modernjs.dev/en)
- [Garfish Documentation](https://garfish.bytedance.com/)
- [Module Federation Guide](https://webpack.js.org/concepts/module-federation/)
- [React Router Documentation](https://reactrouter.com/)

## Support

For issues and questions:
1. Check the Modern.js documentation
2. Review Garfish troubleshooting guide
3. Check browser console for detailed error messages
4. Verify all applications are running on correct ports 