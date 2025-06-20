async function generateScript() {
    const userPrompt = document.getElementById("userPrompt").value;
    const response = await fetch("http://localhost:3000/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt })
    });
    const data = await response.json();
    document.getElementById("generatedScript").innerText = data.script;
}

async function createVideo() {
    const script = document.getElementById("generatedScript").innerText;
    const response = await fetch("http://localhost:3000/create-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script })
    });
    const data = await response.json();
    checkVideoStatus(data.jobId);
}

async function checkVideoStatus(jobId) {
    setInterval(async () => {
        const response = await fetch("http://localhost:3000/video-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobId })
        });
        const data = await response.json();
        if (data.status === "completed") {
            document.getElementById("videoStatus").innerHTML = `<a href="${data.videoUrl}">Watch Video</a>`;
        } else {
            document.getElementById("videoStatus").innerText = "Processing...";
        }
    }, 3000);
}
