const data = {
    companyName: "TechCorp",
    matchScore: 86,
    accountStatus: "Target"
  };
  
  chrome.storage.sync.get(["widgetVisible"], function (result) {
    const isVisible = result.widgetVisible !== false; // default true
    if (isVisible) {
      createWidget(data);
    }
  });
  
  function createWidget({ companyName, matchScore, accountStatus }) {
    const widget = document.createElement("div");
    widget.id = "linkedin-widget";
  
    widget.innerHTML = `
      <h2>${companyName}</h2>
      <label>Match Score:</label>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${matchScore}%;"></div>
      </div>
      <span class="status-tag ${accountStatus === 'Target' ? 'status-target' : 'status-not-target'}">
        ${accountStatus}
      </span>
      <br/>
      <button id="toggle-btn">Hide Widget</button>
    `;
  
    document.body.appendChild(widget);
  
    document.getElementById("toggle-btn").addEventListener("click", () => {
      widget.remove();
      chrome.storage.sync.set({ widgetVisible: false });
    });
  }