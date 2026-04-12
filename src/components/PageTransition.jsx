import { motion, AnimatePresence } from 'framer-motion';

const variants = {
    initial:  { opacity: 0, y: 12 },
    animate:  { opacity: 1, y: 0 },
    exit:     { opacity: 0, y: -8 },
};

const PageTransition = ({ children }) => (
    <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
        {children}
    </motion.div>
);

export default PageTransition;