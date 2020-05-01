---
title: komunikaty
layout: page
menus: header
---

{% for event in site.posts %}
  <li>
    <a href="{{ event.url }}">
      {{ event.title }} [{{ event.date | date: "%Y" }}]
    </a>
  </li>
{% endfor %}