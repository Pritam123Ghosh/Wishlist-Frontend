import logo1 from "../assets/1.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 px-10 pt-10">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 text-center mt-2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        onClick={() => (window.location.href = "/")}
      >
        Back to Home
      </button>
      <img className="mx-auto h-20 w-auto" src={logo1} alt="Your Company" />
    </div>
  );
};

export default NotFound;
