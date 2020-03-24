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
    cvijece = ["diviti se", "čuditi se", "zahvaljivati", "nadati se", "prigovarati", "pisati", "veseliti se", "govoriti", "vjerovati", "smijati se", "slati", "približavati se", "dati", "pomagati", "smetati",]
    // QUIZ CONTENT ------
    cvijece2 = ["pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime", "biti u čudu, biti iznenađen čime neočekivanim", "izražavati zahvalnost", "imati nadu, očekivati da će se ostvariti nešto što želimo", "upućivati komu prigovor", "bilježiti slova i brojke na papiru, ploči ili čemu drugom", "osjećati veselje ili radost, biti veseo", "izgovarati riječi i rečenice koje postoje u nekom jeziku", "imati povjerenja u koga ili što", "razvući usta u osmijeh kao izraz veselja i opuštenosti", "upućivati što na čiju adresu, stvarnu ili virtualnu", "dolaziti blizu komu ili čemu", "znači da smo nekomu nešto prepustili ili uručili bez traženja novca zauzvrat", "davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim", "uzemirivati koga",]

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
                question: "_____ znači pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime.",
                answers: ["diviti se", strava = stvori("diviti se"), strava2 = stvori("diviti se", strava), stvori("diviti se", strava, strava2)],
                correctAnswer: "diviti se",
                slika: "slike/diviti.jpg",
                opis: "Diviti se znači pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači biti u čudu, biti iznenađen čime neočekivanim.",
                answers: ["čuditi se", strava = stvori("čuditi se"), strava2 = stvori("čuditi se", strava), stvori("čuditi se", strava, strava2)],
                correctAnswer: "čuditi se",
                slika: "slike/cuditi.png",
                opis: "Čuditi se znači biti u čudu, biti iznenađen čime neočekivanim.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači izražavati zahvalnost.",
                answers: ["zahvaljivati", strava = stvori("zahvaljivati"), strava2 = stvori("zahvaljivati", strava), stvori("zahvaljivati", strava, strava2)],
                correctAnswer: "zahvaljivati",
                slika: "slike/zahvaljivati.jpg",
                opis: "Zahvaljivati znači izražavati zahvalnost.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači osjećati veselje ili radost, biti veseo.",
                answers: ["veseliti se", strava = stvori("veseliti se"), strava2 = stvori("veseliti se", strava), stvori("veseliti se", strava, strava2)],
                correctAnswer: "veseliti se",
                slika: "slike/veseliti.jpg",
                opis: "Veseliti se znači osjećati veselje ili radost, biti veseo.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači imati nadu, očekivati da će se ostvariti nešto što želimo.",
                answers: ["nadati se", strava = stvori("nadati se"), strava2 = stvori("nadati se", strava), stvori("nadati se", strava, strava2)],
                correctAnswer: "nadati se",
                slika: "slike/nadati.jpg",
                opis: "Nadati se znači imati nadu, očekivati da će se ostvariti nešto što želimo.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači upućivati komu prigovor.",
                answers: ["prigovarati", strava = stvori("prigovarati"), strava2 = stvori("prigovarati", strava), stvori("prigovarati", strava, strava2)],
                correctAnswer: "prigovarati",
                slika: "slike/prigovarati.jpg",
                opis: "Prigovarati znači upućivati komu prigovor.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači bilježiti slova i brojke na papiru, ploči ili čemu drugom.",
                answers: ["pisati", strava = stvori("pisati"), strava2 = stvori("pisati", strava), stvori("pisati", strava, strava2)],
                correctAnswer: "pisati",
                slika: "slike/pisati.jpg",
                opis: "Pisati znači bilježiti slova i brojke na papiru, ploči ili čemu drugom.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači izgovarati riječi i rečenice koje postoje u nekom jeziku.",
                answers: ["govoriti", strava = stvori("govoriti"), strava2 = stvori("govoriti", strava), stvori("govoriti", strava, strava2)],
                correctAnswer: "govoriti",
                slika: "slike/govoriti.jpg",
                opis: "Govoriti znači izgovarati riječi i rečenice koje postoje u nekom jeziku.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači imati povjerenja u koga ili što.",
                answers: ["vjerovati", strava = stvori("vjerovati"), strava2 = stvori("vjerovati", strava), stvori("vjerovati", strava, strava2)],
                correctAnswer: "vjerovati",
                slika: "slike/vjerovati.jpg",
                opis: "Vjerovati znači imati povjerenja u koga ili što.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači razvući usta u osmijeh kao izraz veselja i opuštenosti.",
                answers: ["smijati se", strava = stvori("smijati se"), strava2 = stvori("smijati se", strava), stvori("smijati se", strava, strava2)],
                correctAnswer: "smijati se",
                slika: "slike/smijati.jpg",
                opis: "Smijati se znači razvući usta u osmijeh kao izraz veselja i opuštenosti.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači upućivati što na čiju adresu, stvarnu ili virtualnu.",
                answers: ["slati", strava = stvori("slati"), strava2 = stvori("slati", strava), stvori("slati", strava, strava2)],
                correctAnswer: "slati",
                slika: "slike/slati.jpg",
                opis: "Slati znači upućivati što na čiju adresu, stvarnu ili virtualnu.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači dolaziti blizu komu ili čemu.",
                answers: ["približavati se", strava = stvori("približavati se"), strava2 = stvori("približavati se", strava), stvori("približavati se", strava, strava2)],
                correctAnswer: "približavati se",
                slika: "slike/priblizavati.jpg",
                opis: "Približavati se znači dolaziti blizu komu ili čemu.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači da smo nekomu nešto prepustili ili uručili bez traženja novca zauzvrat.",
                answers: ["dati", strava = stvori("dati"), strava2 = stvori("dati", strava), stvori("dati", strava, strava2)],
                correctAnswer: "dati",
                slika: "slike/dati.jpg",
                opis: "Dati znači da smo nekomu nešto prepustili ili uručili bez traženja novca zauzvrat.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "_____ znači davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim.",
                answers: ["pomagati", strava = stvori("pomagati"), strava2 = stvori("pomagati", strava), stvori("pomagati", strava, strava2)],
                correctAnswer: "pomagati",
                slika: "slike/pomagati.jpg",
                opis: "Pomagati znači davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim.",
                boja_pozadine: "#FCE4EC"
            }
            ,
            {
                question: "_____ znači uzemirivati koga.",
                answers: ["smetati", strava = stvori("smetati"), strava2 = stvori("smetati", strava), stvori("smetati", strava, strava2)],
                correctAnswer: "smetati",
                slika: "slike/smetati.jpg",
                opis: "Smetati znači uzemirivati koga.",
                boja_pozadine: "#FCE4EC"
            }
            ];
        }
        else{
            $(".questions-page__answer-list").css({
                "columns": "1",
                "-webkit-columns": "1",
                "-moz-columns": "1"

            })
            quiz = [{
                question: "diviti se",
                answers: ["pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime", strava = stvori2("pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime"), strava2 = stvori2("pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime", strava), stvori2("pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime", strava, strava2)],
                correctAnswer: "pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime",
                slika: "slike/diviti.jpg",
                opis: "Diviti se znači pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime.",
                boja_pozadine: "#FCE4EC"
            },
            
            {
                question: "čuditi se.",
                answers: ["biti u čudu, biti iznenađen čime neočekivanim", strava = stvori2("biti u čudu, biti iznenađen čime neočekivanim"), strava2 = stvori2("biti u čudu, biti iznenađen čime neočekivanim", strava), stvori2("biti u čudu, biti iznenađen čime neočekivanim", strava, strava2)],
                correctAnswer: "biti u čudu, biti iznenađen čime neočekivanim",
                slika: "slike/cuditi.png",
                opis: "Čuditi se znači biti u čudu, biti iznenađen čime neočekivanim.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "zahvaljivati",
                answers: ["izražavati zahvalnost", strava = stvori2("izražavati zahvalnost"), strava2 = stvori2("izražavati zahvalnost", strava), stvori2("izražavati zahvalnost", strava, strava2)],
                correctAnswer: "izražavati zahvalnost",
                slika: "slike/zahvaljivati.jpg",
                opis: "Zahvaljivati znači izražavati zahvalnost.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "veseliti se",
                answers: ["znači osjećati veselje ili radost, biti veseo", strava = stvori2("znači osjećati veselje ili radost, biti veseo"), strava2 = stvori2("znači osjećati veselje ili radost, biti veseo", strava), stvori2("znači osjećati veselje ili radost, biti veseo", strava, strava2)],
                correctAnswer: "znači osjećati veselje ili radost, biti veseo",
                slika: "slike/veseliti.jpg",
                opis: "Veseliti se znači osjećati veselje ili radost, biti veseo.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "nadati se",
                answers: ["imati nadu, očekivati da će se ostvariti nešto što želimo", strava = stvori2("imati nadu, očekivati da će se ostvariti nešto što želimo"), strava2 = stvori2("imati nadu, očekivati da će se ostvariti nešto što želimo", strava), stvori2("imati nadu, očekivati da će se ostvariti nešto što želimo", strava, strava2)],
                correctAnswer: "imati nadu, očekivati da će se ostvariti nešto što želimo",
                slika: "slike/nadati.jpg",
                opis: "Nadati se znači imati nadu, očekivati da će se ostvariti nešto što želimo.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "prigovarati",
                answers: ["upućivati komu prigovor", strava = stvori2("upućivati komu prigovor"), strava2 = stvori2("upućivati komu prigovor", strava), stvori2("upućivati komu prigovor", strava, strava2)],
                correctAnswer: "upućivati komu prigovor",
                slika: "slike/prigovarati.jpg",
                opis: "Prigovarati znači upućivati komu prigovor.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "pisati",
                answers: ["bilježiti slova i brojke na papiru, ploči ili čemu drugom", strava = stvori2("bilježiti slova i brojke na papiru, ploči ili čemu drugom"), strava2 = stvori2("bilježiti slova i brojke na papiru, ploči ili čemu drugom", strava), stvori2("bilježiti slova i brojke na papiru, ploči ili čemu drugom", strava, strava2)],
                correctAnswer: "bilježiti slova i brojke na papiru, ploči ili čemu drugom",
                slika: "slike/pisati.jpg",
                opis: "Pisati znači bilježiti slova i brojke na papiru, ploči ili čemu drugom.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "govoriti",
                answers: ["izgovarati riječi i rečenice koje postoje u nekom jeziku", strava = stvori2("izgovarati riječi i rečenice koje postoje u nekom jeziku"), strava2 = stvori2("izgovarati riječi i rečenice koje postoje u nekom jeziku", strava), stvori2("izgovarati riječi i rečenice koje postoje u nekom jeziku", strava, strava2)],
                correctAnswer: "izgovarati riječi i rečenice koje postoje u nekom jeziku",
                slika: "slike/govoriti.jpg",
                opis: "Govoriti znači izgovarati riječi i rečenice koje postoje u nekom jeziku.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "vjerovati",
                answers: ["imati povjerenja u koga ili što", strava = stvori2("imati povjerenja u koga ili što"), strava2 = stvori2("imati povjerenja u koga ili što", strava), stvori2("imati povjerenja u koga ili što", strava, strava2)],
                correctAnswer: "imati povjerenja u koga ili što",
                slika: "slike/vjerovati.jpg",
                opis: "Vjerovati znači imati povjerenja u koga ili što.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "smijati se",
                answers: ["razvući usta u osmijeh kao izraz veselja i opuštenosti", strava = stvori2("razvući usta u osmijeh kao izraz veselja i opuštenosti"), strava2 = stvori2("razvući usta u osmijeh kao izraz veselja i opuštenosti", strava), stvori2("razvući usta u osmijeh kao izraz veselja i opuštenosti", strava, strava2)],
                correctAnswer: "razvući usta u osmijeh kao izraz veselja i opuštenosti",
                slika: "slike/smijati.jpg",
                opis: "Smijati se znači razvući usta u osmijeh kao izraz veselja i opuštenosti.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "slati",
                answers: ["upućivati što na čiju adresu, stvarnu ili virtualnu", strava = stvori2("upućivati što na čiju adresu, stvarnu ili virtualnu"), strava2 = stvori2("upućivati što na čiju adresu, stvarnu ili virtualnu", strava), stvori2("upućivati što na čiju adresu, stvarnu ili virtualnu", strava, strava2)],
                correctAnswer: "upućivati što na čiju adresu, stvarnu ili virtualnu",
                slika: "slike/slati.jpg",
                opis: "Slati znači upućivati što na čiju adresu, stvarnu ili virtualnu.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "približavati se",
                answers: ["dolaziti blizu komu ili čemu", strava = stvori2("dolaziti blizu komu ili čemu"), strava2 = stvori2("dolaziti blizu komu ili čemu", strava), stvori2("dolaziti blizu komu ili čemu", strava, strava2)],
                correctAnswer: "dolaziti blizu komu ili čemu",
                slika: "slike/priblizavati.jpg",
                opis: "Približavati se znači dolaziti blizu komu ili čemu.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "dati",
                answers: ["znači da smo nekomu nešto prepustili ili uručili bez traženja novca zauzvrat", strava = stvori2("znači da smo nekomu nešto prepustili ili uručili bez traženja novca zauzvrat"), strava2 = stvori2("znači da smo nekomu nešto prepustili ili uručili bez traženja novca zauzvrat", strava), stvori2("znači da smo nekomu nešto prepustili ili uručili bez traženja novca zauzvrat", strava, strava2)],
                correctAnswer: "znači da smo nekomu nešto prepustili ili uručili bez traženja novca zauzvrat",
                slika: "slike/dati.jpg",
                opis: "Dati znači da smo nekomu nešto prepustili ili uručili bez traženja novca zauzvrat.",
                boja_pozadine: "#FCE4EC"
            },
            {
                question: "pomagati",
                answers: ["davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim", strava = stvori2("davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim"), strava2 = stvori2("davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim", strava), stvori2("davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim", strava, strava2)],
                correctAnswer: "davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim",
                slika: "slike/pomagati.jpg",
                opis: "Pomagati znači davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim.",
                boja_pozadine: "#FCE4EC"
            }
            ,
            {
                question: "smetati",
                answers: ["uzemirivati koga", strava = stvori2("uzemirivati koga"), strava2 = stvori2("uzemirivati koga", strava), stvori2("uzemirivati koga", strava, strava2)],
                correctAnswer: "uzemirivati koga",
                slika: "slike/smetati.jpg",
                opis: "Smetati znači uzemirivati koga.",
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
        $("#opis").html("<em>" + quiz[questionCounter].opis + "</em>")
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
                html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:34px' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/>",
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
                    html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:34px' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/>",
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