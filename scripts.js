// Dashboard Functionality voor Residentie HELIX
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard wordt geladen...');
    
    // Test Chart.js availability
    if (typeof Chart === 'undefined') {
        console.error('Chart.js niet gevonden');
        setTimeout(() => {
            if (typeof Chart === 'undefined') {
                showChartErrors('Chart.js kon niet worden geladen. Controleer internetverbinding.');
                return;
            }
            initializeCharts();
        }, 2000);
    } else {
        console.log('Chart.js gevonden, initialiseer grafieken...');
        setTimeout(initializeCharts, 500);
    }
    
    // Initialize tab functionality
    initializeTabs();
});

// Chart initialization with error handling
function initializeCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is niet geladen');
        showChartErrors('Chart.js bibliotheek kon niet worden geladen. Controleer uw internetverbinding.');
        return;
    }
    
    try {
        // Register Chart.js components
        Chart.register(
            Chart.ArcElement,
            Chart.BarElement,
            Chart.CategoryScale,
            Chart.LinearScale,
            Chart.DoughnutController,
            Chart.PieController,
            Chart.BarController,
            Chart.Legend,
            Chart.Tooltip,
            Chart.Title
        );
        
        // Set global Chart.js defaults
        Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = true;
        Chart.defaults.plugins.legend.labels.usePointStyle = true;
        
        // Initialize each chart with delay to prevent rendering issues
        setTimeout(() => createMainExpenseChart(), 100);
        setTimeout(() => createBudgetChart(), 200);
        setTimeout(() => createTechemChart(), 300);
        setTimeout(() => createCommonChart(), 400);
        
    } catch (error) {
        console.error('Fout bij het initialiseren van grafieken:', error);
        showChartErrors('Er is een fout opgetreden bij het laden van de grafieken: ' + error.message);
    }
}

// Chart 1: Main Expense Distribution (Pie Chart)
function createMainExpenseChart() {
    const ctx = document.getElementById('mainExpenseChart');
    if (!ctx) return;
    
    try {
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['TECHEM (31,6%)', 'Gemeenschappelijk (57,0%)', 'Privatief (11,4%)'],
                datasets: [{
                    data: [153590, 277314, 55182],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB', 
                        '#FFCE56'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff',
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            },
                            generateLabels: function(chart) {
                                const data = chart.data;
                                return data.labels.map((label, index) => ({
                                    text: label,
                                    fillStyle: data.datasets[0].backgroundColor[index],
                                    strokeStyle: data.datasets[0].borderColor,
                                    lineWidth: data.datasets[0].borderWidth,
                                    hidden: false,
                                    index: index
                                }));
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: €${value.toLocaleString('nl-BE')} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1000
                }
            }
        });
        hideChartFallback('mainExpenseChart');
    } catch (error) {
        console.error('Fout bij hoofdkostengrafiek:', error);
        showChartFallback('mainExpenseChart', 'Fout bij laden van kostenverdeling');
    }
}

// Chart 2: Budget vs Actual (Bar Chart)
function createBudgetChart() {
    const ctx = document.getElementById('budgetChart');
    if (!ctx) return;
    
    try {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['TECHEM', 'Gemeenschappelijk', 'Privatief', 'Totaal'],
                datasets: [
                    {
                        label: 'Budget',
                        data: [145500, 268000, 67000, 510000],
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: '#36A2EB',
                        borderWidth: 2,
                        borderRadius: 4
                    },
                    {
                        label: 'Werkelijk',
                        data: [153590, 277314, 55182, 486086],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        borderColor: '#FF6384',
                        borderWidth: 2,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '€ ' + (value/1000).toFixed(0) + 'k';
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: €${context.parsed.y.toLocaleString('nl-BE')}`;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1200,
                    easing: 'easeInOutQuart'
                }
            }
        });
        hideChartFallback('budgetChart');
    } catch (error) {
        console.error('Fout bij budgetgrafiek:', error);
        showChartFallback('budgetChart', 'Fout bij laden van budgetvergelijking');
    }
}

// Chart 3: TECHEM Breakdown (Doughnut Chart)
function createTechemChart() {
    const ctx = document.getElementById('techemChart');
    if (!ctx) return;
    
    try {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Gas (43%)',
                    'Water (11,9%)', 
                    'Verwarming (8,8%)',
                    'CV (15,9%)',
                    'Zwembad (7,1%)',
                    'Tellers (7,3%)',
                    'Contract (6,0%)'
                ],
                datasets: [{
                    data: [66100, 18210, 13461, 24429, 10952, 11188, 9251],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56', 
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#C9CBCF'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff',
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 10,
                            font: {
                                size: 11
                            },
                            boxWidth: 12
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: €${value.toLocaleString('nl-BE')}`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1500
                }
            }
        });
        hideChartFallback('techemChart');
    } catch (error) {
        console.error('Fout bij TECHEM grafiek:', error);
        showChartFallback('techemChart', 'Fout bij laden van TECHEM breakdown');
    }
}

