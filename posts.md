---
title: Wydarzenia i Posty
layout: page
---

<h2>Archiwum</h2>

{% for event in site.posts %}
  <li>
    <a href="{{ event.url }}">
      {{ event.title }} {{ event.date | date: "%Y" }}
    </a>
  </li>
{% endfor %}