export const Lesson1 = {
    titulo: "Arrays",
    descripcion: "Descripcion de Arrays",
    video: "https://vimeo.com/47483575",
    // quiz:
    // {
    //     data: "acatengo el quiz",
    //     preguntas: [{ texto: "la pregunta", respuestas: ["option1", "option2", "option3"] }],
    //     respuestas: ["option1"],
    //     Resp_min: 1,
    //     Resp_min_forAb:1,
    // },
    quiz: [
        {
            "titulo": "¿Cuál es el mejor lenguaje de programación?",
            "opciones": [
                { "textoRespuesta": "JavaScript", "isCorrect": true },
                { "textoRespuesta": "PHP", "isCorrect": false },
                { "textoRespuesta": "C++", "isCorrect": false },
                { "textoRespuesta": "Kotlin", "isCorrect": false }
            ]
        },
        {
            "titulo": "Con Lasfito aprendes de tutoriales...?",
            "opciones": [
                { "textoRespuesta": "sin contenido", "isCorrect": false },
                { "textoRespuesta": "sin relleno", "isCorrect": true },
                { "textoRespuesta": "sin gracia :v", "isCorrect": false },
                { "textoRespuesta": "sin código", "isCorrect": false }
            ],
        }
    ],
}
export var Reco = [
    { name: "FLEXBOX FROGGY", hr: "http://flexboxfroggy.com/#es", etiqueta: "css" },
    { name: "GRID GARDEN", hr: "https://cssgridgarden.com/#es", etiqueta: "css" },
    { name: "Ruby Warrior", hr: "https://github.com/ryanb/ruby-warrior", etiqueta: "javascript" },
    { name: "Flappy Bird", hr: "https://studio.code.org/flappy/1", etiqueta: "javascript" },
    { name: "Code Combat", hr: "https://codecombat.com/", etiqueta: "html" },
    { name: "CSS DINNER", hr: "https://flukeout.github.io/", etiqueta: "css" },
    { name: "Robocode ", hr: "https://robocode.sourceforge.io/", etiqueta: "javascript" },
    { name: "Elevator Saga", hr: "http://play.elevatorsaga.com/", etiqueta: "html" }
]
export const Base = [
    {
        titulo: "Javascript Basico",
        descripcion: "JavaScript es un robusto lenguaje de programación que se puede aplicar a un documento HTML y usarse para crear interactividad dinámica en los sitios web. Fue inventado por Brendan Eich, cofundador del proyecto Mozilla, Mozilla Foundation y la Corporación Mozilla.Puedes hacer casi cualquier cosa con JavaScript. Puedes empezar con pequeñas cosas como carruseles, galerías de imágenes, diseños fluctuantes, y respuestas a las pulsaciones de botones. Con más experiencia, serás capaz de crear juegos, animaciones 2D y gráficos 3D, aplicaciones integradas basadas en bases de datos ¡y mucho más!       JavaScript por sí solo es bastante compacto aunque muy flexible, y los desarrolladores han escrito gran cantidad de herramientas encima del núcleo del lenguaje JavaScript, desbloqueando una gran cantidad de funcionalidad adicional con un mínimo esfuerzo. Esto incluye: Interfaces de Programación de Aplicaciones del Navegador(APIs) — APIs construidas dentro de los navegadores que ofrecen funcionalidades como crear dinámicamente contenido HTML y establecer estilos CSS, hasta capturar y manipular un vídeo desde la cámara web del usuario, o generar gráficos 3D y muestras de sonido.APIs de terceros, que permiten a los desarrolladores incorporar funcionalidades en sus sitios de otros proveedores de contenidos como Twitter o Facebook. Marcos de trabajo y librerías de terceros que puedes aplicar a tu HTML para que puedas construir y publicar rápidamente sitios y aplicaciones.",
        calificacion: 0,
        imagen: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        userInscript: 0,
        lessons: [{ ...Lesson1, num: 0 }, { ...Lesson1, num: 1 }, { ...Lesson1, num: 2, last:true }],
        userVotes: [],
        votes: [],
        lenguaje: "JavaScript"
    },
    {
        titulo: "Javascript Medio",
        descripcion: " Tomando decisiones en tu código — condicionalesejemplo, en un juego, si el numero de vidas del jugador es 0, entonces se termina el juego. En una aplicación del clima, si esta siendo vista por la mañana, muestra un gráfico del amanecer; muestra estrellas y una luna si es de noche. En este artículo exploraremos como los condicionales estructuran el trabajo en Javascript. Bucles de código A veces necesitas que una tarea se haga más de una vez. Por ejemplo, revisar toda una lista de nombres. En programación, los bucles ('loops' en inglés) hacen este trabajo muy bien. Aca veremos la estructura de loops en Javascript.Funciones — bloques de código reusables (en-US)Otro concepto fundamental en código es funciones. Funciones te permite almacenar una pieza de código que ejecuta una sola tarea dentro de un bloque definido, y después llamar ese código cuando lo necesitas usando un comando corto  en lugar de tener que escribir el mismo código varias veces. En este articulo exploraremos conceptos fundamentales detrás de las funciones tales como sintaxis básica, cómo invocar y definir funciones, ámbito o alcance (scope), y parámetros.Crea tu propia funciónCon la información presentada en el artículo anterior, este artículo, pretende demostrar una parte práctica. Se podrá desarrollar una función propia, y durante el desarrollo se presentarán algunos consejos prácticos y útiles para trabajar con funciones.Una función devuelve valores Un concepto fundamental que ha de tenerse en cuenta, es que las funciones pueden devolver valores al finalizar su ejecución, aunque algunas funciones también pueden no devolver ningún valor. Es importante entender como son esos valores, qué tipos pueden tener y cómo aprovechar el valor devuelto por la función en el programa.Introducción a eventos Los eventos son acciones u ocurrencias que aparecen durante la ejecución del programa, y que son reportadas por el sistema, de forma que se pueda responder a los eventos de la forma deseada. Por ejemplo, si un usuario hace un click en un botón de una página web, puede que se quiera que ese evento inicie una acción en el que se muestre cierta información en un cuadro de información.  En este último artículo se presentarán y describirán los conceptos necesarios con respecto a los eventos, y como funcionan en un navegador. ",
        calificacion: 0,
        imagen: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        userInscript: 0,
        lessons: [],
        userVotes: [],
        votes: [],
        lenguaje: "JavaScript"
    },
    {
        titulo: "Javascript Avanzado",
        descripcion: "Conceptos generales de programación asincrónica. En este artículo revisaremos una serie de conceptos importantes relacionados con la programación asincrónica y cómo se ve esto en los navegadores web y JavaScript. Debe comprender estos conceptos antes de trabajar en los otros artículos del módulo.Introduciendo JavaScript asincrónicoEn este artículo recapitulamos brevemente los problemas asociados con JavaScript síncrono, y echamos un primer vistazo a algunas de las diferentes técnicas de JavaScript asíncrono que encontrarás, mostrando cómo pueden ayudarnos a resolver tales problemas.JavaScript asíncrono cooperativo: tiempos de espera e intervalosAquí observamos los métodos tradicionales que JavaScript tiene disponibles para ejecutar código de forma asíncrona después de que haya transcurrido un período de tiempo establecido, o en un intervalo regular (por ejemplo, un número establecido de veces por segundo), hablemos sobre para qué son útiles y observe su Problemas inherentes.Manejo de operaciones asincrónas con PromisesLas promesas son una característica relativamente nueva de JavaScript que le permite diferir más acciones hasta que la acción anterior se haya completado o responder en caso de tener una falla o error durante su ejecución. Esto es realmente útil para configurar una secuencia de operaciones para que funcione correctamente. Este artículo te muestra cómo funcionan las promesas, dónde las verá en uso en una WebAPI y cómo escribir las tuyas de la manera adecuada.Hacer la programación asincróna más fácil con async y await Las promesas pueden ser algo complejas de configurar y comprender, por lo que los navegadores modernos han implementado funciones async y el operador de await. El primero permite que las funciones estándar se comporten implícitamente de forma asíncrona con las promesas, mientras que el segundo puede usarse dentro de las funciones async para esperar las promesas antes de que la función continúe. Esto hace que las promesas de encadenamiento sean más simples y fáciles de leer.Elegir el enfoque correcto Para finalizar este módulo, consideraremos las diferentes técnicas y características de codificación que hemos discutido a lo largo de todo, y veremos cuáles deberias usar cuando, con recomendaciones y recordatorios de dificultades comunes, sea lo más apropiado.",
        calificacion: 0,
        imagen: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        userInscript: 0,
        lessons: [],
        userVotes: [],
        votes: [],
        lenguaje: "JavaScript"
    },
    {
        titulo: "Html Avanzado",
        descripcion: "Este módulo contiene los siguientes artículos:Comenzando con tablas HTMLEste artículo te introduce en las tablas HTML , cubriendo las cosas más basicas como las líneas y las celdas, encabezados, crear celdas de multiples líneas y columnas, y como agrupar todas las celdas en una columna con fines estilisticos.Características avanzadas y accesibilidad en tablas HTML.En el segundo artículo de este módulo, veremos algunas características avanzadas de las tablas HTML — como subtítulos/resumenes y agrupar líneas en la cabeza, cuerpo y pie de la tabla — además de realizar tablas accesibles para aquellos usuarios con problemas de visión.",
        calificacion: 0,
        imagen: "https://cdn-icons-png.flaticon.com/512/174/174854.png",
        userInscript: 0,
        lessons: [],
        userVotes: [],
        votes: [],
        lenguaje: "Html"
    },
    {
        titulo: "Html Medio",
        descripcion: "Este módulo contiene los siguientes artículos que te enseñarán todo lo fundamental sobre introducir multimedia en páginas web.Imágenes en HTML.Hay otros tipos de multimedia a considerar, pero es logico empezar con el humilde elemento <img>, usado para incorporar una imagen simple en una página web. En este artículo veremos cúmo usarlo en profundidad, incluyendo los conceptos básicos, y contenido independiente con título usando  <figure>, y cómo relacionarlos con las imágenes de fondo de CSS.Contenido de Audio y Video.A continuación, veremos como usar los elementos de HTML5 <video> y <audio>, para insertar video y audio en nuestras páginas, incluyendo conceptos básicos, proporcionando acceso a diferentes formatos de archivo para diferentes navegadores, agregando ilustraciones y subtítulos y cómo resolver inconvenientes en navegadores más antiguos.De <object> a <iframe> - otras tecnologías de inserciónEn este punto, nos gustaría dar un paso hacia un lado, mirando algunos de los elementos que te permiten insertar una amplia variedad de tipos de contenido en tus páginas web: los elementos <iframe>, <embed> y <object>. El elemento <iframe> nos permite incluir otras páginas web, y las otras dos permiten insertar archivos de formato PDF, SVG e incluso Flash -una tecnología que está a punto de desaparecer, pero que todavía puede verse de manera semi-regular-. Añadiendo graficos vectoriales a la WebLos gráficos vectoriales pueden ser muy útiles en ciertas situaciones. A diferencia de los formatos normales como PNG / JPG, estos no se distorsionan/pixelizan cuando se los amplían -pueden permanecer suaves cuando se escalan-. Este artículo te introduce al concepto de gráficos vectoriales y cómo incluir el popular formato SVG en páginas web. Imagenes receptivasEn este artìculo, aprenderás acerca del concepto de imágenes receptivas -imágenes que pueden adaptarse en dispositivos con grandes diferencias de tamaños de pantalla, resoluciones y otras características-. Esto te ayudará a mejorar el rendimiento en diferentes dispositivos. Las imágenes receptivas son sólo una parte del diseño receptivo, un tópico que a futuro aprenderás en CSS.",
        calificacion: 0,
        imagen: "https://cdn-icons-png.flaticon.com/512/174/174854.png",
        userInscript: 0,
        lessons: [],
        userVotes: [],
        votes: [],
        lenguaje: "Html"
    },
    {
        titulo: "Html Basico",
        descripcion: "En su corazón, HTML es un lenguaje muy sencillo compuesto de elementos, que se pueden aplicar a piezas de texto para darles un significado diferente en un documento (¿Esto es un párrafo? ¿Esto es una lista con viñetas? ¿Esto es parte de una tabla?), estructura un documento en secciones lógicas (¿Tiene una cabecera? ¿Tres columnas de contenido? ¿Un menú de navegación?), e incrusta contenido como imágenes y vídeos en una página. Este módulo introducirá los dos primeros de estos, e introduce conceptos fundamentales y la sintaxis que necesitas para entender HTML.",
        calificacion: 0,
        imagen: "https://cdn-icons-png.flaticon.com/512/174/174854.png",
        userInscript: 0,
        lessons: [],
        userVotes: [],
        votes: [],
        lenguaje: "Html"
    }, {
        titulo: "CSS Basico",
        descripcion: "CSS (Cascading Style Sheets - en español Hojas de Estilo en Cascadas) es usado para darle estilo y diseño a las páginas Web — por ejemplo, para cambiar la fuente de letra, color, tamaño y el espaciado de tu contenido; dividir en múltiples columnas, o agregar animaciones y otras propiedades decorativas. Este modulo provee un inicio suave para tu ruta de aprendizaje hacia el dominio de CSS con su funcionamiento básico, como luce su sintaxis, y cómo puedes comenzar a utilizarlo y añadir estilo a HTML.",
        calificacion: 0,
        imagen: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png",
        userInscript: 0,
        lessons: [],
        userVotes: [],
        votes: [],
        lenguaje: "CSS"
    }, {
        titulo: "CSS Medio",
        descripcion: "Este módulo retoma donde Primeros pasos en CSS finalizó — ahora que estás familiarizado con el lenguaje y su sintaxis, y que tienes algo de experiencia en su uso, es hora de bucear un poco más profundo. Este módulo se centra en el estilo en cascada de css y en el concepto de herencia, también veremos todos los tipos de selectores, unidades, tamaños, estilos de fondo, bordes, debugging y mucho más. El objetivo aqui es proveerte de herramientas para que puedas escribir código CSS competentemente y ayudarte a entender lo escencial de la teoría antes de centrarnos en disciplinas más específicas como text styling y CSS layout.",
        calificacion: 0,
        imagen: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png",
        userInscript: 0,
        lessons: [],
        userVotes: [],
        votes: [],
        lenguaje: "CSS"
    }, {
        titulo: "CSS Avanzado",
        descripcion: "Llegados a este punto, hemos examinado los fundamentos básicos de CSS: cómo dar estilo al texto y cómo manipular las cajas que incluyen tu contenido. Llegó el momento de explorar cómo colocar tus cajas en el lugar que elijas con respecto a la ventana principal y el resto de cajas. Hemos cubierto ya los prerrequisitos necesarios, así que vamos a sumergirnos en la maquetación CSS, fijándonos en diferentes configuraciones de visualización, métodos de maquetación tradicionales que implican floats y posicionamiento, así como a nuevas herramientas de maquetación en voga, como flexbox.",
        calificacion: 0,
        imagen: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png",
        userInscript: 0,
        lessons: [],
        userVotes: [],
        votes: [],
        lenguaje: "CSS"
    },
]

