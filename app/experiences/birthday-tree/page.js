"use client";

import { useEffect } from "react";

export default function BirthdaySurprisePage() {
  useEffect(() => {
    // All interactive behaviour is kept in this page, and starts after the DOM mounts.
    /* =========================================================
       BIRTHDAY SURPRISE WEBSITE
       Made with ❤️ by DAMAPREET SINGH

       =========================================================

       CHANGE THIS ONE LINE FOR THE RECIPIENT

       Example:

       const RECIPIENT_NAME = "Suuuuuuu";

       ========================================================= */


    /* =========================================================
       RECIPIENT
    ========================================================= */

    const RECIPIENT_NAME = " Lipsy";


    /* =========================================================
       GET ELEMENTS
    ========================================================= */

    const intro =
        document.getElementById("intro");

    const treeScreen =
        document.getElementById("treeScreen");

    const memories =
        document.getElementById("memories");

    const pokemonScreen =
        document.getElementById("pokemonScreen");

    const finalScreen =
        document.getElementById("finalScreen");


    const startButton =
        document.getElementById("startButton");

    const continueButton =
        document.getElementById("continueButton");

    const pokemonButton =
        document.getElementById("pokemonButton");

    const finalButton =
        document.getElementById("finalButton");

    const replayButton =
        document.getElementById("replayButton");


    const music =
        document.getElementById("birthdayMusic");


    /* Poké Ball */

    const pokemonIntro =
        document.getElementById("pokemonIntro");

    const pokeball =
        document.getElementById("pokeball");

    const photoReveal =
        document.getElementById("photoReveal");


    /* =========================================================
       INSERT RECIPIENT NAME
    ========================================================= */

    function setRecipientName() {

        document.title =
            `Happy Birthday ${RECIPIENT_NAME} ❤️`;


        const introName =
            document.getElementById(
                "introName"
            );


        const finalName =
            document.getElementById(
                "finalName"
            );


        if (introName) {

            introName.textContent =
                RECIPIENT_NAME;

        }


        if (finalName) {

            finalName.textContent =
                RECIPIENT_NAME;

        }


        document
            .querySelectorAll(
                ".recipient-name"
            )
            .forEach(
                element => {

                    element.textContent =
                        RECIPIENT_NAME;

                }
            );

    }


    setRecipientName();


    /* =========================================================
       SCREEN SWITCH
    ========================================================= */

    function showScreen(screen) {

        if (!screen) {
            return;
        }


        document
            .querySelectorAll(".screen")
            .forEach(
                screenItem => {

                    screenItem.classList.remove(
                        "active"
                    );

                }
            );


        screen.classList.add(
            "active"
        );

    }


    /* =========================================================
       MUSIC
    ========================================================= */

    function startMusic() {

        if (!music) {
            return;
        }


        music.volume =
            0.45;


        music
            .play()
            .catch(
                error => {

                    console.log(
                        "Music could not autoplay:",
                        error
                    );

                }
            );

    }


    /* =========================================================
       START BUTTON
    ========================================================= */

    startButton.addEventListener(
        "click",
        function () {


            /*
               Start music after the
               user's button click.
            */

            startMusic();


            /*
               Immediately move
               to the tree screen.
            */

            showScreen(
                treeScreen
            );


            /*
               Start tree animation.
            */

            setTimeout(
                startTreeAnimation,
                300
            );

        }
    );


    /* =========================================================
       TREE CANVAS
    ========================================================= */

    const canvas =
        document.getElementById(
            "treeCanvas"
        );


    const ctx =
        canvas.getContext("2d");


    let width =
        window.innerWidth;


    let height =
        window.innerHeight;


    let branches = [];

    let hearts = [];

    let particles = [];

    let treeProgress = 0;

    let treeStarted = false;


    /* =========================================================
       CANVAS RESIZE
    ========================================================= */

    function resizeCanvas() {

        const ratio =
            window.devicePixelRatio || 1;


      const treeBounds = canvas.parentElement.getBoundingClientRect();

width = treeBounds.width;
height = treeBounds.height;


        canvas.width =
            width * ratio;


        canvas.height =
            height * ratio;


        canvas.style.width =
            width + "px";


        canvas.style.height =
            height + "px";


        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );

    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =========================================================
       CREATE BRANCH
    ========================================================= */

    function createBranch(
        x,
        y,
        length,
        angle,
        thickness,
        depth
    ) {


        if (depth <= 0) {
            return;
        }


        const endX =
            x +
            Math.cos(angle) *
            length;


        const endY =
            y +
            Math.sin(angle) *
            length;


        branches.push({

            x1: x,

            y1: y,

            x2: endX,

            y2: endY,

            thickness: thickness,

            progress: 0

        });


        const nextLength =
            length * 0.72;


        const spread =
            0.48;


        createBranch(
            endX,
            endY,
            nextLength,
            angle - spread,
            thickness * 0.68,
            depth - 1
        );


        createBranch(
            endX,
            endY,
            nextLength,
            angle + spread,
            thickness * 0.68,
            depth - 1
        );

    }


    /* =========================================================
       CREATE TREE
    ========================================================= */

    function createTree() {

        branches = [];


        const baseX =
            width / 2;


        const baseY =
            Math.min(
                height * 0.90,
                720
            );


        createBranch(
            baseX,
            baseY,
            height * 0.28,
            -Math.PI / 2,
            14,
            7
        );

    }


    /* =========================================================
       CREATE HEARTS
    ========================================================= */

    function createHearts() {

        hearts = [];


        branches.forEach(
            (branch, index) => {


                if (
                    index % 2 !== 0
                ) {

                    return;

                }


                const t =
                    Math.random() *
                    0.85 +
                    0.08;


                const x =
                    branch.x1 +
                    (
                        branch.x2 -
                        branch.x1
                    ) *
                    t;


                const y =
                    branch.y1 +
                    (
                        branch.y2 -
                        branch.y1
                    ) *
                    t;


                hearts.push({

                    x: x,

                    y: y,

                    size:
                        Math.random() *
                        5 +
                        4,

                    delay:
                        Math.random() *
                        0.7,

                    opacity:
                        0

                });

            }
        );

    }


    /* =========================================================
       PARTICLES
    ========================================================= */

    function createParticles() {

        particles = [];


        for (
            let i = 0;
            i < 120;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    width,

                y:
                    Math.random() *
                    height,

                size:
                    Math.random() *
                    2 +
                    0.5,

                speed:
                    Math.random() *
                    0.4 +
                    0.1,

                opacity:
                    Math.random() *
                    0.5 +
                    0.2

            });

        }

    }


    /* =========================================================
       DRAW HEART
    ========================================================= */

    function drawHeart(
        x,
        y,
        size,
        opacity
    ) {

        ctx.save();


        ctx.translate(
            x,
            y
        );


        ctx.scale(
            size,
            size
        );


        ctx.beginPath();


        ctx.moveTo(
            0,
            0.3
        );


        ctx.bezierCurveTo(
            -1.2,
            -0.5,
            -0.7,
            -1.5,
            0,
            -0.8
        );


        ctx.bezierCurveTo(
            0.7,
            -1.5,
            1.2,
            -0.5,
            0,
            0.3
        );


        ctx.closePath();


        ctx.fillStyle =
            `rgba(
                255,
                70,
                145,
                ${opacity}
            )`;


        ctx.shadowColor =
            "rgba(255,70,150,.9)";


        ctx.shadowBlur =
            12;


        ctx.fill();


        ctx.restore();

    }


    /* =========================================================
       DRAW PARTICLES
    ========================================================= */

    function drawParticles() {

        particles.forEach(
            particle => {


                particle.y -=
                    particle.speed;


                if (
                    particle.y < -10
                ) {

                    particle.y =
                        height + 10;

                }


                ctx.beginPath();


                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(
                        255,
                        190,
                        220,
                        ${particle.opacity}
                    )`;


                ctx.fill();

            }
        );

    }


    /* =========================================================
       DRAW TREE
    ========================================================= */

    function drawTree() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        drawParticles();


        /* Ground */

        const ground =
            ctx.createRadialGradient(
                width / 2,
                height * 0.90,
                0,
                width / 2,
                height * 0.90,
                300
            );


        ground.addColorStop(
            0,
            "rgba(255,60,150,.25)"
        );


        ground.addColorStop(
            1,
            "rgba(255,60,150,0)"
        );


        ctx.fillStyle =
            ground;


        ctx.fillRect(
            0,
            height * 0.72,
            width,
            height * 0.28
        );


        /* Branches */

        branches.forEach(
            (branch, index) => {


                branch.progress =
                    Math.min(
                        1,
                        treeProgress -
                        (
                            index /
                            branches.length
                        ) *
                        0.30
                    );


                if (
                    branch.progress <= 0
                ) {

                    return;

                }


                const x =
                    branch.x1 +
                    (
                        branch.x2 -
                        branch.x1
                    ) *
                    branch.progress;


                const y =
                    branch.y1 +
                    (
                        branch.y2 -
                        branch.y1
                    ) *
                    branch.progress;


                ctx.beginPath();


                ctx.moveTo(
                    branch.x1,
                    branch.y1
                );


                ctx.lineTo(
                    x,
                    y
                );


                ctx.strokeStyle =
                    "rgba(110,65,75,.95)";


                ctx.lineWidth =
                    branch.thickness;


                ctx.lineCap =
                    "round";


                ctx.stroke();

            }
        );


        /* Hearts */

        hearts.forEach(
            heart => {


                if (
                    treeProgress <
                    heart.delay
                ) {

                    return;

                }


                heart.opacity =
                    Math.min(
                        1,
                        heart.opacity +
                        0.025
                    );


                const pulse =
                    1 +
                    Math.sin(
                        Date.now() *
                        0.003 +
                        heart.x
                    ) *
                    0.08;


                drawHeart(
                    heart.x,
                    heart.y,
                    heart.size * pulse,
                    heart.opacity
                );

            }
        );


        if (
            treeStarted
        ) {

            treeProgress =
                Math.min(
                    1.25,
                    treeProgress +
                    0.0035
                );

        }


        requestAnimationFrame(
            drawTree
        );

    }


    /* =========================================================
       START TREE
    ========================================================= */

    function startTreeAnimation() {

        if (
            treeStarted
        ) {

            return;

        }


        treeStarted =
            true;


        treeProgress =
            0;


        createTree();


        createHearts();


        createParticles();


        drawTree();


        setTimeout(
            showBirthdayMessage,
            4500
        );

    }


    /* =========================================================
       BIRTHDAY MESSAGE
    ========================================================= */

    function showBirthdayMessage() {

        const container =
            document.getElementById(
                "messageLines"
            );


        container.style.display =
            "block";


        const lines =
            container.querySelectorAll(
                "p"
            );


        lines.forEach(
            (line, index) => {


                setTimeout(
                    () => {

                        line.classList.add(
                            "show"
                        );

                    },

                    index * 1000

                );

            }
        );


        setTimeout(
            () => {

                continueButton.classList.add(
                    "visible"
                );

            },

            lines.length *
            1000 +
            1000

        );

    }


    /* =========================================================
       TREE → MEMORIES
    ========================================================= */

    continueButton.addEventListener(
        "click",
        () => {

            showScreen(
                memories
            );

        }
    );


    /* =========================================================
       MEMORIES → POKÉ BALL
    ========================================================= */

    pokemonButton.addEventListener(
        "click",
        () => {

            showScreen(
                pokemonScreen
            );

        }
    );


    /* =========================================================
       POKÉ BALL
    ========================================================= */

    let pokeballOpened =
        false;


    /* Click */

    pokeball.addEventListener(
        "click",
        openPokeball
    );


    /* Keyboard */

    pokeball.addEventListener(
        "keydown",
        event => {


            if (
                event.key === "Enter" ||
                event.key === " "
            ) {


                event.preventDefault();


                openPokeball();

            }

        }
    );


    /* =========================================================
       OPEN POKÉ BALL
    ========================================================= */

    function openPokeball() {


        if (
            pokeballOpened
        ) {

            return;

        }


        pokeballOpened =
            true;


        /*
           Start Poké Ball animation.
        */

        pokeball.classList.add(
            "open"
        );


        /*
           Hide the ENTIRE Poké Ball intro.

           This is the important fix.

           It removes:

           - One last surprise
           - Something special...
           - Poké Ball
           - Tap the Poké Ball
        */

        setTimeout(
            () => {

                pokemonIntro.classList.add(
                    "hide"
                );

            },

            300
        );


        /*
           Explosion.
        */

        createEnergyExplosion();


        /*
           Photo.
        */

        setTimeout(
            () => {

                photoReveal.classList.add(
                    "show"
                );

            },

            700
        );

    }


    /* =========================================================
       ENERGY EXPLOSION
    ========================================================= */

    function createEnergyExplosion() {


        const symbols = [

            "⚡",
            "✨",
            "💖",
            "❤️",
            "⭐",
            "🌸",
            "💫"

        ];


        for (
            let i = 0;
            i < 65;
            i++
        ) {


            const element =
                document.createElement(
                    "div"
                );


            element.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            element.style.position =
                "fixed";


            element.style.left =
                "50%";


            element.style.top =
                "50%";


            element.style.zIndex =
                "200";


            element.style.pointerEvents =
                "none";


            element.style.fontSize =
                (
                    Math.random() *
                    20 +
                    10
                ) +
                "px";


            element.style.transition =
                "transform 1.4s ease-out, opacity 1.4s ease-out";


            document.body.appendChild(
                element
            );


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                100 +
                Math.random() *
                350;


            const x =
                Math.cos(angle) *
                distance;


            const y =
                Math.sin(angle) *
                distance;


            requestAnimationFrame(
                () => {


                    element.style.transform =
                        `translate(
                            ${x}px,
                            ${y}px
                        )
                        scale(
                            ${Math.random() + .5}
                        )`;


                    element.style.opacity =
                        "0";

                }
            );


            setTimeout(
                () => {

                    element.remove();

                },

                1600

            );

        }

    }


    /* =========================================================
       PHOTO → FINAL
    ========================================================= */

    finalButton.addEventListener(
        "click",
        () => {


            showScreen(
                finalScreen
            );


            createConfetti();

        }
    );


    /* =========================================================
       CONFETTI
    ========================================================= */

    function createConfetti() {


        const container =
            document.getElementById(
                "confetti"
            );


        container.innerHTML =
            "";


        const symbols = [

            "❤️",
            "💕",
            "💖",
            "✨",
            "🌸",
            "🎉",
            "⭐",
            "🎀",
            "⚡"

        ];


        for (
            let i = 0;
            i < 110;
            i++
        ) {


            const piece =
                document.createElement(
                    "div"
                );


            piece.className =
                "confetti";


            piece.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            piece.style.left =
                Math.random() *
                100 +
                "vw";


            piece.style.fontSize =
                Math.random() *
                15 +
                8 +
                "px";


            piece.style.animationDuration =
                Math.random() *
                3 +
                3 +
                "s";


            piece.style.animationDelay =
                Math.random() *
                1.5 +
                "s";


            container.appendChild(
                piece
            );

        }

    }


    /* =========================================================
       REPLAY
    ========================================================= */

    replayButton.addEventListener(
        "click",
        () => {

            location.reload();

        }
    );
  }, []);

  return (
    <main className="birthday-app">
            {/* Background */}

                <div className="stars"></div>

                <div className="background-glow"></div>


                {/* Music */}

                <audio
                    id="birthdayMusic"
                    loop
                    preload="auto"
                >

                    <source
                        src="/music.mp3"
                        type="audio/mpeg"
                     />

                </audio>


                {/* =====================================================
                     SCREEN 1
                ====================================================== */}

                <section
                    id="intro"
                    className="screen active"
                >

                    <div className="intro-content">

                        <div className="intro-heart">
                            ♥
                        </div>

                        <p className="eyebrow">
                            A little surprise for you
                        </p>

                        <h1>

                            Hey

                            <span id="introName">
                                __________
                            </span>

                            ❤️

                        </h1>

                        <p className="intro-text">

                            I made something special
                            just for you.

                        </p>

                        <button
                            id="startButton"
                            className="primary-button"
                            type="button"
                        >

                            Open Your Surprise ♥️

                        </button>

                        <div className="creator-credit">

                            Made with ❤️ by

                            <strong>
                                DAMAPREET SINGH
                            </strong>

                        </div>

                    </div>

                </section>



                {/* =====================================================
                     SCREEN 2
                ====================================================== */}

                <section
                    id="treeScreen"
                    className="screen"
                >

                    <div className="tree-top-text">

                        Something beautiful is growing
                        for you... ✨

                    </div>


                    <canvas id="treeCanvas"></canvas>


                    <div className="tree-message">

                        <div id="messageLines">

                            <p>
                                My dearest
                                <span className="recipient-name">
                                    __________
                                </span>
                                ❤️
                            </p>

                            <p>
                                Happy Birthday! 🎂
                            </p>

                            <p>
                                May GOD bless you
                                with endless happiness 🤍
                            </p>

                            <p>
                                May all your dreams come true ✨
                            </p>

                            <p>
                                Keep smiling and shining always 💕
                            </p>

                            <p>
                                You deserve every beautiful
                                thing in this world 🥺❤️
                            </p>

                            <p>
                                And I will always wish
                                the best for you. ❤️
                            </p>

                        </div>

                    </div>


                    <button
                        id="continueButton"
                        className="secondary-button"
                        type="button"
                    >

                        There's more... ✨

                    </button>


                    <div className="bottom-credit">

                        Made with ❤️ by

                        <strong>
                            DAMAPREET SINGH
                        </strong>

                    </div>

                </section>



                {/* =====================================================
                     SCREEN 3
                ====================================================== */}

                <section
                    id="memories"
                    className="screen"
                >

                    <div className="section-container">

                        <p className="eyebrow">

                            Just for

                            <span className="recipient-name">
                                __________
                            </span>

                        </p>


                        <h2 className="pt-12">

                            You make ordinary moments

                            <br />

                            feel

                            <span>
                                special.
                            </span>

                        </h2>


                        <div className="memory-grid">


                            <div className="memory-card">

                                <div className="memory-icon">
                                    😊
                                </div>

                                <h3>
                                    Your Smile
                                </h3>

                                <p>

                                    Never stop smiling.
                                    It makes everything around
                                    you a little brighter.

                                </p>

                            </div>



                            <div className="memory-card">

                                <div className="memory-icon">
                                    ✨
                                </div>

                                <h3>
                                    Your Energy
                                </h3>

                                <p>

                                    You have a special way
                                    of making ordinary moments
                                    memorable.

                                </p>

                            </div>



                            <div className="memory-card">

                                <div className="memory-icon">
                                    ❤️
                                </div>

                                <h3>
                                    Simply You
                                </h3>

                                <p>

                                    You don't need to change.
                                    Being yourself is already
                                    something beautiful.

                                </p>

                            </div>


                        </div>


                        <button
                            id="pokemonButton"
                            className="primary-button"
                            type="button"
                        >

                            Your Final Surprise ⚡

                        </button>


                        <div className="static-credit">

                            Made with ❤️ by

                            <strong>
                                DAMAPREET SINGH
                            </strong>

                        </div>

                    </div>

                </section>



                {/* =====================================================
                     SCREEN 4
                ====================================================== */}

                <section
                    id="pokemonScreen"
                    className="screen"
                >

                    <div className="pokemon-scene">


                        {/* Poké Ball area */}

                        <div
                            id="pokemonIntro"
                            className="pokemon-intro"
                        >

                            <p className="eyebrow">

                                One last surprise...

                            </p>


                            <h2 className="pokemon-title">

                                Something special
                                is waiting for you ❤️

                            </h2>


                            <div
                                id="pokeball"
                                className="pokeball"
                                role="button"
                                tabIndex="0"
                                aria-label="Open the surprise"
                            >

                                <div className="pokeball-aura"></div>

                                <div className="pokeball-top"></div>

                                <div className="pokeball-bottom"></div>

                                <div className="pokeball-line"></div>

                                <div className="pokeball-center">

                                    <div className="pokeball-center-inner"></div>

                                </div>

                                <div className="pokeball-shine"></div>

                            </div>


                            <p
                                id="pokeballHint"
                                className="pokeball-hint"
                            >

                                Tap the Poké Ball ⚡

                            </p>

                        </div>



                        {/* =================================================
                             PHOTO

                             Put recipient photo here:

                             recipient.jpg
                        ================================================== */}

                        <div
                            id="photoReveal"
                            className="photo-reveal"
                        >

                            <div className="photo-aura"></div>


                            <div className="forever-animation" aria-label="Lipsy, May Your World Always Bloom">
                                <div className="forever-line forever-name-line">
                                    {Array.from("Lipsy").map((letter, index) => (
                                        <span key={`name-${index}`} style={{ "--letter-index": index }}>{letter}</span>
                                    ))}
                                </div>
                                    <div className="forever-heart" aria-hidden="true">❤</div>

                                <div className="forever-line forever-line-one">
                                    {Array.from("May Your World").map((letter, index) => (
                                        <span key={`love-${index}`} style={{ "--letter-index": index }}>{letter === " " ? "\u00a0" : letter}</span>
                                    ))}
                                </div>

                                    <div className="forever-heart" aria-hidden="true">❤</div>


                                <div className="forever-line forever-line-last">
                                    {Array.from("Always Bloom").map((letter, index) => (
                                        <span key={`forever-${index}`} style={{ "--letter-index": index }}>{letter}</span>
                                    ))}
                                </div>

                                <div className="forever-sparkles" aria-hidden="true">✦　✧　✦　✧　✦</div>

                            </div>


                            <h3>

                                The world is more beautiful because you're in it, Lipsy. ❤️

                            </h3>


                            <p>

                                Happy Birthday,

                                <span className="recipient-name">
                                    __________
                                </span>

                                ! 🎂✨

                            </p>


                            <p className="photo-message">

                                A little reminder, made just for you. ❤️

                            </p>


                            <button
                                id="finalButton"
                                className="primary-button"
                                type="button"
                            >

                                One Last Surprise ❤️

                            </button>

                        </div>


                        <div className="bottom-credit">

                            Made with ❤️ by

                            <strong>
                                DAMAPREET SINGH
                            </strong>

                        </div>

                    </div>

                </section>



                {/* =====================================================
                     SCREEN 5
                ====================================================== */}

                <section
                    id="finalScreen"
                    className="screen"
                >

                    <div className="final-content">


                        <div className="final-heart">
                            ❤️
                        </div>


                        <p className="eyebrow">
                            Happy Birthday
                        </p>


                        <h1 id="finalName">
                            __________
                        </h1>


                        <div className="final-message">

                            <p>

                                I hope this birthday
                                brings you countless
                                reasons to smile.

                            </p>


                            <p>

                                May this new year of your
                                life be filled with happiness,
                                success, peace and beautiful
                                memories.

                            </p>


                            <p>

                                Keep being the amazing
                                person you are.

                            </p>


                            <p className="special">

                                You deserve all the happiness
                                in the world. ❤️

                            </p>

                        </div>


                        <div className="final-love">

                            With lots of love ❤️

                        </div>


                        <div className="final-credit">

                            Made with ❤️ by

                            <strong>
                                DAMAPREET SINGH
                            </strong>

                        </div>


                        <button
                            id="replayButton"
                            className="outline-button"
                            type="button"
                        >

                            Watch Again ↻

                        </button>


                    </div>


                    <div id="confetti"></div>

                </section>



      <style jsx global>{`
/* =========================================================
   BIRTHDAY SURPRISE
   Made with ❤️ by DAMAPREET SINGH
========================================================= */


.birthday-app, .birthday-app *{

    margin: 0;

    padding: 0;

    box-sizing: border-box;

}


.birthday-app{
    position: relative;
    isolation: isolate;
    width: 100%;
    min-height: 100svh;
    height: 100dvh;
    overflow: hidden;
    background: #08030d;
    color: #fff;
    font-family: Georgia, "Times New Roman", serif;
}


/* =========================================================
   SCREENS
========================================================= */

.birthday-app .screen{

    position: fixed;

    inset: 0;

    width: 100%;

    height: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    opacity: 0;

    visibility: hidden;

    pointer-events: none;

    transform: scale(1.04);

    transition:
        opacity .8s ease,
        transform .8s ease,
        visibility .8s ease;

}


.birthday-app .screen.active{

    opacity: 1;

    visibility: visible;

    pointer-events: auto;

    transform: scale(1);

}


/* =========================================================
   BACKGROUND
========================================================= */

.birthday-app::before{

    content: "";

    position: fixed;

    inset: 0;

    pointer-events: none;

    background:
        radial-gradient(
            circle at 50% 40%,
            rgba(255,30,140,.13),
            transparent 42%
        );

}


.birthday-app .background-glow{

    position: fixed;

    width: 550px;

    height: 550px;

    left: 50%;

    top: 50%;

    transform:
        translate(-50%,-50%);

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(255,50,160,.15),
            transparent 70%
        );

    filter:
        blur(55px);

    animation:
        backgroundPulse
        5s ease-in-out infinite;

    pointer-events: none;

}


@keyframes backgroundPulse {

    0%,
    100% {

        transform:
            translate(-50%,-50%)
            scale(.8);

        opacity: .5;

    }

    50% {

        transform:
            translate(-50%,-50%)
            scale(1.25);

        opacity: 1;

    }

}


/* =========================================================
   STARS
========================================================= */

.birthday-app .stars{

    position: fixed;

    inset: 0;

    pointer-events: none;

    background-image:

        radial-gradient(
            circle,
            rgba(255,255,255,.8) 1px,
            transparent 1px
        ),

        radial-gradient(
            circle,
            rgba(255,170,220,.5) 1px,
            transparent 1px
        );

    background-size:
        90px 90px,
        150px 150px;

    background-position:
        10px 20px,
        50px 80px;

    opacity: .35;

    animation:
        starsMove
        25s linear infinite;

}


@keyframes starsMove {

    from {

        transform:
            translateY(0);

    }

    to {

        transform:
            translateY(-120px);

    }

}


/* =========================================================
   TYPOGRAPHY
========================================================= */

.birthday-app .eyebrow{

    color:
        #d7a8c2;

    text-transform:
        uppercase;

    letter-spacing:
        4px;

    font-size:
        11px;

    margin-bottom:
        20px;

}


.birthday-app .intro-text{

    color:
        #c9b6c2;

    font-size:
        17px;

    margin-bottom:
        38px;

}


/* =========================================================
   INTRO
========================================================= */

.birthday-app .intro-content{

    text-align:
        center;

    padding:
        30px;

    animation:
        introFloat
        4s ease-in-out infinite;

}


@keyframes introFloat {

    0%,
    100% {

        transform:
            translateY(0);

    }

    50% {

        transform:
            translateY(-10px);

    }

}


.birthday-app .intro-heart{

    font-size:
        65px;

    margin-bottom:
        15px;

    color:
        #ff4f9a;

    animation:
        heartBeat
        1.3s infinite;

    filter:
        drop-shadow(
            0 0 20px
            rgba(255,70,160,.8)
        );

}


@keyframes heartBeat {

    0%,
    100% {

        transform:
            scale(1);

    }

    50% {

        transform:
            scale(1.18);

    }

}


.birthday-app .intro-content h1{

    font-size:
        clamp(
            45px,
            8vw,
            90px
        );

    font-weight:
        normal;

    margin-bottom:
        20px;

    text-shadow:
        0 0 30px
        rgba(255,80,160,.4);

}


.birthday-app .intro-content h1 span{

    animation:
        dynamicTextColor
        6s linear infinite;

}


@keyframes dynamicTextColor {

    0% {
        color: #ff70a8;
    }

    25% {
        color: #ff4fa3;
    }

    50% {
        color: #d95cff;
    }

    75% {
        color: #ff65c7;
    }

    100% {
        color: #ff70a8;
    }

}


/* =========================================================
   BUTTONS
========================================================= */

.birthday-app .primary-button, .birthday-app .secondary-button{

    border:
        none;

    outline:
        none;

    padding:
        16px 30px;

    border-radius:
        100px;

    color:
        white;

    font-size:
        15px;

    cursor:
        pointer;

    background:
        linear-gradient(
            100deg,
            #ff3f91,
            #c52cff,
            #ff3f91
        );

    background-size:
        250% 100%;

    animation:
        buttonGradient
        5s linear infinite;

    box-shadow:
        0 10px 35px
        rgba(255,50,150,.25);

    transition:
        transform .3s ease,
        box-shadow .3s ease;

}


@keyframes buttonGradient {

    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 250% 50%;
    }

}


.birthday-app .primary-button:hover, .birthday-app .secondary-button:hover{

    transform:
        translateY(-4px)
        scale(1.02);

    box-shadow:
        0 15px 45px
        rgba(255,50,150,.45);

}


.birthday-app .creator-credit, .birthday-app .static-credit{

    margin-top:
        35px;

    color:
        rgba(255,255,255,.35);

    font-size:
        10px;

    letter-spacing:
        2px;

}


.birthday-app .creator-credit strong, .birthday-app .bottom-credit strong, .birthday-app .static-credit strong, .birthday-app .final-credit strong{

    color:
        #ff78ad;

}


/* =========================================================
   TREE
========================================================= */

.birthday-app #treeScreen{

    flex-direction:
        column;

}


.birthday-app .tree-top-text{

    position:
        absolute;

    top:
        30px;

    width:
        90%;

    text-align:
        center;

    color:
        #bba5b4;

    font-size:
        12px;

    letter-spacing:
        2px;

    z-index:
        3;

}


.birthday-app #treeCanvas{

    position:
        absolute;

    inset:
        0;

    width:
        100%;

    height:
        100%;

}


