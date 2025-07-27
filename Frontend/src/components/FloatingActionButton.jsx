import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingActionButton({ onClick }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="floating-action-btn"
    >
      <Button
        onClick={onClick}
        className="w-14 h-14 rounded-full gradient-orange text-white shadow-lg glow-orange hover:scale-110 transition-all"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </motion.div>
  );
}