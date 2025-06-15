
import React from "react";

/**
 * Displays intuitive user guide for selecting body type, with visuals.
 * Uses user's uploaded images and groups by gender.
 */
const BodyTypeUserGuide: React.FC = () => {
  return (
    <section className="mt-10 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-brand-700">Body Type User Guide</h2>
      <div className="mb-10">
        <h3 className="text-lg font-bold text-pink-700 text-center mb-3">Female Body Shapes</h3>
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-6">
          <div className="max-w-md">
            <img
              src="/lovable-uploads/8d1c4277-650a-4984-b1e4-0fdf23cd0d63.png"
              alt="Female Body Shapes Guide"
              className="rounded-lg shadow-lg w-full object-contain bg-white"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">Apple, Pear, Hourglass, Inverted Triangle, Rectangle</p>
          </div>
          <div className="max-w-md">
            <img
              src="/lovable-uploads/60f62417-c305-4f7a-bbd9-f0f635205409.png"
              alt="Female Body Types with Shapes"
              className="rounded-lg shadow-lg w-full object-contain bg-white"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">Visual illustrations - Pear, Inverted Triangle, Hourglass, Rectangle, Triangle, Round</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-blue-700 text-center mb-3">Male Body Shapes</h3>
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-6">
          <div className="max-w-md">
            <img
              src="/lovable-uploads/ec5decd2-fe8d-4551-8a12-dfbdc82a8025.png"
              alt="Male Body Types Shapes"
              className="rounded-lg shadow-lg w-full object-contain bg-white"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">Trapezoid, Rectangle, Oval, Triangle, Inverted Triangle</p>
          </div>
          <div className="max-w-md">
            <img
              src="/lovable-uploads/ff6b4c09-9724-4852-93d8-03e75a47cf69.png"
              alt="Male Body Shapes Guide"
              className="rounded-lg shadow-lg w-full object-contain bg-white"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">Column, Trapezium, Circle, Oval, Rectangle, Square, Inverted Triangle, Triangle</p>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-gray-600 max-w-2xl mx-auto">
        <span className="font-medium text-brand-700">Tip:</span> Identifying your body type helps personalize fashion and fit recommendations. Use the visuals above to compare and select the option that most closely matches your body shape.
      </p>
    </section>
  );
};

export default BodyTypeUserGuide;
