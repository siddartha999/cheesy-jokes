import React from "react";
import "./Emoji.css";

const EMOJIS = new Map();
EMOJIS.set(-30, `😭`);
EMOJIS.set(-25, `😪`);
EMOJIS.set(-20, `😥`);
EMOJIS.set(-15, `😌`);
EMOJIS.set(-10, `😨`);
EMOJIS.set(-5, `🤯`);
EMOJIS.set(0, `😶`);
EMOJIS.set(5, `😗`);
EMOJIS.set(10, `😊`);
EMOJIS.set(15, `😄`);
EMOJIS.set(20, `😜`);
EMOJIS.set(25, `😝`);
EMOJIS.set(30, `🤗`);
EMOJIS.set(35, `🤣`);
EMOJIS.set(40, `🤩`);

const Emoji = (props) => {
  let emoji = Math.ceil((props.mood || 0) / 5) * 5;

  if (emoji < -30) {
    emoji = -30;
  } else if (emoji > 40) {
    emoji = 40;
  }

  return (
    <div className="Emoji">
      <span className="Emoji-emoji">{EMOJIS.get(emoji)}</span>
    </div>
  );
};

export default Emoji;
