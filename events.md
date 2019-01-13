---
title: wydarzenia
layout: page
---

<h2>archiwum</h2>

{% for event in site.events %}
  <li>
    <a href="{{ event.url }}">
      {{ event.title }} {{ event.date | date: "%Y" }}
    </a>
  </li>
{% endfor %}