const content = document.getElementById("content");

const img_column = `
<div class="img_column">
</div>
`;

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
    content.innerHTML += img_column;
}

for (var i = 0; i < images.length; i++) {

}
