import { Routes, Route } from "react-router-dom";

// ================= PUBLIC PAGES =================
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLogin from "../pages/AdminLogin";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

// ================= STUDENT PAGES =================
import Dashboard from "../pages/Dashboard";
import TakeQuiz from "../pages/TakeQuiz";
import Result from "../pages/Result";
import Leaderboard from "../pages/Leaderboard";
import History from "../pages/History";
import AddTestimonial from "../pages/AddTestimonial";

// ================= ADMIN PAGES =================
import AdminDashboard from "../pages/AdminDashboard";
import CreateQuiz from "../pages/CreateQuiz";
import AddQuestion from "../pages/AddQuestion";
import ManageQuiz from "../pages/ManageQuiz";
import ViewQuestions from "../pages/ViewQuestions";
import Students from "../pages/Students";
import StudentDetails from "../pages/StudentDetails";
import BulkUploadQuestions from "../pages/BulkUploadQuestions";

// ================= PROTECTED ROUTE =================
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= STUDENT ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="STUDENT">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/:id"
        element={
          <ProtectedRoute role="STUDENT">
            <TakeQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result"
        element={
          <ProtectedRoute role="STUDENT">
            <Result />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute role="STUDENT">
            <Leaderboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute role="STUDENT">
            <History />
          </ProtectedRoute>
        }
      />

      {/* ✅ ADD THIS ROUTE */}

      <Route
        path="/add-testimonial"
        element={
          <ProtectedRoute role="STUDENT">
            <AddTestimonial />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-quiz"
        element={
          <ProtectedRoute role="ADMIN">
            <CreateQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-quiz"
        element={
          <ProtectedRoute role="ADMIN">
            <ManageQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-question/:id"
        element={
          <ProtectedRoute role="ADMIN">
            <AddQuestion />
          </ProtectedRoute>
        }
      />

      <Route
        path="/view-questions/:id"
        element={
          <ProtectedRoute role="ADMIN">
            <ViewQuestions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute role="ADMIN">
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/:id"
        element={
          <ProtectedRoute role="ADMIN">
            <StudentDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bulk-upload"
        element={
          <ProtectedRoute role="ADMIN">
            <BulkUploadQuestions />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold text-red-600">
              404 - Page Not Found
            </h1>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;