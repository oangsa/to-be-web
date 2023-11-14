import { Modal, useModal, Button, ModalHeader, ModalFooter, ModalBody, useDisclosure, ModalContent } from "@nextui-org/react";
import { SidebarItem } from "./sidebar-item";
import {ChangeLogIcon} from '../icons/sidebar/changelog-icon';

export default function ChangeLog() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    return (
        <div>
            <SidebarItem click={() => onOpen()} title="Changelog" icon={<ChangeLogIcon />} />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <span id="modal-title" className="text-lg">
                                    เวอร์ชั่น: 3.0.2
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <span>
                                    ⌛ อัพเดตล่าสุด 14 พ.ย. 2566
                                </span>
                                <span>
                                    - Add Delete user function to backend.
                                </span>
                                <span>
                                    - Drink more coffee.
                                </span>
                            </ModalBody>
                            <ModalFooter>
                                <span className="text-xs">
                                    Developed With ❤️ By: To Be Number One Club&apos;s Developer Team.
                                </span>
                            </ModalFooter>
                            <ModalFooter>
                                <Button onPress={() => onClose()} color="danger">
                                    ปิด
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}