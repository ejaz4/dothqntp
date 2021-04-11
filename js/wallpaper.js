const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const selectAndLoadWallpaper = () => {
    fetch('/constants/backgrounds.json')
    .then((response) => {

        if (response.status == 200){
            response.json()
            .then((backgrounds) => {
                const backgroundNum = Math.floor(getRandomArbitrary(0, backgrounds.length));
                downloadWallpaper(`/images/unsplash/${backgrounds[backgroundNum].id}.jpeg`);
            });
        } else{
            netError(response.status);
        }
    });
};

const downloadWallpaper = (uri) => {
    fetch(uri)
    .then((response) => {

        if (response.status == 200){
            response.blob()
            .then((image) => {
                window["temp_wallpaperBlob"] = URL.createObjectURL(image);
                placeWallpaper(window["temp_wallpaperBlob"]);
            });
        } else{
            netError(response.status);
        }
    });
};

const placeWallpaper = (blob) => {
    document.getElementById("resting-app").setAttribute(
        "style",
        `
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 53.65%, rgba(0, 0, 0, 0.35) 100%),
                        url(${blob}) no-repeat center/cover;
        `
    );
}

window.addEventListener("beforeunload", () => {
  URL.revokeObjectURL(window["temp_wallpaperBlob"]);
})