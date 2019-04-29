---
title: Inicjatywy organizowane w Hackerspace Trójmiasto
layout: page
---

{% for event in site.inicjatywy %}
  <li>
    <a href="{{ event.url }}">
      {{ event.title }}
    </a>
  </li>
{% endfor %}

