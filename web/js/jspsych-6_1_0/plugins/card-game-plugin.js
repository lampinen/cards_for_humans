/*
 * Card game plugin 
 */

jsPsych.plugins["card_game"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "card-game",
    parameters: {
//      parameter_name: {
//        type: jsPsych.plugins.parameterType.INT, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
//        default: undefined
//      },
      game_type: {
        type: jsPsych.plugins.parameterType.STRING,
        default: "straight_flush"
      },
      losers: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: false
      },
      my_hand: {
        type: jsPsych.plugins.parameterType.STRING,
        default: "" 
      },
      canvas_height: {
        type: jsPsych.plugins.parameterType.INT,
        default: 400 
      },
      canvas_width: {
        type: jsPsych.plugins.parameterType.INT,
        default: 600 
      }
    }
  }

  plugin.trial = function(display_element, trial) {


    var html = "";
    html += '<div id="card-game-canvas-div">';
    html += '<canvas id="card-game-canvas" class="card-game-canvas" style="border:1px solid #000000;" width=' + trial.canvas_width +' height=' + trial.canvas_height + '>';
    html += '</div>';
    html += '<div id="card-game-instruction-div">Make your bet.<br /><br /></div>';
    display_element.innerHTML = html; 

    var canvas = document.querySelector('canvas');
    var draw = canvas.getContext("2d");

    /////// Game graphics ////////////////////////////////////////////////////
    // helpers for drawing vertically oriented trapezoids
    function draw_trapezoid(x, y, width, left_height, right_height, offset) {
      offset = offset || Math.abs(left_height  - right_height) / 2;
      draw.beginPath();
      if (left_height >= right_height) {
        draw.moveTo(x, y);
        draw.lineTo(x, y + left_height);
        draw.lineTo(x + width, y + right_height + offset);
        draw.lineTo(x + width, y + offset);
        draw.closePath();
      } else {
        draw.moveTo(x + width, y);
        draw.lineTo(x + width, y + right_height);
        draw.lineTo(x, y + left_height + offset);
        draw.lineTo(x, y + offset);
        draw.closePath();
      }
    }

    // horizontal
    function draw_trapezoid_h(x, y, bottom_width, top_width, height) {
      draw.beginPath();
      draw.moveTo(x, y);
      draw.lineTo(x + bottom_width, y);
      draw.lineTo(x + (bottom_width + top_width) / 2, y - height);
      draw.lineTo(x + (bottom_width - top_width) / 2, y - height);
      draw.closePath();
    }

    var card_scale = 100;
    var pi = Math.PI;
    var two_pi = 2*pi;
    var pi_2 = pi/2;
    var pi_3 = pi/3;
    var pi_4 = pi/4;
    var pi_6 = pi/6;
    var shrink_constant = 0.3;
    function draw_card(x, y, scale, card_string, angle, azimuth_angle, back_color) {
      angle = (typeof angle === 'undefined') ? 0 : angle;
      azimuth_angle = (typeof azimuth_angle === 'undefined') ? 0 : azimuth_angle;
      back_color = (typeof back_color === 'undefined') ?  "#6660FF" : back_color;
      var c_width = 0.4*scale; // + 2 cc_r
      var c_height = 0.8*scale; // + 2 cc_r
      var cc_r = 0.1*scale; //card corner radius

      var flip_scale_x = Math.cos(azimuth_angle);
      var flip_shift = 0.5 * c_width * (1 - Math.abs(Math.cos(azimuth_angle)));
      var flip_text_shift = 0.2 * c_width * Math.sin(azimuth_angle);

      var front = flip_scale_x >= 0;
      if (!front) {
        flip_scale_x = -flip_scale_x;
      }
      var cc_rx = flip_scale_x * cc_r;
      var c_width_sc = flip_scale_x * c_width;
      // farther side of card needs to shrink for foreshortening
      var cc_ry = (1-(1-flip_scale_x) * shrink_constant) * cc_r;
      var c_height_sc = (1- (1-flip_scale_x) * shrink_constant) * c_height;
      var offset_y = (c_height + cc_r + cc_r - (c_height_sc + cc_ry + cc_ry))*0.5;



      draw.translate(x, y);
      draw.rotate(angle);
      draw.translate(flip_shift, 0);


      if (front) {
        draw.beginPath();
        draw.moveTo(0, cc_r);
        draw.ellipse( cc_rx, cc_r, cc_rx, cc_r, 0, -pi, -pi_2);
        draw.lineTo( cc_rx + c_width_sc, offset_y);
        draw.ellipse( cc_rx + c_width_sc, offset_y + cc_ry, cc_rx, cc_ry, 0, -pi_2, 0);
        draw.lineTo( cc_rx + cc_rx + c_width_sc, offset_y + cc_ry + c_height_sc);
        draw.ellipse( cc_rx + c_width_sc, offset_y + cc_ry + c_height_sc, cc_rx, cc_ry, 0, 0, pi_2);
        draw.lineTo( cc_rx , cc_r + cc_r + c_height);
        draw.ellipse( cc_rx , cc_r + c_height, cc_rx, cc_r, 0, pi_2, pi);
        draw.closePath();
        draw.fillStyle = "White";
        draw.strokeStyle = "Black";
        draw.fill();
        draw.stroke();

        //NOTE: symbols assume azimuth angle is zero (except for patterns)
        var c_full_width = c_width_sc + cc_rx + cc_rx;
        var c_full_height = c_height + cc_r + cc_r;
        var s_off_x = c_full_width * 0.5;
        var s_off_y = (c_full_height) * 0.5 + scale * 0.33;


        //card_string should be a "cardnumber_cardsuit" string
        var card_number = card_string.charAt(0); 
        var card_suit = card_string.charAt(2); 

        if (card_suit == 0){
          draw.fillStyle = "red";
        } else {
          draw.fillStyle = "black";
        }
        draw.textAlign = "center";
        draw.font = (0.9 * scale) + "px Arial";
        draw.translate(flip_text_shift, 0);
        draw.scale(flip_scale_x, 1);
        draw.fillText(card_number.toString(), s_off_x, s_off_y);
        draw.scale(1/flip_scale_x, 1);
        draw.translate(-flip_text_shift, 0);
      } else {
        draw.beginPath();
        draw.ellipse( cc_rx, offset_y + cc_ry, cc_rx, cc_ry, 0, -pi, -pi_2);
        draw.lineTo( cc_rx + c_width_sc, 0);
        draw.ellipse( cc_rx + c_width_sc, cc_r, cc_rx, cc_r, 0, -pi_2, 0);
        draw.lineTo( cc_rx + cc_rx + c_width_sc, cc_r + c_height);
        draw.ellipse( cc_rx + c_width_sc, cc_r + c_height, cc_rx, cc_r, 0, 0, pi_2);
        draw.lineTo( cc_rx , offset_y + cc_ry + cc_ry + c_height_sc);
        draw.ellipse( cc_rx , offset_y + cc_ry + c_height_sc, cc_rx, cc_ry, 0, pi_2, pi);
        draw.closePath();
        draw.fillStyle = back_color;
        draw.strokeStyle = "Black";
        draw.fill();
        draw.stroke();
      }

      draw.translate(-flip_shift, 0);
      draw.rotate(-angle);
      draw.translate(-x, -y);
    }


    var o_x = 300;
    var o_y = 105;
    var o_r = 80;
    var o_hand_r = 15;
    var o_eye_r = 8;
    var o_c1_x = 210;
    var o_c1_y = 180;
    var o_c2_x = 335;
    var o_c2_y = 150;
    var o_lh_x = 320; // x coords of hands
    var o_rh_x = 280;
    function draw_opponent_hand(x, y) {
      draw.fillStyle = "#EEEE00";
      draw.strokeStyle = "Black";
      draw.lineWidth = 2;
      draw.beginPath();
      draw.arc(x, y, o_hand_r, 0, two_pi);
      draw.closePath()
      draw.fill();
      draw.stroke();
    }

    function draw_opponent() {
      draw.fillStyle = "#EEEE00";
      draw.strokeStyle = "Black";
      draw.lineWidth = 3;
      draw.beginPath();
      draw.arc(o_x, o_y, o_r, 0, two_pi);
      draw.closePath()
      draw.fill();
      draw.stroke();

      //smile
      draw.beginPath();
      draw.arc(o_x, o_y-0.4*o_r, o_r, pi_4, pi_4+pi_2);
      draw.stroke();


      //eyes
      draw.fillStyle = "Black";
      draw.beginPath();
      draw.arc(o_x + 0.4 *o_r, o_y-0.4*o_r, o_eye_r, 0, two_pi);
      draw.fill();
      draw.stroke();
      draw.beginPath();
      draw.arc(o_x - 0.4 *o_r, o_y-0.4*o_r, o_eye_r, 0, two_pi);
      draw.fill();
      draw.stroke();

      //reset
      draw.lineWidth = 1;
    }

    function draw_card_table() {
      draw.fillStyle = "SaddleBrown";
      draw.strokeStyle = "Black";
          draw.rect(30, 350, 25, 50);
      draw.fill();
      draw.stroke();
          draw.rect(55, 350, 10, 50);
      draw.fill();
      draw.stroke();

      draw.beginPath();
          draw.rect(545, 350, 25, 50);
      draw.closePath();
      draw.fill();
      draw.stroke();
      draw.beginPath();
          draw.rect(535, 350, 10, 50);
      draw.closePath();
      draw.fill();
      draw.stroke();

      draw.fillStyle = "#6B3503";

      draw.beginPath();
          draw.rect(150, 270, 20, 150);
      draw.closePath();
      draw.fill();
      draw.stroke();
      draw.beginPath();
          draw.rect(170, 270, 8, 150);
      draw.closePath();
      draw.fill();
      draw.stroke();

      draw.beginPath();
          draw.rect(430, 270, 20, 150);
      draw.closePath();
      draw.fill();
      draw.stroke();
      draw.beginPath();
          draw.rect(422, 270, 8, 150);
      draw.closePath();
      draw.fill();
      draw.stroke();

      draw.fillStyle = "SaddleBrown";
      draw_trapezoid_h(20, 350, 560, 300, 80);
      draw.fill();
      draw.stroke();
      draw.beginPath();
      draw.rect(20, 350, 560, 10);
      draw.closePath();
      draw.fill();
      draw.stroke();
    }

    var chip_radius = 25;
    var chip_height = 7;
    function draw_chip(radius, x, y) {
      draw.fillStyle = "LimeGreen";
      draw.strokeStyle = "Black";
      draw.beginPath();
      draw.ellipse(x, y + chip_height, radius, radius * 0.35, 0, 0, pi); 
      draw.lineTo(x - radius, y);
      draw.ellipse(x, y, radius, radius * 0.35, 0, pi, 0, true); 
      draw.closePath();
      draw.fill();
      draw.stroke();

      draw.beginPath();
      draw.ellipse(x, y, radius, radius * 0.35, 0, 0, two_pi); 
      draw.closePath();
      draw.fill();
      draw.stroke();
    }


    // putting it all together

    function draw_current_cards(my_hand, opponent_hand, transition_t) {
      draw.clearRect(0, 0, canvas.width, canvas.height);
      var card1_contents, card2_concents, opp_card1_contents, opp_card2_concents;
      card1_contents = my_hand.substring(2,5);
      card2_contents = my_hand.substring(6,9);

      draw_card_table();

      // opponent +  card(s)
      draw_opponent();
      if (typeof transition_t === 'undefined') {
        draw_card(o_c1_x, o_c1_y, card_scale, "", -pi_6, pi);
        draw_card(o_c2_x, o_c2_y, card_scale, "", pi_6, pi);
      } else {
        opp_card1_contents = opponent_hand.substring(2,5);
        opp_card2_contents = opponent_hand.substring(6,9);
        draw_card(o_c1_x, o_c1_y, card_scale, opp_card1_contents, -pi_6, (1 - transition_t) * pi);
        draw_card(o_c2_x, o_c2_y, card_scale, opp_card2_contents, pi_6, (1 - transition_t) * pi);
      }
      draw_opponent_hand(o_lh_x, 250);
      draw_opponent_hand(o_rh_x, 250);

      //own cards
      draw_card(300, 280, 1.4*card_scale, card1_contents, -pi_6, 0);
      draw_card(470, 240, 1.4*card_scale, card2_contents, pi_6, 0);

      //bets/chips


      draw_chip(chip_radius, 200, 328);

      draw_chip(chip_radius, 270, 328);
      draw_chip(chip_radius, 270, 321);

      draw.fillStyle = "LimeGreen";
      draw.strokeStyle = "Black";
      draw.textAlign = "center";
      draw.font = "40px Arial";
      draw.strokeText("$2", 270, 308);
      draw.fillText("$2", 270, 308);

      draw.strokeText("$1", 200, 315);
      draw.fillText("$1", 200, 315);

      draw.strokeText("$0", 135, 325);
      draw.fillText("$0", 135, 325);
    }

    // animation + interaction

    var animation_time = 500; //length of animation in ms
    var post_animation_delay = 0; // how long to wait on last frame
    var num_frames = 40;
    var frame_time = animation_time/num_frames;
    function animate_card_transition(my_hand, opponent_hand, callback, remaining_frames) {
        if (remaining_frames === 0) {
          setTimeout(callback, post_animation_delay);
          return;
        }
        remaining_frames = remaining_frames || num_frames;
        draw_current_cards(my_hand, opponent_hand, (num_frames - remaining_frames)/num_frames);
        setTimeout(function() {
          animate_card_transition(my_hand, opponent_hand, callback, remaining_frames-1);
        }, frame_time);
    }

    var bet_locs = [100, 170, 240];
    var bet_width = 60;
    var bet_offset = 275;
    var bet_height = 80;

    function bet_contains(x,y) { //Returns whether (x,y) on the canvas is 'within' one of the bets, else false 
      for (var bet_i = 0; bet_i < 3; bet_i ++) {
        curr_bet_loc = bet_locs[bet_i]
        if (x >= curr_bet_loc && x <= curr_bet_loc + bet_width && y >= bet_offset && y <= bet_offset + bet_height) {
         return bet_i; 
        }
      }
      return false;
    }

    // Event handlers, game logic, interaction
    var clickable = true;

    var getMouse = function(e,canvas) { //Gets mouse location relative to canvas, code stolen from https://github.com/simonsarris/Canvas-tutorials/blob/master/shapes.js
            var element = canvas;
            var offsetX = 0;
            var offsetY = 0;
            var html = document.body.parentNode;
            var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
            if (element.offsetParent !== undefined) {
                    do {
                            offsetX += element.offsetLeft;
                            offsetY += element.offsetTop;
                    } while ((element = element.offsetParent));
            }

            if (document.defaultView && document.defaultView.getComputedStyle) {
                    stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
                    stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
                    styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
                    styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
            }
            htmlTop = html.offsetTop;
            htmlLeft = html.offsetLeft;
            offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
            offsetY += stylePaddingTop + styleBorderTop + htmlTop;

            mx = e.pageX - offsetX;
            my = e.pageY - offsetY;
            return {x: mx, y: my};
    };


    // end of trial logic
    function end_trial(my_hand, opponent_hand, win, bet, bet_rt) {
        // data saving
        var trial_data = {
          game_type: trial.game_type,
          losers: trial.losers,
          my_hand: my_hand,
          opponent_hand: opponent_hand,
          win: win,
          bet: bet,
          bet_rt: bet_rt
        };
        console.log(trial_data)

        // end trial
        jsPsych.finishTrial(trial_data);

    }

    var result_display_time = 1000; // time results are shown in ms
    function display_result_text(win, bet) {
        var text0, text1, text2;
        
        text0 = "You";
        if (win){
          draw.fillStyle = "green";
          text1 = "won!"; 
          text2 = "+$" + bet; 
        } else {
          draw.fillStyle = "red";
          text1 = "lost"; 
          text2 = "-$" + bet; 
        }
        if (bet === 0) {
            draw.fillStyle = "black";
          text2 = "$0"; 
        }
        draw.textAlign = "center";
        draw.font = "80px Arial";
        draw.fillText(text0, 100, 100);
        draw.fillText(text1, 100, 180);
        draw.fillText(text2, 500, 140);
    }

    canvas.addEventListener('mousedown', function(e) {
      var mouse = getMouse(e, canvas);
      var bet_is = bet_contains(mouse.x, mouse.y);

      if (bet_is !== false) {
        var curr_time = (new Date()).getTime();
        var bet_rt = curr_time - start_time;
        bet = bet_is; 
        var result, opponent_hand, win;
        result = play_hand(trial.game_type, trial.losers, trial.my_hand);
        opponent_hand = result[1];
        win = result[0];
        animate_card_transition(trial.my_hand, opponent_hand, function() {
            display_result_text(win, bet);
            setTimeout(function() {
                end_trial(trial.my_hand, opponent_hand, win, bet, bet_rt);
            }, result_display_time);
        });
      }
    });

    var start_time = (new Date()).getTime();
    draw_current_cards(trial.my_hand);

  };

  return plugin;
})();
