function init () {
    d3.csv("../../cryptos.csv").then((data) => {
        // data.metadata.forEach(demo => {
        //     if (String(demo.id) === "940") {
        //         var demographic = d3.select(".panel-body");
        //         demographic.selectAll("p").remove();
        //         Object.entries(demo).forEach(([key,value]) => {
        //             demographic.append("p").text(`${key}: ${value}`);
        //         })
        //     }
        // })
        console.log(data[1]);
        console.log(data[1].Ticker);

        var Cryptos = [];

        var x = [];
        var y = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].Ticker == 'BTC') {
                x.push(data[i].Dates);
                y.push(data[i].prices);
            };
            if (!Cryptos.includes(data[i].Name)){
                Cryptos.push(data[i].Name);
            };
        };

        var trace1 = {
            x: x,
            y: y,
            type: 'scatter',
            name: 'BTC',
            mode: 'line'
        };

        var lineData = [trace1];

        var layout = {
            title:'Bitcoin',
            yaxis: {title: 'Price per coin'}
        };

        Plotly.newPlot("line", lineData, layout);

        var dropDown = d3.select("#selDataset");
        for (var i = 0; i < Cryptos.length; i++) {
            dropDown.append("option").text(Cryptos[i]).attr(Cryptos[i]);
        };
    });
}

d3.selectAll("#selDataset").on("change", newCoin);

function newCoin() {
    d3.event.preventDefault();
    var dropDown = d3.select("#selDataset");
    var dataset = dropDown.property("value");

    d3.csv("../../cryptos.csv").then((data) => {
        var newx = [];
        var newy = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].Name == dataset) {
                newx.push(data[i].Dates);
                newy.push(data[i].prices);
                var chart_title = data[i].Name
                var chart_ticker = data[i].Ticker
            };
        };

        updatePlot(newx, newy, chart_title, chart_ticker);
    });

}

function updatePlot(newx, newy, chart_title, chart_ticker) {
    
    Plotly.restyle("line", "x", [newx]);
    Plotly.restyle("line", "y", [newy]);
    Plotly.restyle("line", "name", chart_ticker);
    Plotly.relayout("line", "title", chart_title);

}

init();