function renderRankingEvolutionChart(container, data) {
    
    container.innerHTML = '<canvas id="ranking-chart"></canvas>';
    
    const ctx = document.getElementById('ranking-chart').getContext('2d');
    
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: data.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    reverse: true, 
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Posição no Ranking'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + 'º';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Década'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução do Ranking ao Longo das Décadas',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Posição: ${context.raw}º`;
                        }
                    }
                }
            }
        }
    });
}

function renderLocationRankingTable(container, data) {
    
    container.innerHTML = '';
    
    
    const table = document.createElement('table');
    
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    
    const rankHeader = document.createElement('th');
    rankHeader.textContent = 'Ranking';
    headerRow.appendChild(rankHeader);
    
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Nome';
    headerRow.appendChild(nameHeader);
    
    
    data.decades.forEach(decade => {
        const decadeHeader = document.createElement('th');
        decadeHeader.textContent = decade;
        headerRow.appendChild(decadeHeader);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    
    const tbody = document.createElement('tbody');
    
    
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        
        
        const rankCell = document.createElement('td');
        rankCell.textContent = `${i + 1}º`;
        row.appendChild(rankCell);
        
        
        const nameCell = document.createElement('td');
        nameCell.textContent = data.topNames[0][i].nome;
        row.appendChild(nameCell);
        
        
        data.decades.forEach((decade, decadeIndex) => {
            const freqCell = document.createElement('td');
            freqCell.textContent = data.topNames[decadeIndex][i].frequencia.toLocaleString();
            row.appendChild(freqCell);
        });
        
        tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    container.appendChild(table);
    
    
    const title = document.createElement('h3');
    title.textContent = 'Os Três Nomes Mais Frequentes por Década';
    title.style.textAlign = 'center';
    title.style.marginBottom = '1rem';
    
    container.insertBefore(title, table);
}

function renderNamesComparisonChart(container, data) {
    
    container.innerHTML = '<canvas id="comparison-chart"></canvas>';
    
    const ctx = document.getElementById('comparison-chart').getContext('2d');
    
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: data.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequência'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Década'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Comparação de Nomes ao Longo do Tempo',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw.toLocaleString()} ocorrências`;
                        }
                    }
                }
            }
        }
    });
}
