# Performance Optimization Notes

- Three.js is pinned to **r158** via ES module CDN imports in `script.js` to meet compatibility requirements.
- Scene particle count is intentionally reduced to **60 points** (roughly 40% lower than typical decorative setups around 100+) to avoid visual and GPU overload.
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))` caps rendering cost on high-DPI devices.
- Post-processing bloom has been tuned to a subtle strength of **0.6** for premium look without expensive high-intensity glare.
- Camera and scene animations use lightweight transforms only (position/rotation), with no heavy geometry updates per frame.
- WebGL scene is skipped on small screens (`max-width: 640px`) and when WebGL is unavailable.
- A full non-3D fallback path is provided and rendered from the same `config.json` data source.
- Content/UI is populated from JSON data so heavy assets can be introduced later with lazy-loading hooks.

## Suggested next-step optimizations

- Convert complex meshes to Draco-compressed glTF and lazy-load by zone via dynamic `import()`.
- Add intersection-based activation so off-screen sections pause 3D interactivity.
- Add texture atlas + KTX2 compression if branded textures are introduced.
