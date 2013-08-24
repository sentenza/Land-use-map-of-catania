Land-use map of catania
=======================

Land use classes map of Catania in GeoJSON format. This data comes from Sicily Region as a shapefile of the entire 
region with CRS Gauss-Boaga "Monte Mario Italy Zone 2" EPSG:3004.

I stripped the unnecessary information about other cities, then reprojected and converted in geojson format the data.

The source file is disposable at http://tinyurl.com/khxrx35

## Embedding GeoJSON elsewhere ##

You could check the [github documentation](https://help.github.com/articles/mapping-geojson-files-on-github) for using 
the GeoJSON object in your Javascript application.

### Working example ###

A working example is visible on the [github webpage of this project](http://sentenza.github.io/Land-use-map-of-catania/). It is provided 
with a leafletjs implementation and Bootstrap/jQuery. The colors and legends correspond to the official specifications. The code of this example
could be accessed by gh-pages branch.

