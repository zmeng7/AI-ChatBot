

function sendMessage(event) {
    if (event.key === "Enter") {
        let userMessage = document.getElementById("user-input").value;
        let chatBox = document.getElementById("chat-box");

        chatBox.innerHTML += `<p><b>I：</b> ${userMessage}</p>`;
        document.getElementById("user-input").value = "";

        fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => {
            console.log("🔹 Response status:", response.status);
            console.log("🔹 Response headers:", response.headers);
            return response.json(); 
        })
        .then(data => {
            console.log("🔹 AI response:", data);

            // Detect AI response
            if (!data || !data.response) {
                throw new Error("None AI response");
            }

            chatBox.innerHTML += `<p><b>AI：</b> ${data.response}</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            console.error("Fail to request:", error);
            chatBox.innerHTML += `<p><b>AI：</b> Fail to request: ${error.message}</p>`;
        });
    }
}
