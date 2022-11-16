import {useCallback, useState, useEffect} from "react";

export const useToggle = (initial=false) => {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, [])

  return [state, toggle];
}


// https://www.w3schools.com/react/react_customhooks.asp
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data));
  }, [url]);

  return [data];
};
