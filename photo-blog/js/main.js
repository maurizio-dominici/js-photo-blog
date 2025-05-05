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
const layOverEl = document.querySelector(".layover");
const apiUri = "https://lanciweb.github.io/demo/api/pictures/";

// ^ SVOLGIMENTO

axios
  .get(apiUri)
  .then((response) => {
    const posts = response.data;
    console.log(posts);

    // ! CONTROLLO SE LA CHIAMATA API MI RESTITUISCE UN ARRAY
    if (posts.length === 0) {
      gridPostEl.innerHTML = `<p id="error-message">Nessun post disponibile.</p>`;
      return;
    }

    let cardsHtml = "";
    posts.forEach((post) => {
      cardsHtml += generatePostCard(post);
    });

    gridPostEl.innerHTML += cardsHtml;

    // ! CODICE PIU RAPIDO "EVENT DELEGATION"
    gridPostEl.addEventListener("click", (event) => {
      const postNode = event.target.closest(".card-header"); // Trova l'elemento più vicino con questa classe
      if (!postNode) return; // Se non ha cliccato su un post, esci

      const imageSrc = postNode.querySelector("img").src;
      const imageAlt = postNode.querySelector("img").alt;

      layOverEl.classList.toggle("layover-visible");
      layOverEl.classList.toggle("layover");

      layOverEl.innerHTML = `
      <div class="container">
      <button id="close-layover">Chiudi</button>
      <img src="${imageSrc}" alt="${imageAlt}"/>
      </div>
      `;

      const closeLayoverEl = document.getElementById("close-layover");
      closeLayoverEl.addEventListener("click", () => {
        layOverEl.classList.toggle("layover");
        layOverEl.classList.toggle("layover-visible");
      });
    });

    // ! CODICE PIU RIPETITIVO
    // const postsNodes = document.querySelectorAll(".card-header");
    // postsNodes.forEach((postNode) => {
    //   postNode.addEventListener("click", () => {
    //     console.log(postNode);

    //     const imageSrc = document.querySelector(`#${postNode.id} img`).src;
    //     const imageAlt = document.querySelector(`#${postNode.id} img`).alt;

    //     layOverEl.classList.add("layover-visible");
    //     layOverEl.classList.remove("layover");

    //     layOverEl.innerHTML = `
    //     <div class="container">
    //       <button id="close-layover">Chiudi</button>
    //       <img src="${imageSrc}" alt="${imageAlt}"/>
    //     </div>
    //   `;

    //     const closeLayoverEl = document.getElementById("close-layover");

    //     closeLayoverEl.addEventListener("click", () => {
    //       layOverEl.classList.add("layover");
    //       layOverEl.classList.remove("layover-visible");
    //     });
    //   });
    // });
  })
  .catch((error) => {
    console.error("Error fetching posts:", error);
    gridPostEl.innerHTML = `<p id="error-message">Oops! impossibile caricare i post, perfavore riprovare più tardi.</p>`;
  });
