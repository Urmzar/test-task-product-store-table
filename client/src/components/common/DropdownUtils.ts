let _dropdownContentContextDiv: HTMLDivElement;

export const createDropdownContentContextDiv = () => {
  if (!_dropdownContentContextDiv) {
    _dropdownContentContextDiv = document.createElement("div");
    _dropdownContentContextDiv.className = "dropdown-content-context";
    document.body.append(_dropdownContentContextDiv);
  }
  return _dropdownContentContextDiv;
};

export const setPosition = (dropdownContentContainerDiv: HTMLDivElement, elementContainerDiv: HTMLDivElement) => {
  if (dropdownContentContainerDiv && elementContainerDiv) {
    let IconContainerDivBoundingRect = elementContainerDiv.getBoundingClientRect();
    const leftStyle = `${
      IconContainerDivBoundingRect.left + elementContainerDiv.clientWidth - dropdownContentContainerDiv.clientWidth
    }px`;
    dropdownContentContainerDiv.style.left = leftStyle;
    const topStyle = `${IconContainerDivBoundingRect.top + elementContainerDiv.clientHeight + 10}px`;
    dropdownContentContainerDiv.style.top = topStyle;
  }
};