.birthday-app .tree-message{

    position:
        absolute;

    top:
        10%;

    left:
        50%;

    transform:
        translateX(-50%);

    width:
        min(550px,90%);

    text-align:
        center;

    pointer-events:
        none;

    z-index:
        5;

}


.birthday-app #messageLines{

    display:
        none;

}


.birthday-app #messageLines p{

    opacity:
        0;

    margin:
        8px 0;

    font-size:
        clamp(
            15px,
            2vw,
            22px
        );

    color:
        #fff1f7;

    text-shadow:
        0 0 12px
        rgba(255,90,170,.5);

}


.birthday-app #messageLines p.show{

    animation:
        messageAppear
        .8s forwards;

}


@keyframes messageAppear {

    from {

        opacity:
            0;

        transform:
            translateY(15px);

    }

    to {

        opacity:
            1;

        transform:
            translateY(0);

    }

}


.birthday-app .secondary-button{

    position:
        absolute;

    bottom:
        45px;

    opacity:
        0;

    pointer-events:
        none;

    z-index:
        10;

}


.birthday-app .secondary-button.visible{

    opacity:
        1;

    pointer-events:
        auto;

}


.birthday-app .bottom-credit{

    position:
        absolute;

    bottom:
        14px;

    left:
        50%;

    transform:
        translateX(-50%);

    white-space:
        nowrap;

    color:
        rgba(255,255,255,.35);

    font-size:
        9px;

    letter-spacing:
        2px;

    z-index:
        20;

}


