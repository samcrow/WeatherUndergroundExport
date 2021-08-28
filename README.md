# Weather Underground history exporter

This script extracts historical weather data from a Weather Underground history
page ([example](https://www.wunderground.com/dashboard/pws/KNMRODEO1/table/2021-08-22/2021-08-22/daily))
and downloads it as a CSV file.

As of 2021-08-28, this works. It may not work in the future when they change
the Weather Underground website.

## Bookmarklet installation

Drag this link into your bookmark toolbar: [Weather Underground export](javascript:var%20%24jscomp%3D%24jscomp%7C%7C%7B%7D%3B%24jscomp.scope%3D%7B%7D%3B%24jscomp.arrayIteratorImpl%3Dfunction(a)%7Bvar%20c%3D0%3Breturn%20function()%7Breturn%20c%3Ca.length%3F%7Bdone%3A!1%2Cvalue%3Aa%5Bc%2B%2B%5D%7D%3A%7Bdone%3A!0%7D%7D%7D%3B%24jscomp.arrayIterator%3Dfunction(a)%7Breturn%7Bnext%3A%24jscomp.arrayIteratorImpl(a)%7D%7D%3B%24jscomp.makeIterator%3Dfunction(a)%7Bvar%20c%3D%22undefined%22!%3Dtypeof%20Symbol%26%26Symbol.iterator%26%26a%5BSymbol.iterator%5D%3Breturn%20c%3Fc.call(a)%3A%24jscomp.arrayIterator(a)%7D%3Bvar%20exportTable%3Dfunction()%7Bvar%20a%3Ddocument.querySelector(%22.history-table.desktop-table%22)%2Cc%3DArray.from(a.rows)%3B3%3Ec.length%3Falert(%22Not%20enough%20rows%20found.%20Check%20that%20the%20table%20is%20visible.%22)%3A(a%3DArray.from(c%5B0%5D.cells).map(function(b)%7Breturn%20b.textContent%7D)%2Cc%3Dc.slice(2).map(function(b)%7Breturn%20Array.from(b.cells).map(function(e)%7Breturn%20e.textContent.replaceAll(%2F%5Cs%2B%2Fg%2C%22%20%22)%7D)%7D)%2Ca%3Dfunction(b%2Ce)%7Bfor(var%20d%3Db.join(%22%2C%22)%2B%22%5Cn%22%2Cg%3D%24jscomp.makeIterator(e)%2Cf%3Dg.next()%3B!f.done%3Bf%3Dg.next())d%2B%3Df.value.join(%22%2C%22)%2B%22%5Cn%22%3Breturn%20d%7D(a%2Cc)%2Cfunction(b%2Ce)%7Bvar%20d%3Ddocument.createElement(%22a%22)%3Bd.style.display%3D%22none%22%3Bd.setAttribute(%22target%22%2C%22blank%22)%3Bd.setAttribute(%22href%22%2C%22data%3Atext%2Fcsv%3Bcharset%3Dutf-8%2C%22%2BencodeURIComponent(e))%3Bd.setAttribute(%22download%22%2Cb)%3Bdocument.body.appendChild(d)%3Bd.click()%3Bdocument.body.removeChild(d)%7D(function(b)%7Breturn(b%3D%2F%5Ehttps%3A%5C%2F%5C%2Fwww%5C.wunderground%5C.com%5C%2Fdashboard%5C%2Fpws%5C%2F(%5Cw%2B)%5C%2Ftable%5C%2F(%5B0-9%5C-%5D%2B)%5C%2F(%5B0-9%5C-%5D%2B)%5C%2Fdaily%24%2F.exec(b))%3F%22weather_underground_%22%2Bb%5B1%5D%2B%22_%22%2Bb%5B2%5D%2B%22.csv%22%3A%22weather_underground_unknown.csv%22%7D(document.URL)%2Ca))%7D%3BexportTable()%3Bvoid+0). When you click on the bookmark, the script will run.

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