function DogeImage(src, width, height, title, description, tags, date) {
    this.src = src;
    this.width = width;
    this.height = height;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.date = date;
}

var images = [];

const directoryPath = "https://itsmarsss.github.io/DogePics";

for (var i = 0; i < 81; i++) {
    images.push(`${directoryPath}/marked/doge_pic_${i}.png`);
}

const content = document.getElementById("content");

document.getElementById("search_input").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        filter();
    }
});

const modal = document.getElementById("modal");
const popup = document.getElementById("popup");

const big_image = document.getElementById("big_image");
const title = document.getElementById("title");
const description = document.getElementById("description");
const tags = document.getElementById("tags");
const date = document.getElementById("date");
const share = document.getElementById("share_doge");

function filter() {
    console.log("Filter");
}

const photoWidth = getComputedStyle(document.documentElement).getPropertyValue("--imgWidth").replace("px", "");
const loadAmount = 12;
var latestIndex = 0;

var adjustedImages = {};

function addImageProcess(src, index) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            adjustedImages[index] = new DogeImage(img.src, img.width, img.height, "Doge Pic (Will update)", "All titles and descriptions are like this for now, I have not yet found the time to entertain the viewer by generating fun contexts texts.", ["Tags", "Will", "Be", "Here", ":D"], 1688338082164);

            console.log("Added " + index);

            resolve();
        }
        img.onerror = reject;
    })
}

async function loadMore() {
    const adjustedLoadAmount = Math.min(loadAmount, images.length - Object.keys(adjustedImages).length);

    modal.style.display = "flex";
    disableBodyScroll();

    document.getElementById("load_more").disabled = true;

    for (var i = latestIndex; i < latestIndex + adjustedLoadAmount; i++) {
        await addImageProcess(images[i], i).then(console.log("Done with " + i));
    }

    latestIndex += adjustedLoadAmount;

    prevWidth = 0;
    displayUpdate();

    if (images.length != Object.keys(adjustedImages).length) {
        document.getElementById("load_more").disabled = false;
    }

    modal.style.display = "none";
    enableBodyScroll();
}

function disableBodyScroll() {
    document.body.classList.add("disable-scroll");
}

function enableBodyScroll() {
    document.body.classList.remove("disable-scroll");
}

var tempImage;

function showImageProcess(index) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = images[index];

        img.onload = () => {
            const image = new DogeImage(img.src, img.width, img.height, "Doge Pic (Will update)", "All titles and descriptions are like this for now, I have not yet found the time to entertain the viewer by generating fun contexts texts.", ["Tags", "Will", "Be", "Here", ":D"], 1688338082164);

            tempImage = image;

            big_image.src = image.src;

            title.innerHTML = image.title;
            description.innerHTML = image.description;

            tags.innerHTML = "";
            for (var i = 0; i < image.tags.length; i++) {
                tags.innerHTML += `
                <tag>${image.tags[i]}</tag>
            `;
            }

            if (tags.innerHTML == "") {
                tags.innerHTML = "No Tags~!"
            }

            date.innerHTML = new Date(image.date).toLocaleDateString("en-US");

            const url = new URL(document.location);

            url.searchParams.set("dogepic", index);
            window.history.pushState("", url, url);

            resolve();
        }
        img.onerror = reject;
    })
}

async function display(index) {
    disableBodyScroll();
    popup.style.display = "flex";

    await showImageProcess(index).then(() => {
        console.log("Done with " + index);

        big_image.style.height = tempImage.height * (big_image.offsetWidth / tempImage.width) + "px";
        console.log(big_image.style.height);
    });
}

function copy() {
    navigator.clipboard.writeText(document.location);
    share.value = "Copied URL~!"

    setTimeout(function () {
        share.value = "Share Doge~!"
    }, 2000);
}

loadMore();

document.getElementById("exit_popup").addEventListener("click", function () {
    const url = location.protocol + "//" + location.host + location.pathname;

    window.history.pushState("", url, url)
    popup.style.display = "none";
    enableBodyScroll();
});

const params = new URLSearchParams(document.location.search);

if (params.size > 0) {
    display(params.get("dogepic"));
} else {
    popup.style.display = "none";
}

var prevWidth = window.innerWidth - 60;

function displayUpdate() {
    const width = window.innerWidth - 60;

    if (width == prevWidth) {
        return;
    }
    prevWidth = width;

    console.log("Reloading")

    try {
        big_image.style.height = tempImage.height * (big_image.offsetWidth / tempImage.width) + "px";
        console.log(big_image.style.height)
    } catch (e) { }

    const area = width - 60;
    const columns = Math.max(Math.floor(area / photoWidth), 1);

    content.innerHTML = "";
    for (var i = 0; i < columns; i++) {
        content.innerHTML += `
            <div class="img_column" id="column-${i}">
            </div>
        `;
    }

    console.log(Object.keys(adjustedImages).length)
    console.log(adjustedImages)

    for (var i = 0; i < Object.keys(adjustedImages).length; i++) {
        const container = document.getElementById(`column-${i % columns}`);

        var image = adjustedImages[i];

        var adjustedHeight;

        try {
            adjustedHeight = image.height * (photoWidth / image.width);
        } catch (e) {
            console.log("Image Load Error at " + i);
            console.log(image);
        }

        container.innerHTML += `
            <div class="card" style = "height: ${adjustedHeight}px;" onclick="display(${i})">
                <img class="image" draggable="false" src="${image.src}" style="height: ${adjustedHeight}px;">
            </div>
        `;

    }
}

setInterval(function () {
    displayUpdate();
}, 100);
