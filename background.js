// Listen for messages from content script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "sendJobDetails") {
        const { jobDetails, token } = message;
		// set backend https url in prod		
        fetch('http://localhost:443/api/job-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(jobDetails),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            sendResponse({ success: true, data });
        })
        .catch(error => {
            console.error("Error:", error);
            sendResponse({ success: false, error: error.message });
        });

        // Keep the message channel open for the async response
        return true; 
    }

    if (message.type === "SET_AUTH_TOKEN") {
        browser.storage.local.set({ token: message.token });
    }
});
