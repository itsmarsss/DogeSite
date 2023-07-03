import os
import subprocess

directory = os.getcwd()
images = os.path.join(directory, "Doge")

index = 0;

for filename in os.listdir(images):
    if filename.endswith(".png"):
        new_filename = "doge_pic_" + str(index) + ".png"

        original_path = os.path.join(images, filename)

        print('Running: "ren "' + original_path + '" "' + new_filename + '""')
        subprocess.run(['cmd', '/c', 'ren', original_path, new_filename], shell=True)

        index += 1
