function DogeImage(src, width, height, title, description, tags, date) {
    this.src = src;
    this.width = width;
    this.height = height;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.date = date;
}

const images = [
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
];

const content = document.getElementById("content");

document.getElementById("search_input").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        filter();
    }
});

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

var adjustedImages = [];

function loadMore() {
    const adjustedLoadAmount = Math.min(loadAmount, images.length - adjustedImages.length);

    for (var i = latestIndex; i < latestIndex + adjustedLoadAmount; i++) {
        const img = new Image();
        img.src = images[i];
        img.onload = () => {
            adjustedImages.push(new DogeImage(img.src, img.width, img.height, "Title", "Description", ["Tags", "Tags", "Tags"], 1688338082164));

            if (images.length == adjustedImages.length) {
                document.getElementById("load_more").disabled = true;
            }
        };
    }

    latestIndex = latestIndex + loadAmount - 1;

    prevWidth = 0;
}

var tempImage;

function display(index) {
    popup.style.display = "flex";

    const img = new Image();
    img.src = images[index];
    img.onload = () => {
        const image = new DogeImage(img.src, img.width, img.height, "Title", "Description", ["Tags", "Tags", "Tags"], 1688338082164);

        tempImage = image;

        big_image.src = image.src;

        big_image.style.height = image.height * (big_image.offsetWidth / image.width) + "px";

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
    };
}

function copy() {
    navigator.clipboard.writeText(document.location);
    share.value = "Copied URL!"
}

document.getElementById("exit_popup").addEventListener("click", function () {
    const url = location.protocol + "//" + location.host + location.pathname;

    window.history.pushState("", url, url)
    popup.style.display = "none";
});

loadMore();

const params = new URLSearchParams(document.location.search);

if (params.size > 0) {
    display(params.get("dogepic"));
} else {
    popup.style.display = "none";
}

var prevWidth = 0;
setInterval(function () {
    const width = window.innerWidth - 60;

    if (width == prevWidth) {
        return;
    }
    prevWidth = width;

    try {
        big_image.style.height = tempImage.height * (big_image.offsetWidth / tempImage.width) + "px";
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

    for (var i = 0; i < adjustedImages.length; i++) {
        const container = document.getElementById(`column-${i % columns}`);

        var image = adjustedImages[i];

        const adjustedHeight = image.height * (photoWidth / image.width);

        container.innerHTML += `
        <div class="card" style="height: ${adjustedHeight}px;" onclick="display(${i})">
            <img class="image" draggable="false" src="${image.src}" style="height: ${adjustedHeight}px;">
        </div>
    `;
    }
}, 100);
