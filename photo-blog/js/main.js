// ^ FUNZIONI

const generatePostCard = (post) => {
  const cardHtml = `
   <div class="col-12 col-md-6 col-lg-4">
    <div class="card my-5" id="post-card-${post.id}">
       <img src="../img/pin.svg" alt="red-pin" class="red-pin" />
       <div class="card-header" id="card-header-${post.id}">
         <img id="image-big-layover" src="${post.url}" alt="${post.title}"/>
       </div>
       <div class="card-body">
         <span class="date">
           ${post.date}
         </span>
         <br>
         <span class="title">
           ${post.title}
         </span>
      </div>
    </div>
   </div>
  `;

  return cardHtml;
};

// ^ DATI

const gridPostEl = document.getElementById("grid-post");

// ^ SVOLGIMENTO

apiUri = "https://lanciweb.github.io/demo/api/pictures/";

axios.get(apiUri).then((response) => {
  const posts = response.data;
  console.log(posts);

  let cardsHtml = "";

  posts.forEach((post) => {
    cardsHtml += generatePostCard(post);
  });

  gridPostEl.innerHTML += cardsHtml;

  const postsNodes = document.querySelectorAll(".card-header");

  postsNodes.forEach((postNode) => {
    postNode.addEventListener("click", () => {
      const imageSrc = document.querySelector(`#${postNode.id} img`).src;
      console.log(imageSrc);
    });
  });
});
