# Table Remote - Micro-Frontend Documentation

## Overview

The Table Remote is a micro-frontend application built with Modern.js that implements self-controlled routing using React Router. Unlike the dashboard-remote which uses file-based routing, this application manages its own routing independently and is designed to be loaded and orchestrated by a host application using the Garfish plugin.

## Application Details

- **Name**: table-remote
- **Version**: 0.1.0
- **Type**: Micro-frontend (Remote Application)
- **Routing Strategy**: Self-controlled routing with React Router
- **Port**: 8081
- **Package Manager**: pnpm

## Architecture

### Technology Stack

- **Framework**: Modern.js 2.68.2
- **Micro-frontend Plugin**: Garfish Plugin
- **Routing**: React Router with BrowserRouter
- **Bundler**: Rspack (Modern.js default)
- **Language**: TypeScript
- **Linting**: Biome
- **Git Hooks**: simple-git-hooks with lint-staged

### Project Structure

```
table-remote/
├── src/
│   ├── App.tsx              # Main application component with routing
│   ├── modern.runtime.ts    # Runtime configuration
│   └── modern-app-env.d.ts  # TypeScript declarations
├── dist/                    # Build output
├── modern.config.ts         # Modern.js configuration
├── package.json            # Dependencies and scripts
├── biome.json              # Linting configuration
└── tsconfig.json           # TypeScript configuration
```

## Configuration

### Modern.js Configuration (`modern.config.ts`)

```typescript
import { appTools, defineConfig } from '@modern-js/app-tools';
import { garfishPlugin } from '@modern-js/plugin-garfish';

export default defineConfig({
  dev: {
    port: 8081,
  },
  runtime: {
    router: true,
  },
  deploy: {
    microFrontend: true,
  },
  plugins: [appTools(), garfishPlugin()],
});
```

**Key Configuration Points**:
- **Port**: Explicitly set to 8081 for micro-frontend integration
- **Router**: Enabled for routing functionality
- **Micro-frontend**: Enabled for deployment as micro-frontend
- **Garfish Plugin**: Required for micro-frontend functionality

### Runtime Configuration (`src/modern.runtime.ts`)

```typescript
import { defineRuntimeConfig } from '@modern-js/runtime';

export default defineRuntimeConfig({});
```

Currently empty but can be extended for:
- Custom runtime configurations
- Plugin configurations
- Environment-specific settings

## Application Component

### Main App Component (`src/App.tsx`)

```typescript
import { BrowserRouter, Route, Routes } from '@modern-js/runtime/router';

export default (props: { basename: string }) => {
  const { basename } = props;

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route index element={<div>Self-controlled route root - Table</div>} />
        <Route path={'path'} element={<div>Self-controlled sub route</div>} />
      </Routes>
    </BrowserRouter>
  );
};
```

**Purpose**: Main application component that implements self-controlled routing.

**Key Features**:
- **Props Interface**: Accepts `basename` prop for proper routing integration
- **BrowserRouter**: Uses React Router's BrowserRouter for client-side routing
- **Basename Support**: Integrates with host application's routing context
- **Route Structure**: Implements index and sub-route patterns

**Route Structure**:
- `/` (index) - Main table route
- `/path` - Sub-route for additional functionality

## Self-Controlled Routing

### Routing Strategy

Unlike file-based routing, this application implements self-controlled routing which provides:

**Advantages**:
- **Independent Routing**: Complete control over routing logic
- **Dynamic Routes**: Ability to add routes programmatically
- **Complex Routing**: Support for nested routes and route guards
- **Flexibility**: Custom routing logic and middleware

**Integration with Host**:
- **Basename Prop**: Receives basename from host application
- **Route Isolation**: Routes are isolated from host routing
- **Navigation**: Can implement internal navigation without affecting host

### Route Configuration

```typescript
<Routes>
  <Route index element={<div>Self-controlled route root - Table</div>} />
  <Route path={'path'} element={<div>Self-controlled sub route</div>} />
</Routes>
```

**Current Routes**:
1. **Index Route** (`/`): Main table component
2. **Path Route** (`/path`): Sub-route component

## Development

### Prerequisites

- Node.js >= 16.18.1
- pnpm package manager

### Installation

```bash
cd table-remote
pnpm install
```

### Development Server

```bash
pnpm dev
```

**Access**: `http://localhost:8081`

### Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `serve` - Preview production build
- `lint` - Run Biome linter
- `new` - Add new features or entries
- `upgrade` - Upgrade Modern.js dependencies
- `reset` - Clean node_modules across all packages

## Code Quality

### Biome Configuration (`biome.json`)

**Linting Rules**:
- **Recommended**: All recommended rules enabled
- **Suspicious**: Custom rules for suspicious patterns
- **Formatting**: Consistent code formatting

**Formatting Settings**:
- **Indent**: 2 spaces
- **Quotes**: Single quotes for JS, double quotes for JSX
- **Line Width**: 80 characters
- **Arrow Parentheses**: As needed

### Git Hooks

- **Pre-commit**: Runs lint-staged with Biome checks
- **Staged Files**: Automatically formats and lints staged files

## Micro-Frontend Integration

### Host Application Integration

The table application is designed to be loaded by a host application with:

```typescript
// Host application configuration
masterApp: {
  apps: [{
    name: 'Table',
    entry: 'http://localhost:8081',
  }]
}
```

### Loading in Host

```typescript
import { useModuleApps } from '@modern-js/plugin-garfish/runtime';

const { Table } = useModuleApps();

// Usage
<Table />
```

