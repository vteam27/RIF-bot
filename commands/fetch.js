const RedditImageFetcher = require("reddit-image-fetcher");
var items = 1;
var rawlist =
  "wallpapers/r/wallpapers/r/aesthetic/r/Photography/r/AsKPhotography/r/astrophotography/r/fashionphotography/r/filmphotography/r/wallpapers/r/CoolPics/r/AnythingYouCanTakeAPhotographOfPorn/r/wallpapers";

var nameList = rawlist.split("/r/");

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
    RedditImageFetcher.fetch({
      type: "custom",
      subreddit: nameList,
      total: items,
      allowNSFW: false,
    })
      .then((result) => {
          for (let i = 0; i < result.length; i++) {
            message.channel.send({ files: [result[i].image] });
          }
        })
  } catch (e){
    message.channel.send("Server Crashed");
  }
};
exports.name = "fetch";
