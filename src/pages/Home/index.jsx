import { useEffect } from 'react';
import API from '../../services/API';
import { useState } from 'react';

import CardPost from '../../components/CardPost';

export default function Home() {
  const [posts, setPosts] = useState([]);
  /* const [categories, setCategories] = useState([]); */
  const [filter, setFilter] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const data = await API.getAllPost();

      setPosts(
        Object.keys(data)
          .reduce((accum, key) => {
            const currobj = data[key];
            currobj['id'] = key;

            return [...accum, currobj];
          }, [])
          .reverse()
      );
    };

    getPosts();
  }, []);

  /* useEffect(() => {
    const arrTags = posts.map(({ tags }) => tags).flat();

    setCategories([...new Set(arrTags)]);
  }, [posts]); */

  const categoryHandler = ({ target }) => {
    setFilter([]);
    const newposts = posts.filter(({ tags }) =>
      tags.join(' ').toLowerCase().includes(target.value.toLowerCase())
    );
    setFilter(newposts.length > 0 ? newposts : null);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-0 col-md-2">
            {/* <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link disabled" aria-current="page" href="#">
                  Todas las categorías
                </a>
              </li>
              {categories &&
                categories.map((category) => (
                  <li key={category} className="nav-item">
                    <input
                      id={category}
                      type="checkbox"
                      value={category}
                      onChange={categoryHandler}
                    />
                    <label
                      htmlFor={category}
                      className="ms-2"
                    >
                      {category}
                    </label>
                  </li>
                ))}
            </ul> */}
          </div>
          <div className="col-12 col-md-8 mb-5">
            <input
              type="text"
              s
              className="form-control my-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded"
              placeholder="Buscar por categoría..."
              onChange={categoryHandler}
            />
            {filter === null && (
              <h6 className="text-body-secondary fw-bold text-center my-5">
                Parece esa categoría no existe..
              </h6>
            )}
            {posts &&
              !filter &&
              posts.map((post) => (
                <CardPost key={post.id} props={post} preview={post.id} />
              ))}
            {filter &&
              filter.map((post) => (
                <CardPost key={post.id} props={post} preview={post.id} />
              ))}
          </div>
          <div className="col-0 col-md-2"></div>
        </div>
      </div>
    </>
  );
}
