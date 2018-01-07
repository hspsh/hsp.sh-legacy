---
layout: page
title: Kalendarz
permalink: /calendar/
---

Jeżeli chcesz zorganizować jakieś wydarzenie, zapoznaj się z [poradnikiem na wiki](//wiki.hs3.pl/zrob-se-meetup)

<iframe src="https://calendar.google.com/calendar/embed?src=8s96dmhr9qv1akadn3b2el9kk8%40group.calendar.google.com&ctz=Europe/Warsaw" style="border: 0;  max-width: 100%; height: 600px;" width="800" height="600" frameborder="0" scrolling="no"></iframe>



<script type="text/javascript">
  $(window).load( function() {

    $('#mycalendar').monthly({
      mode: 'event',
      xmlUrl: "/events.xml"
    });


  switch(window.location.protocol) {
  case 'http:':
  case 'https:':
  // running on a server, should be good.
  break;
  case 'file:':
  alert('Just a heads-up, events will not work when run locally.');
  }

  });
</script>
