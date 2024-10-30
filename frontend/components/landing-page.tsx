"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import logo from "@/app/images/logo.png"; 
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import Tab from "@/components/ui/tab";
import Alliances from '@/components/ui/Alliances';


const initialMembers = [
  {
    id: 1,
    name: "Deison Cardona",
    role: "Scrum Master",
    image: "path/to/john_doe.jpg",
  },
  {
    id: 2,
    name: "Santiago Gutierrez",
    role: "Product Owner",
    image: "path/to/jane_smith.jpg",
  },
  {
    id: 3,
    name: "Esteban Hernadez",
    role: "Developer Scrum",
    image: "path/to/alice_johnson.jpg",
  },
  {
    id: 4,
    name: "Brayan Urrea",
    role: "Developer Scrum",
    image: "path/to/bob_brown.jpg",
  },
  {
    id: 5,
    name: "Santiago",
    role: "Developer Scrum",
    image: "path/to/bob_brown.jpg",
  },
  {
    id: 6,
    name: "Ervin Caravali",
    role: "Developer Scrum",
    image: "path/to/bob_brown.jpg",
  },
  {
    id: 7,
    name: "Miguel Moreno",
    role: "Testing",
    image: "path/to/bob_brown.jpg",
  },
];
  {/* aqui se llama al archivo de alliances.tsx aun que por alguna razon vercel decteta los ccambios y mee pide 
    el cambio en el despliegue deel mismo  */}
const LandingPage: React.FC = () => {
  return (
      <div>
          {/* Otras secciones de la página */}
          <Alliances />
          {/* Otras secciones de la página */}
      </div>
  );
};

export default LandingPage;


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
        <Tab />
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
                              href={member.name} 
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

  <footer className="bg-[#d51b23] text-white py-8">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start text-sm">
      <div className="flex items-start md:w-1/4">
        <img
          src={logo}
          alt="Logo Universidad del Valle"
          className="w-20 mb-4 md:mb-0"
        />
      </div>
      <div className="md:w-1/4 flex flex-col items-start space-y-1"> 
        <p className="font-bold">UNIVERSIDAD DEL VALLE</p>
        <p>Cali - Colombia</p>
        <p>© 1994 - 2024</p>
      </div>
      <div className="md:w-1/4 flex flex-col items-start space-y-1">
        <p className="font-bold">Dirección:</p>
        <p>Ciudad Universitaria Meléndez</p>
        <p>Calle 13 # 100-00</p>
        <p className="font-bold">Sede San Fernando</p>
        <p>Calle 4B N° 36-00</p>
      </div>
      <div className="md:w-1/4 flex flex-col items-start space-y-1"> 
        <p className="font-bold">PBX:</p>
        <p>+57 602 3212100</p>
        <p className="font-bold">Línea gratuita PQRS:</p>
        <p>018000 220021</p>
        <p className="font-bold">Apartado Aéreo:</p>
        <p>25360</p>
      </div>
      <div className="hidden md:block w-px bg-white h-20 mx-4"></div> 
      <div className="md:w-1/4 flex flex-col items-start">
        <p className="font-bold">Redes Sociales:</p>
        <div className="flex space-x-3">
          <a
            href="https://www.facebook.com/universidaddelvalle" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com/univallecol?mx=2" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.youtube.com/user/universidaddelvalle1" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  </footer>
  </div>
  );
}