const content = document.getElementById("content");

var images = [
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
    "https://cdn.discordapp.com/attachments/1046179689372327977/1046179831903174696/doge.png",
];


const photoWidth = 200;

var width = screen.width;

var area = width - 60;

var columns = Math.floor(area / photoWidth);

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
