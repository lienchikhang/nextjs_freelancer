import { Tab, TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import React, { useState } from "react";
import ModalStateDefaultLogin from "./StateDefaultLogin";
import ModalStateLogin from "./StateLogin";

interface Props {
    state: number;
    updateState: (number: number) => void;
    handleCloseModal: () => void;
}

const AuthRight: React.FC<Props> = ({ state, updateState, handleCloseModal }) => {
    return (
        <div>
            <TabGroup>
                <Tab
                    className={`btn-flex ${state == 1 ? "block" : "hidden"
                        } data-[selected]:hidden`}
                >
                    Join in
                </Tab>
                <Tab
                    className={`btn-flex ${state == 1 ? "block" : "hidden"
                        } data-[selected]:hidden`}
                >
                    Sign in
                </Tab>
                <TabPanels>
                    <TabPanel className="modal__top">
                        {state == 1 && <ModalStateDefaultLogin updateState={updateState} />}
                        {state == 2 && (
                            <ModalStateLogin
                                updateState={updateState}
                                closeModal={handleCloseModal}
                            />
                        )}
                    </TabPanel>
                    <TabPanel className="modal__top">
                        {/* {state == 1 && <ModalStateDefault nextState={updateState} />} */}
                        {/* {state == 2 && (
              <ModalStateRegister
                updateState={updateState}
                updateData={updateData}
              />
            )} */}
                        {/* {state == 3 && (
              <ModalStateConfirm
                updateState={updateState}
                updateData={updateData}
                data={data}
              />
            )} */}
                        {/* {state == 4 && (
              <ModalStateOtp updateState={updateState} data={data} />
            )} */}
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default AuthRight