# Testing

## Unit
- Component rendering
- Style parsing
- Layout calculations

## Integration
- Compiler -> Runtime
- Runtime -> Renderer

## Visual Regression
Compare screenshots to reference outputs.

## Test Cases

TC-001: Box(width=100,height=100) renders exactly 100x100.

TC-002: Row with two 100px boxes keeps horizontal order.

TC-003: Column stacks children vertically.

TC-004: Padding increases internal spacing only.

TC-005: Margin affects external spacing only.

TC-006: Text styles apply correctly.

TC-007: Button click dispatches event.

TC-008: Nested layouts remain deterministic.

TC-009: Hot reload preserves application state when possible.

TC-010: Production build renders identically to development build.
