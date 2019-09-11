fetch('https://whois.at.hs3.pl/api/now')
  .then((response) => {
      if (response.status !== 200) {
        console.log('Whois connection failed. Status Code: ' +
          response.status);
        return;
      }

      response.json().then((data) => {
        let message = `<i style="color:red">Zamknięte</i>`
        if(data.headcount > 0) message = `<i style="color:lime">Otwarte</i>`
        document.querySelector("#whois").innerHTML = `<a href="https://whois.at.hs3.pl">whois:</a> ${message} [${data.headcount}]`
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
