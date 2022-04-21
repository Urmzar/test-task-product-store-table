import { CloseOutlined } from "@ant-design/icons";
import { Row } from "antd";
import React, { FC, useRef } from "react";
import ReactDOM from "react-dom";
import { createDropdownContentContextDiv, setPosition } from "./DropdownUtils";
import "./.less/Dropdown.less";

export const dropdownContentContextDiv = createDropdownContentContextDiv();

interface DropdownProps {
  element: JSX.Element;
  children: JSX.Element;
}

let someComponentIsActive = false;

const Dropdown: FC<DropdownProps> = ({ element, children }) => {
  const elementContainerDiv = useRef<HTMLDivElement>(null);
  const dropdownContentContainerDiv = useRef<HTMLDivElement>(null);

  const resize = () => {
    if (dropdownContentContainerDiv.current && elementContainerDiv.current)
      setPosition(dropdownContentContainerDiv.current, elementContainerDiv.current);
  };

  const onIconClose = () => {
    window.removeEventListener("resize", resize);
    document.removeEventListener("click", onMouseClose);
    someComponentIsActive = false;
    dropdownContentContainerDiv.current!.style.display = "none";
  };

  const onMouseClose = (e: MouseEvent) => {
    // Make it work with Ant Design components
    const antPickerWrapper1 = document.getElementsByClassName("ant-picker-dropdown")[0];
    const antPickerWrapperContainTarget1 =
      antPickerWrapper1 && antPickerWrapper1.contains(e.target as Node);
    const antPickerWrapper2 = document.getElementsByClassName("ant-picker-dropdown")[1];
    const antPickerWrapperContainTarget2 =
      antPickerWrapper2 && antPickerWrapper2.contains(e.target as Node);

    const boundingContentrect = dropdownContentContainerDiv.current?.getBoundingClientRect();
    const outOfArea =
      boundingContentrect &&
      (e.x < boundingContentrect.x ||
        e.y < boundingContentrect.y ||
        e.x > boundingContentrect.right ||
        e.y > boundingContentrect.bottom);
    if (outOfArea && !antPickerWrapperContainTarget1 && !antPickerWrapperContainTarget2) {
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", onMouseClose);
      someComponentIsActive = false;
      dropdownContentContainerDiv.current!.style.display = "none";
    }
  };

  const onToggle = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (
      !someComponentIsActive &&
      dropdownContentContainerDiv.current &&
      elementContainerDiv.current
    ) {
      e.stopPropagation();
      dropdownContentContainerDiv.current.style.display = "block";
      setPosition(dropdownContentContainerDiv.current, elementContainerDiv.current);
      window.addEventListener("resize", resize);
      document.addEventListener("click", onMouseClose);
      someComponentIsActive = true;
    }
  };

  return (
    <>
      <div className="element-container" ref={elementContainerDiv} onClick={onToggle}>
        {element}
      </div>
      {ReactDOM.createPortal(
        <div className="dropdown-content-container" ref={dropdownContentContainerDiv}>
          {
            <div className="dropdown-children-container">
              <Row className="dropdown-close-icon-container" justify="end">
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
