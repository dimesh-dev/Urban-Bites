//Terms Popup
function openTermsPopup() {
    document.getElementById("termsPopup").style.display = "block";
}

function closeTermsPopup() {
    document.getElementById("termsPopup").style.display = "none";
}

window.onclick = function(event) {
    var popup = document.getElementById("termsPopup");
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

//Privacy Popup
function openPrivacyPopup() {
    document.getElementById("privacyPopup").style.display = "block";
}

function closePrivacyPopup() {
    document.getElementById("privacyPopup").style.display = "none";
}

window.onclick = function(event) {
    var popup = document.getElementById("privacyPopup");
    if (event.target == popup) {
        popup.style.display = "none";
    }
}