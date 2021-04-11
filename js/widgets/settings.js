class SettingsWidget {
    constructor() {
        var settingsButtonElement = document.createElement('div');
        settingsButtonElement.setAttribute('id', 'settingsButton');
        settingsButtonElement.setAttribute('class', 'widget top-right');
        settingsButtonElement.setAttribute('style', 'padding: 7px;');
        settingsButtonElement.innerHTML = `
            <div
                style='height: 20px; width: 18px; background-color: white; -webkit-mask: url(/images/icons/settings.svg); mask: url(/images/icons/settings.svg) no-repeat; mask-size: cover; -webkit-mask-size: cover;'
            >
            </div>
        `;
        document.getElementById('widgets-container').appendChild(settingsButtonElement);
        document.getElementById('settingsButton').addEventListener('click', settingsOpen);
    }
}

new SettingsWidget();