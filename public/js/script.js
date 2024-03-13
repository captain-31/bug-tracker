// Function to add custom label
function addCustomLabel() {
    var customLabelInput = document.getElementById("customLabel");
    var customLabel = customLabelInput.value.trim();
    if (customLabel !== "") {
        var select = document.getElementById("labels");
        var option = document.createElement("option");
        option.value = customLabel;
        option.text = customLabel;
        option.selected = true; // Automatically select the custom label
        select.appendChild(option);
        customLabelInput.value = "";
    }
}

// Function to transfer selected labels to hidden input
function updateSelectedLabels() {
    const checkboxes = document.getElementsByName("filterLabel");
    const selectedLabels = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedLabels.push(checkbox.value);
        }
    });

    document.getElementById("selectedLabels").value = selectedLabels.join(",");
}

