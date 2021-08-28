function init () {
    d3.csv("../../crypto_socials.csv").then((data) => {
        // data.metadata.forEach(demo => {
        //     if (String(demo.id) === "940") {
        //         var demographic = d3.select(".panel-body");
        //         demographic.selectAll("p").remove();
        //         Object.entries(demo).forEach(([key,value]) => {
        //             demographic.append("p").text(`${key}: ${value}`);
        //         })
        //     }
        // })
        console.log(data[0]);
        console.log(data[0].Name);

        var Cryptos = [];
        var y;
        var z;

        for (var i = 0; i < data.length; i++) {
            if (data[i].Ticker == 'BTC') {
                y = data[i].twitter_followers;
                z = data[i].reddit_subscribers;
            };
            if (!Cryptos.includes(data[i].Name)){
                Cryptos.push(data[i].Name);
            };
        };

        var trace1 = {
            x: ['Twitter Followers', 'Reddit Subscribers'],
            y: [y, z],
            type: 'bar',
            name: 'BTC',
        };

        var barData = [trace1];

        var layout = {
            title:'Bitcoin',
            yaxis: {title: 'Followers for Coin'}
        };

        Plotly.newPlot("bar", barData, layout);

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

    d3.csv("../../crypto_socials.csv").then((data) => {
        var newy;
        var newz;

        for (var i = 0; i < data.length; i++) {
            if (data[i].Name == dataset) {
                newy = data[i].twitter_followers;
                newz = data[i].reddit_subscribers;
                var chart_title = data[i].Name
                var chart_ticker = data[i].Ticker
            };
        };

        updatePlot(newy, newz, chart_title, chart_ticker);
    });

}

function updatePlot( newy,newz, chart_title, chart_ticker) {
    Plotly.restyle("bar", "y", [[newy, newz]]);
    Plotly.restyle("bar", "name", chart_ticker);
    Plotly.relayout("bar", "title", chart_title);
}

init();
