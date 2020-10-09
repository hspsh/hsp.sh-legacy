fetch('https://whois.at.hsp.sh/api/now')
  .then((response) => {
      if (response.status !== 200) {
        console.log('Whois connection failed. Status Code: ' +
          response.status);
        return;
      }

      response.json().then((data) => {
        let message = `<span style="color:red">Zamknięte</span>`
        if(data.headcount > 0) message = `<span style="color:lime">Otwarte</span>`
        document.querySelector("#whois").innerHTML = `<a href="https://whois.at.hsp.sh">whois:</a> ${message} <span title="${data.users.join(", ")}">[${data.headcount}]</span>`
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });