// ^ FUNZIONI

const generatePostCard = (post) => {
  const cardHtml = `
   <div class="col-12 col-md-6 col-lg-4">
    <div class="card my-5">
       <img src="../img/pin.svg" alt="red-pin" class="red-pin" />
       <div class="card-header">
         <img src="${post.url}" alt="${post.title}"/>
       </div>
       <div class="card-body">
         <span>
           ${post.date}
         </span>
         <span>
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

apiUri = "https://lanciweb.github.io/demo/api/pictures/";

axios.get(apiUri).then((response) => {
  const posts = response.data;
  console.log(posts);

  let cardsHtml = "";
  posts.forEach((post) => {
    cardsHtml += generatePostCard(post);
  });
  gridPostEl.innerHTML += cardsHtml;
});
