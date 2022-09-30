import React, {useEffect, useState} from 'react';
import {DialogContent, DialogOverlay} from "@reach/dialog";
import {animated, useTransition} from '@react-spring/web'

import "@reach/dialog/styles.css";

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);
const Modal = ({children, positiveBtn, negativeBtn, callback, Activator, showModal}) => {
    const [showDialog, setShowDialog] = useState(false);
    const transitions = useTransition(showDialog, {
        from: {opacity: 0, y: -10},
        enter: {opacity: 1, y: 0},
        leave: {opacity: 0, y: 10},
    });

    useEffect(() => {
        setShowDialog(Boolean(showModal))
    }, [showModal]);

    const positiveButtonClick = async () => {
        await callback();
        setShowDialog(false)
    }

    return (
        <div>
            {Activator ? <Activator onClick={() => setShowDialog(true)}/> : ''}
            {transitions(
                (styles, item) =>
                    item && (
                        <AnimatedDialogOverlay style={{opacity: styles.opacity}} onClick={() => setShowDialog(false)}>
                            <AnimatedDialogContent
                                aria-labelledby="dialog-title"
                                style={{
                                    transform: styles.y.to(
                                        (value) => `translate3d(0px, ${value}px, 0px)`
                                    ),
                                    border: "4px solid hsla(0, 0%, 0%, 0.5)",
                                    borderRadius: 10,
                                }}
                            >
                                {children}
                                <div>
                                    <button className="btn btn-primary me-2"
                                            onClick={positiveButtonClick}>{positiveBtn}</button>
                                    <button className="btn btn-danger"
                                            onClick={() => setShowDialog(false)}>{negativeBtn}</button>
                                </div>
                            </AnimatedDialogContent>
                        </AnimatedDialogOverlay>
                    )
            )}
        </div>
    );
};

export default Modal;