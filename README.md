# Weather Underground history exporter

This script extracts historical weather data from a Weather Underground history
page ([example](https://www.wunderground.com/dashboard/pws/KNMRODEO1/table/2021-08-22/2021-08-22/daily))
and downloads it as a CSV file.

As of 2021-08-28, this works. It may not work in the future when they change
the Weather Underground website.

## Bookmarklet installation

Open [the bookmarklet page](https://samcrow.github.io/WeatherUndergroundExport/)
and drag the link on that page to your bookmark bar to create a bookmark. When
you click on the bookmark, the script will run.

## Instructions

* In a web browser, open the URL `https://www.wunderground.com/dashboard/pws/{station}/table/{date}/{date}/daily`
  (replace {station} with the station name, for example KNMRODEO1, and
  replace {date} with the desired date in ISO 8601 format, for example
  2021-08-25)
* Scroll down to "Weather History for {station}"
* Wait for the table to load
* Run this script

The script will download a CSV file with the station name and date as part of
its file name. The file will contain everything in the table displayed on the
web page.
