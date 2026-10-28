import { useState, useEffect } from "react";

export function About() {
  const [categories, setCategories] = useState([]);;

  useEffect(() => {
    async function loadCategories() {
      const response = await fetch("/student-data/categories.json");

      const data = await response.json();
      
      console.log(data);
        setCategories(data);
      }

    loadCategories();
  }, []);

  return (

    <section className="container">
      <h1 className="font-bold">Category</h1>

      {categories.map((category) => (
        <p key={category.id}>
          {category.name}
        </p>
      ))}
    </section>
  );
}

export default About;
