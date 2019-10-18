/*
 * Card hand comparison plugin 
 */

jsPsych.plugins["hand_comparison"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "hand-comparison",
    parameters: {
      hand_win: {
        type: jsPsych.plugins.parameterType.STRING,
        default: "" 
      },
      hand_lose: {
        type: jsPsych.plugins.parameterType.STRING,
        default: "" 
      },
      explanation: {
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

    var possible_bets = [0, 5, 10];
    var possible_bets_str = possible_bets.map(x => x.toString());

    var html = "";
    html += '<div id="card-game-canvas-div">';
    html += '<canvas id="card-game-canvas" class="card-game-canvas" style="border:1px solid #000000;" width=' + trial.canvas_width +' height=' + trial.canvas_height + '>';
    html += '</div>';
    html += '<div id="card-game-instruction-div">Click on the winning hand.<br /><br /></div>';
    display_element.innerHTML = html; 

    var canvas = document.querySelector('canvas');
    var draw = canvas.getContext("2d");

    /////// Game graphics ////////////////////////////////////////////////////
    // helpers for drawing vertically oriented trapezoids
    var card_scale = 150;
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
        var card_number = "" + (parseInt(card_string.charAt(0)) + 1); // don't want zeros on cards 
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


    var hand0_loc = 25;
    var hand1_loc = 300;
    var hand_width = 1.7 * card_scale;
    var hand_height = 1.25 * card_scale;

    var hands = [trial.hand_win, trial.hand_lose];
    var hand_indices = [0, 1];
    shuffle(hand_indices);

    function draw_cards() {
      draw.clearRect(0, 0, canvas.width, canvas.height);
      var card1_contents, card2_concents, hand2_card1_contents, hand2_card2_concents;
      card1_contents = hands[hand_indices[0]].substring(2,5);
      card2_contents = hands[hand_indices[0]].substring(6,9);
      hand2_card1_contents = hands[hand_indices[1]].substring(2,5);
      hand2_card2_contents = hands[hand_indices[1]].substring(6,9);

      draw_card(hand0_loc, 160, card_scale, card1_contents, -pi_6, 0);
      draw_card(hand0_loc + 1.2 * card_scale, 115, card_scale, card2_contents, pi_6, 0);

      draw_card(hand1_loc, 160, card_scale, hand2_card1_contents, -pi_6, 0);
      draw_card(hand1_loc + 1.2 *card_scale, 115, card_scale, hand2_card2_contents, pi_6, 0);
    }

    var hand_click_offset = 0.25 * card_scale;
    function hand_contains(x,y) { //Returns whether (x,y) on the canvas is 'within' one of the bets, else false 
      if (x >= hand0_loc && x <= hand0_loc + hand_width && y >= 150 - hand_click_offset && y <= 150 - hand_click_offset + hand_height) {
       return 0; 
      } else if (x >= hand1_loc && x <= hand1_loc + hand_width && y >= 150 - hand_click_offset && y <= 150 - hand_click_offset + hand_height) {
        return 1;
      }
      return false;
    }

    // Event handlers, game logic, interaction
    var clickable = false;

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
    function end_trial(hand_choice, rt) {
        // data saving
        var trial_data = {
          type: trial.type,
          hand_win: trial.hand_win,
          hand_lose: trial.hand_lose,
          explanation: trial.explanation,
          hand_indices: hand_indices,
          hand_choice: hand_choice,
          rt: rt
        };

        // end trial
        jsPsych.finishTrial(trial_data);

    }

    var result_display_time = 2000; // time results are shown in ms
    function display_result_text(correct) {
        var text0;
        
        if (correct){
          draw.fillStyle = "green";
          text0 = "Correct!"; 
        } else {
          draw.fillStyle = "red";
          text0 = "Incorrect."; 
        }
        draw.textAlign = "center";
        draw.font = "80px Arial";
        draw.fillText(text0, 300, 80);
        draw.font = "25px Arial";
        draw.fillText(trial.explanation, 300, 350);
    }

    canvas.addEventListener('mousedown', function(e) {
      if (!clickable) {
          return;
      }
      clickable = false;
      var mouse = getMouse(e, canvas);
      var hand_is = hand_contains(mouse.x, mouse.y);

      if (hand_is !== false) {
        var rt = (new Date()).getTime() - start_time;
        var correct = hand_is == hand_indices[0];
        display_result_text(correct);
        setTimeout(function() {
            end_trial(hand_is, correct, rt);
        }, result_display_time);
      } else {
        clickable = true;
      }
    });

    var start_time = (new Date()).getTime();
    draw_cards();
    clickable = true;

  };

  return plugin;
})();
