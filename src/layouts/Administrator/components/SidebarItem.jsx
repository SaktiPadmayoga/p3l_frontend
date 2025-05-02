import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const SidebarItem = ({ icon, text, expanded, path }) => {
    return (
        <NavLink 
            to={path} 
            className={({ isActive }) => 
                `flex items-center p-3 mt-2 transition-all duration-300 ease-in-out transform 
                ${isActive ? 'bg-stone-600 text-white shadow-sm' 
                : 'hover:bg-stone-600 hover:text-white'} cursor-pointer mx-4 rounded-lg`
            }
        >
            <div className="flex items-center justify-center ">{icon}</div>
            {expanded && <span className="ml-4 text-xl">{text}</span>}
            {expanded && <ChevronRight className="ml-auto" size={20} />}
        </NavLink>
    );
};

export default SidebarItem;
