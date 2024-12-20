const tabs = document.querySelectorAll('.nav-link');
const screens = document.querySelectorAll('.screen');
const leadListingScreen = document.getElementById('leadListing');
const leadDetailsScreen = document.getElementById('leadDetails');
const leadDetailsContainer = document.querySelector('#leadDetails .card-body');
const leadsData = [
    { 
        name: "John Doe",      
        email: "john.doe@example.com", 
        source: "Website", 
        status: "New", 
        assignedTo: "Jane Smith", 
        lastContacted: "2023-12-18",
        notes: "Customer showed interest in SUVs."  
    },
    { 
        name: "Mary Jane", 
        email: "mary.jane@example.com", 
        source: "Facebook", 
        status: "Contacted", 
        assignedTo: "John Brown", 
        lastContacted: "2023-12-17",
        notes: "Customer requested a test drive for sedans."  
    },
    { 
        name: "Michael Scott", 
        email: "michael.scott@example.com", 
        source: "Referral", 
        status: "New", 
        assignedTo: "Angela Martin", 
        lastContacted: "2023-12-19",
        notes: "Customer interested in family cars, prefers budget-friendly options." 
    },
    { 
        name: "Jim Halpert", 
        email: "jim.halpert@example.com", 
        source: "Website", 
        status: "Contacted", 
        assignedTo: "Pam Beesly", 
        lastContacted: "2023-12-16",
        notes: "Lead showed interest in electric vehicles, requested more details on models."  
    },
    { 
        name: "Dwight Schrute", 
        email: "dwight.schrute@example.com", 
        source: "Referral", 
        status: "Not Interested", 
        assignedTo: "Michael Scott", 
        lastContacted: "2023-12-15",
        notes: "Customer is looking for a compact sedan, prefers color red."  
    },
    { 
        name: "Ryan Howard", 
        email: "ryan.howard@example.com", 
        source: "LinkedIn", 
        status: "New", 
        assignedTo: "Jan Levinson", 
        lastContacted: "2023-12-14",
        notes: "Customer mentioned interest in high-end luxury cars, looking for a premium model."
    }
];

let selectedLead = null; 
document.getElementById('leadListing').classList.remove('d-none');
tabs[0].classList.add('active');  
function displayLeadDetails(lead) {
    leadDetailsContainer.innerHTML = `
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Contact Info:</strong> ${lead.email}</p>
        <p><strong>Source:</strong> ${lead.source}</p>
        <p><strong>Status:</strong> <span class="status-tag status-${lead.status.toLowerCase()}">${lead.status}</span></p>
        <p><strong>Assigned To:</strong> ${lead.assignedTo}</p>
        <p><strong>Last Contacted:</strong> ${lead.lastContacted}</p>
        <p><strong>Note:</strong> ${lead.notes}</p>  <!-- Display the note here -->
    `;
    document.getElementById('leadListing').classList.add('d-none');
    document.getElementById('leadDetails').classList.remove('d-none');
}

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        screens.forEach(screen => screen.classList.add('d-none'));
        tabs.forEach(tab => tab.classList.remove('active'));
        const screenId = tab.getAttribute('data-screen');
        document.getElementById(screenId).classList.remove('d-none');
        tab.classList.add('active');
    });
});
document.querySelectorAll('.btn-info').forEach((button, index) => {
    button.addEventListener('click', () => {
        selectedLead = leadsData[index];  
        displayLeadDetails(selectedLead); 
    });
});
function displayLeadManagement() {
    const leadManagementContainer = document.getElementById('leadManagementContainer');
    leadManagementContainer.innerHTML = '';
    const statusCategories = ['New', 'Contacted', 'Not Interested'];
    statusCategories.forEach(status => {
        const section = document.createElement('div');
        section.classList.add('lead-status-column');
        section.innerHTML = `
            <h4>${status}</h4>
            <ul class="list-group" id="status-${status}">
                <!-- Leads for this status will go here -->
            </ul>
        `;
        leadManagementContainer.appendChild(section);
    });
    leadsData.forEach(lead => {
        const leadItem = document.createElement('li');
        leadItem.classList.add('list-group-item');
        leadItem.innerHTML = `
            <p><strong>${lead.name}</strong></p>
            <p>${lead.email}</p>
            <p>Status: <span class="status-tag status-${lead.status.toLowerCase()}">${lead.status}</span></p>
        `;
        const statusList = document.getElementById(`status-${lead.status}`);
        statusList.appendChild(leadItem);
    });
}
document.querySelector('.nav-link[data-screen="leadManagement"]').addEventListener('click', function() {
    screens.forEach(screen => screen.classList.add('d-none'));
    document.getElementById('leadManagement').classList.remove('d-none');
    displayLeadManagement();
});
constleadsData = [
    { name: "John Doe", status: "New" },
    { name: "Mary Jane", status: "Contacted" },
    { name: "Alice Johnson", status: "Not Interested" },
    { name: "Bob Smith", status: "New" },
    { name: "Charlie Brown", status: "Contacted" },
    { name: "Eve Davis", status: "New" }
];

const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);

script.onload = function() {
    function createLeadStatusChart() {
        const ctx = document.getElementById('leadStatusChart').getContext('2d');

        const statusCounts = { New: 0, Contacted: 0, 'Not Interested': 0 };

        leadsData.forEach(lead => {
            if (statusCounts[lead.status] !== undefined) {
                statusCounts[lead.status]++;
            }
        });

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['New', 'Contacted', 'Not Interested'],
                datasets: [{
                    data: [statusCounts.New, statusCounts.Contacted, statusCounts['Not Interested']],
                    backgroundColor: ['blue', 'green', 'red'],
                    borderColor: ['#fff', '#fff', '#fff'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw} leads`;
                            }
                        }
                    }
                }
            }
        });
    }

    document.querySelector('.nav-link[data-screen="dashboard"]').addEventListener('click', function() {
        screens.forEach(screen => screen.classList.add('d-none'));
        document.getElementById('dashboard').classList.remove('d-none');
        createLeadStatusChart();
    });
};
