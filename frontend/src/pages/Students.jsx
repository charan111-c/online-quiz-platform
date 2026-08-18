import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/users/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.full_name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            ← Back
          </button>

          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-blue-700">
              Registered Students
            </h1>

            <p className="text-gray-500 mt-2">
              Total Students : {students.length}
            </p>
          </div>

          {/* Empty space to keep title centered */}
          <div className="w-24"></div>

        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Profile</th>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="6" className="text-center p-10">
                    Loading...
                  </td>
                </tr>

              ) : filteredStudents.length === 0 ? (

                <tr>
                  <td colSpan="6" className="text-center p-10 text-gray-500">
                    No Students Found
                  </td>
                </tr>

              ) : (

                filteredStudents.map((student) => (

                  <tr
                    key={student.id}
                    className="border-b hover:bg-blue-50 transition"
                  >

                    <td className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mx-auto">
                        {student.full_name.charAt(0).toUpperCase()}
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      {student.id}
                    </td>

                    <td className="p-4 font-medium">
                      {student.full_name}
                    </td>

                    <td className="p-4">
                      {student.email}
                    </td>

                    <td className="p-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {student.role}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => navigate(`/students/${student.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        View Details
                      </button>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Students;