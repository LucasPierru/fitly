import React from 'react';

export function UserSettings() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="height"
              className="block text-md font-medium textforeground-secondary"
            >
              Height (cm)
              <input
                id="height"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="weight"
              className="block text-md font-medium textforeground-secondary"
            >
              Weight (kg)
              <input
                id="weight"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-md font-medium textforeground-secondary"
          >
            Age
            <input
              id="age"
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-md font-medium textforeground-secondary"
          >
            Gender
            <select
              id="gender"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-md font-medium textforeground-secondary"
          >
            Activity Level
            <select
              id="level"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Exercise</option>
              <option value="moderate">Moderate Exercise</option>
              <option value="active">Active</option>
              <option value="very_active">Very Active</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
