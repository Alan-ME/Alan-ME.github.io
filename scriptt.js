let total;
let data = [];

function askDataCount() {
    total = parseInt(document.getElementById("totalInput").value);
    if (isNaN(total) || total <= 0) {
        alert("Ingrese un número válido.");
        return;
    }
    document.getElementById("dataInputs").style.display = "block";
    document.getElementById("chartContainer").style.display = "block";
}

function addData() {
    if (data.length >= total) {
        alert("No puede ingresar más de " + total + " números.");
        return;
    }
    let value = parseFloat(document.getElementById("dataInput").value);
    if (isNaN(value) || value <= 0) {
        alert("Ingrese un valor válido.");
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
        list.innerHTML += `<li>${value} <button class='delete' onclick='removeData(${index})'>✖</button></li>`;
    });
}

function removeData(index) {
    data.splice(index, 1);
    updateDataList();
    generateChart();
}

function finalizeData() {
    if (data.length !== total) {
        alert("Debe ingresar exactamente " + total + " números antes de continuar.");
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
        classMarks.push(mid);
    }
    
    document.getElementById("intervals").textContent = `Intervalos: ${intervals}`;
    document.getElementById("range").textContent = `Rango: ${range}`;
    document.getElementById("amplitude").textContent = `Amplitud: ${amplitude}`;
    document.getElementById("classMarks").textContent = `Marcas de clase: ${classMarks.join(", ")}`;
    document.getElementById("result").style.display = "block";
}

function generateChart() {
    let ctx = document.getElementById("barChart").getContext("2d");
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: data,
            datasets: [{
                label: "Datos ingresados",
                data: data,
                backgroundColor: "rgba(0, 123, 255, 0.7)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
