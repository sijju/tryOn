# Virtual Try-On Refactoring Plan

## Overview
This document outlines the refactoring strategy to transform the current monolithic codebase into a well-structured, component-based architecture for both frontend and backend. The goal is to improve maintainability, reusability, and extensibility.

## Current State Analysis

### Frontend (React + TypeScript)
**Current Issues:**
- Single large `App.tsx` component handling all functionality
- All styles in one `App.css` file
- Mixed concerns (UI, API calls, state management)
- No reusable components
- Hard to test individual features

### Backend (Rust + Axum)
**Current Issues:**
- All code in `main.rs` (handlers, API logic, types)
- Mixed concerns (routing, business logic, API integration)
- No separation of modules
- Hard to extend with new features
- Difficult to test individual components

## Refactoring Strategy

### Phase 1: Frontend Component Architecture

#### 1.1 Progress Tracker
- [x] Set up React Query and dependencies
- [x] Create base folder structure
- [x] Configure QueryClient and API service
- [x] Create TypeScript types and interfaces
- [x] Implement useTryOnMutation hook
- [x] Implement useImageUpload hook
- [x] Create Button component
- [x] Create Loader component
- [x] Create Message component
- [x] Create UploadArea component
- [x] Create ImagePreview component
- [x] Create UploadSection component
- [x] Create ResultDisplay component
- [x] Create ResultImage component
- [x] Create Header component
- [x] Create Layout component
- [x] Update main App.tsx with new components
- [ ] Test component integration
- [ ] Clean up old code

#### 1.2 Component Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   ├── Loader/
│   │   │   ├── Loader.tsx
│   │   │   ├── Loader.module.css
│   │   │   └── index.ts
│   │   └── Message/
│   │       ├── Message.tsx
│   │       ├── Message.module.css
│   │       └── index.ts
│   ├── upload/
│   │   ├── UploadArea/
│   │   │   ├── UploadArea.tsx
│   │   │   ├── UploadArea.module.css
│   │   │   └── index.ts
│   │   ├── ImagePreview/
│   │   │   ├── ImagePreview.tsx
│   │   │   ├── ImagePreview.module.css
│   │   │   └── index.ts
│   │   └── UploadSection/
│   │       ├── UploadSection.tsx
│   │       ├── UploadSection.module.css
│   │       └── index.ts
│   ├── result/
│   │   ├── ResultDisplay/
│   │   │   ├── ResultDisplay.tsx
│   │   │   ├── ResultDisplay.module.css
│   │   │   └── index.ts
│   │   └── ResultImage/
│   │       ├── ResultImage.tsx
│   │       ├── ResultImage.module.css
│   │       └── index.ts
│   └── layout/
│       ├── Header/
│       │   ├── Header.tsx
│       │   ├── Header.module.css
│       │   └── index.ts
│       └── Layout/
│           ├── Layout.tsx
│           ├── Layout.module.css
│           └── index.ts
├── hooks/
│   ├── useImageUpload.ts
│   ├── useTryOnMutation.ts
│   ├── useLocalStorage.ts
│   └── useImageCache.ts
├── services/
│   ├── api.ts
│   ├── queryClient.ts
│   └── types.ts
├── store/ (optional - if Redux is needed)
│   ├── index.ts
│   ├── slices/
│   │   ├── userPreferencesSlice.ts
│   │   └── uiStateSlice.ts
│   └── middleware/
├── utils/
│   ├── imageUtils.ts
│   └── validation.ts
└── styles/
    ├── globals.css
    ├── variables.css
    └── mixins.css
