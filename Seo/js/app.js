const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const main_2= document.getElementById("main_2")
const social=document.getElementById("social")
const GitLogo=`iconmonstr-github-1.svg`;
const instaLogo=`iconmonstr-instagram-15.svg`;
const linkinLogo=`iconmonstr-linkedin-5.svg`;
const TwitterLogo=`iconmonstr-twitter-4.svg`;
const FacebookLogo=`iconmonstr-facebook-4.svg`;

//************ INSTAGRAM  ************//
const InstaHead = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd5a3b24b86msh040f5a74f539948p18082bjsnaac02aa9047b',
		'X-RapidAPI-Host': 'instagram-looter2.p.rapidapi.com'
	}
};
async function getUserInsta(options,user){
fetch(`https://instagram-looter2.p.rapidapi.com/profile?username=${user}`, options)
	.then(response => response.json())

	.then(response => {
    var base64=loadImage(response.profile_pic_url_hd);
    createUser(response.biography,base64,response.full_name,response.username,instaLogo,response.edge_followed_by.count,response.edge_follow.count,response.edge_owner_to_timeline_media.count)
  })
    .catch(err => console.error(err));
  
}
// ************ GITHUB **************//
async function getGitUser(username){
    try {
        const { data } = await axios(APIURL + username)
        createUser(data.bio,data.avatar_url,data.name,data.logicoden,GitLogo,data.followers,data.following,data.public_repos) 
        console.log(data)
        getRepos(username)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    }
}
async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }
}


