// Escucha el mensaje desde popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let intervalId;
  let usedIndices = [];

  function getRandomIndex(comments) {
    if (usedIndices?.length === comments?.length) {
      // Todos los comentarios han sido usados
      return null; // O reinicia usedIndices si quieres permitir repeticiones
    }

    let index;
    do {
      index = Math.floor(Math.random() * comments?.length);
    } while (usedIndices?.includes(index));

    usedIndices.push(index);
    return index;
  }

  function getRandomComment(comments) {
    const index = getRandomIndex(comments);
    return index !== null
      ? comments[index]
      : "Todos los comentarios ya han sido utilizados.";
  }

  function sendComment() {
    //   const comments = [
    //     "¡Farlight 84 es el mejor juego que he jugado en mucho tiempo!",
    //     "Esta actualización 2.5 de Farlight 84 es increíble. ¡No puedo esperar al lanzamiento oficial!",
    //     "El nuevo contenido en Farlight 84 es simplemente alucinante.",
    //     "¡Qué gráficos! Farlight 84 nunca deja de sorprenderme.",
    //     "¡El gameplay de Farlight 84 siempre es emocionante!",
    //     "¡Me encanta la nueva beta de Farlight 84! Es todo lo que esperaba y más.",
    //     "Farlight 84 tiene una comunidad increíble.",
    //     "Cada actualización de Farlight 84 supera mis expectativas.",
    //     "Los desarrolladores de Farlight 84 realmente saben lo que hacen.",
    //     "¡El modo PvP en Farlight 84 es adictivo!",
    //     "No puedo dejar de jugar a Farlight 84.",
    //     "Los eventos en Farlight 84 siempre son épicos.",
    //     "¡Farlight 84 me tiene enganchado!",
    //     "La personalización en Farlight 84 es lo mejor.",
    //     "¡Qué bien optimizado está Farlight 84!",
    //     "El soporte técnico de Farlight 84 es muy atento.",
    //     "Los gráficos de Farlight 84 son de otro nivel.",
    //     "La jugabilidad de Farlight 84 es súper fluida.",
    //     "Me encanta cómo Farlight 84 sigue evolucionando.",
    //     "Los mapas en Farlight 84 son impresionantes.",
    //     "¡Cada partida de Farlight 84 es diferente!",
    //     "Farlight 84 tiene una historia muy bien desarrollada.",
    //     "¡Qué banda sonora tan épica tiene Farlight 84!",
    //     "La comunidad de Farlight 84 es súper activa.",
    //     "No hay otro juego como Farlight 84.",
    //     "¡Farlight 84 es mi juego favorito de todos los tiempos!",
    //     "Los eventos en vivo de Farlight 84 son geniales.",
    //     "¡Qué buena es la variedad de armas en Farlight 84!",
    //     "El equilibrio de las clases en Farlight 84 es perfecto.",
    //     "Siempre hay algo nuevo que descubrir en Farlight 84.",
    //     "Farlight 84 es un juego que no puedes dejar de jugar.",
    //     "¡La jugabilidad de Farlight 84 es simplemente genial!",
    //     "Farlight 84 siempre me mantiene en el borde de mi asiento.",
    //     "Los desarrolladores de Farlight 84 se esfuerzan mucho.",
    //     "La comunidad de Farlight 84 es una de las mejores.",
    //     "¡Farlight 84 es un juego increíblemente divertido!",
    //     "El contenido adicional en Farlight 84 es impresionante.",
    //     "¡Qué bien balanceado está Farlight 84!",
    //     "Los modos de juego en Farlight 84 son súper entretenidos.",
    //     "¡Me encanta la cantidad de personajes en Farlight 84!",
    //     "Farlight 84 siempre tiene algo emocionante que ofrecer.",
    //     "No puedo esperar a ver qué más trae Farlight 84.",
    //     "¡Farlight 84 es una experiencia increíble!",
    //     "Cada sesión en Farlight 84 es única.",
    //     "¡Los efectos visuales en Farlight 84 son impresionantes!",
    //     "Farlight 84 es el juego perfecto para jugar con amigos.",
    //     "Siempre estoy emocionado por las nuevas actualizaciones de Farlight 84.",
    //     "Farlight 84 me sorprende con cada nueva característica.",
    //     "¡Farlight 84 nunca deja de evolucionar!",
    //     "El diseño de los personajes en Farlight 84 es asombroso.",
    //     "Farlight 84 tiene un sistema de progresión muy justo.",
    //     "¡La comunidad de Farlight 84 es súper amigable!",
    //     "Los eventos en Farlight 84 son siempre un éxito.",
    //     "¡Farlight 84 es el juego que siempre quise jugar!",
    //     "No puedo imaginarme un mejor juego que Farlight 84.",
    //     "¡La variedad de modos en Farlight 84 es genial!",
    //     "Los gráficos de Farlight 84 son de lo mejor.",
    //     "¡Me encanta cómo Farlight 84 siempre se mantiene fresco!",
    //     "El sistema de recompensas en Farlight 84 es muy motivador.",
    //     "¡Qué buena es la comunidad de Farlight 84!",
    //     "Farlight 84 es el juego más adictivo que he jugado.",
    //     "Los desarrolladores de Farlight 84 son unos genios.",
    //     "¡Farlight 84 tiene un nivel de detalle increíble!",
    //     "No puedo esperar a ver qué sigue en Farlight 84.",
    //     "¡Farlight 84 nunca me decepciona!",
    //     "El sistema de combate en Farlight 84 es impecable.",
    //     "Farlight 84 es un juego que nunca envejece.",
    //     "¡Los gráficos en Farlight 84 son espectaculares!",
    //     "La comunidad de Farlight 84 es muy activa y solidaria.",
    //     "Farlight 84 es un juego que siempre me sorprende.",
    //     "¡Me encanta cómo Farlight 84 siempre está cambiando!",
    //     "El contenido en Farlight 84 es muy variado.",
    //     "¡Farlight 84 tiene algo para todos los gustos!",
    //     "No hay otro juego como Farlight 84 en el mercado.",
    //     "¡Farlight 84 es un juego que siempre ofrece algo nuevo!",
    //     "La comunidad de Farlight 84 es muy acogedora.",
    //     "¡Los modos de juego en Farlight 84 son únicos!",
    //     "Farlight 84 es un juego que siempre me tiene entretenido.",
    //     "¡El soporte en Farlight 84 es de primera!",
    //     "Farlight 84 es un juego que siempre te reta.",
    //     "¡Me encanta la personalización en Farlight 84!",
    //     "Los gráficos de Farlight 84 son de otro mundo.",
    //     "¡Farlight 84 tiene una jugabilidad impecable!",
    //     "El contenido en Farlight 84 siempre es fresco y emocionante.",
    //     "¡Qué bien hecho está Farlight 84!",
    //     "Farlight 84 es un juego que siempre te sorprende.",
    //     "¡La comunidad de Farlight 84 es muy activa!",
    //     "El sistema de combate en Farlight 84 es muy divertido.",
    //     "¡Me encanta cómo Farlight 84 siempre evoluciona!",
    //     "Farlight 84 es un juego que siempre tiene algo nuevo que ofrecer.",
    //     "¡Qué bien diseñado está Farlight 84!",
    //     "El contenido en Farlight 84 es muy original.",
    //     "¡Me encanta la diversidad en Farlight 84!",
    //     "Farlight 84 es un juego que nunca deja de sorprender.",
    //     "¡Los gráficos en Farlight 84 son impresionantes!",
    //     "Farlight 84 tiene una jugabilidad súper fluida.",
    //     "¡Me encanta cómo Farlight 84 siempre se mantiene interesante!",
    //     "Farlight 84 es un juego que siempre tiene algo emocionante que ofrecer.",
    //     "¡El sistema de recompensas en Farlight 84 es muy generoso!",
    //     "Farlight 84 es un juego que siempre me tiene enganchado.",
    //     "¡Los desarrolladores de Farlight 84 son muy dedicados!",
    //     "Farlight 84 es un juego que siempre está en constante evolución.",
    //     "¡Qué bien equilibrado está Farlight 84!",
    //     "El contenido en Farlight 84 siempre es emocionante.",
    //     "¡Me encanta cómo Farlight 84 siempre está cambiando!",
    //     "Farlight 84 es un juego que siempre tiene algo nuevo que ofrecer.",
    //     "¡Los gráficos en Farlight 84 son de otro nivel!",
    //     "Farlight 84 tiene una comunidad muy amigable.",
    //     "¡Farlight 84 es el mejor juego que he jugado!",
    //     "El sistema de progresión en Farlight 84 es muy motivador.",
    //     "¡Qué bien hecho está Farlight 84!",
    //     "Farlight 84 es un juego que nunca te aburre.",
    //     "¡Me encanta cómo Farlight 84 siempre me sorprende!",
    //     "Los gráficos de Farlight 84 son impresionantes.",
    //     "¡Farlight 84 tiene un nivel de detalle increíble!",
    //     "El contenido en Farlight 84 es siempre emocionante.",
    //     "¡Me encanta cómo Farlight 84 siempre se mantiene fresco!",
    //     "Farlight 84 es un juego que siempre tiene algo nuevo que ofrecer.",
    //     "¡Qué bien diseñado está Farlight 84!",
    //     "El sistema de combate en Farlight 84 es muy divertido.",
    //     "¡Me encanta la personalización en Farlight 84!",
    //     "Farlight 84 tiene una jugabilidad súper fluida.",
    //     "¡Farlight 84 es un juego que nunca envejece!",
    //     "El contenido en Farlight 84 siempre es fresco y emocionante.",
    //     "¡Qué bien hecho está Farlight 84!",
    //     "Farlight 84 es un juego que siempre te sorprende.",
    //     "¡La comunidad de Farlight 84 es muy activa!",
    //     "El sistema de combate en Farlight 84 es muy divertido.",
    //     "Me encanta",
    //   ];

    //   emojis
    const commentsEmojis = [
      '<img :data-emote-name="emojiAngel" class="gc-emote-c" data-emote-id="1730752" src="https://files.kick.com/emotes/1730752/fullsize">',
      '<img :data-emote-name="emojiAngry" class="gc-emote-c" data-emote-id="1730753" src="https://files.kick.com/emotes/1730753/fullsize">',
      '<img :data-emote-name="emojiAstonished" class="gc-emote-c" data-emote-id="1579033" src="https://files.kick.com/emotes/1579033/fullsize">',
      '<img :data-emote-name="emojiAwake" class="gc-emote-c" data-emote-id="1730754" src="https://files.kick.com/emotes/1730754/fullsize">',
      '<img :data-emote-name="emojiBlowKiss" class="gc-emote-c" data-emote-id="1579036" src="https://files.kick.com/emotes/1579036/fullsize">',
      '<img :data-emote-name="emojiBubbly" class="gc-emote-c" data-emote-id="1730755" src="https://files.kick.com/emotes/1730755/fullsize">',
      '<img :data-emote-name="emojiCheerful" class="gc-emote-c" data-emote-id="1730756" src="https://files.kick.com/emotes/1730756/fullsize">',
      '<img :data-emote-name="emojiClown" class="gc-emote-c" data-emote-id="1730758" src="https://files.kick.com/emotes/1730758/fullsize">',
      '<img :data-emote-name="emojiCool" class="gc-emote-c" data-emote-id="1730759" src="https://files.kick.com/emotes/1730759/fullsize">',
      '<img :data-emote-name="emojiCrave" class="gc-emote-c" data-emote-id="1730760" src="https://files.kick.com/emotes/1730760/fullsize">',
      '<img :data-emote-name="emojiCry" class="gc-emote-c" data-emote-id="1730761" src="https://files.kick.com/emotes/1730761/fullsize">',
      '<img :data-emote-name="emojiCrying" class="gc-emote-c" data-emote-id="1579040" src="https://files.kick.com/emotes/1579040/fullsize">',
      '<img :data-emote-name="emojiCurious" class="gc-emote-c" data-emote-id="1730762" src="https://files.kick.com/emotes/1730762/fullsize">',
      '<img :data-emote-name="emojiCute" class="gc-emote-c" data-emote-id="1730765" src="https://files.kick.com/emotes/1730765/fullsize">',
      '<img :data-emote-name="emojiDead" class="gc-emote-c" data-emote-id="1730767" src="https://files.kick.com/emotes/1730767/fullsize">',
      '<img :data-emote-name="emojiDevil" class="gc-emote-c" data-emote-id="1730768" src="https://files.kick.com/emotes/1730768/fullsize">',
      '<img :data-emote-name="emojiDisappoint" class="gc-emote-c" data-emote-id="1579041" src="https://files.kick.com/emotes/1579041/fullsize">',
      '<img :data-emote-name="emojiDisguise" class="gc-emote-c" data-emote-id="1579042" src="https://files.kick.com/emotes/1579042/fullsize">',
      '<img :data-emote-name="emojiDJ" class="gc-emote-c" data-emote-id="1730769" src="https://files.kick.com/emotes/1730769/fullsize">',
      '<img :data-emote-name="emojiDown" class="gc-emote-c" data-emote-id="1730770" src="https://files.kick.com/emotes/1730770/fullsize">',
      '<img :data-emote-name="emojiEnraged" class="gc-emote-c" data-emote-id="1579044" src="https://files.kick.com/emotes/1579044/fullsize">',
      '<img :data-emote-name="emojiExcited" class="gc-emote-c" data-emote-id="1579045" src="https://files.kick.com/emotes/1579045/fullsize">',
      '<img :data-emote-name="emojiEyeRoll" class="gc-emote-c" data-emote-id="1579054" src="https://files.kick.com/emotes/1579054/fullsize">',
      '<img :data-emote-name="emojiFire" class="gc-emote-c" data-emote-id="1730772" src="https://files.kick.com/emotes/1730772/fullsize">',
      '<img :data-emote-name="emojiGamer" class="gc-emote-c" data-emote-id="1730774" src="https://files.kick.com/emotes/1730774/fullsize">',
      '<img :data-emote-name="emojiGlass" class="gc-emote-c" data-emote-id="1730775" src="https://files.kick.com/emotes/1730775/fullsize">',
      '<img :data-emote-name="emojiGoofy" class="gc-emote-c" data-emote-id="1730776" src="https://files.kick.com/emotes/1730776/fullsize">',
      '<img :data-emote-name="emojiGramps" class="gc-emote-c" data-emote-id="1730782" src="https://files.kick.com/emotes/1730782/fullsize">',
      '<img :data-emote-name="emojiGrimacing" class="gc-emote-c" data-emote-id="1579046" src="https://files.kick.com/emotes/1579046/fullsize">',
      '<img :data-emote-name="emojiGrin" class="gc-emote-c" data-emote-id="1730785" src="https://files.kick.com/emotes/1730785/fullsize">',
      '<img :data-emote-name="emojiGrumpy" class="gc-emote-c" data-emote-id="1730786" src="https://files.kick.com/emotes/1730786/fullsize">',
      '<img :data-emote-name="emojiHappy" class="gc-emote-c" data-emote-id="1730787" src="https://files.kick.com/emotes/1730787/fullsize">',
      '<img :data-emote-name="emojiHeartEyes" class="gc-emote-c" data-emote-id="1579047" src="https://files.kick.com/emotes/1579047/fullsize">',
      '<img :data-emote-name="emojiHmm" class="gc-emote-c" data-emote-id="1730788" src="https://files.kick.com/emotes/1730788/fullsize">',
      '<img :data-emote-name="emojiKing" class="gc-emote-c" data-emote-id="1730789" src="https://files.kick.com/emotes/1730789/fullsize">',
      '<img :data-emote-name="emojiKiss" class="gc-emote-c" data-emote-id="1730790" src="https://files.kick.com/emotes/1730790/fullsize">',
      '<img :data-emote-name="emojiLady" class="gc-emote-c" data-emote-id="1730791" src="https://files.kick.com/emotes/1730791/fullsize">',
      '<img :data-emote-name="emojiLaughing" class="gc-emote-c" data-emote-id="1579050" src="https://files.kick.com/emotes/1579050/fullsize">',
      '<img :data-emote-name="emojiLoading" class="gc-emote-c" data-emote-id="1730792" src="https://files.kick.com/emotes/1730792/fullsize">',
      '<img :data-emote-name="emojiLol" class="gc-emote-c" data-emote-id="1730794" src="https://files.kick.com/emotes/1730794/fullsize">',
      '<img :data-emote-name="emojiMan" class="gc-emote-c" data-emote-id="1730796" src="https://files.kick.com/emotes/1730796/fullsize">',
      '<img :data-emote-name="emojiMoneyEyes" class="gc-emote-c" data-emote-id="1579051" src="https://files.kick.com/emotes/1579051/fullsize">',
      '<img :data-emote-name="emojiNo" class="gc-emote-c" data-emote-id="1730798" src="https://files.kick.com/emotes/1730798/fullsize">',
      '<img :data-emote-name="emojiOof" class="gc-emote-c" data-emote-id="1730799" src="https://files.kick.com/emotes/1730799/fullsize">',
      '<img :data-emote-name="emojiOooh" class="gc-emote-c" data-emote-id="1730800" src="https://files.kick.com/emotes/1730800/fullsize">',
      '<img :data-emote-name="emojiOuch" class="gc-emote-c" data-emote-id="1730802" src="https://files.kick.com/emotes/1730802/fullsize">',
      '<img :data-emote-name="emojiPleading" class="gc-emote-c" data-emote-id="1579052" src="https://files.kick.com/emotes/1579052/fullsize">',
      '<img :data-emote-name="emojiRich" class="gc-emote-c" data-emote-id="1730803" src="https://files.kick.com/emotes/1730803/fullsize">',
      '<img :data-emote-name="emojiShocked" class="gc-emote-c" data-emote-id="1730807" src="https://files.kick.com/emotes/1730807/fullsize">',
      '<img :data-emote-name="emojiSleep" class="gc-emote-c" data-emote-id="1730825" src="https://files.kick.com/emotes/1730825/fullsize">',
      '<img :data-emote-name="emojiSmart" class="gc-emote-c" data-emote-id="1730827" src="https://files.kick.com/emotes/1730827/fullsize">',
      '<img :data-emote-name="emojiSmerking" class="gc-emote-c" data-emote-id="1579055" src="https://files.kick.com/emotes/1579055/fullsize">',
      '<img :data-emote-name="emojiSmiling" class="gc-emote-c" data-emote-id="1579057" src="https://files.kick.com/emotes/1579057/fullsize">',
      '<img :data-emote-name="emojiSorry" class="gc-emote-c" data-emote-id="1730829" src="https://files.kick.com/emotes/1730829/fullsize">',
      '<img :data-emote-name="emojiStare" class="gc-emote-c" data-emote-id="1730830" src="https://files.kick.com/emotes/1730830/fullsize">',
      '<img :data-emote-name="emojiStarEyes" class="gc-emote-c" data-emote-id="1579058" src="https://files.kick.com/emotes/1579058/fullsize">',
      '<img :data-emote-name="emojiSwearing" class="gc-emote-c" data-emote-id="1579059" src="https://files.kick.com/emotes/1579059/fullsize">',
      '<img :data-emote-name="emojiUnamused" class="gc-emote-c" data-emote-id="1579061" src="https://files.kick.com/emotes/1579061/fullsize">',
      '<img :data-emote-name="emojiVomiting" class="gc-emote-c" data-emote-id="1579062" src="https://files.kick.com/emotes/1579062/fullsize">',
      '<img :data-emote-name="emojiWink" class="gc-emote-c" data-emote-id="1730831" src="https://files.kick.com/emotes/1730831/fullsize">',
      '<img :data-emote-name="emojiXEyes" class="gc-emote-c" data-emote-id="1579038" src="https://files.kick.com/emotes/1579038/fullsize">',
      '<img :data-emote-name="emojiYay" class="gc-emote-c" data-emote-id="1730834" src="https://files.kick.com/emotes/1730834/fullsize">',
      '<img :data-emote-name="emojiYes" class="gc-emote-c" data-emote-id="1730835" src="https://files.kick.com/emotes/1730835/fullsize">',
      '<img :data-emote-name="emojiYuh" class="gc-emote-c" data-emote-id="1730839" src="https://files.kick.com/emotes/1730839/fullsize">',
      '<img :data-emote-name="emojiYum" class="gc-emote-c" data-emote-id="1730840" src="https://files.kick.com/emotes/1730840/fullsize">',
    ];

    // mensajes divertidos
    // const comments = [
    //   "¡Eso fue un tiro increíble! ¿Cuántos años de entrenamiento para hacer eso?",
    //   "¡Ese movimiento fue más rápido que mi wifi! 😂",
    //   "¿Esa estrategia la aprendiste de un tutorial o es talento natural?",
    //   "¡Me estoy riendo más que en una película de comedia con esos comentarios!",
    //   "¡Esa victoria fue tan épica que estoy buscando una forma de recrearla en la vida real!",
    //   "¡Por fin! Un live en el que puedo ver a alguien jugar mejor que yo y sentirme bien por ello!",
    //   "¡En mi casa estamos haciendo un torneo de quién puede gritar más fuerte por las jugadas épicas! ¡Voy ganando con tus movimientos!",
    //   "¡Quiero saber si hay un botón secreto para hacer que esos disparos sean aún más impresionantes!",
    //   "¡Cuando ganes, haz el baile de la victoria para que todos podamos copiarlo!",
    //   "¿Cuál es el secreto para no caer en pánico cuando los enemigos están encima? ¿Se puede comprar en la tienda del juego?",
    //   "¡Me siento como si estuviera en el juego contigo! ¡A veces hasta me olvido que solo estoy viendo!",
    //   "¡Si sigues jugando así, pronto vas a tener más seguidores que el propio juego!",
    //   "¡Qué gran jugada! ¿Esa estrategia también la usas en tus partidas privadas?",
    //   "¡Tu precisión es de otro nivel! ¿Tienes algún consejo para los jugadores novatos?",
    //   "¡Este live es lo mejor que he visto en todo el día! ¡Sigue así!",
    //   "¿Tienes alguna superstición que sigas antes de empezar una partida?",
    //   "¡Esa acción fue tan rápida que casi me caigo de la silla! 😂",
    //   "¡Estoy aprendiendo mucho solo viendo cómo juegas! ¿Cuál es tu truco secreto?",
    //   "¡Esa jugada fue más épica que cualquier final de temporada de mi serie favorita!",
    //   "¡Tus comentarios son tan buenos que me hacen olvidar que estoy perdiendo en mi propio juego!",
    //   "¡Cada vez que juegas, parece que el juego se hace más divertido!",
    //   "¡No puedo dejar de ver! ¿Tienes alguna técnica para mantenerte tan enfocado?",
    //   "¡Qué habilidad para evadir los ataques! ¿Cómo lo haces?",
    //   "¡El chat está lleno de emoción por tus jugadas! ¡Sigue dándonos más razones para animarte!",
    //   "¡Eso fue un gran trabajo en equipo! ¿Cómo te coordinas tan bien con tus compañeros?",
    //   "¡Me pregunto cuántas partidas has jugado para llegar a este nivel!",
    //   "¡Tu estilo de juego es único! ¿Tienes algún ídolo en el mundo del gaming?",
    //   "¡La forma en que usas las armas es impresionante! ¿Cuál es tu favorita?",
    //   "¡La tensión está en su punto máximo con cada jugada! ¿Cómo mantienes la calma?",
    //   "¡Es increíble cómo puedes cambiar de estrategia en medio de una partida!",
    //   "¡Tus reacciones son épicas! ¿Cuál es tu entrenamiento para mantenerte tan ágil?",
    //   "¡Estoy esperando el momento en que hagas una jugada aún más épica!",
    //   "¡El chat está en llamas con tus jugadas! ¡No pares!",
    //   "¡Tu forma de jugar es como ver una película de acción en vivo!",
    //   "¡Esa combinación de movimientos fue simplemente perfecta!",
    //   "¡Cada victoria tuya es una celebración en el chat!",
    //   "¡La forma en que superas a los enemigos es digna de un campeón!",
    //   "¡Tus estrategias están dejando a todos boquiabiertos!",
    //   "¡Me encanta cómo mantienes la diversión en cada partida!",
    //   "¡El live está increíble! ¿Tienes algún consejo para los jugadores que te siguen?",
    //   "¡Esa jugada fue tan rápida que apenas pude procesarla!",
    //   "¡Tu habilidad es impresionante! ¿Cuánto tiempo practicas cada día?",
    //   "¡Cada partida es una nueva aventura contigo! ¿Cuál ha sido tu favorita hasta ahora?",
    //   "¡El chat está lleno de admiradores por tus increíbles jugadas!",
    //   "¡Tus reflejos son de otro planeta! ¿Tienes algún secreto para mejorar?",
    //   "¡Esa jugada fue como magia! ¿Cuál es el truco para hacer algo así?",
    //   "¡No puedo dejar de ver! Cada momento es emocionante y sorprendente.",
    //   "¡Tu habilidad para anticipar los movimientos enemigos es asombrosa!",
    //   "¡Cada victoria tuya es una razón para celebrar en el chat!",
    //   "¡Tus estrategias siempre parecen funcionar! ¿Algún consejo para los principiantes?",
    //   "¡Esa jugada fue tan buena que casi me caigo de la silla!",
    //   "¡Tus movimientos son tan precisos que parecen coreografiados!",
    //   "¡Cada partida contigo es una montaña rusa de emociones! ¡Sigue así!",
    // ];

    const commentsText = [
      "tremendo tiro como hiciste eso?",
      "ese movimiento fue flash 😂",
      "eso lo sacaste de un tuto o es puro talento?",
      "me rio mas q con los memes viendo esto 😂",
      "esa win fue epica enserio",
      "al fin alguien q juega mejor q yo 😂",
      "en casa estamos gritando con tus jugadas",
      "hay un truco pa esos disparos epicos?",
      "hacete el baile de la victoria 😂",
      "como no entras en panico con tantos enemigos?",
      "me siento en el game viendo esto",
      "seguí asi q te vas a hacer re famoso",
      "esa jugada la usas en partidas privadas tmb?",
      "tu precision es de otro planeta como lo haces?",
      "este live es lo mejor de mi dia",
      "tenes alguna cábala antes de jugar?",
      "fue tan rapido q casi me caigo 😂",
      "aprender viendo esto es una locura",
      "fue mas epico q el final de mi serie fav",
      "tus comentarios me hacen olvidar q pierdo en mi game",
      "esto cada vez se pone mas divertido",
      "como haces pa no perder la concentracion?",
      "tremenda habilidad pa esquivar bro",
      "el chat esta hype total con vos",
      "cuantas partidas jugaste pa ser asi de pro?",
      "tu estilo de juego es unico quien te inspira?",
      "esas armas son brutales cual es tu fav?",
      "como te mantenes tan tranqui en momentos asi?",
      "cambias de tactica en medio de la partida q crack",
      "tus reacciones son lo mas q haces pa ser tan agil?",
      "cuando viene la proxima jugada epica?",
      "el chat esta prendido fuego segui asi",
      "esto es como ver una peli de accion en vivo",
      "esa combinacion fue perfecta",
      "cada win tuya es fiesta aca",
      "sos un campeon como superas a los enemigos?",
      "tus estrategias son brutales no pares",
      "re divertido este live no pares nunca",
      "algún consejo pa los q te seguimos?",
      "fue tan rapido q ni lo vi",
      "sos un crack cuanto practicas?",
      "cada partida es una aventura con vos",
      "tus jugadas tienen al chat re manija",
      "tus reflejos son otro level cual es tu secreto?",
      "esa jugada fue magia",
      "esto no se puede dejar de ver",
      "como anticipas todo asi q genio",
      "tus wins son pa festejar siempre",
      "tus tacticas siempre funcionan como haces?",
      "esa jugada fue tan buena q casi me caigo",
      "tus movidas son de coreo bro",
      "esto es una montaña rusa de emociones",
    ];

    const OBJ_G = {
      emojis: commentsEmojis,
      texto: commentsText,
    };

    const comments = OBJ_G[request.messageType];

    const chatInput = document.querySelector("#message-input");
    const sendButton = document.querySelector(".send-row .base-button");

    if (chatInput && sendButton) {
      // const comment = comments[Math.floor(Math.random() * comments.length)];
      const comment = getRandomComment(comments);

      // La cadena de HTML que representa la imagen
      const imgHtml = comment;

      // Inserta el HTML en el div
      chatInput.innerHTML += imgHtml;
      // chatInput.innerText = comment;

      // Creamos un evento 'input' para notificar al chat que el valor ha cambiado
      const inputEvent = new Event("input", { bubbles: true });
      chatInput.dispatchEvent(inputEvent);

      // Esperamos un pequeño tiempo para que el evento se propague y luego hacemos clic en el botón
      setTimeout(() => {
        sendButton.click();
      }, 500); // 500ms de espera para asegurar que el chat detecte el cambio
    }
  }

  if (request.action === "startClickingChat") {
    if (!intervalId) {
      const interval = request.valueInterval ?? 15000;
      // Inicia el intervalo para enviar comentarios cada 30 segundos
      intervalId = setInterval(sendComment, interval);
      sendResponse({ status: "started" });
    }
  } else if (request.action === "stopClickingChat") {
    // Detiene el envío de comentarios si se recibe la acción de detener
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      sendResponse({ status: "stopped" });
    }
  } else if (request.action === "resetClickingChat") {
    // Detiene el envío de comentarios si se recibe la acción de detener
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      const interval = request.valueInterval ?? 15000;
      intervalId = setInterval(sendComment, interval);
      sendResponse({ status: "stopped" });
    }
  }
});

// function extractImgTags(htmlString) {
//     // Crear un elemento DOM temporal para parsear el string HTML
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlString, 'text/html');

//     // Seleccionar todas las etiquetas img
//     const imgElements = doc.querySelectorAll('img');

//     // Convertir NodeList a Array y mapear para obtener el string de la etiqueta completa
//     const imgTags = Array.from(imgElements).map(img => img.outerHTML);

//     return imgTags;
// }
