let requestOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

export const createPost = async (props) => {
  const { titleValue, bodyValue } = props;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleValue,
      body: bodyValue,
    }),
  };
  try {
    const response = await fetch(
      `http://localhost:8080/post/add-new`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPostsData = async () => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/post/posts`,
    requestOptions
  );
  const data = await response.json();
  return data.posts;
};

export const getPostData = async (id) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/post/${id}`,
    requestOptions
  );
  const data = await response.json();
  return data.post;
};

export const getAllPostIds = async () => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/post/post-ids`,
    requestOptions
  );
  const data = await response.json();
  return data.ids.map(({ _id }) => {
    return {
      params: {
        id: _id.toString(),
      },
    };
  });
};
