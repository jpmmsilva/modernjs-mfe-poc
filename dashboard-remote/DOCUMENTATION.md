# Dashboard Remote - Micro-Frontend Documentation

## Overview

The Dashboard Remote is a micro-frontend application built with Modern.js that serves as a file-based routing component within a larger micro-frontend architecture. It's designed to be loaded and orchestrated by a host application using the Garfish plugin.

## Application Details

- **Name**: dashboard
- **Version**: 0.1.0
- **Type**: Micro-frontend (Remote Application)
- **Routing Strategy**: File-based routing
- **Port**: 8082
- **Package Manager**: Yarn

## Architecture

### Technology Stack

- **Framework**: Modern.js 2.68.2
- **Micro-frontend Plugin**: Garfish Plugin
- **Bundler**: Rspack (Modern.js default)
- **Language**: TypeScript
- **Styling**: CSS with custom styles
- **Linting**: Biome
- **Git Hooks**: simple-git-hooks with lint-staged

### Project Structure

```
dashboard-remote/
├── src/
│   ├── routes/
│   │   ├── layout.tsx      # Main layout component
│   │   ├── page.tsx        # Dashboard page component
│   │   └── index.css       # Global styles
│   ├── modern.runtime.ts   # Runtime configuration
│   └── modern-app-env.d.ts # TypeScript declarations
├── dist/                   # Build output
├── modern.config.ts        # Modern.js configuration
├── package.json           # Dependencies and scripts
├── biome.json             # Linting configuration
└── tsconfig.json          # TypeScript configuration
```

## Configuration

### Modern.js Configuration (`modern.config.ts`)

```typescript
import { appTools, defineConfig } from '@modern-js/app-tools';
import { garfishPlugin } from '@modern-js/plugin-garfish';

export default defineConfig({
  dev: {
    port: 8082,
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
- **Port**: Explicitly set to 8082 for micro-frontend integration
- **Router**: Enabled for file-based routing
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

## Components

### Layout Component (`src/routes/layout.tsx`)

```typescript
import { Outlet } from '@modern-js/runtime/router';

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
```

**Purpose**: Provides the main layout structure for the dashboard application.

**Features**:
- Uses React Router's `Outlet` for nested routing
- Minimal layout wrapper
- Extensible for adding navigation, headers, or sidebars

### Dashboard Page (`src/routes/page.tsx`)

```typescript
const Index = () => {
  return <div className="container-box">File based Dashboard subApp</div>;
};

export default Index;
```

**Purpose**: Main dashboard component that displays the dashboard content.

**Features**:
- Simple component structure
- Uses `container-box` CSS class for styling
- Ready for extension with dashboard-specific functionality

## Styling

### Global Styles (`src/routes/index.css`)

The application includes comprehensive global styles with:

**Key Style Features**:
- **Typography**: PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial font stack
- **Background**: Gradient background with light theme
- **Layout**: Flexbox-based centering and responsive design
- **Components**: Card-based design system
- **Interactions**: Hover effects and smooth transitions

**Notable Classes**:
- `.container-box`: Main container with full-height centering
- `.card`: Reusable card component with hover effects
- `.title`: Large title styling
- `.description`: Text description styling
- `.code`: Code block styling

## Development

### Prerequisites

- Node.js >= 16.18.1
- Yarn package manager

### Installation

```bash
cd dashboard-remote
yarn install
```

### Development Server

```bash
yarn dev
```

**Access**: `http://localhost:8082`

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

The dashboard is designed to be loaded by a host application with:

```typescript
// Host application configuration
masterApp: {
  apps: [{
    name: 'Dashboard',
    entry: 'http://localhost:8082'
  }]
}
```

### Loading in Host

```typescript
import { useModuleApps } from '@modern-js/plugin-garfish/runtime';

const { Dashboard } = useModuleApps();

// Usage
<Dashboard />
```

## Build and Deployment

### Build Process

```bash
yarn build
```

**Output**: `dist/` directory containing:
- `routes-manifest.json` - Routing information
- `html/` - HTML templates
- `static/` - Static assets
- `route.json` - Route configuration
- `nestedRoutes.json` - Nested routing data

### Production Considerations

1. **Micro-frontend Flag**: `deploy.microFrontend: true` ensures proper build
2. **Static Assets**: All assets are optimized and bundled
3. **Routing**: File-based routing is preserved in production
4. **CORS**: Ensure proper CORS configuration for cross-origin loading

## Development Workflow

### Adding New Features

1. **New Routes**: Add files to `src/routes/` directory
2. **Components**: Create components in appropriate directories
3. **Styling**: Add styles to `index.css` or create component-specific CSS
4. **Testing**: Implement tests for new functionality

### Code Organization

- **Routes**: File-based routing in `src/routes/`
- **Components**: Reusable components in dedicated directories
- **Styles**: Global styles in `index.css`
- **Configuration**: Modern.js config in root directory

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure port 8082 is available
2. **Module Loading**: Check host application configuration
3. **Styling Issues**: Verify CSS class names and imports
4. **Build Errors**: Check TypeScript and linting errors

### Debugging

- **Development**: Use browser dev tools for component debugging
- **Build**: Check build output in `dist/` directory
- **Linting**: Run `yarn lint` to identify code issues
- **Runtime**: Check browser console for runtime errors

## Best Practices

### Component Development

1. **Simplicity**: Keep components focused and simple
2. **Reusability**: Design components for reuse across the application
3. **Styling**: Use consistent CSS classes and naming conventions
4. **TypeScript**: Leverage TypeScript for type safety

### Micro-Frontend Best Practices

1. **Isolation**: Maintain independence from host application
2. **Communication**: Use proper micro-frontend communication patterns
3. **State Management**: Keep state local to the dashboard
4. **Performance**: Optimize bundle size and loading times

## Future Enhancements

### Potential Improvements

1. **Dashboard Components**: Add charts, tables, and data visualization
2. **State Management**: Implement local state management solution
3. **API Integration**: Add data fetching and API integration
4. **Testing**: Add comprehensive unit and integration tests
5. **Accessibility**: Improve accessibility features
6. **Internationalization**: Add multi-language support

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

## Resources

- [Modern.js Documentation](https://modernjs.dev/en)
- [Garfish Documentation](https://garfish.bytedance.com/)
- [React Documentation](https://react.dev/)
- [Biome Documentation](https://biomejs.dev/)

## Support

For issues and questions:
1. Check the Modern.js documentation
2. Review Garfish troubleshooting guide
3. Check browser console for detailed error messages
4. Verify the application is running on port 8082
5. Ensure proper integration with host application 