function createUser(bio,avatar_url,name,logicoden,logo,followers,following,public_repos){
    const userID = name || logicoden
    const userBio = bio ? `<p>${bio}</p>` : ''
    const profile =avatar_url;
    const github_img=`assets/social-logo/${logo}`;
    const cardHTML = `
    <div class="banner-4-1 text-center">
    <div>
      <img src="${avatar_url}" alt="${name}" class="avatar">
    </div>
    <div class="user-info">
      <h2><img class="pr-2" src=${github_img}>${userID}</h2>
      ${userBio}
      <ul>
        <li>${followers} <strong>Followers</strong></li>
        <li>${following} <strong>Following</strong></li>
        <li>${public_repos} <strong>Post</strong></li>
      </ul>
      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
    
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `
    main.innerHTML = cardHTML
}
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')
    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value
     if(social.value==="1"){
        getUserInsta(InstaHead,user)
    }
    if(social.value==="2"){
      getUser(user)
  }
  if(social.value==="3"){
    getFacebookuser(user)
}
if(social.value==="4"){
  getGitUser(user)
}
if(social.value==="5"){
  getTwitterUser(user)
}
})



  function mention(options){
  axios.request(options).then(function (response) {
      console.log("mention :",response.data.globalObjects.users[559413660].profile_image_url);
    //   createUserCard_2(response.data)
  }).catch(function (error) {
      console.error(error);
  });
}
function createUserCard_2(user) {
    // const userID = user.name || user.logicoden
    // const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML1 = `
    <div class="card1">
    <div>
      <img src="${user.users[4].profile_image_url}" alt="" class="avatar">
    </div>
    <div class="user-info">
  
      <div id="repos"></div>
    </div>
  </div>
    `
    main_2.innerHTML = cardHTML1  
}

// image Url to Base 64 convert

// function toDataURL(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function() {
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       callback(reader.result);
//     }
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open('GET', url);
//   xhr.responseType = 'blob';
//   xhr.send();
// }
// toDataURL('https://scontent-hel3-1.cdninstagram.com/v/t51.2885-19/286780116_134518712277484_3838837803773788569_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hel3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=LJeY7UpnVY0AX8cgfXq&edm=AJfeSrwBAAAA&ccb=7-5&oh=00_AT_ETxzlznkkq9c9D4mGvLej6LwdbBuSGlbwmvF8X0Np5w&oe=63035ADE&_nc_sid=588073', function(dataUrl) {
//   console.log('RESULT:', dataUrl)
// })

// const toDataURL = url => fetch(url)
//   .then(response => response.blob())
//   .then(blob => new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = () => resolve(reader.result)
//     reader.onerror = reject
//     reader.readAsDataURL(blob)
//   }))


// toDataURL('https://scontent-hel3-1.cdninstagram.com/v/t51.2885-19/286780116_134518712277484_3838837803773788569_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hel3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=LJeY7UpnVY0AX8cgfXq&edm=AJfeSrwBAAAA&ccb=7-5&oh=00_AT_ETxzlznkkq9c9D4mGvLej6LwdbBuSGlbwmvF8X0Np5w&oe=63035ADE&_nc_sid=588073')
//   .then(dataUrl => {
//     console.log('RESULT:', dataUrl)
//   })

  // function toDataURL(src, callback, outputFormat) {
  //   var img = new Image();
  //   img.crossOrigin = 'Anonymous';
  //   img.onload = function() {
  //     var canvas = document.createElement('CANVAS');
  //     var ctx = canvas.getContext('2d');
  //     var dataURL;
  //     canvas.height = this.naturalHeight;
  //     canvas.width = this.naturalWidth;
  //     ctx.drawImage(this, 0, 0);
  //     dataURL = canvas.toDataURL(outputFormat);
  //     callback(dataURL);
  //   };
  //   img.src = src;
  //   if (img.complete || img.complete === undefined) {
  //     img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  //     img.src = src;
  //   }
  // }
  
  // toDataURL(
  //   'https://scontent-hel3-1.cdninstagram.com/v/t51.2885-19/286780116_134518712277484_3838837803773788569_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hel3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=LJeY7UpnVY0AX8cgfXq&edm=AJfeSrwBAAAA&ccb=7-5&oh=00_AT_ETxzlznkkq9c9D4mGvLej6LwdbBuSGlbwmvF8X0Np5w&oe=63035ADE&_nc_sid=588073',
  //   function(dataUrl) {
  //     console.log('RESULT:', dataUrl)
  //   }
  // )
  // const getBase64FromUrl = async (url) => {
  //   const data = await fetch(url);
  //   const blob = await data.blob();
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob); 
  //     reader.onloadend = () => {
  //       const base64data = reader.result;   
  //       resolve(base64data);
  //     }
  //   });
  // }
  
  // getBase64FromUrl('https://scontent-hel3-1.cdninstagram.com/v/t51.2885-19/286780116_134518712277484_3838837803773788569_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hel3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=LJeY7UpnVY0AX8cgfXq&edm=AJfeSrwBAAAA&ccb=7-5&oh=00_AT_ETxzlznkkq9c9D4mGvLej6LwdbBuSGlbwmvF8X0Np5w&oe=63035ADE&_nc_sid=588073').then(console.log)


  function loadImage(element){
    var url = element;
    p = url.split("/");
    t = '';
    for(let i=0;i<p.length;i++){
      if(i==2){
        t += p[i].replaceAll('-','--').replaceAll('.','-')+atob('LnRyYW5zbGF0ZS5nb29n')+'/';
      }else{
        if(i != p.length-1){
          t += p[i]+'/';
        }else{
          t += p[i];
        }
      }
    }
    return encodeURI(t);
  }


  

//Twiter user


function getTwitterUser(name){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '73d65919f8msh25c6ad3deb1571bp1b48c5jsn378aaee02ead',
      'X-RapidAPI-Host': 'twitter135.p.rapidapi.com'
    }
  };
  
  fetch(`https://twitter135.p.rapidapi.com/UserByScreenName/?username=${name}`, options)
    .then(response => response.json())
    .then(response => displayTwitter(response))
    .catch(err => console.error(err));

}
function displayTwitter(x){

      
      var t_name = x.data.user.result.legacy.name;
      var t_followers = x.data.user.result.legacy.followers_count;
      var t_image = x.data.user.result.legacy.profile_image_url_https;
      var t_following = x.data.user.result.legacy.following
      if(t_following == false){
        t_following = 0;
      }
      console.log(t_name, t_followers, t_image)
    
}
  

//Facebook 

function getFacebook(name){
  var key = '1e10b0f385c8fcc66d59dc3eaa18f5b3';
  var url = `https://api.social-searcher.com/v2/users?key=${key}&q=b${name}&network=facebook`
  

fetch(url)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

}