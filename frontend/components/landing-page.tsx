"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";

const initialMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Lead Researcher",
    image: "path/to/john_doe.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Data Scientist",
    image: "path/to/jane_smith.jpg",
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "Software Engineer",
    image: "path/to/alice_johnson.jpg",
  },
  {
    id: 4,
    name: "Bob Brown",
    role: "Product Manager",
    image: "path/to/bob_brown.jpg",
  },
  // Add more members as needed
];

export function LandingPageComponent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [members, setMembers] = useState(initialMembers);

  const toggleAdminMode = () => setIsAdmin(!isAdmin);

  const handleChange = (id, field, value) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleImageUpload = (id, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange(id, "image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Research Group</h1>
          <Button
            onClick={toggleAdminMode}
            variant={isAdmin ? "destructive" : "default"}
          >
            {isAdmin ? "Exit Admin Mode" : "Enter Admin Mode"}
          </Button>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-6xl font-extrabold text-white mb-6">
              Welcome to Our Research Group
            </h1>
            <p className="text-2xl text-gray-200 max-w-3xl mx-auto mb-10">
              Advancing knowledge through innovative research
            </p>
            <button className="bg-white text-blue-600 font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
              Learn More
            </button>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Our Members
            </h2>
            <div className="relative">
              <Slider {...settings}>
                {members.map((member) => (
                  <div key={member.id} className="flex justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-auto">
                      {isAdmin ? (
                        <div>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) =>
                              handleChange(member.id, "name", e.target.value)
                            }
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Link (URL)"
                          />
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) =>
                              handleChange(member.id, "role", e.target.value)
                            }
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Role"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(member.id, e.target.files[0])
                            }
                            className="mb-2"
                          />
                          <p className="text-sm text-gray-500">
                            Upload an image
                          </p>
                        </div>
                      ) : (
                        <div>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-40 rounded-lg object-cover mb-4"
                          />
                          <h3 className="text-xl font-semibold">
                            <a
                              href={member.name} // Using name as the URL link
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {member.name}
                            </a>
                          </h3>
                          <p className="text-gray-600">{member.role}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10"></div>
              <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Research Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
