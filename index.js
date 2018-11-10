var currentQuestion = 1;
const NUM_QUESTIONS = 5;
const END_TIMEOUT = 2000;
var lock = false;

function initialise() {
    currentQuestion = 1;
    document.getElementsByClassName("home-container")[0].style.display = 'block';
    document.getElementsByClassName("about-container")[0].style.display = 'none';
    document.getElementsByClassName("question-container")[0].style.display = 'none';
    document.getElementsByClassName("end-container")[0].style.display = 'none';
    document.getElementById("back").style.display = 'none';
    document.getElementById("next").style.display = 'none';
}

function about() {
    if(lock === true) return;
    lock = true;
    document.getElementById("about-text").classList.add("move-right-fade");
    setTimeout(() => {
        document.getElementById("about-text").classList.remove("move-right-fade");
        document.getElementsByClassName("home-container")[0].style.display = 'none';
        document.getElementsByClassName("about-container")[0].style.display = 'block';
        document.getElementById("back").style.display = 'block';
        document.getElementById("next").style.display = 'none';
        lock = false;
    },1000);
}

function start() {
    if(lock === true) return;
    lock = true;
    document.getElementById("next").innerHTML = "next";
    document.getElementById("start-text").classList.add("move-right-fade");
    setTimeout(() => {
        document.getElementById("start-text").classList.remove("move-right-fade");
        initialiseQuestions();
        document.getElementById("back").style.display = 'block';
        lock = false;
    },1000);
    
}

/**
 * Initialse the questions screen.
 */
function initialiseQuestions() {
    var nums = randomSeries(NUM_QUESTIONS);
    document.getElementsByClassName("home-container")[0].style.display = 'none';
    document.getElementsByClassName("end-container")[0].style.display = 'none';
    document.getElementsByClassName("question-container")[0].style.display = 'block';
    document.getElementById("back").style.display = 'block';
    document.getElementById("next").style.display = 'block';
    for(var i=1; i<=NUM_QUESTIONS; i++) {
        document.getElementById("q"+i).innerText = questions[nums[i-1]].question;
    }
    questionLighting(currentQuestion);
};

/**
 * Sets opacity of all questions. Takes current question index as parameter.
 * @param {*} index 
 */
function questionLighting(index) {
    for(var i=1; i<=NUM_QUESTIONS; i++) {
        if (i < index) {
            document.getElementById("q"+i).classList.remove("fade-in");
            document.getElementById("q"+i).classList.add("fade-out-2");
        }
        else if(i == index) {
            document.getElementById("q"+i).classList.add("fade-in");
            document.getElementById("q"+i).classList.remove("fade-out-2");
        }
        else {
            document.getElementById("q"+i).style.opacity = 0;
            document.getElementById("q"+i).classList.remove("fade-in");
            document.getElementById("q"+i).classList.remove("fade-out-2");
        }
    }
}

function back() {
    if(lock === true) return;
    initialise();
};

function end() {
    document.getElementById("question-container").classList.add("quick-fade");
    document.getElementById("next").classList.add("quick-fade");
    document.getElementById("back").classList.add("quick-fade");
    document.getElementById("end-container").style.display = 'block';
    document.getElementById("end-container").classList.add("quick-fade-in");
    document.getElementById("end").innerHTML = ends[Math.floor( Math.random() * ends.length )].end;
    setTimeout(() => {
        document.getElementById("next").classList.remove("quick-fade");
        document.getElementById("back").classList.remove("quick-fade");
        document.getElementById("question-container").classList.remove("quick-fade");
        document.getElementById("end-container").classList.remove("quick-fade-in");
        for(var i=1; i<=NUM_QUESTIONS; i++) {
            document.getElementById("q"+i).style.opacity = 0;
            document.getElementById("q"+i).classList.remove("fade-in");
            document.getElementById("q"+i).classList.remove("fade-out-2");
        }
        document.getElementsByClassName("question-container")[0].style.display = 'none';
        
        document.getElementById("back").style.display = 'none';
        document.getElementById("next").style.display = 'none';
        setTimeout(() => {
            document.getElementById("end-container").classList.add("quick-fade");
            setTimeout(() => {
                document.getElementById("end-container").classList.remove("quick-fade");
                document.getElementsByClassName("end-container")[0].style.display = 'none';
                lock = false;
            }, 500);
            initialise();
        }, END_TIMEOUT);
    }, 1000);
}

function next() {
    if(lock === true) return;
    currentQuestion++;
    if(currentQuestion > NUM_QUESTIONS) {
        lock = true;
        end();
    }
    else if(currentQuestion == NUM_QUESTIONS) {
        document.getElementById("next").innerHTML = "finish";
        questionLighting(currentQuestion);
    }
    else {
        questionLighting(currentQuestion);
    }
}

function randomSeries(max) {
    var arr = []
    while(arr.length < max) {
        var randomnumber = Math.floor( Math.random() * questions.length );
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    return arr;
};