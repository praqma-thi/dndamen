# DnDamen

A small Jekyll site for keeping track of our adventures.

## Data structure

Content is stored as YAML in `_data/`:

- `players.yml` maps player IDs to aliases
- `adventures.yml` stores adventure information; characters, NPCs, session logs and image gallery.
- `characters/<id>.yml` stores player character information.
- `npcs/<id>.yml` stores NPC information.
- `sessions/<adventure-id>/<number>.yml` stores a session's activity log.
- `maps/<adventure-id>.yml` stores a map image and location information.
- `items.yml` stores items with stable IDs, names, Markdown descriptions and tags.

Adventure-specific pages live under `adventures/<slug>/`.
Adventure-specific artwork belongs in `assets/<adventure-id>/images/`.

### RoA specific

- `ruins-of-azlant/colony/<category>.yml` stores colony buildings and prerequisites
- `ruins-of-azlant/colony/state.yml` stores constructed building IDs and fixed bonuses.
  - (_Bonus of Choice_ needs to be added as a fixed bonus for now.)

## Run locally with Docker

Build the image and start the Jekyll server:

```sh
docker build -t dndamen .
docker run --rm -p 4000:4000 -v "$PWD:/site" dndamen
```

Open [http://localhost:4000](http://localhost:4000).
