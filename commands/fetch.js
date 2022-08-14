const RedditImageFetcher = require("reddit-image-fetcher");
var items = 1;
var arr;
var rawlist =
  "wallpapers/r/wallpapers/r/aesthetic/r/Photography/r/AsKPhotography/r/astrophotography/r/fashionphotography/r/filmphotography/r/wallpapers/r/CoolPics/r/AnythingYouCanTakeAPhotographOfPorn/r/wallpapers";

var nameList = rawlist.split("/r/");

console.log(nameList);
module.exports.run = (client, message, args) => {
  items=1;
  nameList = rawlist.split("/r/");
  if (!isNaN(args) && args != "") items = args;
  else if (args != "") {
    nameList = args;
  }
  if (args[1] > 0) {
    items = args[1];
  }
  try {
    for (let i = 0; i < items; i++) {
      try {
        RedditImageFetcher.fetch({
          type: "custom",
          subreddit: nameList,
          total: 1,
          allowNSFW: false,
        })
          .then((result) => {
            console.log(result);
            try {
              message.channel.send({ files: [result[0].image] });
              arr[i] = result[0].subreddit;
            } catch (e) {
              return;
            }
          });
      } catch (e) {
        message.channel.send("Server Crashed");
        continue;
      }
    }
  } catch (e) {
    message.channel.send("Server Crashed");
  }
};
exports.name = "fetch";
