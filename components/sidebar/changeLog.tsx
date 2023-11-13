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
                                    เวอร์ชั่น: 3.0.0
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <span>
                                    ⌛ อัพเดตล่าสุด 13 พ.ย. 2566
                                </span>
                                <span>
                                    - Fix bugs.
                                </span>
                                <span>
                                    - Add more bugs to fix.
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