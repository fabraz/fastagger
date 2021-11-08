# Fastagger

Fastagger is a stream segmentation label aiding tool. 

# Operation

Fastagger exports a pdf file pages to images and it serves them in its user interface, where you can label each page of the document, using the shorkeys (`N` - next page, `P` - previous page, `1` - new document, `2` - same document). You might want to download the json file with labels you have given to pages, by clicking on `save` button. 

In the picure bellow you can see Fastagger UI.

![fastagger](https://user-images.githubusercontent.com/674987/140752742-f706f50d-7cbe-4710-972a-988320cf0907.png)

# How to run

## Clone the repo

```shell
git clone https://github.com/fabraz/fastagger
```

## Copy your pdfs
Every pdf you copy to the path `./pdfs will be available for labelling.

## Docker run

```shell
docker-compose up -d --build
```

## Citation

Fabricio Ataides Braz, Nilton Correia da Silva, Jonathan Alis Salgado Lima,
Leveraging effectiveness and efficiency in Page Stream Deep Segmentation,
Engineering Applications of Artificial Intelligence,
Volume 105,
2021,
104394,
ISSN 0952-1976,
https://doi.org/10.1016/j.engappai.2021.104394.
(https://www.sciencedirect.com/science/article/pii/S0952197621002426)

### Latex

    @article{BRAZ2021104394,
    title = {Leveraging effectiveness and efficiency in Page Stream Deep Segmentation},
    journal = {Engineering Applications of Artificial Intelligence},
    volume = {105},
    pages = {104394},
    year = {2021},
    issn = {0952-1976},
    doi = {https://doi.org/10.1016/j.engappai.2021.104394},
    url = {https://www.sciencedirect.com/science/article/pii/S0952197621002426},
    author = {Fabricio Ataides Braz and Nilton Correia {da Silva} and Jonathan Alis Salgado Lima},
    keywords = {Page Stream Segmentation, Classification},    
    }


