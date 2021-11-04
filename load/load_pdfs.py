from pdf2image.exceptions import (
    PDFInfoNotInstalledError,
    PDFPageCountError,
    PDFSyntaxError
)

import os
import time
import tqdm

from pdf2image import convert_from_path

import json

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
fname = {}
startTime = time.time()

files_count = 0
for root, d_names, files in os.walk(APP_ROOT+'/pdf'):
   for file in files:
      if file.endswith('.pdf'):
         files_count += 1

prog_bar = tqdm.tqdm(total=files_count)


print("Started at ", time.ctime(startTime))
for root, d_names, f_names in os.walk(APP_ROOT+'/pdfs'):
    for f in f_names:
        if f.endswith('.pdf'):
            fWoExtension = os.path.splitext(f)[0]
            if not fWoExtension in fname:
                seconds = time.time()
                fname[fWoExtension] = {}
                pages = convert_from_path(os.path.join(root, f), dpi=200, grayscale=True, size=(600, 846))
                fname[fWoExtension]['path'] = '/pdfs/'+fWoExtension
                fname[fWoExtension]['pages'] = dict([(x,0) for x in range(1,len(pages)+1)])
                prog_bar.set_description(f"{fWoExtension}")
                if not os.path.exists('/pdfs/'+fWoExtension):
                    os.mkdir('/pdfs/'+fWoExtension)
                else:
                    continue
                for idx, page in enumerate(pages):
                    path = '/pdfs/'+fWoExtension+'/'+fWoExtension+'_'+str(idx+1)+'.png'
                    page.save(path, 'PNG')
                print(' pages ', len(pages), ' time ', time.time() - seconds, ' secs' )
                prog_bar.update(1)

with open('/pdfs/pdfs.json', "w") as fp:
    json.dump(fname , fp)                
endTime = time.time()
print(fname)
print("Ended at ", time.ctime(startTime), ' - ',  endTime - startTime, 'secs')            
