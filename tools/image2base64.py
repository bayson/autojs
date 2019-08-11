# -*- coding: utf-8 -*-
 
import base64
import os

imgBase64 = '../resources/template/base64.txt'
file_dir = '../resources/template/'

os.remove(imgBase64)

print(file_dir, imgBase64)
for root, dirs, files in os.walk(file_dir):
    for file in files:
        if os.path.splitext(file)[1] == '.png':
            print(file)
            img = os.path.join(root,file)
            with open(img,"rb") as f:
                # b64encode是编码，b64decode是解码
                base64_data = base64.b64encode(f.read())
                # # base64.b64decode(base64data)
                # print(base64_data)
                #print('create base64 ok :', os.path.splitext(img)[0])
                f = open(imgBase64,'a+')
                f.writelines(os.path.splitext(img))
                f.writelines("\r\n")
                # f.writelines('data:image/png;base64,'+base64_data)
                f.writelines(base64_data)
                f.writelines("\r\n\r\n\r\n\r\n")
                f.close()
print('create base64 ok')
   
