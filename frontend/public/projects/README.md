# Project Media Storage Structure

Store project screenshots and diagrams in this directory following this folder structure:

```text
frontend/public/projects/
├── sentinel/
│   ├── cover.png
│   ├── image-1.png
│   └── ...
├── aqua/
│   ├── cover.png
│   ├── image-1.png
│   └── ...
├── miwa/
│   ├── cover.png
│   └── ...
├── avionics/
│   ├── cover.png
│   └── ...
└── heartbeat/
    ├── cover.png
    └── ...
```

## Referencing in Backend & Fallback Data

In `backend/data/content.json` and `frontend/data/content.ts`, add the image metadata array:

```json
"images": [
  {
    "src": "/projects/sentinel/cover.png",
    "alt": "Sentinel telemetry dashboard interface",
    "caption": "Primary real-time anomaly monitoring HUD"
  },
  {
    "src": "/projects/sentinel/image-1.png",
    "alt": "Signal stream classifier flowchart",
    "caption": "Sensor ingestion and threshold logic"
  }
],
"github": "https://github.com/flickstrokefs/sentinel",
"liveUrl": "https://sentinel-demo.vercel.app"
```

If `images` is `null` or empty `[]`, the dossier automatically and gracefully renders the technical blueprint schematic (`[ SCHEMATIC ] DWG-EXP-XX // SYSTEM MAP`).
