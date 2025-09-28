import { useState } from "react";

function NavItem({ label, items }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 text-gray-700 hover:text-blue-600"
            >
                {label}
            </button>
            {open && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                    {items.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    return (
        <nav className="flex space-x-4 p-4 bg-gray-50 shadow">
            <NavItem
                label="Movies"
                items={[
                    { name: "Popular", href: "/popular" },
                    { name: "Top Rated", href: "/top-rated" },
                ]}
            />
            <NavItem
                label="TV Shows"
                items={[
                    { name: "Airing Today", href: "/airing" },
                    { name: "On The Air", href: "/on-the-air" },
                ]}
            />
        </nav>
    );
}
