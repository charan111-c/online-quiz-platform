import {
  FaClock,
  FaChartLine,
  FaLock,
  FaTrophy,
  FaLaptopCode,
  FaUserGraduate,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaLaptopCode size={35} />,
      title: "Programming Quizzes",
      desc: "Practice Java, Python, React, Node.js and more.",
    },
    {
      icon: <FaClock size={35} />,
      title: "Timed Tests",
      desc: "Improve speed with real interview-like quizzes.",
    },
    {
      icon: <FaChartLine size={35} />,
      title: "Instant Results",
      desc: "Know your score immediately after submission.",
    },
    {
      icon: <FaTrophy size={35} />,
      title: "Leaderboard",
      desc: "Compete with other students.",
    },
    {
      icon: <FaLock size={35} />,
      title: "Secure Login",
      desc: "JWT-based secure authentication.",
    },
    {
      icon: <FaUserGraduate size={35} />,
      title: "Placement Ready",
      desc: "Prepare for campus placements and coding tests.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose Our Platform?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;