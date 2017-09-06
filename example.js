//var cheeseshop_heatmap = require("./cheeseshop_heatmap.js");


var heatmap = new de_heatmp("de_cache", "canvas");

// Setup websocket connection
var connection = new WebSocket('ws://192.168.0.4:8080/games/csgo/gsi/sources/974f9128-b32c-4c76-b89c-f4fc6d8e2103/play');

connection.onopen = function(){
  /*Send a small message to the console once the connection is established */
  console.log('Connection open!');
}

// respond to websocket messages
connection.onmessage = function(msg){
  //console.log("message recieved, captian");
  payload = JSON.parse(msg.data);
  if ("allplayers" in payload){
    // get positional data points, draw

    Object.keys(payload.allplayers).forEach ( function(player_id, index) {
      console.log("player id: " + player_id);
      // get position of player  - translate into heatmap coordinates - display
      position = payload.allplayers[player_id].position.split(",").map(parseFloat);
      console.log(payload.allplayers[player_id].name + " " + payload.allplayers[player_id].team );
      console.log(position);
      updated_position = (heatmap.translate_coordinates(position[0], position[1]));
      console.log(updated_position);
      heatmap.heat.add([updated_position["x"], updated_position["y"], 2]);
    });
  }
}

// Draw heatmap
heatmap.draw();