```

#### 1.2 Component Responsibilities

**Common Components:**
- `Button`: Reusable button with variants (primary, secondary, disabled states)
- `Loader`: Loading spinner with different sizes and styles
- `Message`: Success/error message display with auto-dismiss

**Upload Components:**
- `UploadArea`: Drag-and-drop file upload with preview
- `ImagePreview`: Display uploaded image with filename and remove option
- `UploadSection`: Container for person and clothing upload areas

**Result Components:**
- `ResultDisplay`: Container for displaying try-on results
- `ResultImage`: Optimized image display with zoom and download options

**Layout Components:**
- `Header`: App title and description
- `Layout`: Main app layout with responsive design

#### 1.3 State Management
**React Query (TanStack Query):**
- Server state management for API calls
- Automatic caching, background updates, and error handling
- Optimistic updates and retry logic
- Perfect for try-on API calls and image processing

**Redux Toolkit (Optional - if complex state emerges):**
- Global client state management
- User preferences and settings
- Complex UI state coordination
- Time-travel debugging capabilities

#### 1.4 Custom Hooks
- `useImageUpload`: Handle file upload logic and validation
- `useTryOnMutation`: React Query mutation for try-on API calls
- `useLocalStorage`: Persist user preferences and recent uploads
- `useImageCache`: Cache and manage uploaded images locally

#### 1.5 Services & Utils
- `api.ts`: Centralized API client with React Query integration
- `queryClient.ts`: React Query configuration and setup
- `types.ts`: TypeScript interfaces and types
- `imageUtils.ts`: Image processing utilities
- `validation.ts`: Form and file validation logic

### Phase 2: Backend Module Architecture

#### 2.1 Module Structure
```
src/
├── main.rs              # Application entry point
├── config/
│   ├── mod.rs
│   └── settings.rs      # Environment variables and configuration
├── routes/
│   ├── mod.rs
│   ├── health.rs        # Health check endpoints
│   └── try_on.rs        # Try-on related routes
├── handlers/
│   ├── mod.rs
│   ├── health.rs        # Health check handlers
│   └── try_on.rs        # Try-on request handlers
├── services/
│   ├── mod.rs
│   ├── gemini_api.rs    # Gemini API integration
│   └── image_service.rs # Image processing utilities
├── models/
│   ├── mod.rs
│   ├── requests.rs      # Request DTOs
│   ├── responses.rs     # Response DTOs
│   └── errors.rs        # Custom error types
├── middleware/
│   ├── mod.rs
│   ├── cors.rs          # CORS configuration
│   └── logging.rs       # Request logging
└── utils/
    ├── mod.rs
    ├── base64.rs        # Base64 encoding/decoding
    └── validation.rs    # Input validation