/* =========================================================
   MEMORY
========================================================= */

.birthday-app .section-container{

    width:
        min(1000px,90%);

    text-align:
        center;

}


.birthday-app .section-container h2{

    font-size:
        clamp(
            35px,
            6vw,
            65px
        );

    font-weight:
        normal;

    line-height:
        1.15;

    margin-bottom:
        45px;

}


.birthday-app .section-container h2 span{

    animation:
        dynamicTextColor
        6s linear infinite;

}


.birthday-app .memory-grid{

    display:
        grid;

    grid-template-columns:
        repeat(3,1fr);

    gap:
        20px;

    margin-bottom:
        40px;

}


.birthday-app .memory-card{

    padding:
        28px 24px;

    border:
        1px solid
        rgba(255,150,200,.12);

    border-radius:
        20px;

    background:
        rgba(255,255,255,.035);

    backdrop-filter:
        blur(12px);

    transition:
        transform .4s ease,
        border-color .4s ease;

}


.birthday-app .memory-card:hover{

    transform:
        translateY(-8px);

    border-color:
        rgba(255,100,170,.4);

}


.birthday-app .memory-icon{

    font-size:
        38px;

    margin-bottom:
        15px;

}


.birthday-app .memory-card h3{

    font-size:
        21px;

    font-weight:
        normal;

    margin-bottom:
        10px;

}


