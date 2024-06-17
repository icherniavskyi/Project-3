document.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        data = await fetchData('http://127.0.0.1:5000/');
        populateStateDropdown(data);
        setupEventListeners(data);
        renderChart(data);
    } catch (error) {
        console.error('Error initializing the chart:', error);
    }
}

async function fetchData(url) {
    response = await fetch(url);
    return response.json();
}

function populateStateDropdown(data) {
    stateSelector = document.getElementById('stateSelector');
    let uniqueStates = [];
    data.forEach(item => {
    if (!uniqueStates.includes(item.State)) {
        uniqueStates.push(item.State);
    }
});
    uniqueStates.sort();
    stateSelector.innerHTML = uniqueStates.map(state => `<option value="${state}">${state}</option>`).join('');
}

function setupEventListeners(data) {
    stateSelector = document.getElementById('stateSelector');
    stateSelector.addEventListener('change', () => renderChart(data));
}

function renderChart(data) {
    selectedState = document.getElementById('stateSelector').value;
    filteredData = data.filter(item => item.State === selectedState);
    chartData = createChartData(filteredData, selectedState);
    ctx = document.getElementById('myPolarChart').getContext('2d');
    updateChart(ctx, chartData);
}

function createChartData(filteredData, selectedState) {
    return {
        labels: filteredData.map(item => item.Health_Condition),
        datasets: [{
            label: `Condition Prevalence (%) in ${selectedState}`,
            data: filteredData.map(item => item.Condition_Prevalence_Percent),
            backgroundColor: [
                'rgba(173, 216, 230, 0.5)',
                'rgba(144, 238, 144, 0.5)',
                'rgba(255, 165, 0, 0.5)' 
            ],
            borderColor: ['black'],
            borderWidth: 1
        }]
    };
}

function updateChart(ctx, chartData) {
    if (window.myPolarChart instanceof Chart) {
        window.myPolarChart.destroy();
    }
    window.myPolarChart = new Chart(ctx, {
        type: 'polarArea',
        data: chartData,
        options: {
            responsive: false,  
            maintainAspectRatio: true,  
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
}