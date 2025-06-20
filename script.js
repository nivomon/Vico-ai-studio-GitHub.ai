
let token = "";

async function generate() {
    token = token || prompt("Enter your HuggingFace Token:");

    const promptText = document.getElementById("prompt").value.trim();
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const output = document.getElementById("output");
    output.innerHTML = "Generating... Please wait.";

    const url = mode === "image"
        ? "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"
        : "https://api-inference.huggingface.co/models/damo-vilab/modelscope-damo-text-to-video-synthesis";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: promptText })
    });

    if (!response.ok) {
        output.innerHTML = "Error generating content.";
        return;
    }

    const blob = await response.blob();
    const mediaUrl = URL.createObjectURL(blob);
    if (mode === "image") {
        output.innerHTML = `<img src="${mediaUrl}" style="max-width:100%;border-radius:12px;">`;
    } else {
        output.innerHTML = `<video src="${mediaUrl}" controls autoplay loop style="max-width:100%;border-radius:12px;"></video>`;
    }
}
