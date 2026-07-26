# Edge AI Architecture

**Status:** Planned — Phase 2+

## Purpose

Running lightweight AI models directly on ESP32 or edge gateway devices for offline prediction capability. Enables TwinForge AI to continue working even without internet connectivity.

## Technology Options

- TensorFlow Lite (ESP32 with PSRAM)
- ONNX Runtime (edge gateway: Raspberry Pi)
- Custom C++ inference engine for microcontrollers

## MVP Approach

MVP uses cloud AI only. Edge AI is Phase 2 when model size can be compressed < 500KB.