.birthday-app .memory-card p{

    color:
        #b9a9b4;

    font-size:
        14px;

    line-height:
        1.6;

}


/* =========================================================
   POKÉ BALL
========================================================= */

.birthday-app #pokemonScreen{

    overflow:
        hidden;

}


.birthday-app .pokemon-scene{

    width:
        100%;

    height:
        100%;

    position:
        relative;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    text-align:
        center;

}


.birthday-app .pokemon-intro{

    display:
        flex;

    flex-direction:
        column;

    align-items:
        center;

    justify-content:
        center;

    opacity:
        1;

    visibility:
        visible;

    transform:
        scale(1);

    transition:
        opacity .5s ease,
        transform .5s ease,
        visibility .5s ease;

}


/* FIX */

.birthday-app .pokemon-intro.hide{

    opacity:
        0;

    visibility:
        hidden;

    pointer-events:
        none;

    transform:
        scale(.75);

}


.birthday-app .pokemon-title{

    font-size:
        clamp(
            22px,
            4vw,
            38px
        );

    font-weight:
        normal;

    max-width:
        650px;

    margin-bottom:
        35px;

}


/* =========================================================
   POKÉ BALL BODY
========================================================= */

.birthday-app .pokeball{

    position:
        relative;

    width:
        230px;

    height:
        230px;

    border-radius:
        50%;

    cursor:
        pointer;

    animation:
        pokeballFloat
        3s ease-in-out infinite;

    z-index:
        10;

}


