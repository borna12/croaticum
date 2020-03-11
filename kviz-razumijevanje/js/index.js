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
    prekidac, countdownTimer, bodovi = 0, pitanja=0,
    vrijeme = 0;

function ProgressCountdown(timeleft, bar, text) {
    return new Promise((resolve, reject) => {
        countdownTimer = setInterval(() => {
            if (prekidac==1){
            timeleft--;}
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
    // Buttons
    startBtn = $('.init-page__btn, .results-page__retake-btn');
    storyBtn = $('.story-page__btn, .results-page__retake-btn');
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
    answerDivE = $('.questions-page__answer-div-e');
    answerDivF = $('.questions-page__answer-div-f');
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
    answerE = $('.questions-page__answer-E');
    answerF = $('.questions-page__answer-F');
    // User final score
    userScore = $('.results-page__score');
    prikazBodova = $('.results-page__bodovi');

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
        $(".questions-page__answer-list").show()
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
        answerE.text(quiz[questionCounter].answers[4]);
        if (answerE.html() == "" || null) {
            answerDivE.hide()
        } else {
            answerDivE.show()
        };

        answerF.text(quiz[questionCounter].answers[4]);
        if (answerF.html() == "" || null) {
            answerDivF.hide()
        } else {
            answerDivF.show()
        };
        $(".vrijeme").html('<progress value="10" max="10" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">30 </span> <span id="sekunde"></p>')
        $("body").css({
            "background-color": quiz[questionCounter].boja_pozadine
        })
        if (prekidac == 1) {
            ProgressCountdown(30, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
        }

        
    $(".info").unbind("click").click(function() {
        prekidac=0
        swal({
            title: "",
            html: "<p style='text-align:justify; font-size:18px'>" + $(".prica").text().substring(0,$(".prica").text().length-7) + "</p>",
            showCloseButton: false,
            confirmButtonText: 'ok',
            backdrop: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        });

        $(".swal2-confirm").unbind("click").click(function() {
            prekidac=1
        })
        $(".swal2-close").unbind("click").click(function() {
            prekidac=1
        })
    })
        question.html(quiz[questionCounter].question)
        $(".questions-page__question").prepend("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + quiz.length + ".</span> <br>")

    };

    // Store the correct answer of a given question
    getCorrectAnswer = function () {
        correctAnswer = quiz[questionCounter].correctAnswer;
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

    resultsPage.hide();

    submitBtn.hide();
    continueBtn.hide();

    /*if (localStorage.getItem("reset") == "da") {
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
*/

    // Clicking on start button:


    // Clicking on story button:
    storyBtn.unbind("click").click(function() {
        $(".prica").show()
        $(".opis").hide()
        $(".story-page__btn").hide()
        $(".init-page__title").text($(this).text())
        if ($(this).hasClass( "korištenje-automobila" ))
        {
            $(".prica").html('<img src="slike/dijeljenje-auta.png"  class="senka"><p><span  data-url="audio/auto1.mp3" data-plays="1" dir=ltr>Najčešće jednim automobilom putuje jedna, ponekad dvije osobe. Zbog toga nastaju velike gužve na gradskim cestama. To je i skupo. Ako odlučimo na posao putovati sa susjedom iii kolegom, jedan dan putovat ćemo svojim automobilom, drugi dan njegovim. Tako štedimo novac i automobil, a imanje se umaramo.</span><br><br><span  data-url="audio/auto2.mp3" data-plays="1" dir=ltr>U mnogim europskim gradovima postoje organizacije u kojima nekoliko ljudi ima jedan automobil. Na vrijeme morate rezervirati automobil. Imate ga kada vam je potreban, a u ostalo vrijeme koristi ga netko drugi. Zajedno plaćate osiguranje, održavanje i registriranje automobila. Manje automobila, manje gužve na cestama, više parkirnih mjesta, manje novca za benzin i čistiji zrak!</span></p> <button class="init-page__btn btn koristenje-automobila">pokreni</button>')
        }
        else if ($(this).hasClass( "tram-auto" )){
            $(".prica").html('<img src="slike/tramvaj.jpg"  class="senka"><p><span  data-url="audio/tram1.mp3" data-plays="1" dir=ltr>Zagrepčani su 1891. godine dobili prvi tramvaj. Vukli su ga konji. Prvi električni tramvaji počeli su voziti 1905. godine. Četiri godine prije, 1901., prvi automobil pojavio se na zagrebačkim ulicama.</span><br><span  data-url="audio/tram2.mp3" data-plays="1" dir=ltr>A u svijetu?</span></br><span  data-url="audio/tram3.mp3" data-plays="1" dir=ltr>Prvi tramvaj postavljen je na tračnice 1832. godine u New Yorku. Također su ga vukli konji. Prvi električni tramvaj na svijetu izgrađen je u tvornici „Werner von Siemens” i pokrenut je 1881. godine u Berlinu, a vozio je maksimalnom brzinom od 20 kilometara na sat.</span></br><span  data-url="audio/tram4.mp3" data-plays="1" dir=ltr>Prvi automobil, marke Mercedes, konstruirao je Gotlieb Daimler 1885. U Francuskoj se prvi automobil pojavio 1890., a u Americi 1892. godine. Proizveo ga je Henry Ford.</span></p><button class="init-page__btn btn prvi-tram">pokreni</button>')

        }
        else{
            $(".prica").html('<img src="slike/auto.jpg"  class="senka"><p>Dobar životni standard za mnoge ljude znači mogućnost da kupe vlastiti automobil. Ta mogućnost postoji i zato što mnoge banke daju povoljne kredite za kupnju automobila. Zbog toga svuda u svijetu, pa tako i u Hrvatskoj, ima sve više i više automobila na ulicama, lako postoji organiziran javni prijevoz autobusima i tramvajima, ljudi se više vole voziti vlastitim automobilom. To izaziva velike probleme: gužve na cestama, osobito u vrijeme kad ljudi odlaze na posao i vraćaju se s posla, premalo mjesta za parkiranje i nečist zrak.</p><button class="init-page__btn btn auto">pokreni</button>')
        }


        $(".init-page__btn").click(function(){
            if($(this).hasClass("koristenje-automobila")){
                quiz = p1
            }
            else if($(this).hasClass("prvi-tram")){
                quiz = p2
            }
            else{
                quiz = p3
            }
            newQuiz();
            $(".info").show()
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

        })
    });

   
    /* --- PAGE 2/3 --- */

    // Clicking on an answer:
    answerDiv.unbind("click").click(function() {
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
        if (document.getElementById("pageBeginCountdown").value == "0") {
            $("#krivo")[0].play();
            bodovi -= 10;
            swal({
                title: "Isteklo je vrijeme.",
                html: "<p style='text-align:center'><strong>Trebali ste odgovoriti: " + quiz[questionCounter].correctAnswer + "</strong></p><br>" + quiz[questionCounter].napomena,
                showCloseButton: false,
                confirmButtonText: ' dalje',
                backdrop: false,
                allowOutsideClick: false,
                allowEscapeKey: false
            });
            $(".nadopuni").html(quiz[questionCounter].correctAnswer)
            $(".nadopuni").css({
                "color": "#bb422a",
                "text-decoration": "underline"
            })
            $(".swal2-confirm").unbind("click").click(function() {
                clearInterval(countdownTimer)
                if (ide == 1) {
                    ProgressCountdown(30, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    nastavi()
                return
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
                    html: "+ <span class='zeleno'>" + broj + "</span><br>" + quiz[questionCounter].napomena,
                    showCloseButton: false,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
                $(".swal2-confirm").unbind("click").click(function() {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(30, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        nastavi()
                        return
                    }
                })
            } else {
                highlightIncorrectAnswerRed();
                bodovi -= 10;
                $("#krivo")[0].play();
                swal({
                    title: " <span style='color:#bb422a' >Netočno</span>",
                    html: "<p style='text-align:center'></p><br>" + quiz[questionCounter].napomena,
                    showCloseButton: false,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
                $(".swal2-confirm").unbind("click").click(function() {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(30, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                        nastavi()
                        return
                    }
                })
                $(".nadopuni").html(quiz[questionCounter].correctAnswer)
                $(".nadopuni").css({
                    "color": "#bb422a",
                    "text-decoration": "underline"
                })
            }
        }
        // Substitute the submit button for the continue button:
        submitBtn.hide(300);
    
    }
    // Clicking on the submit button:
    function nastavi() {
        clearInterval(countdownTimer);
        $(".questions-page__answer-span").html("")
        prekidac=1;
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
        answerDiv.unbind("click").click(function() {
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
    continueBtn.unbind("click").click(function() {

    });

    $(".questions-page__answer-div").dblclick(function () {
        odgovor()
    })
    /* --- PAGE 3/3 --- */

    // Clicking on the retake button:
    retakeBtn.unbind("click").click(function() {
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
    question: "Jednim automobilom rijetko putuju više od dvije osobe.",
    answers: ["točno", "netočno"],
    correctAnswer: "točno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Najčešće jednim automobilom putuje jedna, ponekad dvije osobe.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Organizacije u kojima nekoliko ljudi dijeli jedan automobil nalaze se u Europi.",
    answers: ["točno", "netočno"],
    correctAnswer: "točno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>U mnogim europskim gradovima postoje organizacije u kojima nekoliko ljudi ima jedan automobil.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "U takvim su organizacijama osiguranje, registriranje i održavanje skuplji.",
    answers: ["točno", "netočno"],
    correctAnswer: "netočno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Imate ga kada vam je potreban, a u ostalo vrijeme koristi ga netko drugi. Zajedno plaćate osiguranje, održavanje i registriranje automobila. Manje automobila, manje gužve na cestama, više parkirnih mjesta, manje novca za benzin i čistiji zrak!</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Za članove takvih organizacija održavanje auta je skuplje.",
    answers: ["točno", "netočno"],
    correctAnswer: "netočno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Imate ga kada vam je potreban, a u ostalo vrijeme koristi ga netko drugi. Zajedno plaćate osiguranje, održavanje i registriranje automobila. Manje automobila, manje gužve na cestama, više parkirnih mjesta, manje novca za benzin i čistiji zrak!</em></p></div>",
    boja_pozadine: "#FCE4EC"
}];


p2 = [{
    question: "Konjski tramvaj u Zagrebu postojao je na kraju 19. stoljeća.",
    answers: ["točno", "netočno"],
    correctAnswer: "točno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Zagrepčani su 1891. godine dobili prvi tramvaj.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Konjski tramvaj u New Yorku prevozio je putnike od 30-ih godina 19. stoljeća.",
    answers: ["točno", "netočno"],
    correctAnswer: "točno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Prvi tramvaj postavljen je na tračnice 1832. godine u New Yorku. Također su ga vukli konji.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Prvi električni tramvaj na svijetu kretao se brže od 20 km/h.",
    answers: ["točno", "netočno"],
    correctAnswer: "netočno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em> Prvi električni tramvaj na svijetu izgrađen je u tvornici „Werner von Siemens” i pokrenut je 1881. godine u Berlinu, a vozio je <span class='istaknuto'>maksimalnom</span> brzinom od 20 kilometara na sat.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Prvi automobil na svijetu bio je marke Ford i pojavio se 1890. godine.",
    answers: ["točno", "netočno"],
    correctAnswer: "netočno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Prvi automobil, marke <span class='istaknuto'>Mercedes</span>, konstruirao je Gotlieb Daimler 1885.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "U Zagrebu se prvi automobil pojavio 1905. godine.",
    answers: ["točno", "netočno"],
    correctAnswer: "netočno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Četiri godine prije, <span class='istaknuto'>1901.</span>, prvi automobil pojavio se na zagrebačkim ulicama.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}];



p3 = [{
    question: "Kada imaju dobar životni standard, mnogi ljudi kupe automobil.",
    answers: ["točno", "netočno"],
    correctAnswer: "točno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Dobar životni standard za mnoge ljude znači mogućnost da kupe vlastiti automobil.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "U bankama se mogu dobiti krediti za automobile.",
    answers: ["točno", "netočno"],
    correctAnswer: "točno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Ta mogućnost postoji i zato što mnoge banke daju povoljne kredite za kupnju automobila.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Ima sve manje i manje automobila na ulicama.",
    answers: ["točno", "netočno"],
    correctAnswer: "netočno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Zbog toga svuda u svijetu, pa tako i u Hrvatskoj, ima sve više i više automobila na ulicama.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Ljudi koji imaju svoj automobil više vole autobus i tramvaj.",
    answers: ["točno", "netočno"],
    correctAnswer: "netočno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>Iako postoji organiziran javni prijevoz autobusima i tramvajima, ljudi se više vole voziti vlastitim automobilom.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Najveće su gužve na cestama onda kad su ljudi na poslu.",
    answers: ["točno", "netočno"],
    correctAnswer: "netočno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>To izaziva velike probleme: gužve na cestama, osobito u vrijeme kad ljudi odlaze na posao i vraćaju se s posla, premalo mjesta za parkiranje i nečist zrak.</p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "U gradovima ima dovoljno mjesta za parkiranje.",
    answers: ["točno", "netočno"],
    correctAnswer: "netočno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>To izaziva velike probleme: gužve na cestama, osobito u vrijeme kad ljudi odlaze na posao i vraćaju se s posla, premalo mjesta za parkiranje i nečist zrak.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Zrak u gradovima prljav je zbog automobila.",
    answers: ["točno", "netočno"],
    correctAnswer: "točno",
    napomena: "<div class='odg_nap'><p> U tekstu je pisalo: <em>To izaziva velike probleme: gužve na cestama, osobito u vrijeme kad ljudi odlaze na posao i vraćaju se s posla, premalo mjesta za parkiranje i nečist zrak.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}

];


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