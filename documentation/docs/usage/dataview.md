---
sidebar_position: 5
---

# Dataview Plugin

If you have installed the [Dataview Plugin](https://github.com/blacksmithgu/obsidian-dataview) you may want to use defined variables also inside the Location plugin.
Since version 2.1.0 this is now possible.

To get started simply define some variables with coordinates inside your note. E.g.

```markdown
lat:: 48.858222
long:: 2.294694
```

Now you can re-use these variables inside a location block for rendering the map:

````
```location
latitude: =this.lat
longitude: =this.long
```
````

This will then render the map as well!