@keyframes pokeballFloat {

    0%,
    100% {

        transform:
            translateY(0)
            rotate(-1deg);

    }

    50% {

        transform:
            translateY(-12px)
            rotate(1deg);

    }

}


.birthday-app .pokeball-aura{

    position:
        absolute;

    inset:
        -45px;

    border-radius:
        50%;

    background:
        radial-gradient(
            circle,
            rgba(255,50,150,.38),
            rgba(190,30,255,.18),
            transparent 70%
        );

    filter:
        blur(18px);

    animation:
        auraPulse
        2s ease-in-out infinite;

    z-index:
        -1;

}


@keyframes auraPulse {

    0%,
    100% {

        transform:
            scale(.8);

        opacity:
            .45;

    }

    50% {

        transform:
            scale(1.25);

        opacity:
            1;

    }

}


.birthday-app .pokeball-top{

    position:
        absolute;

    top:
        0;

    left:
        0;

    width:
        100%;

    height:
        50%;

    border-radius:
        230px 230px 0 0;

    background:
        linear-gradient(
            135deg,
            #ff315e,
            #ff174f,
            #ff3f91,
            #d42aff
        );

    background-size:
        300% 300%;

    animation:
        pokemonColor
        6s ease infinite;

    border:
        8px solid white;

    border-bottom:
        none;

}


