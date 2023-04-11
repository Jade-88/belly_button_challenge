function init() {
    var dropdown = d3.select('#selDataset');
    d3.json('samples.json').then((data) => {
        var data_names = data.names;
        data_names.forEach((element) => {
            dropdown.append('option').text(element).property('value', element);
        });
        var first_name = data_names[0];
        bm(first_name);
        bc(first_name);

    });

}

function bm(params) {
    d3.json('samples.json').then((data) => {
        var meta_data = data.metadata;
        results = meta_data.filter(x => x.id == params);
        var result = results[0];

        var PANEL = d3.select('#sample-metadata');
        PANEL.html('');

        Object.entries(result).forEach(([key, value]) => {
            PANEL.append('h6').text(`${key}: ${value}`)
        });

    });
}

function bc(params) {
    d3.json('samples.json').then((data) => {
        var samples_data = data.samples;
        results = samples_data.filter(x => x.id == params);
        var result = results[0];
        console.log(result);
        var otu_labels = result.otu_labels;
        var otu_ids = result.otu_ids;
        var sample_values = result.sample_values;
        console.log(sample_values);

        var yticks = otu_ids.slice(0,10).map(x => `OTU ${x}`).reverse();


        var barlayout = {
            title: 'Sales Growth',
            marjin:{
                l:150,
                t:30
            }
        };

        var bardata = {
            y:yticks, 
            x:sample_values.slice(0,10).reverse(), 
            type:'bar',
            text:otu_labels.slice(0,10).reverse(),
            orientation:'h'

        };

        Plotly.newPlot('bar', [bardata], barlayout);

        var bubblelayout = {
            title: 'Sales Growth',
            xaxis:{
                title:'OTU ID'
            }

        };


        var bubbledata = {
            x:otu_ids,
            y:sample_values,
            text:otu_labels,
            mode:'markers',
            marker:{
                size:sample_values,
                color:otu_ids

            }

        };

        Plotly.newPlot('bubble', [bubbledata], bubblelayout);



    });
}


function optionChanged(element) {
    bm(element);
    bc(element);
}
init();