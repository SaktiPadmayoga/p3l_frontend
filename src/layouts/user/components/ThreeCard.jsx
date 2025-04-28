import React from 'react';

export default function ThreeHorizontalCardsWithContent() {
  // Data untuk masing-masing kartu
  const cardsData = [
    {
      id: 1,
      title: "How we design and code open-source projects?",
      author: "Lewis Daniel",
      backgroundImage: "/api/placeholder/400/600",
      authorImage: "/api/placeholder/128/128"
    },
    {
      id: 2,
      title: "Best practices for web accessibility",
      author: "Sarah Johnson",
      backgroundImage: "/api/placeholder/400/600",
      authorImage: "/api/placeholder/128/128"
    },
    {
      id: 3,
      title: "The future of front-end development",
      author: "Michael Chen",
      backgroundImage: "/api/placeholder/400/600",
      authorImage: "/api/placeholder/128/128"
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {cardsData.map((card) => (
        <div key={card.id} className="relative w-80 h-96 overflow-hidden rounded-lg">
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-cover bg-center" 
               style={{backgroundImage: `url('${card.backgroundImage}')`}}>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          </div>
          <div className="relative text-center p-6 flex flex-col items-center h-full justify-end pb-8">
            <h2 className="mb-6 text-2xl font-medium text-white">
              {card.title}
            </h2>
            <h5 className="mb-4 text-lg font-semibold text-slate-300">
              {card.author}
            </h5>
            <img
              alt={card.author}
              src={card.authorImage}
              className="relative inline-block h-24 w-24 rounded-full border-2 border-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
}