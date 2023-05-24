"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const PORT = process.env.PORT || 3000;

const getChannelSeacret = "23f90c46e1c0a8270f8f837fa33d2242";
const getChannelAccessToken = "Z9rB1xQ+PvLFKQPPX7rDzy1s5XZjeFyb9qlW+qGpxwft8+U4lHnxY88UxdGo0Vc2Fhhluxlb4flGeC7SBz902Y8e94cbJ7nzDkZf5LRdUY0LehWK3plzpXv9/zMC3XNCK+rmuxBLCa8ObzPIYxKccwdB04t89/1O/w1cDnyilFU=";

const config = {
  channelSecret: getChannelSeacret(),
  channelAccessToken: getChannelAccessToken(),
};

const app = express();

app.post("/webhook", line.middleware(config), (req, res) => {
  console.log(req.body.events);

  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  /* -------------------------------------------
    ------- 返信メッセージの処理の記述ゾーン ---------
    ------------------------------------------- */

  let replyText = "";
  replyText = event.message.text; // event.message.textに自分のメッセージが入っている。

  /* ------------------------------------------
    ------------------------------------------
    ------------------------------------------ */

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: replyText,
  });
}
app.listen(PORT);
console.log(`Server running at ${PORT}`);