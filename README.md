# marvelous-snuffle
Project of new hs3.pl site.


```bash
bundle install
bundle exec jekyll serve
```
albo

```bash
make
make serve
```

**Ubuntu**

```
apt install ruby-dev libffi-dev
```

### Structure

Więc chcesz szybko dodać jakąś stronę?
Tutaj szybki pogląd na to jak wygląda sytuacja:

* _site/ - tutaj budują się rzeczy, wpisz `make` i powinien się pojawić.
* _layouts/ - główne templatki z których można korzystać jako bazy do podstron.
* _includes/ - reużywalne komponenty, nic ciekawego.
* _sass/ - style które kompilują się do assets.
* assets/ - obrazki, css'y js'y etc.
* _data/ - jakieś dane które powinny być dostępne w każdym miejscu strony, np. odnośniki do social mediów.
* _config.yml - globalne zmienne i konfiguracja budowania/
* pliki .md - treści stron!


### Layout
Draft located at `design`.

Link to prototype: https://xd.adobe.com/view/8ead2469-21eb-4d30-8fbf-0dca204b70ae/?fullscreen

