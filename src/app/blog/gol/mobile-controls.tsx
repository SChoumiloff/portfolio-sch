import { motion, AnimatePresence } from "framer-motion";
import { GearIcon, Cross2Icon } from "@radix-ui/react-icons";
import styles from '../Layout.module.css';

interface MobileControlsProps {
    children: React.ReactNode[];
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const MobileControls = ({ children, isOpen, setIsOpen }: MobileControlsProps) => {
    const buttonVariants = {
        initial: {
            y: 0,
            opacity: 0
        },
        animate: (index: number) => ({
            y: -50 * (index + 1),
            opacity: 1,
            transition: {
                duration: 0.2,
                delay: index * 0.05
            }
        }),
        exit: {
            y: 0,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <div className={styles.mobileControls}>
            <AnimatePresence mode="wait">
                {isOpen && children.map((child, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={buttonVariants}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0
                        }}
                    >
                        {child}
                    </motion.div>
                ))}
            </AnimatePresence>
            
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    position: 'absolute',
                    bottom: 0,
                    left: 0
                }}
            >
                {isOpen ? <Cross2Icon /> : <GearIcon />}
            </motion.button>
        </div>
    );
}; 