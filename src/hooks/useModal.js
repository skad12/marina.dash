import { useState } from "react";

// eslint-disable-next-line
export default () => {
  const [isVisible, setIsVisible] = useState(false);
  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);
  return { hideModal, showModal, isVisible, setIsVisible };
};
