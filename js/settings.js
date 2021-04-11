const settingsOpen = () => {
    document.getElementById('settings-container').setAttribute('class', 'settings-container settings-open');
    fetch('/constants/settings.html')
    .then((response) => {
        if (response.status == 200) {
            response.text()
            .then((settingsHTML) => {
                document.getElementById('settings-loaded').innerHTML = settingsHTML;
                document.getElementById('settings-loaded').setAttribute('style', '');
                document.getElementById('settings-loaded').setAttribute('style', '');
                document.getElementsByClassName('settings-skel')[0].setAttribute('style', 'display: none');
                postSettingsInit();
            });
        } else { 
            netError(response.status);
        }
    });
}
const settingsClose = () => {
    document.getElementById('settings-container').setAttribute('class', 'settings-container settings-close');
}
const postSettingsInit = () => {
    window["checked"] = 0;
    refreshChecks();
}

const refreshChecks = () => {
    if (window["checked"] == 0) {
        document.getElementsByClassName("checkbox-big")[0].setAttribute("class", "checkbox-big");
        document.getElementsByClassName("checkbox-big")[1].setAttribute("class", "checkbox-big checkbox-inactive");
    }
    if (window["checked"] == 1) {
        document.getElementsByClassName("checkbox-big")[1].setAttribute("class", "checkbox-big");
        document.getElementsByClassName("checkbox-big")[0].setAttribute("class", "checkbox-big checkbox-inactive");
    }
}