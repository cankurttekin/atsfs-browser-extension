// Function to create and append a button to the job listing
function addJobButton(listing) {
    const button = document.createElement('button');
    button.innerText = 'Send to ATSFS';
    //button.style.marginLeft = '10px';
    button.classList.add('custom-send-button');

    // Add event listener to send job details to the background script
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const jobTitle = document.querySelector('.job-details-jobs-unified-top-card__job-title h1 a')?.innerText;
        const jobUrl = document.querySelector('.job-details-jobs-unified-top-card__job-title h1 a')?.href;
        const companyName = document.querySelector('.job-details-jobs-unified-top-card__company-name')?.textContent.trim();
        const status = "Applied"; // Refactor this
        const applicationDate = new Date().toISOString().split('T')[0]; // Today's date
        const responseDate = null; //"2024-09-01"; 
        const platform = "LinkedIn"; // Change to reflect the platform
        const description = document.querySelector('.jobs-description__container').innerText;          
        const jobDetails = {
            companyName,
            jobTitle,
            status,
            applicationDate,
            responseDate,
            platform,
            jobUrl,
            description
        };

        // Retrieve the Bearer token from storage
        try {
            const { token } = await browser.storage.local.get('token');

            // Send job details and token to the background script
            browser.runtime.sendMessage({
                type: "sendJobDetails",
                jobDetails,
                token
            }).then(response => {
                if (response.success) {
                    alert('Job saved to ATSFS!');
                } else {
                    alert('Error sending job details to ATSFS: ' + response.error);
                }
            }).catch(error => {
                console.error('Error sending message to background script:', error);
            });
        } catch (error) {
            console.error('Error retrieving token:', error);
            alert('Failed to retrieve token. Please log in again.');
        }
    });

    // Append the button to the job listing
    listing.appendChild(button);
   // console.log("Button added to listing:", listing); // Debug log
}

// Select all job listings on the LinkedIn job page
//const jobListings = document.querySelectorAll('.mt4');
const jobListings = document.querySelectorAll('.job-details-jobs-unified-top-card__container--two-pane');
if (jobListings.length === 0) {
    console.warn("No job listings found. Please check the selector."); 
} else {
    jobListings.forEach(addJobButton);
}
