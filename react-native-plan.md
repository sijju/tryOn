# React Native Virtual Try-On App Plan

## Overview
Adapt the web Virtual Try-On app to React Native, leveraging our modular architecture and reusing business logic, hooks, and API services.

## Architecture Benefits
- **60-80% Code Reuse**: Hooks, types, API services, and business logic
- **Consistent UX**: Same workflow and features across platforms
- **Shared Backend**: Same Rust API serves both web and mobile
- **Modern Stack**: React Native with TypeScript, React Query, and Expo

## Phase 1: Project Setup & Foundation
### 1.1 Environment Setup
- [ ] Install React Native CLI or Expo CLI
- [ ] Create new React Native project with TypeScript
- [ ] Set up project structure mirroring web app organization
- [ ] Configure Metro bundler for TypeScript and absolute imports

### 1.2 Dependencies Installation
- [ ] Install React Query (@tanstack/react-query)
- [ ] Install React Navigation for screen navigation
- [ ] Install image picker (expo-image-picker or react-native-image-picker)
- [ ] Install async storage for local caching
- [ ] Install vector icons and UI libraries (optional: NativeBase, React Native Elements)

### 1.3 Project Structure
```
mobile/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Loader/
│   │   │   └── Message/
│   │   ├── upload/
│   │   │   ├── ImagePicker/
│   │   │   ├── ImagePreview/
│   │   │   └── UploadScreen/
│   │   └── result/
│   │       ├── ResultScreen/
│   │       └── ResultImage/
│   ├── hooks/ (reused from web)
│   │   ├── useTryOnMutation.ts
│   │   ├── useImageUpload.ts (adapted)
│   │   └── useImageCache.ts
│   ├── services/ (reused from web)
│   │   ├── api.ts
│   │   ├── queryClient.ts
│   │   └── types.ts
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── UploadScreen.tsx
│   │   └── ResultScreen.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   └── styles/
│       ├── colors.ts
│       ├── typography.ts
│       └── spacing.ts
├── App.tsx
└── package.json
```

## Phase 2: Core Logic Migration
### 2.1 Services & Hooks (High Reusability)
- [ ] Copy and adapt API service layer
- [ ] Port React Query configuration
- [ ] Adapt useTryOnMutation hook for mobile
- [ ] Modify useImageUpload for React Native image picker
- [ ] Copy all TypeScript types and interfaces

### 2.2 Navigation Setup
- [ ] Set up React Navigation stack navigator
- [ ] Create main app navigator with screens:
  - Home/Upload Screen
  - Result Screen
  - Settings Screen (optional)

## Phase 3: UI Components Development
### 3.1 Common Components
- [ ] **Button**: TouchableOpacity with loading states
- [ ] **Loader**: ActivityIndicator with custom styling
- [ ] **Message**: Alert/Toast component for feedback

### 3.2 Upload Components
- [ ] **ImagePicker**: Camera/gallery selection with permissions
- [ ] **ImagePreview**: Image display with remove functionality
- [ ] **UploadScreen**: Main upload interface

### 3.3 Result Components
- [ ] **ResultScreen**: Display generated try-on results
- [ ] **ResultImage**: Zoomable image with save functionality

## Phase 4: Mobile-Specific Features
### 4.1 Native Capabilities
- [ ] Camera integration with permissions
- [ ] Photo gallery access
- [ ] Image saving to device gallery
- [ ] Share functionality for results
- [ ] Haptic feedback for interactions

### 4.2 Performance Optimizations
- [ ] Image caching and compression
- [ ] Lazy loading for large images
- [ ] Background task handling for API calls
- [ ] Memory management for image processing

## Phase 5: Enhanced Mobile UX
### 5.1 Mobile-First Design
- [ ] Touch-friendly interface design
- [ ] Gesture-based interactions (pinch to zoom, swipe)
- [ ] Bottom sheet modals for actions
- [ ] Pull-to-refresh functionality

### 5.2 Offline Capabilities
- [ ] Cache recent results locally
- [ ] Queue uploads when offline
- [ ] Offline-first UI states

## Phase 6: Testing & Deployment
### 6.1 Testing
- [ ] Unit tests for hooks and utilities
- [ ] Integration tests for API calls
- [ ] E2E testing with Detox or similar
- [ ] Device testing (iOS/Android)

### 6.2 Deployment
- [ ] iOS App Store preparation
- [ ] Google Play Store preparation
- [ ] Code signing and certificates
- [ ] CI/CD pipeline setup

## Technical Considerations

### Shared Code Strategy
1. **Create Shared Package**: Extract common logic into shared npm package
2. **Monorepo Setup**: Use Lerna/Nx for managing web + mobile codebases
3. **Platform-Specific Adaptations**: Use platform-specific files (.native.ts, .web.ts)

### Key Adaptations Needed
```typescript
// Web version
const useImageUpload = () => {
  const handleFileSelect = (file: File) => {
    // Web File API logic
  }
}

// Mobile version
const useImageUpload = () => {
  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })
    // Handle ImagePicker result
  }
}
```

### Performance Considerations
- **Image Compression**: Compress images before upload
- **Caching Strategy**: Use React Query + AsyncStorage
- **Memory Management**: Proper image disposal and cleanup
- **Network Optimization**: Retry logic and offline handling

## Timeline Estimate
- **Phase 1-2**: 1-2 weeks (Setup + Logic Migration)
- **Phase 3**: 2-3 weeks (UI Components)
- **Phase 4-5**: 1-2 weeks (Mobile Features + UX)
- **Phase 6**: 1 week (Testing + Deployment)

**Total**: 5-8 weeks for full-featured mobile app

## Success Metrics
- [ ] 90%+ code reuse for business logic
- [ ] Native performance and UX
- [ ] Feature parity with web app
- [ ] App store ready builds
- [ ] Comprehensive testing coverage
