
import React from "react";

// Placeholder images for body types, replace with actual images as needed
const bodyTypeImages: Record<string, string> = {
  pear: "/photo-1649972904349-6e44c42644a7",            // Use the provided placeholder for "pear"
  hourglass: "/photo-1581091226825-a6a2a5aee158",        // Use the provided placeholder for "hourglass"
  rectangle: "/photo-1486312338219-ce68d2c6f44d",        // Use a neutral for "rectangle"
  invertedTriangle: "/photo-1581092795360-fd1ca04f0952", // For inverted triangle
  trapezoid: "/photo-1581092795360-fd1ca04f0952",        // Reuse male images
  triangle: "/photo-1486312338219-ce68d2c6f44d",         // Reuse neutral for male triangle
};

// Option lists for each gender
const bodyTypeOptions = {
  female: [
    { value: "", label: "Select Body Type" },
    { value: "pear", label: "Pear (wider hips, narrow shoulders)" },
    { value: "hourglass", label: "Hourglass (bust ≈ hips, narrow waist)" },
    { value: "rectangle", label: "Rectangle (bust ≈ waist ≈ hips)" },
    { value: "invertedTriangle", label: "Inverted Triangle (broad shoulders, slimmer hips)" },
  ],
  male: [
    { value: "", label: "Select Body Type" },
    { value: "trapezoid", label: "Trapezoid (broad shoulders, slim waist)" },
    { value: "triangle", label: "Triangle (narrower shoulders, wider waist/hips)" },
    { value: "rectangle", label: "Rectangle (bust ≈ waist ≈ hips)" },
    { value: "invertedTriangle", label: "Inverted Triangle (broad shoulders, slim hips)" },
  ]
};

type Props = {
  value: string;
  gender: "male" | "female";
  onChange: (val: string) => void;
  disabled?: boolean;
};

const BodyTypeSelectWithImage: React.FC<Props> = ({
  value,
  gender,
  onChange,
  disabled = false
}) => {
  const options = bodyTypeOptions[gender];

  return (
    <div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className="w-full bg-white border border-gray-300 rounded px-4 py-2 mt-1 disabled:bg-gray-100"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {value && value !== "" && (
        <div className="mt-3 flex items-center gap-3">
          <img
            src={bodyTypeImages[value]}
            alt={options.find(o => o.value === value)?.label || "Body type"}
            className="w-16 h-16 rounded shadow object-cover border"
          />
          <span className="text-sm text-gray-600">
            {options.find(o => o.value === value)?.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default BodyTypeSelectWithImage;
