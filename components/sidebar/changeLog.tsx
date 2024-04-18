import { Modal, Button, ModalHeader, ModalFooter, ModalBody, useDisclosure, ModalContent } from "@nextui-org/react";
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
                                    Version: 4.0.0
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <span>
                                    ⌛ Lastest Update April 18th, 2024
                                </span>
                                <span>
                                    - Setting Tab Added.
                                </span>
                                <span>
                                    - Adding Student button for Admin Added.
                                </span>
                                <span>
                                    - Student Configuration Tab in Student list Added.
                                </span>
                                <span>
                                    - Improved overall UX
                                </span>
                                <span className="text-orange-500">
                                    - Wait!, KMUTT?...., Great!, Wish me luck!!!
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