import React, { useState, useRef, useEffect } from 'react';
import '../styles/help/Window.css';
import '../styles/help/usageCommand.css';
import { Trans, useTranslation } from 'react-i18next';

const HelpWindow: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [slideIndex, setSlideIndex] = useState(0);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // const isDragging = useRef(false);
    // const isResizing = useRef(false);
    const { t, i18n } = useTranslation();

    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const defaultWidth = window.innerWidth * 0.5;
        const defaultHeight = window.innerHeight * 0.8;
        setSize({ width: defaultWidth, height: defaultHeight });
        setPosition({ x: (window.innerWidth - defaultWidth) / 2, y: (window.innerHeight - defaultHeight) / 2 });

        const handleResize = () => {
            const newWidth = Math.min(window.innerWidth * 0.8, size.width);
            const newHeight = Math.min(window.innerHeight * 0.8, size.height);
            setSize({ width: newWidth, height: newHeight });
            setPosition({
                x: Math.min(position.x, window.innerWidth - newWidth),
                y: Math.min(position.y, window.innerHeight - newHeight),
            });
        };

        // window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [size.width, size.height, position.x, position.y]);

    const slides = [
        {
            content: (
                <div className="command-usage-content">
                    <img src="assets/helpCommand.gif" alt="Help 1" className="media-content" />
                    <h4><Trans>{t('help.text.commandUsage.instruction')}</Trans></h4>
                    <p className="description"><Trans>{t('help.text.commandUsage.description')}</Trans></p>
                    <div className="example-steps">
                        <p><Trans>{t('help.text.commandUsage.example.step1')}</Trans></p>
                        <p><Trans>{t('help.text.commandUsage.example.step2')}</Trans></p>
                        <p><Trans>{t('help.text.commandUsage.example.step3')}</Trans></p>
                    </div>
                </div>
            ),
        }
    ];

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    // const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    //     if (isResizing.current) return;

    //     e.preventDefault();
    //     isDragging.current = true;

    //     const startX = e.clientX;
    //     const startY = e.clientY;
    //     const initialX = position.x;
    //     const initialY = position.y;

    //     const onDrag = (e: MouseEvent) => {
    //         if (!isDragging.current) return;

    //         setPosition({
    //             x: initialX + (e.clientX - startX),
    //             y: initialY + (e.clientY - startY),
    //         });
    //     };

    //     const stopDrag = () => {
    //         isDragging.current = false;
    //         document.removeEventListener('mousemove', onDrag);
    //         document.removeEventListener('mouseup', stopDrag);
    //     };

    //     document.addEventListener('mousemove', onDrag);
    //     document.addEventListener('mouseup', stopDrag);
    // };

    // const startResize = (e: React.MouseEvent<HTMLDivElement>, direction: 'right' | 'bottom' | 'corner') => {
    //     e.preventDefault();
    //     isResizing.current = true;

    //     const startX = e.clientX;
    //     const startY = e.clientY;
    //     const initialWidth = size.width;
    //     const initialHeight = size.height;

    //     const onResize = (e: MouseEvent) => {
    //         if (!isResizing.current) return;

    //         let newWidth = initialWidth;
    //         let newHeight = initialHeight;

    //         if (direction === 'right' || direction === 'corner') {
    //             newWidth = Math.max(initialWidth + (e.clientX - startX), window.innerWidth * 0.1);
    //         }
    //         if (direction === 'bottom' || direction === 'corner') {
    //             newHeight = Math.max(initialHeight + (e.clientY - startY), window.innerHeight * 0.1);
    //         }

    //         setSize({
    //             width: newWidth,
    //             height: newHeight,
    //         });
    //     };

    //     const stopResize = () => {
    //         isResizing.current = false;
    //         document.removeEventListener('mousemove', onResize);
    //         document.removeEventListener('mouseup', stopResize);
    //     };

    //     document.addEventListener('mousemove', onResize);
    //     document.addEventListener('mouseup', stopResize);
    // };

    return (
        <>
            <button onClick={toggleVisibility} className="toggle-help-button">
                {isVisible ? t("help.hide") : t("help.show")}
            </button>
            {isVisible && (
                <div
                    className="help-window"
                    ref={windowRef}
                    // onMouseDown={startDrag}
                    style={{
                        width: `${size.width}px`,
                        height: `${size.height}px`,
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        position: 'absolute',
                    }}
                >
                    <div className="help-header">
                        <span onClick={toggleVisibility} className="close-button">&times;</span>
                        <h4>{t("help.help")}</h4>
                        <div className="language-selection">
                            <img
                                src="assets/french.jpg"
                                alt="French"
                                className="language-icon"
                                onClick={() => changeLanguage('fr')}
                            />
                            <img
                                src="assets/english.jpg"
                                alt="English"
                                className="language-icon"
                                onClick={() => changeLanguage('en')}
                            />
                        </div>
                    </div>
                    <div className="help-content">
                        <div className="media-container">
                            {slides[slideIndex].content}
                        </div>
                    </div>
                    {/* <div
                        className="resize-handle resize-handle-right"
                        onMouseDown={(e) => startResize(e, 'right')}
                    />
                    <div
                        className="resize-handle resize-handle-bottom"
                        onMouseDown={(e) => startResize(e, 'bottom')}
                    />
                    <div
                        className="resize-handle resize-handle-corner"
                        onMouseDown={(e) => startResize(e, 'corner')}
                    /> */}
                </div>
            )}
        </>
    );
};

export default HelpWindow;
