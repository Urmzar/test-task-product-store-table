import Styles from "../../styles";

let _dropdownContentContextDiv: HTMLDivElement;

export const createDropdownContentContextDiv = () => {
  if (!_dropdownContentContextDiv) {
    _dropdownContentContextDiv = document.createElement("div");
    _dropdownContentContextDiv.className = Styles.DROPDOWN_CONTENT_CONTEXT;
    document.body.append(_dropdownContentContextDiv);
  }
  return _dropdownContentContextDiv;
};

export const setPosition = (
  dropdownContentContainerDiv: HTMLDivElement,
  elementContainerDiv: HTMLDivElement
) => {
  let IconContainerDivBoundingRect = elementContainerDiv.getBoundingClientRect();
  const leftStyle = `${
    IconContainerDivBoundingRect.left +
    elementContainerDiv.clientWidth -
    dropdownContentContainerDiv.clientWidth
  }px`;
  dropdownContentContainerDiv.style.left = leftStyle;
  const topStyle = `${IconContainerDivBoundingRect.top + elementContainerDiv.clientHeight + 10}px`;
  dropdownContentContainerDiv.style.top = topStyle;
};
