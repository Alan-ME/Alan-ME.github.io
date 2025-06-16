
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00bef8" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#3943ce",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});


let totalValue = 0;
let percentages = [];
let ctx = document.getElementById('barChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'bar',
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        },
        scales: {
            y: { beginAtZero: true }
        },
        plugins: {
            legend: { display: true },
            title: {
                display: true,
                text: 'Statistical Data Visualization',
                font: { size: 18 },
                color: '#00bef8'
            }
        }
    },
    data: {
        labels: [],
        datasets: [{
            label: 'Values',
            data: [],
            backgroundColor: 'rgba(0, 190, 248, 0.7)',
            borderColor: 'rgba(0, 190, 248, 1)',
            borderWidth: 1,
            borderRadius: 5
        }]
    }
});


function askPercentages() {
    totalValue = Number(document.getElementById('totalInput').value);
    if (totalValue > 0) {
        percentages = [];
        updatePercentageList();
        document.getElementById('percentageInputs').style.display = 'block';
    } else {
        alert("Please enter a valid number greater than 0.");
    }
}

function addPercentage() {
    let percent = Number(document.getElementById('percentageInput').value);
    let totalPercentage = percentages.reduce((acc, p) => acc + p, 0) + percent;
    
    if (percent > 0 && totalPercentage <= 100) {
        percentages.push(percent);
        updatePercentageList();
        document.getElementById('percentageInput').value = '';
    } else {
        alert("Total percentage cannot exceed 100%.");
    }
}

function removePercentage(index) {
    percentages.splice(index, 1);
    updatePercentageList();
}

function updatePercentageList() {
    let list = document.getElementById('percentageList');
    list.innerHTML = '';
    
    percentages.forEach((p, i) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${p}%</span>
            <button class="delete" onclick="removePercentage(${i})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        list.appendChild(listItem);
    });
    
    let totalPercentage = percentages.reduce((acc, p) => acc + p, 0);
    document.getElementById('remainingPercentage').textContent = 
        `Remaining Percentage: ${100 - totalPercentage}%`;
}

function finalizeChart() {
    if (percentages.length === 0) {
        alert("Please add at least one percentage.");
        return;
    }
    
    let values = percentages.map(p => (totalValue * p) / 100);
    chart.data.labels = values.map((_, i) => `Data ${i + 1}`);
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = values.map(() => getRandomColor());
    
    chart.update();
    
   
    document.querySelector('.chart-section').style.animation = 'pulse 2s';
    setTimeout(() => {
        document.querySelector('.chart-section').style.animation = '';
    }, 2000);
}


let data = [];

function askDataCount() {
    total = parseInt(document.getElementById("totalInputC").value);
    if (isNaN(total) || total <= 0) {
        alert("Please enter a valid number.");
        return;
    }
    document.getElementById("dataInputs").style.display = "block";
}

function addData() {
    if (data.length >= total) {
        alert(`You cannot enter more than ${total} numbers.`);
        return;
    }
    
    let value = parseFloat(document.getElementById("dataInput").value);
    if (isNaN(value) || value <= 0) {
        alert("Please enter a valid value.");
        return;
    }
    
    data.push(value);
    updateDataList();
    generateChart();
}

function updateDataList() {
    let list = document.getElementById("dataList");
    list.innerHTML = "";
    data.forEach((value, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${value}</span>
            <button class="delete" onclick='removeData(${index})'>
                <i class="fas fa-trash"></i>
            </button>
        `;
        list.appendChild(listItem);
    });
}

function removeData(index) {
    data.splice(index, 1);
    updateDataList();
    generateChart();
}

function finalizeData() {
    if (data.length !== total) {
        alert(`Please enter exactly ${total} numbers before continuing.`);
        return;
    }
    calculateResults();
}

function calculateResults() {
    let min = Math.min(...data);
    let max = Math.max(...data);
    let range = max - min;
    let intervals = Math.ceil(Math.sqrt(data.length));
    let amplitude = Math.ceil(range / intervals);
    let classMarks = [];
    
    for (let i = 0; i < intervals; i++) {
        let lower = min + i * amplitude;
        let upper = lower + amplitude;
        let mid = (lower + upper) / 2;
        classMarks.push(mid.toFixed(2));
    }
    
    document.getElementById("intervals").textContent = intervals;
    document.getElementById("range").textContent = range.toFixed(2);
    document.getElementById("amplitude").textContent = amplitude.toFixed(2);
    document.getElementById("classMarks").textContent = classMarks.join(", ");
    document.getElementById("result").style.display = "block";
    
    
    document.querySelector('.results').style.animation = 'fadeIn 1s';
}

function generateChart() {
    if (window.myChart) {
        window.myChart.destroy();
    }
    
    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: data,
            datasets: [{
                label: "Entered Data",
                data: data,
                backgroundColor: "rgba(0, 123, 255, 0.7)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function getRandomColor() {
    const colors = [
        '#00bef8', '#ff0697', '#ff4d00', '#ffe600', 
        '#bb00ff', '#00ff7f', '#ffcc00', '#3943ce'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}


document.querySelectorAll('.reset-btn').forEach(button => {
    button.addEventListener('click', function() {
       
        document.getElementById('totalInput').value = '';
        document.getElementById('percentageInputs').style.display = 'none';
        document.getElementById('percentageList').innerHTML = '';
        percentages = [];
        
       
        document.getElementById('totalInputC').value = '';
        document.getElementById('dataInputs').style.display = 'none';
        document.getElementById('dataList').innerHTML = '';
        data = [];
        
       
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        chart.update();
        
     
        document.getElementById('result').style.display = 'none';
    });
});