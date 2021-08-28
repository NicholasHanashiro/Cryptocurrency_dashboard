function init () {
    d3.csv("../../cryptos.csv").then((data) => {
        var selectorOptions = {
            buttons: [{
                step: 'month',
                stepmode: 'backward',
                count: 1,
                label: '1m'
            }, {
                step: 'month',
                stepmode: 'backward',
                count: 6,
                label: '6m'
            }, {
                step: 'year',
                stepmode: 'todate',
                count: 1,
                label: 'YTD'
            }, {
                step: 'year',
                stepmode: 'backward',
                count: 1,
                label: '1y'
            }, {
                step: 'all',
            }],
        };

        var Cryptos = [];

        var x1 = [];
        var price1 = [];
        var cap1 = [];
        var volume1 = [];

        var x2 = [];
        var price2 = [];
        var cap2 = [];
        var volume2 = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].Name == 'Bitcoin') {
                x1.push(data[i].Dates);
                price1.push(data[i].prices);
                cap1.push(data[i].market_caps);
                volume1.push(data[i].total_volumes);
            };
            if (data[i].Name == 'Ethereum') {
                x2.push(data[i].Dates);
                price2.push(data[i].prices);
                cap2.push(data[i].market_caps);
                volume2.push(data[i].total_volumes);
            };
            if (!Cryptos.includes(data[i].Name)){
                Cryptos.push(data[i].Name);
            };
        };

        var priceTrace1 = {
            x: x1,
            y: price1,
            type: 'scatter',
            name: 'Bitcoin',
            mode: 'line'
        };
        var priceTrace2 = {
            x: x2,
            y: price2,
            type: 'scatter',
            name: 'Ethereum',
            mode: 'line'
        };

        var priceData = [priceTrace1,priceTrace2];

        var priceLayout = {
            title:'Price',
            yaxis: {
                title: 'Price per coin',
                fixedrange: true
            },
            xaxis: {
                rangeselector: selectorOptions,
                rangeslider: {}
            },
            showlegend: true
        };

        Plotly.newPlot("linePrice", priceData, priceLayout);

        var capTrace1 = {
            x: x1,
            y: cap1,
            type: 'scatter',
            name: 'Bitcoin',
            mode: 'line'
        };

        var capTrace2 = {
            x: x2,
            y: cap2,
            type: 'scatter',
            name: 'Ethereum',
            mode: 'line'
        };

        var capData = [capTrace1,capTrace2];

        var capLayout = {
            title:'Market Cap',
            yaxis: {
                title: 'Market Cap',
                fixedrange: true
            },
            xaxis: {
                rangeselector: selectorOptions,
                rangeslider: {}
            },
            showlegend: true
        };

        Plotly.newPlot("lineCap", capData, capLayout);

        var volumeTrace2 = {
            x: x2,
            y: volume2,
            type: 'scatter',
            name: 'Ethereum',
            mode: 'line'
        };

        var volumeTrace1 = {
            x: x1,
            y: volume1,
            type: 'scatter',
            name: 'Bitcoin',
            mode: 'line'
        };

        var volumeData = [volumeTrace1,volumeTrace2];

        var volumeLayout = {
            title:'Total Volume',
            yaxis: {
                title: 'Total Volume',
                fixedrange: true
            },
            xaxis: {
                rangeselector: selectorOptions,
                rangeslider: {}
            },
            showlegend: true
        };

        Plotly.newPlot("lineVol", volumeData, volumeLayout);

        var dropDown = d3.select("#selDataset1");
        var dropDown2 = d3.select("#selDataset2");
        dropDown.selectAll('myOptions').data(Cryptos).enter().append('option').text(function (d) { return d; }).attr("value", function (d) { return d; })
        dropDown2.selectAll('myOptions').data(Cryptos).enter().append('option').text(function (d) { return d; }).attr("value", function (d) { return d; }).property("selected", function(d) {
            return d === "Ethereum";
        });
    });
}

d3.selectAll("#selDataset1").on("change", newCoin1);
d3.selectAll("#selDataset2").on("change", newCoin2);

function newCoin1() {
    d3.event.preventDefault();
    var dropDown = d3.select("#selDataset1");
    var dataset = dropDown.property("value");

    d3.csv("../../cryptos.csv").then((data) => {
        var x = [];
        var price = [];
        var cap = [];
        var volume = [];
        var trace = 0;

        for (var i = 0; i < data.length; i++) {
            if (data[i].Name == dataset) {
                x.push(data[i].Dates);
                price.push(data[i].prices);
                cap.push(data[i].market_caps);
                volume.push(data[i].total_volumes);
                var chart_title = data[i].Name
                var chart_ticker = data[i].Ticker
            };
        };

        updatePlot(x, price, cap, volume, chart_title, trace);
    });

}

function newCoin2() {
    d3.event.preventDefault();
    var dropDown = d3.select("#selDataset2");
    var dataset = dropDown.property("value");

    d3.csv("../../cryptos.csv").then((data) => {
        var x = [];
        var price = [];
        var cap = [];
        var volume = [];
        var trace = 1;

        for (var i = 0; i < data.length; i++) {
            if (data[i].Name == dataset) {
                x.push(data[i].Dates);
                price.push(data[i].prices);
                cap.push(data[i].market_caps);
                volume.push(data[i].total_volumes);
                var chart_title = data[i].Name
                var chart_ticker = data[i].Ticker
            };
        };

        updatePlot(x, price, cap, volume, chart_title, trace);
    });

}

function updatePlot(x, price, cap, volume, chart_title, trace) {
    
    Plotly.restyle("linePrice", "x", [x], trace);
    Plotly.restyle("linePrice", "y", [price], trace);
    Plotly.restyle("linePrice", "name", chart_title, trace);

    Plotly.restyle("lineCap", "x", [x], trace);
    Plotly.restyle("lineCap", "y", [cap], trace);
    Plotly.restyle("lineCap", "name", chart_title, trace);

    Plotly.restyle("lineVol", "x", [x], trace);
    Plotly.restyle("lineVol", "y", [volume], trace);
    Plotly.restyle("lineVol", "name", chart_title, trace);

}

init();