// All game logic runs after the DOM has finished loading
$(function () {
    /*
      pet_info object (required by spec):
      - name: string
      - weight, happiness, energy: numbers
    */
    var pet_info = {
      name: "Pichu",
      weight: 5,
      happiness: 5,
      energy: 6
    };
  
    // Small array of possible responses for each action
    var messages = {
      treat: [
        "Yum! That snack was electrifying ⚡",
        "Thanks for the treat, best human ever!",
        "Sugar rush incoming…"
      ],
      play: [
        "Wheee! I love play time!",
        "Catch me if you can! 🐭",
        "Games with you are my favorite."
      ],
      exercise: [
        "Phew… my tiny legs are tired.",
        "Do we really have to jog again? 😵",
        "Okay okay, fitness arc unlocked."
      ],
      nap: [
        "Zzz… power-nap mode engaged 😴",
        "That was the coziest nap.",
        "Rested and recharged!"
      ]
    };
  
    // ---------- Utility functions ----------
  
    function randomFrom(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  
    // Clamp weight, happiness, and energy so they never go below 0 (project requirement)
    function clampStats() {
      ["weight", "happiness", "energy"].forEach(function (key) {
        if (pet_info[key] < 0) pet_info[key] = 0;
        if (pet_info[key] > 10) pet_info[key] = 10;
      });
    }
  
    function moodText() {
      if (pet_info.happiness >= 8 && pet_info.energy >= 6) {
        return "Overjoyed and buzzing with energy!";
      }
      if (pet_info.happiness >= 5) {
        return "Pretty happy overall.";
      }
      if (pet_info.energy <= 2) {
        return "Very sleepy… please let me nap.";
      }
      if (pet_info.happiness <= 2) {
        return "A little grumpy. Needs love.";
      }
      return "Doing okay, but could use some attention.";
    }
  
    // Update all on-screen stats and visual pet state
    function updatePetInfoInHtml() {
      $(".name").text(pet_info.name);
      $(".weight").text(pet_info.weight);
      $(".happiness").text(pet_info.happiness);
      $(".energy").text(pet_info.energy);
      $(".mood").text(moodText());
  
      updatePetLook();
    }
  
    function updatePetLook() {
      var $img = $(".pet-image");
  
      // Remove both state classes first
      $img.removeClass("pet-glow pet-tired");
  
      /*
        jQuery .toggleClass(className, state)
        ------------------------------------
        This method was chosen from the jQuery API as one of the required
        "unique methods". It adds or removes a CSS class based on the
        boolean `state` argument: true → class is added, false → removed.
        Here we use it to switch visual states for our pet image.
      */
      if (pet_info.happiness >= 7) {
        $img.toggleClass("pet-glow", true); // pet glows and bounces when very happy
      } else if (pet_info.energy <= 3) {
        $img.toggleClass("pet-tired", true); // looks faded when low on energy
      }
    }
  
    // Visual notification using jQuery effects instead of alert()/console.log()
    function showPetMessage(text) {
      var $msg = $("#pet-message");
      $msg.text(text);
  
      /*
        jQuery .fadeIn(), .delay(), .fadeOut()
        -------------------------------------
        - .fadeIn(200) gradually shows the message by animating its opacity.
        - .delay(1200) is our second "unique method" from the jQuery docs.
          It pauses the animation queue for 1200ms so the text stays visible.
        - .fadeOut(400) hides the message again.
  
        We also call .stop(true, true) to clear any previous unfinished
        animations so rapid button presses don't stack up a huge queue.
      */
      $msg
        .stop(true, true)
        .fadeIn(200)
        .delay(1200)
        .fadeOut(400);
    }
  
    // Helper to apply changes after each action
    function finishAction(type) {
      clampStats();
      updatePetInfoInHtml();
      showPetMessage(randomFrom(messages[type]));
    }
  
    // ---------- Button click handlers ----------
  
    // Treat: + happiness, + weight, + a little energy
    $(".treat-button").on("click", function () {
      pet_info.happiness += 2;
      pet_info.weight += 1;
      pet_info.energy += 1;
      finishAction("treat");
    });
  
    // Play: + happiness, - weight, - some energy
    $(".play-button").on("click", function () {
      pet_info.happiness += 2;
      pet_info.weight -= 1;
      pet_info.energy -= 2;
      finishAction("play");
    });
  
    // Exercise: - happiness, - weight, + energy (eventually feels good)
    $(".exercise-button").on("click", function () {
      pet_info.happiness -= 1;
      pet_info.weight -= 2;
      pet_info.energy += 1;
      finishAction("exercise");
    });
  
    // NEW action: Nap
    // Nap restores energy and a bit of happiness, but may slightly reduce weight.
    $(".nap-button").on("click", function () {
      pet_info.energy += 3;
      pet_info.happiness += 1;
      pet_info.weight -= 1;
      finishAction("nap");
    });
  
    // Initial render when the page loads
    updatePetInfoInHtml();
  });
  