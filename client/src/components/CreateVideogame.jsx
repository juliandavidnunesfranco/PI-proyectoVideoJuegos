import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  getGenres,
  postVideogame,
  cleanVideogames,
  getAllPlatforms,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";


const VideogameCreate = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    img: "",
  });
               ///////// regex /////// expresiones regulares
  let noEmpty = /\S+/;
  let validateName = /^.{5,200}$/;
  let validateNum = /^[1-5]+([.][1-5]+)?$/;
  let validateUrl = /(https?:\/\/.*\.(?:png|jpg))/i;
  let validateDate = /^\d{4}\/\d{2}\/\d{2}$/;
  let validateWords = /^.{5,100}$/;

  const validate = (input) => {
    let errors = {};
    if (
      !noEmpty.test(input.name) ||
      !validateName.test(input.name) ||
      input.name.length < 5
    ) {
      errors.name = "Name required. more than 5 characters";
    }
    if (!validateNum.test(input.rating) || parseInt(input.rating) < 1) {
      errors.rating = "Number required. Higher than 1";
    }
    if (!validateDate.test(input.released) || parseInt(input.released) < 1) {
      errors.released = "Released required. YYYY/MM/DD";
    }
    if (
      !validateWords.test(input.description) ||
      parseInt(input.description) < 1
    ) {
      errors.description =
        "Description required. Higher than 5 characters and less than 200 ";
    }

    if (!validateUrl.test(input.img)) {
      errors.img = "URL required";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    if (input.genres.length < 2) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
      e.target.value = "Select genre";
    } else {
      alert("You cannot choose more than two genres of videogame");
    }
  };

  const handleSelect1 = (e) => {
    if (input.platforms.length < 2) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
      e.target.value = "Select platform";
    } else {
      alert("You cannot choose more than two platforms of videogame");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !errors.name &&
      !errors.rating &&
      !errors.released &&
      !errors.description &&
      !errors.img
    ) {
      dispatch(postVideogame(input));
      setInput({
        name: "",
        rating: "",
        released: "",
        description: "",
        genres: [],
        platforms: [],
        img: "",
      });
      dispatch(cleanVideogames(dispatch));
      history.push("/home");
    } else {
      alert("Error. Check the form");
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== e),
      platforms: input.platforms.filter((platforms) => platforms !== e),
    });
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPlatforms());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Go Back</button>
      </Link>
      <form
          onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>Create Videogame</h2>

        <div>
          <div>
            <label>Name:</label>
            <input
              
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Name"
            />
            <p>{errors.name}</p>
            <label>Rating: </label>
            <input
              type="number"
              value={input.rating}
              name="rating"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Rating 1-5"
            />
            <p>{errors.rating}</p>
            <label>Released:</label>
            <input
              
              type="text"
              value={input.released}
              name="released"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="YYYY/MM/DD"
            />
            <p>{errors.released}</p>
          </div>

          <div>
            <label>Image: </label>
            <input
              
              type="text"
              value={input.img}
              name="img"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="URL Image..."
            />
            <p>{errors.img}</p>

            <label>Description:</label>
            <textarea
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Description"
            />
            <p>{errors.description}</p>
          </div>
        </div>
        <div>
          <select
              onChange={(e) => {
              handleSelect(e);
            }}
          >
            <option>Select Genre</option>
            {genres?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
          {input.genres?.map((e) => {
            return (
              <div key={e}>
                <p>{e}</p>
                <button
                  
                  onClick={() => {
                    handleDelete(e);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <select
            
            onChange={(e) => {
              handleSelect1(e);
            }}
          >
            <option>Select Platform</option>
            {platforms?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
          {input.platforms?.map((e) => {
            return (
              <div key={e}>
                <p>{e}</p>
                <button
                  
                  onClick={() => {
                    handleDelete(e);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <button
          
          type="submit"
          disabled={!input.name}
        >
          Create!
        </button>
      </form>
    </div>
  );
};

export default VideogameCreate;