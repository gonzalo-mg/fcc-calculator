/* 
button to play sound
*/
import { useEffect, useState } from "react";
import "./index.css";
import PropTypes from "prop-types";
import { getAudioDurationInSeconds } from "@remotion/media-utils";

export const DrumPad = ({
  assignedKey,
  audioTitle,
  audioFile,
  recoverDisplayText,
}) => {
  // create audio instance
  const clip = new Audio(audioFile);
  // states to activate and modify css when playing
  const [playing, setPlaying] = useState("notPlaying");
  const [clipDuration, setClipDuration] = useState("1000");

  //f
  const getClipDuration = async () => {
    const duration = (await getAudioDurationInSeconds(audioFile)) * 1000;
    setClipDuration(duration);
  };
  // to get in time
  useEffect(() => {
    getClipDuration();
  }, []);

  // f to play audio
  const play = (event) => {
    // stop event to prevent play() from being called multiple times per keypress; onClick does not have .stopImmediatePropagation() as function
    if (event.type === "keydown") {
      event.stopImmediatePropagation();
    }
    clip.play();
    // send text to display
    recoverDisplayText(audioTitle, clipDuration);
    // modify css
    setPlaying("isPlaying");
    setTimeout(() => {
      setPlaying("notPlaying");
    }, clipDuration);
  };

  // f to handle keypress by user: play audio if pressed key corresponds to assigned key
  const handleKeyPress = (event) => {
    if (
      event.key === assignedKey.toLowerCase() ||
      event.key === assignedKey.toUpperCase()
    ) {
      play(event);
    }
  };

  // listener to launch event when user presses a key
  document.addEventListener("keydown", handleKeyPress);

  return (
    <p className={`drum-pad ${playing}`} onClick={play}>
      <p className="keyLabel">{assignedKey}</p>
      <p className="titleLabel">{audioTitle}</p>
    </p>
  );
};

DrumPad.propTypes = {
  assignedKey: PropTypes.string.isRequired,
  audioTitle: PropTypes.string.isRequired,
  audioFile: PropTypes.string.isRequired,
  recoverDisplayText: PropTypes.func.isRequired,
};
