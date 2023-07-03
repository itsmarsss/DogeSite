import os
import subprocess

directory = os.getcwd()
exiftoolpath = os.path.join(directory, "exiftool/exiftool.exe")
images = os.path.join(directory, "Doge")

print("Running Directory: " + directory)
print("ExifTool Directory: " + exiftoolpath)
print("Doge Directory: " + images)

print('Executing: "' + exiftoolpath + '" -all= -tagsfromfile @ -datetimeoriginal -ext png -r "' + images + '""')
subprocess.run([exiftoolpath, "-all=", "-tagsfromfile", "@", "-datetimeoriginal", "-ext", "png", "-r", images], shell=True)