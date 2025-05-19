# Siena Automation Library

## Project Overview

The Siena Automation Library is a collection of visualized workflows designed to document and explain various customer service automation processes. It serves as a central repository for understanding the step-by-step logic of how different customer interactions are handled by Siena AI personas and related automations.

This library is built as a static website, with a main library page linking to individual HTML pages, each visualizing a specific automation workflow. The visualizations are designed to be clear, easy to follow, and helpful for training, reference, and process improvement.

The library also includes a summary of key customer insights and recommendations derived from internal reports (e.g., "Siena Memory Insights Report") to help guide the development and prioritization of new automations.

## Current Automations Visualized

As of the latest update, the library includes visualizations for the following automations:

1.  **Customer Order Status Workflow (Elisha Persona):** Details how customer inquiries about their order status are handled, with a focus on prioritizing unfulfilled orders.
2.  **Initial Greeting & Query Clarification (Elisha Persona):** Outlines the logic for the Elisha persona to greet customers, understand their initial needs, and then route or escalate the conversation appropriately.
3.  **Order Cancellation Request Workflow:** Visualizes the process for handling customer requests to cancel their orders, including reason identification and escalation.
4.  **Return Request Workflow:** Describes the steps to verify return eligibility based on company policy and guide the customer through the return process.
5.  **Hydrogen Bath Bomb Inquiry Workflow:** Manages customer inquiries about the upcoming hydrogen bath bombs, including directing them to sign up for early access and updates.

## How to Use

1.  **Access the Main Library Page:**
    * If deployed (e.g., on Cloudflare Pages), navigate to the main URL provided for the site (e.g., `https://your-subdomain.pages.dev/`). This should load the `index.html` (Siena Automation Library page).
    * If viewing locally, open the `siena_automation_library_page_02.html` file (or `index.html` if you've renamed it) in your web browser.

2.  **Navigate to Individual Workflows:**
    * On the main library page, you will find cards for each available automation workflow.
    * Click the "View Workflow" button on a card to open the detailed HTML visualization for that specific automation in a new tab.

3.  **View Workflow Visualizations:**
    * Each workflow page provides a step-by-step breakdown of the automation logic, including context, persona details (if applicable), decision points, and actions.
    * Use the "Back to Automation Library" button (if implemented on the workflow page) to easily return to the main library page.

4.  **Review Customer Insights:**
    * The main library page also contains a section summarizing "Key Customer Insights & Recommendations." This provides context on customer pain points and strategic areas for automation development.

## Project Structure

The project is structured as follows:

* `siena_automation_library_page_02.html` (or `index.html`): The main landing page that lists all available automation visualizations and the customer insights summary.
* `whereismyorder.html`: HTML visualization for the "Customer Order Status Workflow."
* `initialgreeting.html`: HTML visualization for the "Initial Greeting & Query Clarification Workflow."
* `cancelmyorder.html`: HTML visualization for the "Order Cancellation Request Workflow."
* `returns.html`: HTML visualization for the "Return Request Workflow."
* `bathbomb.html`: HTML visualization for the "Hydrogen Bath Bomb Inquiry Workflow."
* (Potentially other `.html` files for future automation visualizations)
* (Potentially a `_redirects` file if using Cloudflare Pages for handling URL redirects)

All linked HTML files are expected to be in the same directory as the main library page, or in a clearly defined relative path if a subfolder structure is used.

## Adding New Automation Visualizations

To add a new automation workflow visualization to this library:

1.  **Create the HTML Visualization:**
    * Develop a new HTML page for the new automation, similar in structure and style to the existing workflow pages.
    * Ensure it clearly outlines the context, steps, decision points, and any persona details.
    * Consider adding a "Back to Automation Library" button to this new page, linking back to the main library HTML file.

2.  **Save the New HTML File:**
    * Save the new HTML file with a descriptive name (e.g., `new_automation_workflow.html`).
    * Place this file in the same directory as the main `siena_automation_library_page_02.html` (or `index.html`) file, or in a designated subfolder (e.g., `/workflows/`).

3.  **Update the Main Library Page:**
    * Open the `siena_automation_library_page_02.html` (or `index.html`) file in a code editor.
    * Locate the `<div class="grid ...">` section that contains the "automation-card" elements.
    * Copy an existing `<div class="automation-card">...</div>` block.
    * Paste this copied block within the grid.
    * Modify the content of the new card:
        * Update the `<h2>` tag with the title of your new automation.
        * Update the `<p>` tag with a brief description of the new automation.
        * Update the `href` attribute in the `<a>` tag to point to the filename of your new HTML visualization (e.g., `href="new_automation_workflow.html"` or `href="workflows/new_automation_workflow.html"` if in a subfolder).

4.  **Test:**
    * Open the main library page in a browser to ensure your new automation card appears correctly and the link works.

## Deployment (Example with Cloudflare Pages)

This static website can be easily deployed using services like Cloudflare Pages:

1.  **Prepare Files:** Ensure all your HTML files (library page, individual workflow pages) and any associated assets (like a `_redirects` file) are in a single folder or a Git repository.
2.  **Cloudflare Pages Setup:**
    * Log in to your Cloudflare dashboard.
    * Go to "Workers & Pages."
    * Choose to connect a Git repository (GitHub, GitLab) or use "Direct Upload."
3.  **Configure Project:**
    * If using Git, select your repository and branch.
    * Set the "Build command" (usually not needed for plain HTML sites, can leave blank or use a simple command if you have a build step).
    * Set the "Build output directory" (e.g., `/` if files are at the root, or the name of your public folder like `dist` or `public` if you have one).
    * If your site content is within a subfolder in your repository (e.g., a `project` folder), you can set the "Root directory (advanced)" setting in "Builds & deployments" to that subfolder name (e.g., `project`). This makes that subfolder the effective root of your deployed site.
4.  **Deploy:** Save and deploy. Cloudflare Pages will build and host your site.

## Contributing

If you have suggestions for new automations to visualize, improvements to existing visualizations, or updates to the customer insights, please discuss with the project maintainer.

---

This README provides a comprehensive guide to understanding, using, and expanding the Siena Automation Library.