@keyframes pokemonColor {

    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }

}


.birthday-app .pokeball-bottom{

    position:
        absolute;

    bottom:
        0;

    left:
        0;

    width:
        100%;

    height:
        50%;

    border-radius:
        0 0 230px 230px;

    background:
        linear-gradient(
            135deg,
            #ffffff,
            #f5edf1,
            #d9d9d9
        );

    border:
        8px solid white;

    border-top:
        none;

}


.birthday-app .pokeball-line{

    position:
        absolute;

    left:
        0;

    top:
        50%;

    width:
        100%;

    height:
        15px;

    transform:
        translateY(-50%);

    background:
        #090909;

    z-index:
        4;

}


.birthday-app .pokeball-center{

    position:
        absolute;

    left:
        50%;

    top:
        50%;

    width:
        70px;

    height:
        70px;

    transform:
        translate(-50%,-50%);

    border-radius:
        50%;

    background:
        #111;

    border:
        7px solid white;

    z-index:
        10;

    box-shadow:
        0 0 0 5px #111,
        0 0 30px
        rgba(255,80,160,.8);

    animation:
        centerPulse
        2s infinite;

}


@keyframes centerPulse {

    0%,
    100% {

        box-shadow:
            0 0 0 5px #111,
            0 0 20px
            rgba(255,80,160,.5);

    }

    50% {

        box-shadow:
            0 0 0 5px #111,
            0 0 50px
            rgba(255,80,180,1);

    }

}


.birthday-app .pokeball-center-inner{

    position:
        absolute;

    width:
        30px;

    height:
        30px;

    left:
        50%;

    top:
        50%;

    transform:
        translate(-50%,-50%);

    border-radius:
        50%;

    background:
        white;

    border:
        3px solid #111;

}


.birthday-app .pokeball-shine{

    position:
        absolute;

    top:
        35px;

    left:
        45px;

    width:
        50px;

    height:
        25px;

    background:
        rgba(255,255,255,.8);

    border-radius:
        50%;

    transform:
        rotate(-25deg);

    filter:
        blur(2px);

    z-index:
        20;

}


.birthday-app .pokeball-hint{

    margin-top:
        35px;

    color:
        #cdbbc5;

    letter-spacing:
        2px;

    font-size:
        13px;

    animation:
        hintPulse
        2s infinite;

}


@keyframes hintPulse {

    0%,
    100% {

        opacity:
            .45;

    }

    50% {

        opacity:
            1;

    }

}


/* =========================================================
   OPEN ANIMATION
========================================================= */

.birthday-app .pokeball.open{

    animation:
        pokeballOpen
        .9s forwards;

}


@keyframes pokeballOpen {

    0% {

        transform:
            scale(1)
            rotate(0);

    }

    20% {

        transform:
            scale(1.08)
            rotate(-6deg);

    }

    40% {

        transform:
            scale(.95)
            rotate(6deg);

    }

    60% {

        transform:
            scale(1.2)
            rotate(-3deg);

    }

    100% {

        transform:
            scale(0)
            rotate(25deg);

        opacity:
            0;

    }

}


/* =========================================================
   PHOTO
========================================================= */

.birthday-app .photo-reveal{

    position:
        absolute;

    left:
        50%;

    top:
        50%;

    transform:
        translate(-50%,-50%)
        scale(.35);

    width:
        min(850px,92vw);

    text-align:
        center;

    opacity:
        0;

    visibility:
        hidden;

    pointer-events:
        none;

    transition:
        opacity .8s ease,
        transform 1s
        cubic-bezier(
            .17,
            .67,
            .25,
            1.3
        );

    z-index:
        50;

}


.birthday-app .photo-reveal.show{

    opacity:
        1;

    visibility:
        visible;

    pointer-events:
        auto;

    transform:
        translate(-50%,-50%)
        scale(1);

}


.birthday-app .photo-aura{

    position:
        absolute;

    width:
        100%;

    height:
        100%;

    left:
        50%;

    top:
        42%;

    transform:
        translate(-50%,-50%);

    border-radius:
        30px;

    background:
        radial-gradient(
            ellipse,
            rgba(255,50,150,.38),
            rgba(190,40,255,.2),
            transparent 75%
        );

    filter:
        blur(55px);

    animation:
        photoAura
        3s ease-in-out infinite;

    z-index:
        -1;

}


@keyframes photoAura {

    0%,
    100% {

        transform:
            translate(-50%,-50%)
            scale(.9);

        opacity:
            .6;

    }

    50% {

        transform:
            translate(-50%,-50%)
            scale(1.08);

        opacity:
            1;

    }

}


/* =========================================================
   FULL PHOTO
========================================================= */

