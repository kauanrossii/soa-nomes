document.addEventListener('DOMContentLoaded', function() {
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    
    setupRankingEvolutionForm();
    setupLocationRankingForm();
    setupNamesComparisonForm();
    
    
    document.querySelectorAll('.loading-container, .error-container').forEach(container => {
        container.style.display = 'none';
    });
});


function setupRankingEvolutionForm() {
    const form = document.getElementById('ranking-evolution-form');
    const chartContainer = document.getElementById('ranking-evolution-chart');
    const loadingContainer = document.getElementById('ranking-evolution-loading');
    const errorContainer = document.getElementById('ranking-evolution-error');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        
        loadingContainer.style.display = 'block';
        chartContainer.style.display = 'none';
        errorContainer.style.display = 'none';
        
        
        const name = document.getElementById('name').value.trim();
        const startDecade = document.getElementById('start-decade').value;
        const endDecade = document.getElementById('end-decade').value;
        
        try {
            
            const data = await apiService.getRankingEvolution(name, startDecade, endDecade);
            
            
            loadingContainer.style.display = 'none';
            chartContainer.style.display = 'block';
            
            
            renderRankingEvolutionChart(chartContainer, data);
        } catch (error) {
            console.error('Error in ranking evolution:', error);
            
            
            loadingContainer.style.display = 'none';
            errorContainer.style.display = 'block';
            errorContainer.innerHTML = `<p>Erro ao carregar dados: ${error.message}</p>`;
        }
    });
}

function setupLocationRankingForm() {
    const form = document.getElementById('location-ranking-form');
    const tableContainer = document.getElementById('location-ranking-table');
    const loadingContainer = document.getElementById('location-ranking-loading');
    const errorContainer = document.getElementById('location-ranking-error');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        
        loadingContainer.style.display = 'block';
        tableContainer.style.display = 'none';
        errorContainer.style.display = 'none';
        
        
        const location = document.getElementById('location').value;
        
        try {
            
            const data = await apiService.getLocationRanking(location);
            
            
            loadingContainer.style.display = 'none';
            tableContainer.style.display = 'block';
            
            
            renderLocationRankingTable(tableContainer, data);
        } catch (error) {
            console.error('Error in location ranking:', error);
            
            
            loadingContainer.style.display = 'none';
            errorContainer.style.display = 'block';
            errorContainer.innerHTML = `<p>Erro ao carregar dados: ${error.message}</p>`;
        }
    });
}

function setupNamesComparisonForm() {
    const form = document.getElementById('names-comparison-form');
    const chartContainer = document.getElementById('names-comparison-chart');
    const loadingContainer = document.getElementById('names-comparison-loading');
    const errorContainer = document.getElementById('names-comparison-error');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        
        loadingContainer.style.display = 'block';
        chartContainer.style.display = 'none';
        errorContainer.style.display = 'none';
        
        
        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();
        
        try {
            
            const data = await apiService.compareNames(name1, name2);
            
            
            loadingContainer.style.display = 'none';
            chartContainer.style.display = 'block';
            
            
            renderNamesComparisonChart(chartContainer, data);
        } catch (error) {
            console.error('Error in names comparison:', error);
            
            
            loadingContainer.style.display = 'none';
            errorContainer.style.display = 'block';
            errorContainer.innerHTML = `<p>Erro ao carregar dados: ${error.message}</p>`;
        }
    });
}