### Routing Integration

When loaded by the host application:
- **Basename**: Automatically provided by Garfish
- **Route Isolation**: Routes are prefixed with the basename
- **Navigation**: Internal navigation works independently
- **URL Management**: URLs are properly managed within the micro-frontend context

## Build and Deployment

### Build Process

```bash
pnpm build
```

**Output**: `dist/` directory containing:
- `html/` - HTML templates
- `static/` - Static assets
- `route.json` - Route configuration

### Production Considerations

1. **Micro-frontend Flag**: `deploy.microFrontend: true` ensures proper build
2. **Static Assets**: All assets are optimized and bundled
3. **Routing**: Self-controlled routing is preserved in production
4. **CORS**: Ensure proper CORS configuration for cross-origin loading
5. **Basename**: Production basename configuration

## Development Workflow

### Adding New Features

1. **New Routes**: Add routes to the Routes component in App.tsx
2. **Components**: Create components and import them into routes
3. **Navigation**: Implement navigation using React Router hooks
4. **State Management**: Add local state management as needed

### Code Organization

- **Main App**: Single App.tsx file with routing configuration
- **Components**: Create separate component files for route elements
- **Utilities**: Add utility functions and helpers
- **Types**: Define TypeScript interfaces and types

### Routing Best Practices

1. **Route Structure**: Plan route hierarchy before implementation
2. **Component Organization**: Keep route components focused and simple
3. **Navigation**: Use React Router hooks for programmatic navigation
4. **Error Handling**: Implement proper error boundaries for routes

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure port 8081 is available
2. **Module Loading**: Check host application configuration
3. **Routing Issues**: Verify basename configuration and route paths
4. **Build Errors**: Check TypeScript and linting errors

### Debugging

- **Development**: Use browser dev tools for component debugging
- **Routing**: Check React Router DevTools for route debugging
- **Build**: Check build output in `dist/` directory
- **Linting**: Run `pnpm lint` to identify code issues
- **Runtime**: Check browser console for runtime errors

## Best Practices

### Component Development

1. **Simplicity**: Keep components focused and simple
2. **Reusability**: Design components for reuse across routes
3. **TypeScript**: Leverage TypeScript for type safety
4. **Props**: Use proper prop interfaces and validation

### Self-Controlled Routing Best Practices

1. **Route Planning**: Plan route structure before implementation
2. **Basename Handling**: Always use the provided basename prop
3. **Navigation**: Use React Router hooks for consistent navigation
4. **Route Guards**: Implement route guards for protected routes
5. **Error Boundaries**: Add error boundaries for route components

### Micro-Frontend Best Practices

1. **Isolation**: Maintain independence from host application
2. **Communication**: Use proper micro-frontend communication patterns
3. **State Management**: Keep state local to the table application
4. **Performance**: Optimize bundle size and loading times

## Future Enhancements

### Potential Improvements

1. **Table Components**: Add actual table components with data
2. **State Management**: Implement local state management solution
3. **API Integration**: Add data fetching and API integration
4. **Testing**: Add comprehensive unit and integration tests
5. **Accessibility**: Improve accessibility features
6. **Internationalization**: Add multi-language support

### Routing Enhancements

1. **Dynamic Routes**: Implement dynamic route generation
2. **Route Guards**: Add authentication and authorization guards
3. **Lazy Loading**: Implement route-based code splitting
4. **Route Analytics**: Add route tracking and analytics

### Scalability Considerations

1. **Component Library**: Create reusable component library
2. **Performance**: Implement lazy loading and code splitting
3. **Monitoring**: Add performance monitoring and error tracking
4. **Security**: Implement proper security measures

## Dependencies

### Production Dependencies

- `@modern-js/runtime`: Modern.js runtime
- `react`: React library
- `react-dom`: React DOM
- `@modern-js/plugin-garfish`: Micro-frontend plugin

### Development Dependencies

- `@modern-js/app-tools`: Modern.js development tools
- `@modern-js/tsconfig`: TypeScript configuration
- `@biomejs/biome`: Linting and formatting
- `typescript`: TypeScript compiler
- `lint-staged`: Git hooks integration
- `simple-git-hooks`: Git hooks management

## Comparison with Dashboard Remote

### Key Differences

| Feature | Table Remote | Dashboard Remote |
|---------|-------------|------------------|
| Routing Strategy | Self-controlled | File-based |
| Main File | App.tsx | page.tsx |
| Route Management | Manual configuration | Automatic file-based |
| Flexibility | High (custom routing) | Medium (convention-based) |
| Complexity | Higher | Lower |

### When to Use Each

**Use Table Remote when**:
- You need complex routing logic
- Routes need to be dynamic
- Custom route guards are required
- More control over routing is needed

**Use Dashboard Remote when**:
- Simple routing is sufficient
- File-based routing is preferred
- Quick setup is needed
- Convention-based routing is acceptable

## Resources

- [Modern.js Documentation](https://modernjs.dev/en)
- [Garfish Documentation](https://garfish.bytedance.com/)
- [React Router Documentation](https://reactrouter.com/)
- [React Documentation](https://react.dev/)
- [Biome Documentation](https://biomejs.dev/)

## Support

For issues and questions:
1. Check the Modern.js documentation
2. Review Garfish troubleshooting guide
3. Check React Router documentation for routing issues
4. Check browser console for detailed error messages
5. Verify the application is running on port 8081
6. Ensure proper integration with host application 