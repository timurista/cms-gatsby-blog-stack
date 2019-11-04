var contentful = require("contentful");
var client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.CONTENT_DELIVERY_ACCESS_TOKEN
});

convertImage = rawImage => {
  // console.log("raw image", rawImage);
  if (rawImage) {
    return {
      imageUrl: rawImage.file.url.replace("//", "http://"), // may need to put null check as well here
      description: rawImage.description,
      title: rawImage.title
    };
  }
  return null;
};

convertAuthor = rawAuthor => {
  if (rawAuthor) {
    return {
      name: rawAuthor.name,
      phone: rawAuthor.phone,
      shortBio: rawAuthor.shortBio,
      title: rawAuthor.title,
      email: rawAuthor.email,
      company: rawAuthor.company,
      twitter: rawAuthor.twitter,
      facebook: rawAuthor.facebook,
      github: rawAuthor.github
    };
  }
  return null;
};

convertPost = rawData => {
  const rawPost = rawData.fields;
  const rawHeroImage = rawPost.heroImage ? rawPost.heroImage.fields : null;
  const rawAuthor = rawPost.author ? rawPost.author.fields : null;
  return {
    id: rawData.sys.id,
    body: rawPost.body,
    description: rawPost.description,
    publishedDate: rawPost.publishDate,
    slug: rawPost.slug,
    tags: rawPost.tags,
    title: rawPost.title,
    heroImage: convertImage(rawHeroImage),
    author: convertAuthor(rawAuthor)
  };
};

function getEntries() {
  console.log("inside entries");
  client
    .getEntries({ content_type: "blogPost" }, { limit: 20 })
    .then(function(entries) {
      // console.log(entries.items.length);
      if (entries && entries.items && entries.items.length > 0) {
        const blogPosts = entries.items.map(entry => convertPost(entry));
        console.log(blogPosts);
        return blogPosts;
      }

      return [];
      // log the title for all the entries that have it
      // entries.forEach(function(entry) {
      //   console.log(entry.name);
      //   if (entry.name) {
      //     console.log(entry.name);
      //   }
      // });
    });
}

exports.handler = async event => {
  // TODO implement

  const entries = await getEntries();

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda! This is gatsby response")
  };
  return response;
};

getEntries();
