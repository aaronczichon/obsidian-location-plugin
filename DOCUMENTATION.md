# Documentation

## Installation

For installing the plugin go to the Obsidian settings and click on "Community plugins".  
Click "Browse" and search for "Mapbox Location Image" and click on the "Install" button.

After the install, you need to add your Mapbox API key into the plugin settings. You can get a free API key from [Mapbox](https://www.mapbox.com/).  
To add the API key to your Obsidian settings, go to "Settings" -> "Mapbox Location Image" and paste your API key into the input field.

![Screenshot plugin settings](./docs/settings.png)

## Usage

### Basic Usage

You can simply use the code block with `location` as the language identifier.

#### Using coordinates

If you provide the longitude and latitude, the plugin will generate a map image for that location.

\```location  
Latitude: 44.64266326577057  
Longitude: -63.57530151565183  
\```

It doesn't matter if you provide the latitude or longitude first. The plugin will recognize the values and generate the map image.  
Also it's not relevant if you write `Latitude` or `latitude` and `Longitude` or `longitude`.

#### Using search phrase

If you provide a search phrase the plugin will fetch the most relevant result and generate the map image.

\```location
search: 123 smith street fitzroy
\```

![Screenshot of basic search result](./docs/basic-search.png)

Search phrases can be:

-   Addresses, e.g.:

    -   123 Smith Street Fitzroy

-   Locations or place names, e.g.:

    -   Barcelona
    -   Brooklyn New York
    -   Bondi Beach Sydney

-   Landmarks or points of interest, e.g.:
    -   The Dolomites Italy
    -   Parliament house canberra
    -   Melbourne Cricket Ground

The search is reasonably intelligent and you do not need to be exact in syntax, or provide full addresses etc. When returning a result the plugin will provide the full address as a caption to the image (as it shows in Mapbox data).

Search mode still works with all other custom settings such as marker icon, style and zoom settings - they can be set in the settings menu or in-line per image:

```location
search: parliament house canberra
style: satellite-streets-v12
zoom: 10
```

![Screenshot of search result with custom options in-line](./docs/search-with-options.jpeg)

### Changing the icon

There are two options to change the icon. You can either use the marker icon setting in the plugin settings. This will override th icon on all maps globally.  
If you want a custom icon for a specific map, you can add a `marker-url` field to the code block. The value of the field should be the URL to the icon you want to use.

```location
latitude: 44.64266326577057
longitude: -63.57530151565183
marker-url: https://example.com/icon.png
```

If you only want to use one of the [Maki-Icons from Mapbox](https://labs.mapbox.com/maki-icons/) you can do this per code block.

```location
latitude: 44.64266326577057
longitude: -63.57530151565183
maki: fire-station
```

This is the block above rendered with a custom maki icon:
![Screenshot mapbox maki icon](./docs/custom_maki.png)

### Change style

You can change the style of the map by selecting a different style in the plugin settings.
![Screenshot map styles](./docs/map-style-settings.png)

This setting changes every map in your vault and is plugin-global.  
To change the style of a map only for a specific map, you can add a `style` field to the code block. The value of the field should be the name of the style you want to use.

```location
latitude: 44.64266326577057
longitude: -63.57530151565183
maki: fire-station
style: navigation-night-v1
```

The result looks like this:
![Screenshot: map with custom style](./docs/code-style-result.png)

Following values for the code block are supported:

-   streets-v12
-   outdoors-v12
-   light-v11
-   dark-v11
-   satellite-v9
-   satellite-streets-v12
-   navigation-day-v1
-   navigation-night-v1

**Hint**
Maki icon can only defined in the code block and can't be defined globally. If no custom marker or maki icon is defined, the map falls back to the default marker icon (a home icon).  
If you have defined a custom icon URL (in plugin settings or in your code block) the defined maki icon is ignored.

### Changing the zoom

There are two options to change the zoom. You can either change the global setting in the plugin settings, which will then be applied to every map generated. Or, you can set a custom zoom for a specific map - this will override the global zoom.

If you want a custom zoom for a specific map, you can add a `zoom` field to the code block. The value of the field should be a number between 1 (maximum zoomed out) and 20 (maximum zoomed in).

Zoom value 1:

```location
latitude: 44.64266326577057
longitude: -63.57530151565183
zoom: 1
```

![Screenshot map with zoom setting 1](./docs/zoom-setting-1.png)

Zoom value 14 (default):

```location
latitude: 44.64266326577057
longitude: -63.57530151565183
zoom: 14
```

![Screenshot map with zoom setting 14](./docs/zoom-setting-14.png)

Zoom value 20:

```location
latitude: 44.64266326577057
longitude: -63.57530151565183
zoom: 20
```

![Screenshot map with zoom setting 20](./docs/zoom-setting-20.png)
