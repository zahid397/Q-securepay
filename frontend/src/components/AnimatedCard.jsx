import { motion } from "framer-motion";

const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{
        background: "rgba(0, 15, 25, 0.6)",
        border: "1px solid #003C4D",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.25)",
        borderRadius: "12px",
        padding: "25px",
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
