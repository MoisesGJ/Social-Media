const BASE_URI = 'https://mascotas-a0198-default-rtdb.firebaseio.com/';

export default {
  getAllPost: async () => {
    const response = await fetch(`${BASE_URI}/posts/.json`);

    const data = response.json();
    return data;
  },
  pushPost: async (post) => {
    const response = await fetch(`${BASE_URI}/posts/.json`, {
      method: 'POST',
      body: JSON.stringify({ ...post, comments: [0] }),
    });

    const data = response.json();
    return data;
  },
  getUniquePost: async (id) => {
    const response = await fetch(`${BASE_URI}/posts/${id}/.json`);

    const data = response.json();
    return data;
  },
  pushComment: async (comm, id) => {
    const response = await fetch(`${BASE_URI}/comments/.json`, {
      method: 'POST',
      body: JSON.stringify({
        body: comm.body,
        idPost: id,
        author: comm.author,
        image: comm.image,
        date: new Date(),
      }),
    });

    const data = await response.json();

    await fetch(`${BASE_URI}/posts/${id}/comments/.json`, {
      method: 'POST',
      body: JSON.stringify(data.name),
    });
  },
  getComments: async () => {
    const response = await fetch(`${BASE_URI}/comments/.json`);

    const data = response.json();
    return data;
  },
};
