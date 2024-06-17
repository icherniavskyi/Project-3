fetch('http://127.0.0.1:5000/')
    .then(response => response.json())
    .then(data => {
        // Filter and prepare data for each health condition
        var asthmaData = data.filter(item => item.Health_Condition === "Current Asthma");
        var obesityData = data.filter(item => item.Health_Condition === "Obesity");
        var depressionData = data.filter(item => item.Health_Condition === "Depression");

        // Trace for asthma
        var traceAsthma = {
            x: asthmaData.map(item => item.State),
            y: asthmaData.map(item => item.Condition_Prevalence_Percent),
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Current Asthma'
        };

        // Trace for Obesity
        var traceObesity = {
            x: obesityData.map(item => item.State),
            y: obesityData.map(item => item.Condition_Prevalence_Percent),
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Obesity'
        };

        // Trace for depression
        var traceDepression = {
            x: depressionData.map(item => item.State),
            y: depressionData.map(item => item.Condition_Prevalence_Percent),
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Depression'
        };

        // Traces for weather conditions
        var traceAQI = {
            x: data.map(item => item.State),
            y: data.map(item => item.Median_AQI),
            mode: 'lines',
            type: 'scatter',
            name: 'Median AQI',
            yaxis: 'y2'
        };

        var traceClearDays = {
            x: data.map(item => item.State),
            y: data.map(item => item.Percent_Clear_Days),
            mode: 'lines',
            type: 'scatter',
            name: 'Percent Clear Days',
            yaxis: 'y2'
        };

        var traceTemp = {
            x: data.map(item => item.State),
            y: data.map(item => item.Average_Temperature_F),
            mode: 'lines',
            type: 'scatter',
            name: 'Average Temperature',
            yaxis: 'y2'
        };
        
        // Adding data to plot
        var plotData = [traceAsthma, traceObesity, traceDepression, traceAQI, traceClearDays, traceTemp];

        // Creating plot
        Plotly.newPlot('plot', plotData, {
            title: 'Condition and Weather Data by State',
            xaxis: {title: 'State'},
            yaxis: {title: 'Condition Prevalence Percent'},
            yaxis2: {
                overlaying: 'y',
                side: 'right'
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));