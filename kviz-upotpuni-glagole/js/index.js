  // VARIABLE DECLARATIONS ------

  // pages
  var initPage,
      questionsPage,
      resultsPage,
      // buttons
      startBtn,
      submitBtn,
      continueBtn,
      retakeBtn,
      spanishBtn,
      // question and answers
      question,
      answerList,
      answerSpan,
      answerA,
      answerB,
      answerC,
      answerD,
      // event listeners
      answerDiv,
      answerDivA,
      answerDivB,
      answerDivC,
      answerDivD,
      feedbackDiv,
      selectionDiv,
      toBeHighlighted,
      toBeMarked,
      userScore,
      // quiz
      quiz,
      questionCounter,
      correctAnswer,
      correctAnswersCounter,
      userSelectedAnswer,
      // function names
      newQuiz,
      generateQuestionAndAnswers,
      getCorrectAnswer,
      getUserAnswer,
      selectAnswer,
      deselectAnswer,
      selectCorrectAnswer,
      deselectCorrectAnswer,
      getSelectedAnswerDivs,
      highlightCorrectAnswerGreen,
      highlightIncorrectAnswerRed,
      slikica,
      clearHighlightsAndFeedback,
      prekidac, countdownTimer, bodovi = 0,
      vrijeme = 0;

  function ProgressCountdown(timeleft, bar, text) {
      
      return new Promise((resolve, reject) => {
          countdownTimer = setInterval(() => {
              timeleft--;
              document.getElementById(bar).value = timeleft;
              document.getElementById(text).textContent = timeleft;
              if (timeleft <= 0) {
                  clearInterval(countdownTimer);
                  resolve(true);
              } else if (timeleft <= 1) {
                  $("#sekunde").html("sekunda")
                  $("#ostalo").html("ostala")
              } else if (timeleft <= 4) {
                  $("#sekunde").html("sekunde")
              }

          }, 1000);
      });

  }

  $(document).ready(function() {

      // DOM SELECTION ------

      // App pages
      // Page 1 - Initial
      initPage = $('.init-page');
      // Page 2 - Questions/answers
      questionsPage = $('.questions-page');
      // Page 3 - Results
      resultsPage = $('.results-page');

      // Buttons
      startBtn = $('.init-page__btn, .results-page__retake-btn');
      submitBtn = $('.mrzim');
      continueBtn = $('.questions-page__continue-btn');
      retakeBtn = $('.results-page__retake-btn');
      spanishBtn = $('.results-page__spanish-btn');

      // Answer block divs
      answerDiv = $('.questions-page__answer-div');
      answerDivA = $('.questions-page__answer-div-a');
      answerDivB = $('.questions-page__answer-div-b');
      answerDivC = $('.questions-page__answer-div-c');
      answerDivD = $('.questions-page__answer-div-d');

      // Selection div (for the pointer, on the left)
      selectionDiv = $('.questions-page__selection-div');

      // Feedback div (for the checkmark or X, on the right)
      feedbackDiv = $('.questions-page__feedback-div');

      // Questions and answers
      question = $('.questions-page__question');
      answerList = $('.questions-page__answer-list');
      answerSpan = $('.questions-page__answer-span');
      answerA = $('.questions-page__answer-A');
      answerB = $('.questions-page__answer-B');
      answerC = $('.questions-page__answer-C');
      answerD = $('.questions-page__answer-D');


      // User final score
      userScore = $('.results-page__score');
      prikazBodova = $('.results-page__bodovi');


      // FUNCTION DECLARATIONS ------
      $.fn.declasse = function(re) {
          return this.each(function() {
              var c = this.classList
              for (var i = c.length - 1; i >= 0; i--) {
                  var classe = "" + c[i]
                  if (classe.match(re)) c.remove(classe)
              }
          })
      }


     
      // Start the quiz
      newQuiz = function() {
          prekidac = 1;
          bodovi = 0;
          // Set the question counter to 0
          questionCounter = 0;
          // Set the total correct answers counter to 0
          correctAnswersCounter = 0;
          // Hide other pages of the app
          questionsPage.hide();
          resultsPage.hide();
      };

      // Load the next question and set of answers
      generateQuestionAndAnswers = function() {
          $(".questions-page__answer-list").show()
          //shuffle(quiz[questionCounter].answers);
          answerA.html(quiz[questionCounter].answers[0]);
          if (answerA.html() == "" || null) {
              answerDivA.hide()
          } else {
              answerDivA.show()
          };
          answerB.html(quiz[questionCounter].answers[1]);
          if (answerB.html() == "" || null) {
              answerDivB.hide()
          } else {
              answerDivB.show()
          };
          answerC.html(quiz[questionCounter].answers[2]);
          if (answerC.html() == "" || null) {
              answerDivC.hide()
          } else {
              answerDivC.show()
          };
          answerD.html(quiz[questionCounter].answers[3]);
          if (answerD.html() == "" || null) {
              answerDivD.hide()
          } else {
              answerDivD.show()
          };
          $(".vrijeme").html('<progress value="10" max="10" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">10 </span> <span id="sekunde">sekunda</span> za odgovor</p>')
          $("body").css({
              "background-color": quiz[questionCounter].boja_pozadine
          })

          if (prekidac == 1 && vrijeme==1) {
              ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
          }
          question.html(quiz[questionCounter].question)
          $(".questions-page__question").prepend("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + quiz.length + ".</span> <br>")

      };

      // Store the correct answer of a given question
      getCorrectAnswer = function() {
          correctAnswer = quiz[questionCounter].correctAnswer;
      };

      // Store the user's selected (clicked) answer
      getUserAnswer = function(target) {
          userSelectedAnswer = $(target).find(answerSpan).html();
      };

      // Add the pointer to the clicked answer
      selectAnswer = function(target) {
          $(target).find(selectionDiv).addClass('ion-chevron-right');
          $(target).addClass("odabir")

      };

      // Remove the pointer from any answer that has it
      deselectAnswer = function() {
          if (selectionDiv.hasClass('ion-chevron-right')) {
              selectionDiv.removeClass('ion-chevron-right');
              selectionDiv.parent().removeClass("odabir")
          }
      };

      // Get the selected answer's div for highlighting purposes
      getSelectedAnswerDivs = function(target) {
          toBeHighlighted = $(target);
          toBeMarked = $(target).find(feedbackDiv);
      };

      // Make the correct answer green and add checkmark
      highlightCorrectAnswerGreen = function(target) {
          if (correctAnswer === answerA.text()) {
              answerDivA.addClass('questions-page--correct');
              answerDivA.find(feedbackDiv).addClass('ion-checkmark-round');
          }
          if (correctAnswer === answerB.text()) {
              answerDivB.addClass('questions-page--correct');
              answerDivB.find(feedbackDiv).addClass('ion-checkmark-round');
          }
          if (correctAnswer === answerC.text()) {
              answerDivC.addClass('questions-page--correct');
              answerDivC.find(feedbackDiv).addClass('ion-checkmark-round');
          }
          if (correctAnswer === answerD.text()) {
              answerDivD.addClass('questions-page--correct');
              answerDivD.find(feedbackDiv).addClass('ion-checkmark-round');
          }
      };

      // Make the incorrect answer red and add X
      highlightIncorrectAnswerRed = function() {
          toBeHighlighted.addClass('questions-page--incorrect');
          toBeMarked.addClass('ion-close-round');
      };

      // Clear all highlighting and feedback
      clearHighlightsAndFeedback = function() {
          answerDiv.removeClass('questions-page--correct');
          answerDiv.removeClass('questions-page--incorrect');
          feedbackDiv.removeClass('ion-checkmark-round');
          feedbackDiv.removeClass('ion-close-round');
      };

      // APP FUNCTIONALITY ------

      /* --- PAGE 1/3 --- */

      // Start the quiz:

      resultsPage.hide();

      submitBtn.hide();
      continueBtn.hide();


      if (localStorage.getItem("reset") == "da") {
        
        newQuiz();

        // Advance to questions page
        initPage.hide();
        questionsPage.show(300);

        // Load question and answers
        generateQuestionAndAnswers();

        // Store the correct answer in a variable
        getCorrectAnswer();

        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();
        localStorage.setItem('reset', "ne")
      }

      $(".vreme").on('click', function() {
        $(".vreme").hide()
        $(".init-page__btn").show().click()
        if (vrijeme==0){
            $(".vrijeme").hide()
        }

      })
      // Clicking on start button:
      startBtn.on('click', function() {

          newQuiz();

          // Advance to questions page
          initPage.hide();
          questionsPage.show(300);

          // Load question and answers
          generateQuestionAndAnswers();

          // Store the correct answer in a variable
          getCorrectAnswer();

          // Hide the submit and continue buttons
          submitBtn.hide();
          continueBtn.hide();

      });

      /* --- PAGE 2/3 --- */

      // Clicking on an answer:
      answerDiv.on('click', function() {

          // Make the submit button visible

          // Remove pointer from any answer that already has it
          deselectAnswer();

          // Put pointer on clicked answer
          selectAnswer(this);

          // Store current selection as user answer
          getUserAnswer(this);

          // Store current answer div for highlighting purposes
          getSelectedAnswerDivs(this);
          odgovor();

      });


      function odgovor() {

        
            $(".questions-page__answer-span").html("")
          vrijeme = parseInt($("#pageBeginCountdownText").text())
          bodovi += vrijeme

          prekidac = 0;
          var ide = 0
              // Disable ability to select an answer
          answerDiv.off('click');
          if (questionCounter != quiz.length - 1) {
              ide = 1
          } else {
              ide = 0
          }

          // Make correct answer green and add a checkmark
          highlightCorrectAnswerGreen();
          clearInterval(countdownTimer);


          if (document.getElementById("pageBeginCountdown").value == "0") {
              $("#krivo")[0].play();

              bodovi -= 10;

              swal({
                  title: "Isteklo je vrijeme.",
                  html: "<p style='text-align:center'><strong>Točan odgovor je: <br><br>" + quiz[questionCounter].question + "</strong></p><br>",
                  showCloseButton: true,
                  confirmButtonText: ' dalje',
                  backdrop: false,
                  allowOutsideClick: false,
                  allowEscapeKey: false
              });

              $(".nadopuni").html(quiz[questionCounter].correctAnswer)
              $(".nadopuni span").css({
                  "color": "#bb422a",
                  "text-decoration": "underline"
              })
              $(".swal2-confirm").click(function() {
                  clearInterval(countdownTimer)
                  if (ide == 1) {
                    ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                  }
              })
              $(".swal2-close").click(function() {
                  clearInterval(countdownTimer)
                  if (ide == 1) {
                      ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                  }
              })

          } else {
              // Evaluate if the user got the answer right or wrong
              if (userSelectedAnswer === correctAnswer) {

                  // Increment the total correct answers counter
                  correctAnswersCounter++;
                  bodovi += 10;
                  $("#tocno")[0].play();
                  broj = vrijeme + 10
                  swal({
                      title: "<span style='color:green'>Točno</span>",
                      html: "+ <span class='zeleno'>" + broj + "</span><br>" +  quiz[questionCounter].question,
                      showCloseButton: true,
                      confirmButtonText: ' dalje',
                      backdrop: false,
                      allowOutsideClick: false,
                      allowEscapeKey: false

                  });
                  $(".nadopuni").html(quiz[questionCounter].correctAnswer)
                  $(".nadopuni span").css({
                    "color": "green",
                    "text-decoration": "underline"
                })

                  $(".swal2-confirm").click(function() {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }


                  })
                  $(".swal2-close").click(function() {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }
                  })


              } else {
                  highlightIncorrectAnswerRed();
                  bodovi -= 10;
                  $("#krivo")[0].play();

                  swal({
                      title: " <span style='color:#bb422a'>Netočno</span>",
                      html: "<p style='text-align:center'><strong>Točan odgovor je: <br>" + quiz[questionCounter].question + "</strong></p>" ,
                      showCloseButton: true,
                      confirmButtonText: ' dalje',
                      backdrop: false,
                      allowOutsideClick: false,
                      allowEscapeKey: false
                  });

                  $(".swal2-confirm").click(function() {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }
                  })
                  $(".swal2-close").click(function() {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }
                  })
                  $(".nadopuni").html(quiz[questionCounter].correctAnswer)
                  $(".nadopuni span").css({
                      "color": "#bb422a",
                      "text-decoration": "underline"
                  })

              }
          }

          // Substitute the submit button for the continue button:
          submitBtn.hide(300);
          nastavi()
      }
      // Clicking on the submit button:





      function nastavi() {
          // Increment question number until there are no more questions, then advance to the next page
          if (questionCounter < quiz.length - 1) {
              questionCounter++;
          } else {
document.getElementsByClassName('questions-page')[0].style.display = "none"
$(".results-page").show()
document.getElementsByClassName('sakri')[0].style.display = "flex"
                  // Display user score as a percentage
              userScore.text(Math.floor((correctAnswersCounter / quiz.length) * 100) + " %");
              prikazBodova.text(bodovi);

            $("#60656686").attr("value", bodovi)

          }

          // Load the next question and set of answers
          generateQuestionAndAnswers();

          // Store the correct answer in a variable
          getCorrectAnswer();

          // Remove all selections, highlighting, and feedback
          deselectAnswer();
          clearHighlightsAndFeedback();


          // Hide the continue button
          continueBtn.hide(300);

          // Enable ability to select an answer
          answerDiv.on('click', function() {
              // Make the submit button visible
              // Remove pointer from any answer that already has it
              deselectAnswer();
              // Put pointer on clicked answer
              selectAnswer(this);
              // Store current answer div for highlighting purposes
              getSelectedAnswerDivs(this);
              // Store current selection as user answer
              getUserAnswer(this);
              odgovor()
          });

      }

      // Clicking on the continue button:
      continueBtn.on('click', function() {



      });

      $(".questions-page__answer-div").dblclick(function() {
              odgovor()
          })
          /* --- PAGE 3/3 --- */

      // Clicking on the retake button:
      retakeBtn.on('click', function() {
          // Go to the first page
          // Start the quiz over
          newQuiz();
          resultsPage.hide();
          questionsPage.show(300);
          // Load question and answers
          generateQuestionAndAnswers();
          // Store the correct answer in a variable
          getCorrectAnswer();
          // Hide the submit and continue buttons
          submitBtn.hide();
          continueBtn.hide();
      });

      // Clicking on the spanish button:
      // Link takes user to Duolingo

  });



  // QUIZ CONTENT ------

  function stvori(tekst, tekst2, tekst3) {
      do {
          predmet = cvijece[Math.floor(Math.random() * cvijece.length)];
      }
      while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
      return predmet
  }

  function stvori2(tekst, tekst2, tekst3) {
      do {
          predmet = cvijece2[Math.floor(Math.random() * cvijece2.length)];
      }
      while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
      return predmet
  }



  p1 = [{
      question: "Od sastojaka za tijesto <span class='nadopuni'>_______</span> palačinke i pustite da se malo ohlade.",
      answers: ["<span>is</span>pecite", "<span>iz</span>pecite",""],
      correctAnswer: "<span>is</span>pecite",
      boja_pozadine: "#FCE4EC"
  }, {
      question: "Naša momčad jako dugo nije <span class='nadopuni'>_______</span>.",
      answers: ["<span>is</span>gubila", "<span>iz</span>gubila",""],
      correctAnswer: "<span>iz</span>gubila",
      boja_pozadine: "#FCE4EC"
  }, {
    question: "Policija je ipak ponovno jutros <span class='nadopuni'>_______</span> na teren.",
    answers: ["<span>is</span>išla", "<span>iz</span>išla",""],
    correctAnswer: "<span>iz</span>išla",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Tako smo ove godine dobili priliku <span class='nadopuni'>_______</span> svoju priču cijeloj Hrvatskoj.",
    answers: ["<span>is</span>pričati", "<span>iz</span>pričati",""],
    correctAnswer: "<span>is</span>pričati",
    boja_pozadine: "#FCE4EC"
}, {
    question: "<span class='nadopuni prvoslovo'>_______</span> je vrata stana.",
    answers: ["<span>od</span>ključala", "<span>ot</span>ključala",""],
    correctAnswer: "<span>ot</span>ključala",
    boja_pozadine: "#FCE4EC"
}, {
    question: "<span class='nadopuni prvoslovo'>_______</span> je već podne.",
    answers: ["<span>od</span>zvonilo", "<span>ot</span>zvonilo",""],
    correctAnswer: "<span>od</span>zvonilo",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Kad <span class='nadopuni'>_______</span> kupoprodajni ugovor, dobit ćete ključ od stana u ruke.",
    answers: ["<span>pod</span>pišete", "<span>pot</span>pišete",""],
    correctAnswer: "<span>pot</span>pišete",
    boja_pozadine: "#FCE4EC"
}, {
    question: "U zadatku treba <span class='nadopuni'>_______</span> točan odgovor.",
    answers: ["<span>pod</span>crtati", "<span>pot</span>crtati",""],
    correctAnswer: "<span>pod</span>crtati",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Svakodnevno se mogu <span class='nadopuni'>_______</span> i kupiti originalni radovi likovnih umjetnika.",
    answers: ["<span>raz</span>gledati", "<span>ras</span>gledati",""],
    correctAnswer: "<span>raz</span>gledati",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Danas hrvatski farmeri <span class='nadopuni'>_______</span> informacijama o cijenama pšenice i kukuruza.",
    answers: ["<span>raz</span>polažu", "<span>ras</span>polažu",""],
    correctAnswer: "<span>ras</span>polažu",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Htio bih ti <span class='nadopuni'>_______</span> svojega prijatelja.",
    answers: ["<span>pred</span>staviti", "<span>pret</span>staviti",""],
    correctAnswer: "<span>pred</span>staviti",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Tko <span class='nadopuni'>_______</span> ovome sastanku.",
    answers: ["<span>pred</span>sjedava", "<span>pret</span>sjedava",""],
    correctAnswer: "<span>pred</span>sjedava",
    boja_pozadine: "#FCE4EC"
}];
  

quiz=p1
 function shuffle(array) { //izmješaj pitanja
          var i = 0,
              j = 0,
              temp = null

          for (i = array.length - 1; i > 0; i -= 1) {
              j = Math.floor(Math.random() * (i + 1))
              temp = array[i]
              array[i] = array[j]
              array[j] = temp
          }
      }
  shuffle(quiz)

  function touchHandler(event) {
      var touches = event.changedTouches,
          first = touches[0],
          type = "";
      switch (event.type) {
          case "touchstart":
              type = "mousedown";
              break;
          case "touchmove":
              type = "mousemove";
              break;
          case "touchend":
              type = "mouseup";
              break;
          default:
              return;
      }


      // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
      //                screenX, screenY, clientX, clientY, ctrlKey, 
      //                altKey, shiftKey, metaKey, button, relatedTarget);

      var simulatedEvent = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent(type, true, true, window, 1,
          first.screenX, first.screenY,
          first.clientX, first.clientY, false,
          false, false, false, 0 /*left*/ , null);

      first.target.dispatchEvent(simulatedEvent);
      event.preventDefault();
  }