.birthday-app .photo-frame{

    width:
        100%;

    aspect-ratio:
        3 / 2;

    padding:
        7px;

    margin:
        0 auto 20px;

    border-radius:
        22px;

    background:
        linear-gradient(
            135deg,
            #ff3f91,
            #cf2aff,
            #ff75bd,
            #ff3f91
        );

    background-size:
        300% 300%;

    animation:
        photoBorder
        5s ease infinite;

    box-shadow:
        0 0 35px
        rgba(255,60,160,.55),

        0 30px 80px
        rgba(0,0,0,.55);

}


@keyframes photoBorder {

    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }

}


.birthday-app .photo-frame img{

    display:
        block;

    width:
        100%;

    height:
        100%;

    object-fit:
        contain;

    object-position:
        center;

    background:
        #08030d;

    border-radius:
        16px;

}


.birthday-app .photo-reveal h3{

    margin:
        15px 0 8px;

    font-size:
        clamp(
            20px,
            4vw,
            27px
        );

    font-weight:
        normal;

}


.birthday-app .photo-reveal p{

    color:
        #cdbbc5;

    font-size:
        14px;

    line-height:
        1.6;

}


.birthday-app .photo-message{

    margin:
        3px 0 18px;

}


/* =========================================================
   FINAL
========================================================= */

.birthday-app .final-content{

    width:
        min(700px,90%);

    text-align:
        center;

    z-index:
        2;

}


.birthday-app .final-heart{

    font-size:
        70px;

    animation:
        heartBeat
        1.4s infinite;

}


.birthday-app .final-content h1{

    font-size:
        clamp(
            55px,
            10vw,
            110px
        );

    font-weight:
        normal;

    margin-bottom:
        30px;

    background:
        linear-gradient(
            90deg,
            #ffffff,
            #ff77aa,
            #d95cff,
            #ffffff
        );

    background-size:
        300% auto;

    color:
        transparent;

    background-clip:
        text;

    -webkit-background-clip:
        text;

    animation:
        finalGradient
        5s linear infinite;

}


@keyframes finalGradient {

    to {

        background-position:
            300% center;

    }

}


.birthday-app .final-message{

    color:
        #d4c4cd;

    font-size:
        17px;

    line-height:
        1.8;

    margin-bottom:
        25px;

}


.birthday-app .final-message .special{

    color:
        #ff85b2;

    font-size:
        21px;

}


.birthday-app .final-love{

    color:
        #c7b3bd;

    margin-bottom:
        15px;

}


.birthday-app .final-credit{

    color:
        rgba(255,255,255,.55);

    font-size:
        12px;

    letter-spacing:
        2px;

    margin-bottom:
        30px;

}


.birthday-app .outline-button{

    padding:
        13px 25px;

    border:
        1px solid
        rgba(255,120,170,.5);

    border-radius:
        100px;

    background:
        transparent;

    color:
        white;

    cursor:
        pointer;

}


/* =========================================================
   CONFETTI
========================================================= */

.birthday-app .confetti{

    position:
        fixed;

    top:
        -30px;

    z-index:
        100;

    pointer-events:
        none;

    animation:
        confettiFall
        linear forwards;

}


@keyframes confettiFall {

    to {

        transform:
            translateY(110vh)
            rotate(720deg);

        opacity:
            0;

    }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width:700px) {


    .birthday-app .intro-content{

        padding:
            20px;

    }


    .birthday-app .intro-content h1{

        font-size:
            48px;

    }


    .birthday-app .intro-text{

        font-size:
            15px;

    }


    .birthday-app .tree-top-text{

        top:
            20px;

        font-size:
            9px;

    }


    .birthday-app .tree-message{

        top:
            9%;

        width:
            92%;

    }


    .birthday-app #messageLines p{

        font-size:
            14px;

        margin:
            5px 0;

    }


    .birthday-app .memory-grid{

        grid-template-columns:
            1fr;

        gap:
            10px;

        margin-bottom:
            25px;

    }


    .birthday-app .memory-card{

        padding:
            16px;

    }


    .birthday-app .section-container h2{

        font-size:
            34px;

        margin-bottom:
            25px;

    }


    .birthday-app .pokemon-title{

        font-size:
            21px;

        padding:
            0 25px;

        margin-bottom:
            30px;

    }


    .birthday-app .pokeball{

        width:
            190px;

        height:
            190px;

    }


    .birthday-app .pokeball-center{

        width:
            60px;

        height:
            60px;

    }


    .birthday-app .pokeball-center-inner{

        width:
            25px;

        height:
            25px;

    }


    .birthday-app .pokeball-shine{

        top:
            30px;

        left:
            38px;

    }


    .birthday-app .photo-reveal{

        width:
            92vw;

    }


    .birthday-app .photo-frame{

        aspect-ratio:
            3 / 2;

        padding:
            5px;

    }


    .birthday-app .photo-reveal h3{

        font-size:
            19px;

    }


    .birthday-app .photo-reveal p{

        font-size:
            12px;

    }


    .birthday-app .bottom-credit{

        font-size:
            7px;

    }


    .birthday-app .final-content{

        width:
            90%;

    }


    .birthday-app .final-content h1{

        font-size:
            60px;

    }


    .birthday-app .final-message{

        font-size:
            14px;

    }

}
      

/* Evermore integration: scoped spacing, safe areas and small-screen fit */
.birthday-app *, .birthday-app *::before, .birthday-app *::after { box-sizing: border-box; }
.birthday-app .screen {
  top: 78px;
  right: 0;
  bottom: auto;
  left: 0;

  min-height: calc(100svh - 78px);
  height: calc(100dvh - 78px);

  padding: clamp(16px, 4vw, 36px)
    max(16px, env(safe-area-inset-right))
    clamp(18px, 4vw, 36px)
    max(16px, env(safe-area-inset-left));

  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}
