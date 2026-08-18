function Categories() {
  const categories = [
    "Java",
    "Python",
    "Dsa",
    "logical reasoning",
    "SQL",
    "DBMS",
    "Operating Systems",
    "Aptitude","Oops",
  ];

  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-12">
          Popular Quiz Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-5">

          {categories.map((category) => (
            <button
              key={category}
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
            >
              {category}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;