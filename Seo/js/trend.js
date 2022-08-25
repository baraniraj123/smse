
function gettrendinsta(trend){
    var key = '1e10b0f385c8fcc66d59dc3eaa18f5b3';
    var url = `https://api.social-searcher.com/v2/trends?key=${key}&q=${trend}&network=twitter`
    
  
  fetch(url)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  
  }
  function gettrendtwitter(trend){
    var key = '1e10b0f385c8fcc66d59dc3eaa18f5b3';
    var url = `https://api.social-searcher.com/v2/trends?key=${key}&q=${trend}&network=instagram`
    
  
  fetch(url)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  
  }

  data = "india";
  gettrendinsta(data);
  gettrendtwitter(data);