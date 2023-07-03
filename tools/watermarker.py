import os
import subprocess

directory = os.getcwd()
images = os.path.join(directory, "Doge")
watermark = os.path.join(images, "watermark.png")

index = 0;

for filename in os.listdir(images):
    if filename.endswith(".png"):
        original_path = os.path.join(images, filename)
        new_path = os.path.join(directory, "marked/" + filename)

        print('Running: "magick composite -gravity Center "' + watermark + '" "' + original_path + '" "' + new_path + '""')
        subprocess.run(['magick', 'composite', '-gravity', 'Center', watermark, original_path, new_path], shell=True)

        index += 1
