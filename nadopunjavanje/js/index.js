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
    toBeMarked, iskljuci_v = 0,
    userScore,
    // quiz
    prezent,
    questionCounter,
    correctAnswer,
    correctAnswersCounter,
    userSelectedAnswer,
    // function names
    newQuiz,
    generateQuestionAndAnswers,
    getCorrectAnswer,
    getUserAnswer, tajming,
    selectAnswer,
    deselectAnswer,
    selectCorrectAnswer,
    deselectCorrectAnswer,
    getSelectedAnswerDivs,
    highlightCorrectAnswerGreen,
    highlightIncorrectAnswerRed,
    slikica, brb,
    clearHighlightsAndFeedback, r1,
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
            }

        }, 1000);
    });

}

$(document).ready(function () {
    $('body').on('keydown', function (event) {
        var x = event.which;
        if (x === 13) {
            event.preventDefault();
        }
    });
    // DOM SELECTION ------

    // App pages
    // Page 1 - Initial
    initPage = $('.init-page');
    // Page 2 - Questions/answers
    questionsPage = $('.questions-page');
    // Page 3 - Results
    resultsPage = $('.results-page');
    slikica = $('.slikica');

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
    // QUIZ CONTENT ------

    function stvori(tekst, tekst2, tekst3) {
        do {
            predmet = cvijece[Math.floor(Math.random() * cvijece.length)];
        }
        while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
        return predmet
    }

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

    /* shuffle(prezent)*/

    // FUNCTION DECLARATIONS ------
    $.fn.declasse = function (re) {
        return this.each(function () {
            var c = this.classList
            for (var i = c.length - 1; i >= 0; i--) {
                var classe = "" + c[i]
                if (classe.match(re)) c.remove(classe)
            }
        })
    }
    // Start the quiz
    newQuiz = function () {
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
    generateQuestionAndAnswers = function () {
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + prezent.length + ".</span> <br>");
        if (prezent[questionCounter].question == "popuni") {
            $("#odgovor").val('')
            $(".popuni").show();
            var el = document.getElementById('odgovor');

            el.focus();

            el.onblur = function () {
                setTimeout(function () {
                    el.focus();
                });
            };
            $(".questions-page__answer-list").hide()
            $("#opis").html("<em>" + prezent[questionCounter].hint + "</em>")
            $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span></p>')
            $("body").css({
                "background-color": prezent[questionCounter].boja_pozadine
            })
            if (prekidac == 1 && iskljuci_v == 0) {
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
            }

            $("#osnova").text(prezent[questionCounter].osnova)
            $("#glagol").text(prezent[questionCounter].glagol)
            $("#osnova2").text(prezent[questionCounter].osnova2)
            $("#oblik").html("<span class='vrime'>" + prezent[questionCounter].hint + "</span>")
            $(".slikica").attr("src", "slike/" + prezent[questionCounter].slika)

        } else if (prezent[questionCounter].question == "odgovori") {
            $(".questions-page__answer-list").show();
            $(".popuni").hide();
            answerA.text(prezent[questionCounter].answers[0]);
            if (answerA.html() == "" || null) {
                answerDivA.hide()
            } else {
                answerDivA.show()
            };
            answerB.text(prezent[questionCounter].answers[1]);
            if (answerB.html() == "" || null) {
                answerDivB.hide()
            } else {
                answerDivB.show()
            };
            answerC.text(prezent[questionCounter].answers[2]);
            if (answerC.html() == "" || null) {
                answerDivC.hide()
            } else {
                answerDivC.show()
            };
            answerD.text(prezent[questionCounter].answers[3]);
            if (answerD.html() == "" || null) {
                answerDivD.hide()
            } else {
                answerDivD.show()
            };


            $("#opis").html("<em>" + prezent[questionCounter].opis + "</em>")
            $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span> <span id="sekunde">sekundi</span> za odgovor</p>')
            $("body").css({
                "background-color": prezent[questionCounter].boja_pozadine
            })
            if (prekidac == 1) {
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
            }
        }

        var input = document.querySelector('input'); // get the input element
        input.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
        resizeInput.call(input); // immediately call the function

        function resizeInput() {
            if (this.value.length == 0) { this.style.width = "3ch" }
            else {
                this.style.width = this.value.length + "ch";
            }
        }
    };

    // Store the correct answer of a given question
    getCorrectAnswer = function () {
        correctAnswer = prezent[questionCounter].correctAnswer;
    };

    // Store the user's selected (clicked) answer
    getUserAnswer = function (target) {
        userSelectedAnswer = $(target).find(answerSpan).text();
    };

    // Add the pointer to the clicked answer
    selectAnswer = function (target) {
        $(target).find(selectionDiv).addClass('ion-chevron-right');
        $(target).addClass("odabir")
    };

    // Remove the pointer from any answer that has it
    deselectAnswer = function () {
        if (selectionDiv.hasClass('ion-chevron-right')) {
            selectionDiv.removeClass('ion-chevron-right');
            selectionDiv.parent().removeClass("odabir")
        }
    };

    // Get the selected answer's div for highlighting purposes
    getSelectedAnswerDivs = function (target) {
        toBeHighlighted = $(target);
        toBeMarked = $(target).find(feedbackDiv);
    };

    // Make the correct answer green and add checkmark
    highlightCorrectAnswerGreen = function (target) {
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
    highlightIncorrectAnswerRed = function () {
        toBeHighlighted.addClass('questions-page--incorrect');
        toBeMarked.addClass('ion-close-round');
    };

    // Clear all highlighting and feedback
    clearHighlightsAndFeedback = function () {
        answerDiv.removeClass('questions-page--correct');
        answerDiv.removeClass('questions-page--incorrect');
        feedbackDiv.removeClass('ion-checkmark-round');
        feedbackDiv.removeClass('ion-close-round');
    };

    // APP FUNCTIONALITY ------

    /* --- PAGE 1/3 --- */

    // Start the quiz:
    newQuiz();

    // Clicking on start button:
    startBtn.on('click', function () {
        if ($(this).attr('id') == "bez") {
            iskljuci_v = 1;
            $(".vrijeme").hide()
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSfeOlnDU5d2EQqMD4b2Gt6hvmgwSzyw3WibEWcOcQTvGHcKDw/formResponse');
            r1 = 1
            tajming = 10
        } else if ($(this).attr('id') == "20") {
            tajming = 20;
        } else if ($(this).attr('id') == "40") {
            tajming = 40;
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSd5lYbC0-IYOWgV_KWq-odbAGmdogjMEs-W1QQrnuCVL2x2LA/formResponse');
            r1 = 2
        }
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
    answerDiv.on('click', function () {

        // Make the submit button visible
        submitBtn.show(300);

        // Remove pointer from any answer that already has it
        deselectAnswer();

        // Put pointer on clicked answer
        selectAnswer(this);

        // Store current selection as user answer
        getUserAnswer(this);

        // Store current answer div for highlighting purposes
        getSelectedAnswerDivs(this);

    });


    $('#odgovor').on("keyup", function () {

        if ($("#odgovor").val().length == 0) {
            submitBtn.hide(300)
        } else {
            submitBtn.show(300)
        }
    })


    function odgovor() {
        if (document.getElementById("pageBeginCountdown").value != "0" && $('#odgovor').val().length == 0) {
            return
        }
        vrijeme = parseInt($("#pageBeginCountdownText").text())
        prekidac = 0;
        var ide = 0
        // Disable ability to select an answer
        answerDiv.off('click');
        if (questionCounter != prezent.length - 1) {
            ide = 1
        } else {
            ide = 0
        }
        clearInterval(countdownTimer);
        if (prezent[questionCounter].question == "popuni") {
            if (document.getElementById("pageBeginCountdown").value == "0") {
                bodovi -= 10;
                $("#zvono")[0].play();

                if (prezent[questionCounter].correctAnswer[1].length == 0) {
                    swal({
                        title: "Isteklo je vrijeme.",
                        html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span></strong>"+ prezent[questionCounter].osnova2+"<br></p><br><img src='slike/vrijeme.png'class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                } else {
                    swal({
                        title: "Isteklo je vrijeme.",
                        html: "<p class='dodatak'><strong>Točani odgovori su: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span> "+prezent[questionCounter].osnova2+", " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[1] + " </strong>"+prezent[questionCounter].osnova2+"<br></p><br><img src='slike/vrijeme.png'class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                }

                if (prezent[questionCounter].pin.length > 0) {
                    $(".dodatak").append("<br><p>" + prezent[questionCounter].napomena + "</p>")
                }
                $(".swal2-confirm").unbind("click").click(function () {
                    clearInterval(countdownTimer)
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").unbind("click").click(function () {
                    clearInterval(countdownTimer)
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })

            } else {
                if ($("#odgovor").val().toLowerCase() == prezent[questionCounter].correctAnswer[0].toLowerCase() || $("#odgovor").val().toLowerCase() == prezent[questionCounter].correctAnswer[1].toLowerCase() ) {
                    // Increment the total correct answers counter
                    correctAnswersCounter++;
                    bodovi += 10;
                    bodovi += vrijeme
                    broj = 10 + vrijeme

                    $("#tocno")[0].play();
                    swal({
                        title: "Točno",
                        html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><br><img src='slike/tocno.png' class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });

                    if (prezent[questionCounter].pin == 1) {
                        if ($("#odgovor").val().toLowerCase() == prezent[questionCounter].correctAnswer[0]) {
                            brb = 0
                        } else {
                            brb = 1
                        }

                        odg = prezent[questionCounter].odgovori
                        shuffle(odg)
                        $(".swal2-confirm").hide()
                        $(".swal2-close").hide()
                        $(".slikica2").hide()
                        $(".dodatak").append("<p class='pitanjce'>Do koje je glasovne promjene došlo pri tvorbi oblika " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[brb] + "</span>?</p><button class='btn odgov' value='" + odg[0] + "'>" + odg[0] + "</button><button class='btn odgov' value='" + odg[1] + "'>" + odg[1] + "</button><button class='btn odgov' value='" + odg[2] + "'>" + odg[2] + "</button>")
                        $(".odgov").unbind("click").click(function () {
                            if ($(this).attr('value') == prezent[questionCounter].tocan[brb]) {
                                $(".slikica2").show()
                                $(".odgov").hide(300)
                                $(".dodatak").append("<br><p>" + prezent[questionCounter].napomena + "</p>")
                                bodovi += 10
                                $(".tocno_bod").html(parseInt($(".tocno_bod").text()) + 10)
                                $(".swal2-confirm").show()
                                $(".swal2-close").show()
                                $(".swal2-modal").addClass("swal-fix")
                            } else {
                                $(".odgov").hide(300)
                                $(".povrt").hide(300)
                                $(".dodatak").append("<br><p>Odgovor je: " + prezent[questionCounter].tocan + ".<br>" + prezent[questionCounter].napomena + "</p>")
                                $(".swal2-confirm").show()
                                $(".swal2-close").show()
                                $(".swal2-modal").addClass("swal-fix")
                                $(".swal2-modal h2").html("Netočno")
                                $(".slikica2").attr("src", "slike/krivo.png")
                                $(".slikica2").show()
                            }
                        })
                    } else if (prezent[questionCounter].pin == 2) {
                        $(".dodatak").append("<br><p>" + prezent[questionCounter].napomena + "</p>")
                    }
                    $(".swal2-confirm").unbind("click").click(function () {
                        clearInterval(countdownTimer)
                        $(".swal2-modal").removeClass("swal-fix")
                        nastavi()
                        if (ide == 1 && iskljuci_v == 0) {
                            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        }
                    })
                    $(".swal2-close").unbind("click").click(function () {
                        clearInterval(countdownTimer)
                        $(".swal2-modal").removeClass("swal-fix")

                        nastavi()

                        if (ide == 1 && iskljuci_v == 0) {
                            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        }
                    })

                } else {
                    bodovi -= 10;
                    if (prezent[questionCounter].correctAnswer[1].length == 0) {

                        $("#pogresno")[0].play()
                        swal({
                            title: "Netočno",
                            html: "<p class='dodatak'><strong>Točan odgovor je: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span>" + prezent[questionCounter].osnova2 + "</strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                            showCloseButton: true,
                            confirmButtonText: ' dalje',
                            backdrop: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,

                        });
                    } else {
                        swal({
                            title: "Netočno",
                            html: "<p class='dodatak'><strong>Točni odgovori mogu biti: " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[0] + "</span>" + prezent[questionCounter].osnova2 + ", " + prezent[questionCounter].osnova + "<span class='nastavak'>" + prezent[questionCounter].correctAnswer[1] + "</span>" + prezent[questionCounter].osnova2 + "</strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                            showCloseButton: true,
                            confirmButtonText: ' dalje',
                            backdrop: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,

                        });
                    }



                    if (prezent[questionCounter].pin.length > 0) {
                        $(".dodatak").append("<br><p>" + prezent[questionCounter].napomena + "</p>")
                    }

                    $(".swal2-confirm").unbind("click").click(function () {
                        clearInterval(countdownTimer)
                        nastavi()

                        if (ide == 1 && iskljuci_v == 0) {
                            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        }
                    })
                    $(".swal2-close").unbind("click").click(function () {
                        clearInterval(countdownTimer)
                        nastavi()

                        if (ide == 1 && iskljuci_v == 0) {
                            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        }
                    })
                }

            }

            submitBtn.hide(300);
            continueBtn.show(300);
        } // Clicking on the submit button:
    }

    submitBtn.on('click', function () {
        odgovor();
    });


    function nastavi() {
        // Increment question number until there are no more questions, then advance to the next page
        $(".mrzim").hide()
        if (questionCounter < prezent.length - 1) {
            questionCounter++;
        } else {
            questionsPage.hide();
            resultsPage.show(300);
            // Display user score as a percentage
            userScore.text(Math.floor((correctAnswersCounter / prezent.length) * 100) + "%");
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
        answerDiv.on('click', function () {
            // Make the submit button visible
            submitBtn.show(300);
            // Remove pointer from any answer that already has it
            deselectAnswer();
            // Put pointer on clicked answer
            selectAnswer(this);
            // Store current answer div for highlighting purposes
            getSelectedAnswerDivs(this);
            // Store current selection as user answer
            getUserAnswer(this);
        });

    }

    // Clicking on the continue button:
    continueBtn.on('click', function () {

    });

    $(".questions-page__answer-div").dblclick(function () {
        odgovor()
    })
    /* --- PAGE 3/3 --- */

    // Clicking on the retake button:
    retakeBtn.on('click', function () {
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


    p1 = [{
        "question": "popuni",
        "hint": "ljetni praznik mn",
        "correctAnswer": [
            "ljetnim praznicima",
            ""
        ],
        "osnova": "Veselimo se ",
        "osnova2": ".",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "ljeto.jpg"
    },
    {
        "question": "popuni",
        "hint": "Novi Zagreb",
        "correctAnswer": [
            "Novom Zagrebu",
            "Novome Zagrebu"
        ],
        "osnova": "Koji tramvaj vozi prema ",
        "osnova2": "?",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "tramvaj.jpg"
    },
    {
        "question": "popuni",
        "hint": "velika gužva",
        "correctAnswer": [
            "velikoj gužvi",
            ""
        ],
        "osnova": "Stigli sam na vrijeme unatoč ",
        "osnova2": "?",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "guzva.jpg"
    },
    {
        "question": "popuni",
        "hint": "draga baka",
        "correctAnswer": [
            "dragoj baki",
            "svojoj dragoj baki"
        ],
        "osnova": "Crvenkapica je išla k ",
        "osnova2": " i nosila joj kolače.",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "crvenkapica.jpg"
    },
    {
        "question": "popuni",
        "hint": "loš promet",
        "correctAnswer": [
            "lošem prometu",
            "lošemu prometu"
        ],
        "osnova": "Volim živjeti u centru unatoč ",
        "osnova2": ".",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "guzva.jpg"
    },
    {
        "question": "popuni",
        "hint": "Modro jezero",
        "correctAnswer": [
            "Modrom jezeru",
            "Modrome jezeru",
        ],
        "osnova": "Oni putuju prema ",
        "osnova2": ".",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "jezero.jpg"
    },
    {
        "question": "popuni",
        "hint": "loše vrijeme",
        "correctAnswer": [
            "lošem vremenu",
            "lošemu vremenu"
        ],
        "osnova": "Unatoč ",
        "osnova2": " moramo ići na put.",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "vrijem.jpg"
    },
    {
        "question": "popuni",
        "hint": "tvoja čokoladna torta mn",
        "correctAnswer": [
            "tvojim čokoladnim tortama",
            ""
        ],
        "osnova": "Teško je odoljeti ",
        "osnova2": ".",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "torte.jpg"
    },
    {
        "question": "popuni",
        "hint": "prijateljica",
        "correctAnswer": [
            "prijateljici",
            "prijateljicama"
        ],
        "osnova": "Idem k ",
        "osnova2": ".",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "prijateljice.jpg"
    },
    {
        "question": "popuni",
        "hint": "auomobil",
        "correctAnswer": [
            "automobilom",
            ""
        ],
        "osnova": "Usprkos zabrani otišao sam ",
        "osnova2": ".",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "auto.jpg"
    },
    {
        "question": "popuni",
        "hint": "kiša",
        "correctAnswer": [
            "kiši",
            ""
        ],
        "osnova": "Unatoč ",
        "osnova2": " otišli smo u kino.",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "kisa.jpg"
    },
    {
        "question": "popuni",
        "hint": "kazalište",
        "correctAnswer": [
            "kazalištu",
            ""
        ],
        "osnova": "Moja je kuća nasuprot ",
        "osnova2": ".",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "kazaliste.jpg"
    },
    {
        "question": "popuni",
        "hint": "mi",
        "correctAnswer": [
            "nama",
            ""
        ],
        "osnova": "Hoćeš li doći k ",
        "osnova2": " u subotu.",
        "glagol": "",
        "boja_pozadine": "#FCE4EC",
        "time": 20,
        "pin": "",
        "slika": "knama.jpg"
    }
    ];


    prezent = p1
    shuffle(prezent)
});

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
        false, false, false, 0 /*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}