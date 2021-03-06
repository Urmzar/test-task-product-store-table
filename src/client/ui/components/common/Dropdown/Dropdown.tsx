import { CloseOutlined } from "@ant-design/icons";
import { Row } from "antd";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { createDropdownContentContextDiv, setPosition } from "./utils";
import Styles from "../../../styles";

export const dropdownContentContextDiv = createDropdownContentContextDiv();

let isActive = false;

interface Props {
  element: JSX.Element;
  children: JSX.Element;
}

const Dropdown: FC<Props> = ({ element, children }) => {
  const [isCurrentActive, setIsCurrentActive] = useState(false);

  const elementContainerDiv = useRef<HTMLDivElement>(null);
  const dropdownContentContainerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCurrentActive && dropdownContentContainerDiv.current && elementContainerDiv.current) {
      dropdownContentContainerDiv.current.style.display = "block";
      setPosition(dropdownContentContainerDiv.current, elementContainerDiv.current);
      window.addEventListener("resize", resize);
      document.addEventListener("click", onMouseClose);
      isActive = true;
    } else if (dropdownContentContainerDiv.current) {
      dropdownContentContainerDiv.current.style.display = "none";
      isActive = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", onMouseClose);
    }
  }, [isCurrentActive]);

  const resize = () => {
    if (dropdownContentContainerDiv.current && elementContainerDiv.current)
      setPosition(dropdownContentContainerDiv.current, elementContainerDiv.current);
  };

  const onMouseClose = (e: MouseEvent) => {
    // Make it work with Ant Design Date components
    const antPickerWrapper = document.querySelector(
      ".ant-picker-dropdown:not(.ant-picker-dropdown-hidden)"
    );
    const antPickerWrapperContainTarget =
      antPickerWrapper && antPickerWrapper.contains(e.target as Node);
    const boundingContentrect = dropdownContentContainerDiv.current?.getBoundingClientRect();
    const outOfArea =
      boundingContentrect &&
      (e.x < boundingContentrect.x ||
        e.y < boundingContentrect.y ||
        e.x > boundingContentrect.right ||
        e.y > boundingContentrect.bottom);
    if (outOfArea && !antPickerWrapperContainTarget && dropdownContentContainerDiv.current)
      setIsCurrentActive(false);
  };

  const onIconClose = useCallback(() => {
    setIsCurrentActive(false);
  }, []);

  const toggle = useCallback((e: React.MouseEvent<Element, MouseEvent>) => {
    if (!isActive) {
      e.stopPropagation();
      setIsCurrentActive(true);
    }
  }, []);

  return (
    <>
      <div className={Styles.DROPDOWN_ELEMENT_CONTAINER} ref={elementContainerDiv} onClick={toggle}>
        {element}
      </div>
      {ReactDOM.createPortal(
        <div className={Styles.DROPDOWN_CONTENT_CONTAINER} ref={dropdownContentContainerDiv}>
          {
            <div className={Styles.DROPDOWN_CHILDREN_CONTAINER}>
              <Row className={Styles.DROPDOWN_CLOSE_ICON_CONTAINER} justify="end">
                <CloseOutlined onClick={onIconClose} />
              </Row>
              <Row>{children}</Row>
            </div>
          }
        </div>,
        dropdownContentContextDiv
      )}
    </>
  );
};

export default Dropdown;
