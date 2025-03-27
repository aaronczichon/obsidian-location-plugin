---
sidebar_position: 3
---

# Supported Code Blocks

## Image Code Block

The image code block (keyword `location`) uses the given coordinates to render the map as an image into your vault. This is the recommended approach for most use cases and also is the most performant one.
This code block requires at least one line with coordinates. The coordinates can be provided either splitted as longitude and latitude or as an array of geo coordinates. Here are some examples:

````
```location
[51.0414383239025, -113.9957147847538]
```
````

````
```location
latitude: 44.64266326577057
longitude: -63.57530151565183
```
````

### Multiple marker

Multiple markers are only supported on the array syntax. This can be achieved simply by providing multiple tuples of geo coordinate arrays like that:

````
```multi-location
[44.64266326577057, -63.57530151565183]
[51.0414383239025, -113.9957147847538]
```
````

### Marker by point of interest or search

If you don't know the coordinates of the location you want to render, you can also search for it by using either an address or the name of a point of interest:

````
```location
search: Biosphere, Montreal
```
````

````
```location
search: Kocherstraße 15, 73460 Hüttlingen
```
````

## Interactive Code Block

:::danger Hint
This feature is currently in preview! It doesn't support things like multi points or similar. Will be coming in the future. Bugs may occur.
:::

Newly added in version 2 there is now also the support for interactive map. For interactive maps we introduced a new code block called `interactive-location`. It works basically the same as the `location` code block but with another keyword:

````
```interactive-location
[51.0414383239025, -113.9957147847538]
```
````

Hint: This may affect the rendering of your notes. So currently it is not recommended to use more than one interactive map per note!
