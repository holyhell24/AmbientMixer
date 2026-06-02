# Ambient Mixer

Ambient Mixer is a React, TypeScript, and Tailwind web app for creating layered ambient soundscapes. Pick sounds from themed categories, build a small live mixer, tune each track, and save the result as reusable presets.

## Features

- Mix up to 6 ambient sounds at once.
- Browse sounds by categories
- Control each active sound from the mixer with volume, pan, mute, random replay delay, and equalizer settings.
- Control main volume and mute all sounds with one click.
- Save named presets with categories.
- Replace an existing preset by saving with the same name.
- Import and export presets as JSON.
- Remove presets locally.
- Switch between saved color themes, including animated background glow and matching slider/button accents.

## Presets

Built-in presets live in `src/presets.json`.

User-created presets are stored in browser `localStorage`. They can be exported from the app as `ambient-mixer-presets.json` and imported again later.

Preset tracks can store:

- Sound id
- Volume
- Mute state
- Random replay setting
- Pan value
- Equalizer values

## Color Themes

The active theme controls:

- Animated page background colors
- Slider accents
- Active buttons
- Category selection
- Mixer and preset highlights
