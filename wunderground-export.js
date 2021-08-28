/**
 * JavaScript application that downloads weather data from a Weather Underground
 * station page
 *
 * Usage:
 * * In a web browser, open the URL https://www.wunderground.com/dashboard/pws/{station}/table/{date}/{date}/daily
 *   (replace {station} with the station name, for example KNMRODEO1, and
 *   replace {date} with the desired date in ISO 8601 format, for example
 *   2021-08-25)
 * * Scroll down to "Weather History for {station}"
 * * Wait for the table to load
 * * Run this script
 *
 */

let exportTable = function() {

    let makeCsv = function(columns, data) {
        let csv = columns.join(',') + "\n"
        for (let row of data) {
            csv += row.join(',') + "\n"
        }
        return csv
    };

    let downloadCsv = function(fileName, content) {
        let link = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('target', 'blank');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(content));
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    let makeFileName = function(url) {
        let pattern = /^https:\/\/www\.wunderground\.com\/dashboard\/pws\/(\w+)\/table\/([0-9\-]+)\/([0-9\-]+)\/daily$/;
        let matches = pattern.exec(url);
        if (matches) {
            let station = matches[1];
            let date = matches[2];
            return 'weather_underground_' + station + '_' + date + '.csv';
        } else {
            return 'weather_underground_unknown.csv'
        }
    };

    let table = document.querySelector('.history-table.desktop-table');
    let rows = Array.from(table.rows);
    if (rows.length < 3) {
        alert('Not enough rows found. Check that the table is visible.');
        return;
    }

    let headerRow = rows[0];
    let columnNames = Array.from(headerRow.cells).map((cell) => cell.textContent);

    let dataRows = rows.slice(2);
    let data = dataRows.map((row) => {
        // Replace all sequences of whitespace in cell text with single normal spaces
        return Array.from(row.cells).map((cell) => cell.textContent.replaceAll(/\s+/g, ' '))
    });

    let csv = makeCsv(columnNames, data);
    downloadCsv(makeFileName(document.URL), csv);
};

exportTable();
