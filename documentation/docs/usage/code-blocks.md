---
sidebar_position: 3
---

# Supported Code Blocks

## Image Code Block

The image code block (keyword `location`) uses the given coordinates to render the map as an image into your vault. This is the recommended approach for most use cases and also is the most performant one.
This code block requires at least one line with coordinates. The coordinates can be provided either splitted as longitude and latitude or as an array of geo coordinates. Here are some examples:

````md
```location
[51.0414383239025, -113.9957147847538]
```
````

````md
```location
latitude: 44.64266326577057
longitude: -63.57530151565183
```
````

### Multiple marker

Multiple markers are supported in the `multi-location` code block. The simplest form is to provide multiple geo coordinate arrays like that:

````md
```multi-location
[44.64266326577057, -63.57530151565183]
[51.0414383239025, -113.9957147847538]
```
````

You can also assign an optional marker name and an optional per-marker Maki icon:

````md
```multi-location
Fire Station:[44.64266326577057, -63.57530151565183], fire-station
Home:[51.0414383239025, -113.9957147847538], home
Meeting Point:[48.135125, 11.581981]
```
````

The marker name is parsed for both block types, but it is only rendered visibly in interactive maps. If no per-marker icon is provided, the block-level icon or the default marker is used.

For static `multi-location` maps, the viewport is automatically adjusted so that all markers are visible by default. If you add an explicit `zoom:` value to the block, that manual zoom level takes precedence over the automatic framing.

````md
```multi-location
[44.64266326577057, -63.57530151565183]
[51.0414383239025, -113.9957147847538]
zoom: 9
```
````

### Marker by point of interest or search

If you don't know the coordinates of the location you want to render, you can also search for it by using either an address or the name of a point of interest:

````md
```location
search: Biosphere, Montreal
```
````

````md
```location
search: Kocherstraße 15, 73460 Hüttlingen
```
````

## Interactive Code Block

Newly added in version 2 there is now also the support for interactive map. For interactive maps we introduced a new code block called `interactive-location`. It works basically the same as the `location` code block but with another keyword:

````md
```interactive-location
[51.0414383239025, -113.9957147847538]
```
````

Interactive maps also support multiple markers in one rendered map. When there is more than one marker, the map automatically frames all markers on first render.

````md
```interactive-location
[44.64266326577057, -63.57530151565183]
[51.0414383239025, -113.9957147847538]
[48.135125, 11.581981]
```
````

Names and per-marker icons are supported here as well, and names are shown as always-visible labels next to the markers:

````md
```interactive-location
Fire Station:[44.64266326577057, -63.57530151565183], fire-station
Home:[51.0414383239025, -113.9957147847538], home
Meeting Point:[48.135125, 11.581981]
```
````

Hint: This may affect the rendering of your notes. So currently it is not recommended to use more than one interactive map per note!
