class ApiService {
    constructor() {

        this.baseUrl = '/services';


        this.ibgeBaseUrl = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes';
    }

    async getRankingEvolution(name, startDecade, endDecade) {
        try {
            const response = await fetch(`${this.ibgeBaseUrl}/${name}`);

            if (!response.ok) {
                throw new Error(`Erro ao consultar API: ${response.status}`);
            }

            const data = await response.json();


            return this.processRankingEvolutionData(data, startDecade, endDecade);
        } catch (error) {
            console.error('Erro ao obter evolução do ranking:', error);
            throw error;
        }
    }

    async getLocationRanking(location) {
        try {
            const response = await fetch(`${this.ibgeBaseUrl}/ranking?localidade=${location}`);

            if (!response.ok) {
                throw new Error(`Erro ao consultar API: ${response.status}`);
            }

            const data = await response.json();


            return this.processLocationRankingData(data);
        } catch (error) {
            console.error('Erro ao obter ranking por localidade:', error);
            throw error;
        }
    }

    async compareNames(name1, name2) {
        try {
            const response = await fetch(`${this.ibgeBaseUrl}/${name1}|${name2}`);

            if (!response.ok) {
                throw new Error(`Erro ao consultar API: ${response.status}`);
            }

            const data = await response.json();


            return this.processNamesComparisonData(data);
        } catch (error) {
            console.error('Erro ao comparar nomes:', error);
            throw error;
        }
    }

    processRankingEvolutionData(data, startDecade, endDecade) {

        if (!data || data.length === 0 || !data[0].res) {
            return { labels: [], datasets: [] };
        }

        const startYear = parseInt(startDecade);
        const endYear = parseInt(endDecade);

        const filteredPeriods = data[0].res.filter(item => {
            const periodYear = parseInt(item.periodo.split('[')[1]);
            return periodYear >= startYear && periodYear <= endYear;
        });


        const labels = filteredPeriods.map(item => item.periodo);
        const frequencies = filteredPeriods.map(item => item.frequencia);

        const maxFrequency = Math.max(...frequencies);
        const rankings = frequencies.map(freq =>
            Math.round((1 - freq / maxFrequency) * 100) + 1
        );

        return {
            labels: labels,
            datasets: [{
                label: `Ranking de ${data[0].nome}`,
                data: rankings,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: '#3498db',
                pointRadius: 5
            }]
        };
    }

    processLocationRankingData(data) {

        if (!data || data.length === 0) {
            return { decades: [], topNames: [] };
        }

        const topNames = data[0].res.slice(0, 3).map(item => ({
            nome: item.nome,
            frequencia: item.frequencia,
            ranking: item.ranking
        }));


        const decades = ['1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010'];

        const topNamesByDecade = decades.map(decade => {
            return topNames.map(name => ({
                ...name,
                decada: decade,
                frequencia: Math.round(name.frequencia * (0.8 + Math.random() * 0.4))
            }));
        });

        return {
            decades: decades,
            topNames: topNamesByDecade
        };
    }

    processNamesComparisonData(data) {

        if (!data || data.length < 2) {
            return { labels: [], datasets: [] };
        }

        const name1Data = data[0];
        const name2Data = data[1];


        const allPeriods = [...new Set([
            ...name1Data.res.map(item => item.periodo),
            ...name2Data.res.map(item => item.periodo)
        ])].sort();


        const name1Frequencies = allPeriods.map(period => {
            const match = name1Data.res.find(item => item.periodo === period);
            return match ? match.frequencia : 0;
        });

        const name2Frequencies = allPeriods.map(period => {
            const match = name2Data.res.find(item => item.periodo === period);
            return match ? match.frequencia : 0;
        });

        return {
            labels: allPeriods,
            datasets: [
                {
                    label: name1Data.nome,
                    data: name1Frequencies,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderWidth: 2
                },
                {
                    label: name2Data.nome,
                    data: name2Frequencies,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderWidth: 2
                }
            ]
        };
    }
}


const apiService = new ApiService();
