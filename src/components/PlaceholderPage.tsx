import React from "react";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{title} Page</h1>
      <p className="text-gray-600 mt-2">Content coming soon...</p>
    </div>
  );
};

export default PlaceholderPage;

