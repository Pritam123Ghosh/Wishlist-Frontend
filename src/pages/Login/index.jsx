import { useState } from "react";
import { notification } from "antd";

import { persistor } from "../../store/index";
import logo1 from "../../assets/1.png";
import { apiLogin } from "../../services/AuthService";

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      localStorage.clear();
      persistor.flush();
      persistor.purge();
      const response = await apiLogin({ email, password });

      if (response.status === 200) {
        const responseData = response.data;
        const user = responseData.payload;
        const userID = responseData?.data?._id;
        localStorage.setItem("userID", userID);
        localStorage.setItem("token", user);

        api.success({
          message: "Login Successfully",
        });

        setLoading(false);
        window.location.href = "/";
      } else {
        api.error({
          message: "Error",
          description: "Unauthorized User.",
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      api["error"]({
        message: "Invalid Phone Number or Password",
        description: err.message,
      });
    }
  };
  return (
    <div>
      {contextHolder}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src={logo1} alt="Your Company" />
          <h2 className="mt-5 text-center text-xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="mt-4 space-y-6" onSubmit={onFinish}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:outline-indigo-600"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
          {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?{" "}
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Start a 14 day free trial
                </a>
              </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
