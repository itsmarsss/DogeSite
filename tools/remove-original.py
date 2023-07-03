import os
import subprocess

directory = os.getcwd()
images = os.path.join(directory, "Doge")

for filename in os.listdir(images):
    if filename.endswith(".png_original") or filename.endswith(".png_exiftool_tmp"):
        image_path = os.path.join(images, filename)
        print('Running: "del "' + image_path + '""')
        subprocess.run(['cmd', '/c', 'del', image_path], shell=True)