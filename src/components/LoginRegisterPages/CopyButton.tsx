import { faCheck, faPaste } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function CopyButton(props: { text: string }) {

    const [showCopiedIcon, setShowCopiedIcon] = useState<boolean>(false)

    function onCopy(): void {
        setShowCopiedIcon(true)
        setTimeout(() => {
            setShowCopiedIcon(false)
        }, 3000);
    }

    return (
        <CopyToClipboard text={props.text} onCopy={onCopy}>
            { showCopiedIcon ? (
                <FontAwesomeIcon className="text-green-700" icon={faCheck} />
            ) : (<button className="hover:scale-110 transition-all duration-100 ease-in-out"><FontAwesomeIcon icon={faPaste} /></button> )}
        </CopyToClipboard>
    )
}