.birthday-app button, .birthday-app [role="button"] { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
.birthday-app button { max-width: 100%; min-height: 44px; }
.birthday-app img, .birthday-app canvas { max-width: 100%; }
.birthday-app .intro-content, .birthday-app .final-content, .birthday-app .section-container,
.birthday-app .pokemon-scene, .birthday-app .photo-reveal {
  width: min(100%, 760px);
  margin-inline: auto;
}
.birthday-app .intro-content, .birthday-app .final-content { padding: clamp(18px, 4vw, 36px); }
.birthday-app .memory-grid { width: 100%; }
.birthday-app .memory-card { min-width: 0; overflow-wrap: anywhere; }
.birthday-app .creator-credit, .birthday-app .bottom-credit, .birthday-app .final-credit { line-height: 1.6; }
@media (max-width: 700px) {
  .birthday-app .screen {
  top: 68px;
  right: 0;
  bottom: auto;
  left: 0;

  height: calc(100dvh - 68px);
  min-height: calc(100svh - 68px);

  padding: max(16px, env(safe-area-inset-top))
    16px
    max(20px, env(safe-area-inset-bottom));
}
  .birthday-app .intro-content, .birthday-app .final-content, .birthday-app .section-container,
  .birthday-app .pokemon-scene { max-width: 100%; }
  .birthday-app .intro-content h1 { font-size: clamp(2.15rem, 10vw, 3rem); line-height: 1.12; overflow-wrap: anywhere; }
  .birthday-app .final-content h1 { font-size: clamp(2.5rem, 12vw, 3.75rem); line-height: 1.08; overflow-wrap: anywhere; }
  .birthday-app .intro-text, .birthday-app .final-message, .birthday-app .memory-card p { line-height: 1.65; }
  .birthday-app .primary-button, .birthday-app .secondary-button, .birthday-app .outline-button { padding: 12px 18px; white-space: normal; }
  .birthday-app .memory-grid { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .birthday-app .tree-message { max-width: 100%; }
  .birthday-app #treeCanvas { max-width: 100%; }
  .birthday-app .photo-reveal { width: 100%; max-width: 520px; padding-inline: 4px; }
  .birthday-app .photo-frame img { width: 100%; height: 100%; object-fit: cover; }
  .birthday-app .bottom-credit, .birthday-app .final-credit { font-size: 10px; }
}
@media (max-height: 700px) and (min-width: 701px) {
  .birthday-app .screen { align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .birthday-app *, .birthday-app *::before, .birthday-app *::after { scroll-behavior: auto !important; }
}

/* =========================================================
   EVERMORE: LETTER-BY-LETTER FOREVER ANIMATION
   Replaces the recipient photo in the final reveal.
========================================================= */
.birthday-app .forever-animation {
  position: relative;
  isolation: isolate;
  width: min(100%, 620px);
  min-height: clamp(220px, 38vh, 330px);
  margin: 0 auto 12px;
  padding: 28px 8px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 26px;
  background: radial-gradient(ellipse at 50% 45%, rgba(151, 24, 76, .23), rgba(12, 5, 14, .12) 68%, transparent 100%);
}
.birthday-app .forever-line {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre;
  color: #fff9fc;
  font-family: 'Great Vibes', 'Brush Script MT', cursive;
  font-weight: 400;
  line-height: 1.16;
  text-align: center;
}
.birthday-app .photo-reveal.show .forever-line span {
  display: inline-block;
  opacity: 0;
  transform: translateY(22px) scale(.78);
  animation: evermore-letter-arrive .9s
    cubic-bezier(.17,.67,.3,1.3) forwards;
  animation-delay: calc(var(--letter-index) * 105ms + .15s);
  text-shadow: 0 0 9px rgba(255,255,255,.85),
    0 0 24px rgba(255,89,145,.75),
    0 0 42px rgba(255,55,120,.4);
}
.birthday-app .forever-line-one { font-size: clamp(27px, 6.2vw, 48px); }
.birthday-app .forever-name-line {
  margin-top: 7px;
  font-size: clamp(54px, 13vw, 94px);
  color: #ffdce8;
}
.birthday-app .forever-name-line span {
  animation-delay: calc(var(--letter-index) * 145ms + 1.25s);
  text-shadow: 0 0 12px #fff, 0 0 28px #ff4d8d, 0 0 58px rgba(255,45,122,.8);
}
.birthday-app .forever-line-last {
  margin-top: 3px;
  font-size: clamp(32px, 7.4vw, 56px);
}
.birthday-app .forever-line-last span { animation-delay: calc(var(--letter-index) * 100ms + 2.2s); }
.birthday-app .forever-heart {
  position: relative;
  z-index: 3;
  margin: 0 0 -3px;
  color: #ff719f;
  font-size: clamp(20px, 5vw, 31px);
 opacity: 0;
transform: scale(.2);
filter: drop-shadow(0 0 12px rgba(255,80,140,.9));
}
.birthday-app .photo-reveal.show .forever-heart {
  animation:
    evermore-heart-pop .8s cubic-bezier(.17,.67,.3,1.4) 1.25s forwards,
    evermore-heart-beat 1.8s ease-in-out 2.1s infinite;
}
.birthday-app .forever-sparkles {
  margin-top: 10px;
  color: #ffe0a9;
  letter-spacing: .12em;
  font-size: clamp(13px, 3.5vw, 19px);
  opacity: 0;
  
  text-shadow: 0 0 14px rgba(255,208,140,.9);
}
  .birthday-app .photo-reveal.show .forever-sparkles {
  animation:
    evermore-sparkle-in 1s ease 3.2s forwards,
    evermore-sparkle-glow 2.6s ease-in-out 4.2s infinite;
}
@keyframes evermore-letter-arrive {
  0% { opacity: 0; transform: translateY(22px) scale(.78); filter: blur(5px); }
  70% { opacity: 1; transform: translateY(-3px) scale(1.06); filter: blur(0); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
@keyframes evermore-heart-pop { to { opacity: 1; transform: scale(1.18); } }
@keyframes evermore-heart-beat { 0%,100% { transform: scale(1.05); } 50% { transform: scale(1.22); } }
@keyframes evermore-sparkle-in { to { opacity: .9; } }
@keyframes evermore-sparkle-glow { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
@media (max-width: 420px) {
  .birthday-app .forever-animation { min-height: 220px; padding-inline: 2px; border-radius: 18px; }
  .birthday-app .forever-line-one { font-size: clamp(25px, 7vw, 31px); }
  .birthday-app .forever-name-line { font-size: clamp(51px, 15vw, 64px); }
  .birthday-app .forever-line-last { font-size: clamp(31px, 8vw, 38px); }
}
@media (prefers-reduced-motion: reduce) {
  .birthday-app .forever-line span, .birthday-app .forever-heart, .birthday-app .forever-sparkles { animation-duration: .01ms !important; animation-delay: 0ms !important; animation-iteration-count: 1 !important; opacity: 1; transform: none; }
}
  /* Evermore — mobile tree proportions */
@media (max-width: 700px) {
  .birthday-app #treeScreen {
    position: relative;
    width: 100%;
    overflow: hidden;
    isolation: isolate;
  }

  .birthday-app #treeCanvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    pointer-events: none;
  }

  .birthday-app .tree-top-text {
    top: 18px;
    width: 92%;
    left: 4%;
    font-size: 10px;
    letter-spacing: 1px;
  }

  .birthday-app .tree-message {
    width: 92%;
    max-width: 360px;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 700px) {
  .secondary-button {
    position: relative;
    z-index: 10;
    margin-bottom: 30px;
  }
}

`}</style>
    </main>
  );
}
