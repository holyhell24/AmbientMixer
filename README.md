# Ambient Mixer

Ambient Mixer is a React and TypeScript web app for building layered ambient soundscapes. It lets you combine nature, rain, animal, place, object, long ambient, and urban sounds into a small mixer, adjust each track volume, mute or remove sounds, and optionally randomize replay timing.

## Features

- Mix up to 6 ambient sounds at once.
- Browse sounds by category.
- Control per-sound volume from both the sound cards and mixer channels.
- Save custom mixes as named presets with categories.
- Import and export presets as JSON.
- Remove presets locally.
- Deployable as a static site through GitHub Pages.


## Presets

Built-in presets live in `src/presets.json`. User-created presets are stored in browser `localStorage`, and can be exported or imported as JSON from the app UI.
