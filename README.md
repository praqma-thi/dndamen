# DnDamen

A small Jekyll site for keeping track of our adventures.

## Data structure

Content is stored as YAML in `_data/`:

- `players.yml` maps player IDs to aliases
- `items.yml` stores items with stable IDs, names, Markdown descriptions and tags.
- `adventures.yml` stores adventure information; characters, NPCs, session logs and image gallery.
- Adventure-specific data lives in `_data/<adventure_id>`.
  - `characters/<adventure-id>/<id>.yml` stores player character information.
  - `npcs/<adventure-id>/<id>.yml` stores NPC information.
  - `sessions/<adventure-id>/<number>.yml` stores a session's activity log.
  - `maps/<adventure-id>.yml` stores a map image and location information.
  - `assets/<adventure-id>/` stores adventure asses (logo/map/art/...).
- Shared templates exist in `_layouts/adventure.html` and `_includes/adventure/`.

## Run locally with Docker

Build the image and start the Jekyll server:

```sh
docker build -t dndamen .
docker run --rm -p 4000:4000 -v "$PWD:/site" dndamen
```

Open [http://localhost:4000](http://localhost:4000).
