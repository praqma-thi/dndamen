# DnDamen

A small Jekyll site for keeping track of our adventures.

## Data structure

Content is stored as YAML in `_data/`:

- `adventures.yml` stores adventure information
- `characters/<id>.yml` stores character information
- `npcs/<id>.yml` stores NPC names, folk/optional subfolk, art, current alive/dead status, and a description. Adventures reference NPCs by ID separately from player characters. The adventure page gives NPCs their own picker and displays them in the shared profile panel without player stats.
- `players.yml` maps player IDs to aliases

Adventure pages live under `adventures/<slug>/` and read from the matching adventure data.
Images belong in `assets/images/`.

## Run locally with Docker

Build the image and start the Jekyll server:

```sh
docker build -t dndamen .
docker run --rm -p 4000:4000 -v "$PWD:/site" dndamen
```

Open [http://localhost:4000](http://localhost:4000). The source directory is mounted into the container, so Jekyll rebuilds the site as files change. `_config.yml` sets `baseurl` to `/dndamen` for the GitHub Pages project site; the Docker server overrides it to keep local URLs rooted at `localhost:4000`.
