import React from "react";

export const Button = () => {
  return (
    <div>
      <button
        type="submit"
        className="
                     border 
                     hover:border-blue-900
                     w-full
                     text-white
                     py-2.5
                     px-4
                     rounded-lg
                     focus:ring-4
                     bg-primary
                     hover:bg-blue-500
                    "
      >
        iniciar sesión
      </button>
    </div>
  );
};
