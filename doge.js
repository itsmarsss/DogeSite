function DogeImage(src, width, height, description, tags) {
    this.src = src;
    this.width = width;
    this.height = height;
    this.description = description;
    this.tags = tags;
}

const content = document.getElementById("content");

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


const photoWidth = getComputedStyle(document.documentElement).getPropertyValue("--imgWidth").replace("px", "");

var prevWidth = 0;

setInterval(() => {
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

        container.innerHTML += `
        <div class="card">
            <img class="image" src="${images[i]}">
        </div>
    `;
    }
}, 200);
