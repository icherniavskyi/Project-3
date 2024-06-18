//Dummy data - replace with real data from db
let states = [
    { state: 'New York', issues: { asthma: 1, depression: 25, obesity: 20 }, stateAbbreviation: "NY" },
    { state: 'California', issues: { asthma: 100, depression: 1, obesity: 5 }, stateAbbreviation: "CA" },
    { state: 'California2', issues: { asthma: 22, depression: 5, obesity: 35 }, stateAbbreviation: "AA" },
    { state: 'California3', issues: { asthma: 26, depression: 30, obesity: 56 }, stateAbbreviation: "BB" },
    { state: 'California4', issues: { asthma: 14, depression: 50, obesity: 79 }, stateAbbreviation: "CC" },
    { state: 'California5', issues: { asthma: 38, depression: 99, obesity: 94 }, stateAbbreviation: "DD" },
    { state: 'California6', issues: { asthma: 55, depression: 70, obesity: 33 }, stateAbbreviation: "EE" },
  ];
  
  //Create Treemap
  let data = [{
    type: 'treemap',
    labels: states.map(state => state.state),
    parents: states.map(() => ''),
    values: states.map(state => state.issues.asthma),
    text: states.map(state => `<b>${state.stateAbbreviation}</b><br>Asthma: ${state.issues.asthma}`),
    hovertemplate: '<b>%{label}</b><br>%{text}',
    marker: {
      colors: [
        'rgba(0, 128, 0, 0.5)', // Asthma color
        'rgba(255, 0, 0, 0.5)', // Depression color
        'rgba(0, 0, 255, 0.5)' // Obesity color
      ]
    }
  }];
  
  //Layout
  let layout = {
    title: 'Asthma by State',
    margin: { t: 30, l: 0, r: 0, b: 0 },
    treemapcolorway: ['rgba(0, 128, 0, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)'],
  };
  
  //Plot Treemap
  Plotly.newPlot('plot', data, layout);
  
  //Create dropdown
  const dropdown = d3.select('body')
    .append('select')
    .attr('id', 'dropdown')
    .on('change', function() {
      let selectedValue = this.value;
      let valuesKey = selectedValue.toLowerCase();
      
      //Change data for Treemap depending on what was selected
      let newData = {
        values: states.map(state => state.issues[valuesKey]),
        text: states.map(state => `<b>${state.stateAbbreviation}</b><br>${selectedValue}: ${state.issues[valuesKey]}`)
      };
  
      //Update plots
      Plotly.restyle('plot', 'values', [newData.values]);
      Plotly.restyle('plot', 'text', [newData.text]);
  
      //Update title
      Plotly.relayout('plot', { title: `${selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)} by State` });
    });
  
  //Dropdown choices
  dropdown.selectAll('option')
    .data(['Asthma', 'Depression', 'Obesity'])
    .enter().append('option')
    .text(txt => txt);