```

#### 2.2 Module Responsibilities

**Config Module:**
- Environment variable management
- Application settings and configuration
- Database connections (future)

**Routes Module:**
- Route definitions and organization
- Route grouping and middleware application
- API versioning support

**Handlers Module:**
- Request/response handling logic
- Input validation and sanitization
- Business logic coordination

**Services Module:**
- External API integrations (Gemini)
- Business logic implementation
- Data processing and transformation

**Models Module:**
- Data structures and DTOs
- Serialization/deserialization logic
- Custom error types and handling

**Middleware Module:**
- Cross-cutting concerns (CORS, logging, auth)
- Request/response transformation
- Error handling middleware

**Utils Module:**
- Helper functions and utilities
- Common validation logic
- Reusable components

### Phase 3: Implementation Plan

#### 3.1 Frontend Refactoring Steps

1. **Set Up State Management**
   - Install React Query (TanStack Query) and dependencies
   - Configure QueryClient with proper defaults
   - Set up React Query DevTools for development
   - Evaluate need for Redux based on state complexity

2. **Create Base Structure**
   - Set up folder structure
   - Create index files for clean imports
   - Set up CSS modules configuration
   - Configure React Query provider

3. **Extract Common Components**
   - Create Button component with variants
   - Create Loader component with React Query loading states
   - Create Message component with error handling

3. **Extract Upload Components**
   - Create UploadArea component
   - Create ImagePreview component
   - Create UploadSection container

4. **Extract Result Components**
   - Create ResultDisplay component
   - Create ResultImage component

5. **Create Layout Components**
   - Create Header component
   - Create Layout wrapper

6. **Implement React Query Integration**
   - Create API client with proper error handling
   - Implement useTryOnMutation hook with React Query
   - Add caching strategies for uploaded images
   - Set up optimistic updates for better UX

7. **Implement Custom Hooks**
   - Extract upload logic to useImageUpload
   - Create useTryOnMutation with React Query mutation
   - Add localStorage hook for persistence
   - Implement useImageCache for local image management

8. **Create Services Layer**
   - Centralize API calls with React Query integration
   - Configure QueryClient with appropriate defaults
   - Add proper error handling and retry logic
   - Create type definitions for API responses

9. **Evaluate Redux Integration (Optional)**
   - Assess if complex global state is needed
   - Set up Redux Toolkit if required
   - Create slices for user preferences and UI state
   - Integrate with React Query for server state

10. **Update Main App**
    - Wrap app with QueryClient provider
    - Refactor App.tsx to use new components
    - Remove duplicate code and old state management
    - Implement proper error boundaries

#### 3.2 Backend Refactoring Steps

1. **Create Module Structure**
   - Set up module folders and mod.rs files
   - Define module boundaries and exports

2. **Extract Configuration**
   - Move environment handling to config module
   - Create settings structure
   - Add configuration validation

3. **Separate Routes and Handlers**
   - Move route definitions to routes module
   - Extract handler logic to handlers module
   - Implement proper error handling

4. **Create Services Layer**
   - Extract Gemini API logic to service
   - Create image processing service
   - Add proper error types

5. **Define Models**
   - Move DTOs to models module
   - Create custom error types
   - Add validation logic

6. **Implement Middleware**
   - Extract CORS setup
   - Add request logging
   - Prepare for authentication (future)

7. **Create Utilities**
   - Extract common functions
   - Add validation helpers
   - Create reusable components

8. **Update Main Application**
   - Refactor main.rs to use modules
   - Clean up imports and dependencies
   - Ensure proper error handling

### Phase 4: Testing Strategy

#### 4.1 Frontend Testing
- Unit tests for individual components
- Integration tests for hooks and services
- E2E tests for critical user flows
- Visual regression tests for UI components

#### 4.2 Backend Testing
- Unit tests for handlers and services
- Integration tests for API endpoints
- Mock tests for external API calls
- Performance tests for image processing

### Phase 5: Documentation and Maintenance

#### 5.1 Documentation
- Component documentation with Storybook
- API documentation with OpenAPI/Swagger
- Architecture decision records (ADRs)
- Development setup and contribution guides

#### 5.2 Code Quality
- ESLint and Prettier for frontend
- Clippy and rustfmt for backend
- Pre-commit hooks for code quality
- CI/CD pipeline for automated testing

## Benefits of Refactoring

### Maintainability
- Clear separation of concerns
- Easier to locate and fix bugs
- Consistent code organization
- Better code reusability

### Scalability
- Easy to add new features
- Modular architecture supports growth
- Clear extension points
- Better performance optimization opportunities

### Developer Experience
- Faster development cycles
- Easier onboarding for new developers
- Better IDE support and intellisense
- Improved debugging capabilities

### Testing
- Isolated components are easier to test
- Better test coverage possibilities
- Faster test execution
- More reliable test results

## Timeline Estimate

- **Phase 1 (Frontend)**: 2-3 days
- **Phase 2 (Backend)**: 2-3 days
- **Phase 3 (Implementation)**: 4-5 days
- **Phase 4 (Testing)**: 2-3 days
- **Phase 5 (Documentation)**: 1-2 days

**Total Estimated Time**: 11-16 days

## Risk Mitigation

1. **Incremental Refactoring**: Refactor one component at a time to minimize risk
2. **Backward Compatibility**: Ensure existing functionality works during transition
3. **Comprehensive Testing**: Test each refactored component thoroughly
4. **Code Reviews**: Peer review all refactoring changes
5. **Rollback Plan**: Keep original code until refactoring is complete and tested

## Success Metrics

- Reduced code duplication
- Improved test coverage (target: >80%)
- Faster development of new features
- Reduced bug reports
- Improved developer satisfaction scores
- Better performance metrics

---

This refactoring plan provides a roadmap for transforming the Virtual Try-On application into a well-structured, maintainable, and scalable codebase that will support future growth and development.
