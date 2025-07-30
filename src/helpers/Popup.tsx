import { PropsWithChildren } from "react";
// import CloseIcon from "../assets/images/Close.png";
// import { useGlobalModalContext } from "./GlobalModal";

export interface PopupProps extends PropsWithChildren {
  title?: string;
  modalBgClass?: string;
  className?: string;
}

export default function Popup(props: PopupProps) {
  // const { hideModal } = useGlobalModalContext();

  return (
    <div className={"popup " + props.className}>
      <div className="popup-bg"></div>
      <div className={"popup-modal " + props.modalBgClass}>

          <div className="header">
              {<p className="title">{props.title}</p>}
          </div>
          {/* <img
              src={CloseIcon}
              alt="Popup close"
              className="closeBtn"
              onClick={() => {
                  hideModal();
              }}
          /> */}
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}
