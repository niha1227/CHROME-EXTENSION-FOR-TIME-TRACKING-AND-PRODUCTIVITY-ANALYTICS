fetch("http://localhost:5001/analytics")
    .then(res => res.json())
    .then(data => {
        const ctx = document.getElementById("chart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.map(d => d.site),
                datasets: [{
                    label: "Time Spent",
                    data: data.map(d => d.time),
                    backgroundColor: "blue"
                }]
            }
        });
    });
