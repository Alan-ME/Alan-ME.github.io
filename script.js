let totalValue = 0;
let percentages = [];
let ctx = document.getElementById('barChart').getContext('2d');

let chart = new Chart(ctx, {
    type: 'bar',
    options: {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar el tamaño sin distorsión
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
    data: {
        labels: [],
        datasets: [{
            label: 'Valores',
            data: [],
            backgroundColor: 'blue'
        }]
    }
});

function askPercentages() {
    totalValue = Number(document.getElementById('totalInput').value);
    
    if (totalValue > 0) {
        percentages = []; // Reiniciar valores
        updatePercentageList();
        document.getElementById('percentageInputs').style.display = 'block';
    } else {
        alert("Ingrese un número válido mayor a 0.");
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
        alert("No puede superar el 100% en total.");
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
        listItem.textContent = p + "% ";

        let deleteButton = document.createElement('button');
        deleteButton.textContent = "X";
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => removePercentage(i);

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });

    let totalPercentage = percentages.reduce((acc, p) => acc + p, 0);
    document.getElementById('remainingPercentage').textContent = `Porcentaje restante: ${100 - totalPercentage}%`;
}

function finalizeChart() {
    if (percentages.length === 0) {
        alert("Debe agregar al menos un porcentaje.");
        return;
    }

    let values = percentages.map(p => (totalValue * p) / 100);
    
    chart.data.labels = values.map((_, i) => `Dato ${i + 1}`);
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = values.map(() => getRandomColor());
    
    chart.update();
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}