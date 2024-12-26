"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface JokeResponse {
  setup: string;
  punchline: string;
}

function RandomJokeComponent() {
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    fetchJoke();
  }, []);

  async function fetchJoke(): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(
        `https://official-joke-api.appspot.com/jokes/${category}/random`
      );
      const data: JokeResponse[] = await response.json();
      setJoke(`${data[0].setup} - ${data[0].punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch joke. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-[#ffa500] to-[#ff6b6b]"
      } p-4 transition-colors duration-500`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          😂 Random Joke 👈
        </h1>

        {/* Category Selector */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 p-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="general">General</option>
          <option value="programming">Programming</option>
        </select>

        {/* Joke Display */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6 text-gray-700 dark:text-gray-200 text-lg transition-opacity duration-500">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin border-4 border-t-[#4caf50] border-gray-200 rounded-full h-8 w-8"></div>
            </div>
          ) : (
            joke || "Loading..."
          )}
        </div>

        {/* Fetch New Joke Button */}
        <Button
          onClick={fetchJoke}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400"
              : "bg-[#4caf50] hover:bg-[#43a047] text-white"
          } font-bold py-2 px-4 rounded-full transition-colors duration-300`}
        >
          {loading ? "Fetching..." : "😂 Get New Joke 😂"}
        </Button>
      </div>
    </div>
  );
}

export default RandomJokeComponent;