// Chart 4: Common Costs (Horizontal Bar Chart)
function createCommonChart() {
    const ctx = document.getElementById('commonChart');
    if (!ctx) return;
    
    try {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Beheer',
                    'Concierge', 
                    'Onderhoud',
                    'Kantoor',
                    'Verzekeringen',
                    'Liften',
                    'Elektriciteit',
                    'Buitengewoon'
                ],
                datasets: [{
                    label: 'Bedrag in €',
                    data: [82810, 53179, 37920, 30140, 29631, 20194, 16443, 8726],
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: '#36A2EB',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `€${context.parsed.x.toLocaleString('nl-BE')}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '€ ' + (value/1000).toFixed(0) + 'k';
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1400,
                    easing: 'easeInOutBack'
                }
            }
        });
        hideChartFallback('commonChart');
    } catch (error) {
        console.error('Fout bij gemeenschappelijke kosten grafiek:', error);
        showChartFallback('commonChart', 'Fout bij laden van gemeenschappelijke kosten');
    }
}

// Tab functionality - Fixed version
function initializeTabs() {
    console.log('Tabs initialiseren...');
    
    // Remove onclick attributes and add proper event listeners
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, index) => {
        // Remove onclick attribute
        tab.removeAttribute('onclick');
        
        // Determine tab name from button text or data attribute
        let tabName = '';
        const buttonText = tab.textContent.toLowerCase().trim();
        
        if (buttonText.includes('overzicht')) tabName = 'overview';
        else if (buttonText.includes('techem')) tabName = 'techem';
        else if (buttonText.includes('gemeenschappelijk')) tabName = 'gemeenschappelijk';
        else if (buttonText.includes('privatief')) tabName = 'privatief';  
        else if (buttonText.includes('eigenaars')) tabName = 'eigenaars';
        else if (buttonText.includes('leveranciers')) tabName = 'leveranciers';
        else if (buttonText.includes('liften')) tabName = 'liften';
        else if (buttonText.includes('onderhoud')) tabName = 'onderhoud';
        else if (buttonText.includes('concierge')) tabName = 'concierge';
        else if (buttonText.includes('verzekeringen')) tabName = 'verzekeringen';
        else if (buttonText.includes('budget')) tabName = 'budget';
        
        // Add click event listener
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Tab geklikt:', tabName);
            openTab(event, tabName);
        });
    });
    
    console.log('Tabs geïnitialiseerd');
}

// Open specific tab
function openTab(evt, tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Remove active class from all tabs
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked tab
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

// Show details function for clickable cards
function showDetails(type) {
    const tabMap = {
        'balance': 'overview',
        'expenses': 'gemeenschappelijk', 
        'income': 'budget',
        'owners': 'eigenaars'
    };
    
    if (tabMap[type]) {
        const tabs = document.querySelectorAll('.tab');
        for (let i = 0; i < tabs.length; i++) {
            const onclick = tabs[i].getAttribute('onclick');
            if (onclick && onclick.includes(tabMap[type])) {
                tabs[i].click();
                break;
            }
        }
    }
}

// Show loading states
function showLoadingStates() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        const fallback = container.querySelector('.chart-fallback');
        if (fallback) {
            fallback.innerHTML = '<div class="chart-loading"><div class="loading-spinner"></div></div>';
            fallback.style.display = 'block';
        }
    });
}

// Hide chart fallback
function hideChartFallback(chartId) {
    const container = document.getElementById(chartId)?.closest('.chart-container');
    if (container) {
        const fallback = container.querySelector('.chart-fallback');
        if (fallback) {
            fallback.style.display = 'none';
        }
    }
}

// Show chart fallback with error message
function showChartFallback(chartId, message) {
    const container = document.getElementById(chartId)?.closest('.chart-container');
    if (container) {
        const fallback = container.querySelector('.chart-fallback');
        if (fallback) {
            fallback.innerHTML = `<div style="color: #e74c3c;"><strong>Fout:</strong> ${message}</div>`;
            fallback.style.display = 'block';
        }
    }
}

// Show chart errors for all charts
function showChartErrors(message) {
    document.querySelectorAll('.chart-fallback').forEach(fallback => {
        fallback.innerHTML = `<div style="color: #e74c3c; text-align: center;"><strong>Fout:</strong><br>${message}<br><br><small>Bekijk de gedetailleerde data in de tabellen hieronder.</small></div>`;
        fallback.style.display = 'block';
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return '€ ' + amount.toLocaleString('nl-BE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Utility function to format percentage
function formatPercentage(value) {
    return value.toFixed(1) + '%';
}

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        'mainExpenseChart',
        'budgetChart', 
        'techemChart',
        'commonChart'
    ];
    
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`Element met ID '${id}' niet gevonden`);
        }
    });
}

// Print functionality (optional)
function printDashboard() {
    window.print();
}

// Export functionality (optional - would require additional libraries)
function exportToPDF() {
    alert('PDF export functionaliteit kan worden toegevoegd met bibliotheken zoals jsPDF');
}

// Make functions globally available
window.openTab = openTab;
window.showDetails = showDetails;
window.printDashboard = printDashboard;
window.exportToPDF = exportToPDF;
