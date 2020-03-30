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
    vrijeme = 0,
    uglata, obla;
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
$(document).ready(function () {
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
    cvijece = ["vrata", "kotač", "bočno staklo", "retrovizor", "sjedalo", "mjenjač", "volan", "ručna kočnica", "brisači", "prtljažnik (razg. gepek)", "pojas", "motor", "dječja sjedalica", "rezervoar", "papučice auta",]
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
        if (uglata == 1) {
            quiz = [{
                question: "Koriste se za ulaz ili izlaz iz vozila.",
                answers: ["vrata", strava = stvori("vrata"), strava2 = stvori("vrata", strava), stvori("vrata", strava, strava2)],
                correctAnswer: "vrata",
                slika: "slike/vrata.jpg",
                opis: "Vrata se koriste za ulaz ili izlaz iz vozila.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Naprava u obliku kruga koja se okreće na osovini i omogućuje kretanje vozila.",
                answers: ["kotač", strava = stvori("kotač"), strava2 = stvori("kotač", strava), stvori("kotač", strava, strava2)],
                correctAnswer: "kotač",
                slika: "slike/kotac.jpg",
                opis: "Kotač je naprava u obliku kruga koja se okreće na osovini i omogućuje kretanje vozila.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Prozori koji se nalaze s bočne strane vozila.",
                answers: ["bočno staklo", strava = stvori("bočno staklo"), strava2 = stvori("bočno staklo", strava), stvori("bočno staklo", strava, strava2)],
                correctAnswer: "bočno staklo",
                slika: "slike/bocno.jpg",
                opis: "Bočno staklo označava prozore koji se nalaze s bočne strane vozila.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Ogledalo na vozilu koje omogućuje vozaču pregled stanja na cesti iza njega.",
                answers: ["retrovizor", strava = stvori("retrovizor"), strava2 = stvori("retrovizor", strava), stvori("retrovizor", strava, strava2)],
                correctAnswer: "retrovizor",
                slika: "slike/retrovizor.jpg",
                opis: "	Retrovizor je ogledalo na vozilu koje omogućuje vozaču pregled stanja na cesti iza njega.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Mjesto za sjedenje u prijevoznome sredstvu.",
                answers: ["sjedalo", strava = stvori("sjedalo"), strava2 = stvori("sjedalo", strava), stvori("sjedalo", strava, strava2)],
                correctAnswer: "sjedalo",
                slika: "slike/sjedalo.jpg",
                opis: "Sjedalo je mjesto za sjedenje u prijevoznome sredstvu.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Uređaj u vozilu kojim se mijenjaju brzine i tako usklađuje brzina okretaja kotača i rada motora.",
                answers: ["mjenjač", strava = stvori("mjenjač"), strava2 = stvori("mjenjač", strava), stvori("mjenjač", strava, strava2)],
                correctAnswer: "mjenjač",
                slika: "slike/mjenjac.jpg",
                opis: "Mjenjač je uređaj u vozilu kojim se mijenjaju brzine i tako usklađuje brzina okretaja kotača i rada motora.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Naprava s pomoću koje se upravlja kojim prijevoznim sredstvom.",
                answers: ["volan", strava = stvori("volan"), strava2 = stvori("volan", strava), stvori("volan", strava, strava2)],
                correctAnswer: "volan",
                slika: "slike/volan.jpg",
                opis: "Volan je naprava s pomoću koje se upravlja kojim prijevoznim sredstvom.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Ručka kojom se zaustavlja kretanje vozila.",
                answers: ["ručna kočnica", strava = stvori("ručna kočnica"), strava2 = stvori("ručna kočnica", strava), stvori("ručna kočnica", strava, strava2)],
                correctAnswer: "ručna kočnica",
                slika: "slike/rucna.jpg",
                opis: "Ručna kočnica je ručka kojom se zaustavlja kretanje vozila.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Naprava na vozilu kojom se briše prednje i stražnje staklo.",
                answers: ["brisači", strava = stvori("brisači"), strava2 = stvori("brisači", strava), stvori("brisači", strava, strava2)],
                correctAnswer: "brisači",
                slika: "slike/brisaci.jpg",
                opis: "Brisači su naprava na vozilu kojom se briše prednje i stražnje staklo.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Dio vozila u koji se smješta prtljaga.",
                answers: ["prtljažnik (razg. gepek)", strava = stvori("prtljažnik (razg. gepek)"), strava2 = stvori("prtljažnik (razg. gepek)", strava), stvori("prtljažnik (razg. gepek)", strava, strava2)],
                correctAnswer: "prtljažnik (razg. gepek)",
                slika: "slike/prtljaznik.jpg",
                opis: "Prtljažnik je dio vozila u koji se smješta prtljaga.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Dug, uzak komad tkanine kojim se veže u vozilu.",
                answers: ["pojas", strava = stvori("pojas"), strava2 = stvori("pojas", strava), stvori("pojas", strava, strava2)],
                correctAnswer: "pojas",
                slika: "slike/pojas.jpg",
                opis: "Pojas je dug, uzak komad tkanine kojim se veže u vozilu.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Uređaj koji pokreće vozilo.",
                answers: ["motor", strava = stvori("motor"), strava2 = stvori("motor", strava), stvori("motor", strava, strava2)],
                correctAnswer: "motor",
                slika: "slike/motor.jpg",
                opis: "Motor je uređaj koji pokreće vozilo.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Stolac za djecu koji je učvršćen ili se može učvrstiti unutar vozila.",
                answers: ["dječja sjedalica", strava = stvori("dječja sjedalica"), strava2 = stvori("dječja sjedalica", strava), stvori("motor", strava, strava2)],
                correctAnswer: "dječja sjedalica",
                slika: "slike/sjedalica.jpg",
                opis: "dječja sjedalica je stolac za djecu koji je učvršćen ili se može učvrstiti unutar vozila.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Spremnik za veće količine goriva.",
                answers: ["rezervoar", strava = stvori("rezervoar"), strava2 = stvori("rezervoar", strava), stvori("motor", strava, strava2)],
                correctAnswer: "rezervoar",
                slika: "slike/rezervoar.jpg",
                opis: "Rezervoar je spremnik za veće količine goriva.",
                boja_pozadine: "#FCE4EC"
            },{
                question: "Kočnica, gas i kvačilo.",
                answers: ["papučice auta", strava = stvori("papučice auta"), strava2 = stvori("papučice auta", strava), stvori("papučice auta", strava, strava2)],
                correctAnswer: "papučice auta",
                slika: "slike/papucice.jpg",
                opis: "Papučice auta uključuju kočnicu, gas i kvačilo.",
                boja_pozadine: "#FCE4EC"
            }
            ];
        }
       
        shuffle(quiz)
    };
    // Load the next question and set of answers
    generateQuestionAndAnswers = function () {
        $(".questions-page__answer-list").show()
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + quiz.length + ".</span> <br>");
        shuffle(quiz[questionCounter].answers);
        answerA.text(quiz[questionCounter].answers[0]);
        if (answerA.html() == "" || null) {
            answerDivA.hide()
        } else {
            answerDivA.show()
        };
        answerB.text(quiz[questionCounter].answers[1]);
        if (answerB.html() == "" || null) {
            answerDivB.hide()
        } else {
            answerDivB.show()
        };
        answerC.text(quiz[questionCounter].answers[2]);
        if (answerC.html() == "" || null) {
            answerDivC.hide()
        } else {
            answerDivC.show()
        };
        answerD.text(quiz[questionCounter].answers[3]);
        if (answerD.html() == "" || null) {
            answerDivD.hide()
        } else {
            answerDivD.show()
        };
        slikica.attr("src", quiz[questionCounter].slika)
        slikica.attr("data-zoom-image", quiz[questionCounter].slika)
        $("#opis").html("<em>" + quiz[questionCounter].question + "</em>")
        $(".definicija").html(quiz[questionCounter].question)
        $(".vrijeme").html('<progress value="60" max="60" id="pageBeginCountdown"><span id="pageBeginCountdownText">60</p>')
        $("body").css({
            "background-color": quiz[questionCounter].boja_pozadine
        })
        if (quiz[questionCounter].question[0] == "_") {
            $(".questions-page__answer-span").each(function () {
                var s = $(this).text().split(' ');
                for (var i = 0; i < 1; i++) {
                    s[i] = s[i].substring(0, 1).toUpperCase() + s[i].substring(1);
                }
                s = s.join(' ');
                $(this).text(s);
            })
        }
        if (prekidac == 1) {
            ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
        }
    };
    // Store the correct answer of a given question
    getCorrectAnswer = function () {
        correctAnswer = quiz[questionCounter].correctAnswer;
    };
    // Store the user's selected (clicked) answer
    getUserAnswer = function (target) {
        userSelectedAnswer = $(target).find(answerSpan).text().toLowerCase();
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
    resultsPage.hide();
    submitBtn.hide();
    continueBtn.hide();
    // Clicking on start button:
    startBtn.on('click', function () {
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
    answerDiv.on('click', function () {
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
                html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; ' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/>",
                showCloseButton: true,
                confirmButtonText: ' dalje',
                backdrop: false,
                allowOutsideClick: false, allowEscapeKey: false
            });
            $(".swal2-confirm").click(function () {
                clearInterval(countdownTimer)
                if (ide == 1) {
                    ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
            })
            $(".swal2-close").click(function () {
                clearInterval(countdownTimer)
                if (ide == 1) {
                    ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
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
                    html: "+" + broj + "<br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + "'class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false, allowEscapeKey: false
                });
                $(".swal2-confirm").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
            } else {
                highlightIncorrectAnswerRed();
                bodovi -= 10;
                $("#krivo")[0].play();
                swal({
                    title: " <span style='color:#bb422a' >Netočno</span>",
                    html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; ' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false, allowEscapeKey: false
                });
                $(".swal2-confirm").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
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
            document.getElementsByClassName('sakri')[0].style.display = "block"
            document.getElementsByClassName('results-page')[0].style.display = "block"
            // Display user score as a percentage
            userScore.text(Math.floor((correctAnswersCounter / quiz.length) * 100) + " %");
            prikazBodova.text(bodovi);
            $("#input-q2").attr("value", bodovi)
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