import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from './Nav';
import Foot from './Foot';

export default function Shell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="shell">
      <Nav />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex-1"
      >
        <Outlet />
      </motion.main>
      {isAdmin ? null : <Foot />}
    </div>
  );
}