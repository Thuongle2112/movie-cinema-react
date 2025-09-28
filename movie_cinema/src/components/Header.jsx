// components/Header.jsx
import { useState, useEffect } from 'react';
import NavBar from './NavBar/NavBar';
import { useScroll } from '../hooks/useScroll';

function Header() {
    const [headerState, setHeaderState] = useState({
        isVisible: true,
        isScrolled: false,
        isAtTop: true
    });

    const { scrollY, scrollDirection } = useScroll();

    useEffect(() => {
        const isAtTop = scrollY < 20;
        const isScrolled = scrollY > 20;
        const isVisible = scrollY < 100 || scrollDirection === 'up';

        setHeaderState({
            isVisible,
            isScrolled,
            isAtTop
        });
    }, [scrollY, scrollDirection]);

    // const { scrollY, scrollDirection } = useScroll();

    // const isVisible = scrollY < 100 || scrollDirection === 'up';
    // const isScrolled = scrollY > 20;

    return (
        <>
            <header
                className={`
                fixed top-0 left-0 w-full z-50
                transform transition-all duration-300 ease-in-out
                ${headerState.isVisible ? 'translate-y-0' : '-translate-y-full'}
                ${headerState.isScrolled
                        ? 'bg-black/90 backdrop-blur-md shadow-lg'
                        : 'bg-black/20'
                    }
            `}
            >
                <NavBar headerState={headerState} />
            </header>
        </>
    );
}

export default Header;