// ^ DATI

apiUri = "https://lanciweb.github.io/demo/api/pictures/";

axios.get(apiUri).then((response) => {
  const posts = response.data;
  console.log(posts);

  for (let i = 0; i < posts.length; i++) {
    const currentPost = posts[i];
    console.log(currentPost);
  }
});
