function DogeImage(src, width, height, description, tags) {
    this.src = src;
    this.width = width;
    this.height = height;
    this.description = description;
    this.tags = tags;
}

const content = document.getElementById("content");

document.getElementById("search_input").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        filter();
    }
});

function filter() {
    console.log("Filter");
}

var images = [
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

var allImages = [];
for (var i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = images[i];
    img.onload = () => {
        allImages.push(new DogeImage(img.src, img.width, img.height));
    };
}

const photoWidth = getComputedStyle(document.documentElement).getPropertyValue("--imgWidth").replace("px", "");

var prevWidth = 0;

setInterval(function () {
    const width = window.innerWidth;

    if (width == prevWidth) {
        return;
    }

    prevWidth = width;

    const area = width - 60;
    const columns = Math.max(Math.floor(area / photoWidth), 1);

    content.innerHTML = "";
    for (var i = 0; i < columns; i++) {
        content.innerHTML += `
        <div class="img_column" id="column-${i}">

        </div>
    `;
    }



    for (var i = 0; i < images.length; i++) {
        const container = document.getElementById(`column-${i % columns}`);

        var image = allImages[i];

        const adjustedHeight = image.height * (photoWidth / image.width);

        container.innerHTML += `
        <div class="card" style="height: ${adjustedHeight}px;">
            <img class="image" src="${image.src}" style="height: ${adjustedHeight}px;">
        </div>
    `;
    }
}, 100);
