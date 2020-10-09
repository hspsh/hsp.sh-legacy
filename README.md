# hsp.sh
###### CODENAME marvelous-snuffle

[![Netlify Status](https://api.netlify.com/api/v1/badges/d61529cf-7e8a-4de7-927c-5358cf4d7fa5/deploy-status)](https://app.netlify.com/sites/naughty-volhard-02c8b8/deploys)

## Install

#### Ubuntu 
```
apt install ruby-dev libffi-dev
```

#### Fedora
```
dnf install redhat-rpm-config ruby-devel rubygem-bundler
```

#### Arch
```
pacman -S ruby rubygems
gem install bundler:1.17.3
bundle install
```

## Development
```
make help
```

## Structure

Więc chcesz szybko dodać jakąś stronę?
Tutaj szybki pogląd na to jak wygląda sytuacja:

* _site/ - tutaj budują się rzeczy, wpisz `make` i powinien się pojawić.
* _layouts/ - główne templatki z których można korzystać jako bazy do podstron.
* _includes/ - reużywalne komponenty, nic ciekawego.
* _sass/ - style które kompilują się do assets.
* assets/ - obrazki, css'y js'y etc.
* _data/ - jakieś dane które powinny być dostępne w każdym miejscu strony, np. odnośniki do social mediów.
* _config.yml - globalne zmienne i konfiguracja budowania/
* _posts/ - tutaj żyją wydarzenia i innego rodzaju posty z życia hsp. Spójrz na poprzednie wydarzenia dla przykładu.
* pliki .md - treści stron!

### Posts

Aby dodać wydarzenie / post, dodaj plik .md w folderze `_posts`. Tytuł musi zawierać datę, oraz nazwę wydarzenia oddzielone znakiem `-`.
W nagłówku zawrzyj następujące informacje:
```
---
layout: post
banner: /assets/grafika/do/wyswietlenia/na/gorze/posta.png
title: Tytuł twojego wydarzenia!
date: 2020-10-02
redirect_from: /krótki-url-do-zapamiętania
categories: [event]
---
```

Jeżeli chcesz aby post był "przypięty" i wyświetlał się na stronie głównej / każdej stronie jako alert (jak /covid19), zmodyfikuj ostatnią linię:
```
#tylko na stronie głównej
categories: [notice]

# + na każdej stronie z tłem klasy "danger"
pinned: true
alert: danger
```

### Dodawanie bardziej skomplikowanych stron na wydarzenia.

Use `git submodule add $repo-url directory`.

Jeżeli chcesz dodać bardziej skomplikowany layout na twoje wydarzenie, załóż swoje repozytorium i wykorzystaj funkcję "git submodule". Repozytorium pojawi się pod adresem `hsp.sh/directory`.


### Layout
Draft located at `design`.

Link do prototypu by [justdzasta](https://www.behance.net/justynanowac): https://xd.adobe.com/view/8ead2469-21eb-4d30-8fbf-0dca204b70ae/?fullscreen

