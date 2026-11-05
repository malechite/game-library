import { useUISystem } from "./useUISystem";

export const useModal = () => {
  const { openModal, closeModal, isModalOpen } = useUISystem();
  return { openModal, closeModal, isModalOpen };
};
