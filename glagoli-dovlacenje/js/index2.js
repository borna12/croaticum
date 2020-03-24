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

  var shuffleQuestions = false; /* Shuffle questions ? */
  var shuffleAnswers = true; /* Shuffle answers ? */
  var lockedAfterDrag = false; /* Lock items after they have been dragged, i.e. the user get's only one shot for the correct answer */
  var questionCounter = 0;
  var bodovi = 0;
  var pitanja = [{
    question: "dati/pomagati",
    answers: ["daju", "pomažu"],
    definicija: ["Dati označava da smo nekome nešto prepustili ili uručili bez traženja novca zauzvrat.","Pomagati znači davati komu podršku (ljudsku, moralnu, financijsku, fizičku i dr.), odnosno činiti komu što lakšim."],
    slika: ["slike/daju.jpg", "slike/pomazu.jpg"],
    opisi: ["Volonteri", "Vojnici"],
    opisi2: ["beskućnicima odjeću.", "žrtvama rata."]
},
{
    question: "kazati/slati",
    answers: ["kažu", "šalju"],
    definicija: ["Kazati znači reći što, izraziti što riječima.","Slati znači upućivati što na čiju adresu, stvarnu ili virtualnu."],
    slika: ["slike/kazu.jpg", "slike/salju.jpg"],
    opisi: ["Nastavnici", "Restorani"],
    opisi2: ["da moramo učiti kako bismo bili uspješniji.", "hranu dostavnom službom."]
},
{
    question: "govoriti/smijati se",
    answers: ["govore", "se smiju"],
    definicija: ["Govoriti znači izgovarati riječi i rečenice koje postoje u nekom jeziku.","Smijati se znači razvući usta u osmijeh kao izraz veselja i opuštenosti."],
    slika: ["slike/govore.jpg", "slike/smiju.jpg"],
    opisi: ["Mediji", "Ljudi"],
    opisi2: ["da je došlo do epidemije bolesti.", "čudnoj situaciji."]
},

{
    question: "radovati se/pokloniti",
    answers: ["raduju", "poklone"],
    definicija: ["Radovati se znači biti veseo, izražavati radost.","Pokloniti znači dati komu bez plaćanja."],
    slika: ["slike/raduju.jpg", "slike/poklone.jpg"],
    opisi: ["Djeca se", "Mislim da bi bilo dobro da se računala"],
    opisi2: ["poklonima.", "školama."]
},
{
    question: "diviti se/prigovarati",
    answers: ["dive", "prigovaraju"],
    definicija: ["Diviti se znači pokazati da nam se tko ili što jako sviđa, da smo fascinirani kime ili čime.","Prigovarati znači upućivati komu prigovor."],
    slika: ["slike/dive.jpg", "slike/prigovaraju.jpg"],
    opisi: ["Ljudi se", "Djevojke"],
    opisi2: ["herojima.", "momcima jer nisu pospremili sobu."]
},
{
    question: "zahvaljivati/smetati",
    answers: ["zahvaljuju", "smetaju"],
    definicija: ["Zahvaljivati znači izražavati zahvalnost.","Smetati znači uzemirivati koga."],
    slika: ["slike/zahvaljuje.jpg", "slike/smetaju.jpg"],
    opisi: ["Organizatori skupa", "Komarci"],
    opisi2: ["predavačima.", "ljudima za vrijeme ljeta."]
},
{
    question: "približavati/vjerovati",
    answers: ["približavaju", "vjeruju"],
    definicija: ["Približavati se znači dolaziti blizu kome ili čemu.","Vjerovati znači imati povjerenja u koga ili što."],
    slika: ["slike/priblizavaju.jpg", "slike/vjeruju.jpg"],
    opisi: ["Maja i Ivana", "U braku muž i žena"],
    opisi2: ["se kući.", "jedan drugome."]
}
,{
    question: "čuditi se/pisati",
    answers: ["Čudimo se", "Pišemo"],
    definicija: ["Čuditi se znači biti u čudu, biti iznenađen čime neočekivanim.","Pisati znači bilježiti slova i brojke na papiru, ploči ili čemu drugom."],
    slika: ["slike/cudimo.jpg", "slike/pisemo.jpg"],
    opisi: ["", ""],
    opisi2: ["neobičnoj situaciji.", "izvještaj za šefa."]
}
,{
    question: "veseliti se/nadati se",
    answers: ["Veselimo se", "Nadamo se"],
    definicija: ["Veseliti se znači osjećati veselje ili radost, biti veseo.","Nadati se znači imati nadu, očekivati da će se ostvariti nešto što želimo."],
    slika: ["slike/veselimo.jpg", "slike/nadamo.jpg"],
    opisi: ["", ""],
    opisi2: ["praznicima.", "da će naša nogometna reprezentacija pobijediti."]
}

];

  function quizIsFinished() {
      questionCounter++
      if (questionCounter == pitanja.length) {
          swal({
              title: "Čestitam! Došli ste do kraja igre.",
              html: "<p>Vrijeme potrebno za rješavanje zadataka: </p><p style='text-align:center'>"+$("#basicUsage").text()+"</p><p>broj točnih odgovora: </p><p style='text-align:center'>"+bodovi +"</p><p>postotak točnih odgovora: </p><p style='text-align:center'>"+Math.round((bodovi/pitanja.length)*100)+"%"+"</p>",
              confirmButtonText: 'nova igra',
              confirmButtonColor: '#009DE0',
              backdrop: false,
              closeOnCancel: false,
              allowOutsideClick: false,

          })
          $('.swal2-confirm').click(function () {
             window.open("index.html","_self")
          })
         
      } else {
          $(".btn-holder").show(300);
          $(".btn-holder").click(function () {
              dragDropResetForm()
              sranje()
          })
      }
      // This function is called when everything is solved		

  }


  /* Don't change anything below here */
  var dragContentDiv = false;
  var dragContent = false;

  var dragSource = false;
  var dragDropTimer = -1;
  var destinationObjArray = new Array();
  var destination = false;
  var dragSourceParent = false;
  var dragSourceNextSibling = false;
  var answerDiv;
  var questionDiv;
  var sourceObjectArray = new Array();
  var arrayOfEmptyBoxes = new Array();
  var arrayOfAnswers = new Array();
  var toc = 0;

  function getTopPos(inputObj) {
      if (!inputObj || !inputObj.offsetTop) return 0;
      var returnValue = inputObj.offsetTop;
      while ((inputObj = inputObj.offsetParent) != null) returnValue += inputObj.offsetTop;
      return returnValue;
  }

  function getLeftPos(inputObj) {
      if (!inputObj || !inputObj.offsetLeft) return 0;
      var returnValue = inputObj.offsetLeft;
      while ((inputObj = inputObj.offsetParent) != null) returnValue += inputObj.offsetLeft;
      return returnValue;
  }

  function cancelEvent() {
      return false;
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


  shuffle(pitanja);

  function randomPitanja() {
      ran = Math.floor(Math.random() * 2) + 1
      s1 = "<img src='" + pitanja[questionCounter].slika[0] + "' class='slikica' id='sli1'>"
      s2 = "<img src='" + pitanja[questionCounter].slika[1] + "' class='slikica' id='sli2'>"
      d1="<p class='definicija1' style=' opacity: 0;'>"+pitanja[questionCounter].definicija[0]+"</p>"
      d2="<p class='definicija2' style='opacity: 0;'>"+pitanja[questionCounter].definicija[1]+"</p>"
      r1 = '<div class="rad1">' + pitanja[questionCounter].opisi[0] + '</div>'
      r11 = '<div class="rad11">' + pitanja[questionCounter].opisi2[0] + '</div>'
      r2 = '<div class="rad2">' + pitanja[questionCounter].opisi[1] + '</div>'
      r22 = '<div class="rad22">' + pitanja[questionCounter].opisi2[1] + '</div>'

      if (ran == 1) {
          $("#o1").html(s1 + r1 + ' <div class="dragDropSmallBox" id="q1"></div><div class="destinationBox"></div> ' + r11+d1)
          $("#o2").html(s2 + r2 + ' <div class="dragDropSmallBox" id="q2"></div><div class="destinationBox"></div> ' + r22+d2)
      } else {
          $("#o2").html(s1 + r1 + ' <div class="dragDropSmallBox" id="q1"></div><div class="destinationBox"></div> ' + r11+d1)
          $("#o1").html(s2 + r2 + ' <div class="dragDropSmallBox" id="q2"></div><div class="destinationBox"></div> ' + r22+d2)
      }

      $("#a1").html(pitanja[questionCounter].answers[0])
      $("#a2").html(pitanja[questionCounter].answers[1])
      $(".opis").html(questionCounter + 1 + "/" + pitanja.length + "<br><br>" + pitanja[questionCounter].question)

  }


  function initDragDrop(e) {
      //stvaranje pitanj
      if (document.all) e = event;
      if (lockedAfterDrag && this.parentNode.parentNode.id == 'questionDiv') return;
      dragContentDiv.style.left = e.clientX + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) - 120 + 'px';
      dragContentDiv.style.top = e.clientY + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - 80 + 'px';
      dragSource = this;
      dragSourceParent = this.parentNode;
      dragSourceNextSibling = false;
      if (this.nextSibling) dragSourceNextSibling = this.nextSibling;
      if (!dragSourceNextSibling.tagName) dragSourceNextSibling = dragSourceNextSibling.nextSibling;
      dragDropTimer = 0;
      timeoutBeforeDrag();
      return false;
  }

  function timeoutBeforeDrag() {
      if (dragDropTimer >= 0 && dragDropTimer < 10) {
          dragDropTimer = dragDropTimer + 1;
          setTimeout('timeoutBeforeDrag()', 10);
          return;
      }
      if (dragDropTimer >= 10) {
          dragContentDiv.style.display = 'block';
          dragContentDiv.innerHTML = '';
          dragContentDiv.appendChild(dragSource);
      }
  }

  function dragDropMove(e) {
      if (dragDropTimer < 10) {
          return;
      }

      if (document.all) e = event;

      var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);

      dragContentDiv.style.left = e.clientX + scrollLeft - 120 + 'px';
      dragContentDiv.style.top = e.clientY + scrollTop - 80 + 'px';

      var dragWidth = dragSource.offsetWidth;
      var dragHeight = dragSource.offsetHeight;

      var objFound = false;

      var mouseX = e.clientX + scrollLeft;
      var mouseY = e.clientY + scrollTop;

      destination = false;
      for (var no = 0; no < destinationObjArray.length; no++) {
          var left = destinationObjArray[no]['left'];
          var top = destinationObjArray[no]['top'];
          var width = destinationObjArray[no]['width'];
          var height = destinationObjArray[no]['height'];
          destinationObjArray[no]['obj'].className = 'destinationBox';
          var subs = destinationObjArray[no]['obj'].getElementsByTagName('DIV');
          if (!objFound && subs.length == 0) {
              if (mouseX < (left / 1 + width / 1) && (mouseX + dragWidth / 1) > left && mouseY < (top / 1 + height / 1) && (mouseY + dragHeight / 1) > top) {
                  destinationObjArray[no]['obj'].className = 'dragContentOver';
                  destination = destinationObjArray[no]['obj'];
                  objFound = true;
              }
          }
      }

      sourceObjectArray['obj'].className = '';

      if (!objFound) {
          var left = sourceObjectArray['left'];
          var top = sourceObjectArray['top'];
          var width = sourceObjectArray['width'];
          var height = sourceObjectArray['height'];

          if (mouseX < (left / 1 + width / 1) && (mouseX + dragWidth / 1) > left && mouseY < (top / 1 + height / 1) && (mouseY + dragHeight / 1) > top) {
              destination = sourceObjectArray['obj'];
              sourceObjectArray['obj'].className = 'dragContentOver';
          }
      }
      return false;
  }


  function dragDropEnd() {
      if (dragDropTimer < 10) {
          dragDropTimer = -1;
          return;
      }
      dragContentDiv.style.display = 'none';
      sourceObjectArray['obj'].style.backgroundColor = '#FFF';
      if (destination) {
          destination.appendChild(dragSource);
          destination.className = 'destinationBox';
          // Check if position is correct, i.e. correct answer to the question
          if (!destination.id || destination.id != 'answerDiv') {
              var previousEl = dragSource.parentNode.previousSibling;
              if (!previousEl.tagName) previousEl = previousEl.previousSibling;
              var numericId = previousEl.id.replace(/[^0-9]/g, '');
              var numericIdSource = dragSource.id.replace(/[^0-9]/g, '');
              if (numericId == numericIdSource) {
                  dragSource.className = 'correctAnswer'+numericId;
                  $( ".definicija" +numericId).css({"opacity":"1"})
                  $(".correctAnswer"+numericId).parent().html( "<section class='correctAnswer"+numericId+"'>"+$(".correctAnswer"+numericId).text()+"</section>")
                  checkAllAnswers();
                  
              } else {
                  dragSource.className = 'wrongAnswer';
                  bodovi-=1
              }

          }
          if (destination.id && destination.id == 'answerDiv') {
              dragSource.className = 'dragDropSmallBox';
          }
      } else {
          answerDiv = document.getElementById('answerDiv');
          answerDiv.appendChild(dragSource);
      }
      dragDropTimer = -1;
      dragSourceNextSibling = false;
      dragSourceParent = false;
      destination = false;
  }

  function checkAllAnswers() {
      if ($('.correctAnswer1').length == 1 && $('.correctAnswer2').length == 1) {
          bodovi+=1
          quizIsFinished();
          dragContentDiv = false;
          dragContent = false;
          dragSource = false;
      }


      for (var no = 0; no < arrayOfEmptyBoxes.length; no++) {
          var sub = arrayOfEmptyBoxes[no].getElementsByTagName('DIV');
          if (sub.length == 0) return;

          if (sub[0].className != 'correctAnswer') {
              return;
          }

      }

  }



  function resetPositions() {
      if (dragDropTimer >= 10) return;

      for (var no = 0; no < destinationObjArray.length; no++) {
          if (destinationObjArray[no]['obj']) {
              destinationObjArray[no]['left'] = getLeftPos(destinationObjArray[no]['obj'])
              destinationObjArray[no]['top'] = getTopPos(destinationObjArray[no]['obj'])
          }

      }
      sourceObjectArray['left'] = getLeftPos(answerDiv);
      sourceObjectArray['top'] = getTopPos(answerDiv);
  }



  function sranje() {
      randomPitanja();

      dragContentDiv = document.getElementById('dragContent');

      answerDiv = document.getElementById('answerDiv');
      answerDiv.onselectstart = cancelEvent;
      var divs = answerDiv.getElementsByTagName('DIV');





      questionDiv = document.getElementById('questionDiv');

      questionDiv.onselectstart = cancelEvent;
      var divs = questionDiv.getElementsByTagName('DIV');

      var questions = new Array();
      var questionsOpenBoxes = new Array();


      for (var no = 0; no < divs.length; no++) {
          if (divs[no].className == 'destinationBox') {
              var index = destinationObjArray.length;
              destinationObjArray[index] = new Array();
              destinationObjArray[index]['obj'] = divs[no];
              destinationObjArray[index]['left'] = getLeftPos(divs[no])
              destinationObjArray[index]['top'] = getTopPos(divs[no])
              destinationObjArray[index]['width'] = divs[no].offsetWidth;
              destinationObjArray[index]['height'] = divs[no].offsetHeight;;
          }
          if (divs[no].className == 'dragDropSmallBox') {
              questions[questions.length] = divs[no];
          }

      }

      if (shuffleQuestions) {
          for (var no = 0; no < (questions.length * 10); no++) {
              var randomIndex = Math.floor(Math.random() * questions.length);

              questionDiv.appendChild(questions[randomIndex]);
              questionDiv.appendChild(questionsOpenBoxes[randomIndex]);

              destinationObjArray[destinationObjArray.length] = destinationObjArray[randomIndex];
              destinationObjArray.splice(randomIndex, 1);
              questions[questions.length] = questions[randomIndex];
              questions.splice(randomIndex, 1);
              questionsOpenBoxes[questionsOpenBoxes.length] = questionsOpenBoxes[randomIndex];
              questionsOpenBoxes.splice(randomIndex, 1);
          }
      }

      questionDiv.style.visibility = 'visible';
      answerDiv.style.visibility = 'visible';

      document.documentElement.onmouseup = dragDropEnd;
      document.documentElement.onmousemove = dragDropMove;
      setTimeout('resetPositions()', 150);
      window.onresize = resetPositions;
  }

  //ovjde treba raditi
  function initDragDropScript() {
      randomPitanja();

      dragContentDiv = document.getElementById('dragContent');

      answerDiv = document.getElementById('answerDiv');
      answerDiv.onselectstart = cancelEvent;
      var divs = answerDiv.getElementsByTagName('DIV');
      var answers = new Array();

      for (var no = 0; no < divs.length; no++) {
          if (divs[no].className == 'dragDropSmallBox') {
              divs[no].onmousedown = initDragDrop;
              answers[answers.length] = divs[no];
              arrayOfAnswers[arrayOfAnswers.length] = divs[no];
          }

      }

      if (shuffleAnswers) {
          for (var no = 0; no < (answers.length * 10); no++) {
              var randomIndex = Math.floor(Math.random() * answers.length);
              answerDiv.appendChild(answers[randomIndex]);
          }
      }

      sourceObjectArray['obj'] = answerDiv;
      sourceObjectArray['left'] = getLeftPos(answerDiv);
      sourceObjectArray['top'] = getTopPos(answerDiv);
      sourceObjectArray['width'] = answerDiv.offsetWidth;
      sourceObjectArray['height'] = answerDiv.offsetHeight;


      questionDiv = document.getElementById('questionDiv');

      questionDiv.onselectstart = cancelEvent;
      var divs = questionDiv.getElementsByTagName('DIV');

      var questions = new Array();
      var questionsOpenBoxes = new Array();


      for (var no = 0; no < divs.length; no++) {
          if (divs[no].className == 'destinationBox') {
              var index = destinationObjArray.length;
              destinationObjArray[index] = new Array();
              destinationObjArray[index]['obj'] = divs[no];
              destinationObjArray[index]['left'] = getLeftPos(divs[no])
              destinationObjArray[index]['top'] = getTopPos(divs[no])
              destinationObjArray[index]['width'] = divs[no].offsetWidth;
              destinationObjArray[index]['height'] = divs[no].offsetHeight;
              questionsOpenBoxes[questionsOpenBoxes.length] = divs[no];
              arrayOfEmptyBoxes[arrayOfEmptyBoxes.length] = divs[no];
          }
          if (divs[no].className == 'dragDropSmallBox') {
              questions[questions.length] = divs[no];
          }

      }

      if (shuffleQuestions) {
          for (var no = 0; no < (questions.length * 10); no++) {
              var randomIndex = Math.floor(Math.random() * questions.length);

              questionDiv.appendChild(questions[randomIndex]);
              questionDiv.appendChild(questionsOpenBoxes[randomIndex]);

              destinationObjArray[destinationObjArray.length] = destinationObjArray[randomIndex];
              destinationObjArray.splice(randomIndex, 1);
              questions[questions.length] = questions[randomIndex];
              questions.splice(randomIndex, 1);
              questionsOpenBoxes[questionsOpenBoxes.length] = questionsOpenBoxes[randomIndex];
              questionsOpenBoxes.splice(randomIndex, 1);
          }
      }

      questionDiv.style.visibility = 'visible';
      answerDiv.style.visibility = 'visible';

      document.documentElement.onmouseup = dragDropEnd;
      document.documentElement.onmousemove = dragDropMove;
      setTimeout('resetPositions()', 150);
      window.onresize = resetPositions;
  }



  /* Reset the form */
  function dragDropResetForm() {
      $(".btn-holder").hide(300);
      for (var no = 0; no < arrayOfAnswers.length; no++) {
          arrayOfAnswers[no].className = 'dragDropSmallBox'
          answerDiv.appendChild(arrayOfAnswers[no]);
      }
  }

  window.onload = initDragDropScript;