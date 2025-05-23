import React, { useState, useEffect, useContext } from "react";
import { motion } from 'framer-motion';
import themeContext from '../../components/Themes/themeContext';

interface TypingAnimationProps {
  messages: string[];
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ messages }) => {
  const theme = useContext(themeContext);
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);

  useEffect(() => {
    const message = messages[currentIndex];
    let interval: ReturnType<typeof setInterval>;

    const type = () => {
      interval = setInterval(() => {
        if (isDeleting) {
          const newText = typedText.substring(0, typedText.length - 1);
          setTypedText(newText);
          if (newText === '') {
            setIsDeleting(false);
            clearInterval(interval);
            // Move to the next message after deletion is complete
            setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
          }
        } else {
          const newText = message.substring(0, typedText.length + 1);
          setTypedText(newText);
          if (newText === message) {
            clearInterval(interval);
            // Start deleting after the message is fully typed
            setTimeout(() => {
              setIsDeleting(true);
            }, 2000); // Delay before deleting
          }
        }
      }, 100); // Typing speed
    };

    type();

    return () => clearInterval(interval);
  }, [messages, currentIndex, isDeleting, typedText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prevVisible) => !prevVisible);
    }, 500); // Cursor blinking speed

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      <motion.span animate={{ opacity: 1 }} transition={{ duration: 0.5 }} 
      style={{
        WebkitTextStroke: '.5px black',
        fontWeight: 'bold',
      }}
      className={`theme-${theme}`} >
        {typedText}
      </motion.span>
      {cursorVisible && <span>|</span>}
    </>
  );
};

export default TypingAnimation;
