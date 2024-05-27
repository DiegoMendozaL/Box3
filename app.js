const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// Función para crear el mensaje con las opciones y la ubicación específica
const crearMensajeSucursal = (nombreSucursal, ubicacion) => [
    `${nombreSucursal}\nRecuerda que no necesitas reservación al llegar se te asigna tu mesa. 😋🍴 Y nuestros horarios son de Lunes a Miércoles es de 9:00 a.m. – 12 a.m. 😉 Jueves a Sábado de 9:00 am – 1 a.m. 😉.\n¿Qué te gustaría saber de nuestra sucursal? 👀✨`,
    `1. Ubicación\n¡Encuéntranos fácilmente y únete a la diversión! 🗺️✨ Haz clic en el enlace para descubrir dónde estamos ubicados y cómo llegar hasta nosotros. ¡Te esperamos! ${ubicacion}`,
    '2. Cartelera (Bandas en Vivo o Karaoke)\n🎶 ¡Descubre los horarios de las bandas y las fechas de karaoke! 🎤 Haz clic en nuestro enlace y no te pierdas ni un solo momento de diversión. 😃 (https://perrosyburros.com/entretenimiento/).',
    '3. Partidos en vivo\n¡No te pierdas ni un segundo de la acción! 📺 Únete a nosotros para ver los emocionantes partidos mientras ocurren. ⚽️🔥 ¡Prepárate para la emoción! 💥 (https://perrosyburros.com/).',
    '4. Promociones\n¡Estas son nuestras promociones disponibles! 😏 Haz clic en nuestro enlace para poderlas conocerlas todas. 😎🌯 (https://perrosyburros.com/promociones/).'
]; 

// Definir las ubicaciones específicas para cada sucursal de Ciudad de México
const ciudadMexicoSucursales = {

    'vía vallejo': '(https://maps.app.goo.gl/inW72jYVKw4KHp249)',
    'linda vista': '(https://maps.app.goo.gl/9Y1PLQNiXFSrXi8D6)',
    'rosario': '(https://maps.app.goo.gl/jUErYpKBTucmK4AVA)',
    'águilas': '(https://maps.app.goo.gl/tgatDZ8JWwv3ozzS6)',
    'antenas': '(https://maps.app.goo.gl/pj55RZSKsfwZWJHX6)',
    'central': '(https://maps.app.goo.gl/tY3CM4CCXKhQPp7y5)',
    'cuauhtémoc': '(https://maps.app.goo.gl/PLN6TAfYKYoRFRz29)',
    'buenavista': '(https://maps.app.goo.gl/ozhVhQNAbpjA38xm6)',
    'cuicuilco': '(https://maps.app.goo.gl/oNSJH266ReUkgYMr9)',
    'oceanía': '(https://maps.app.goo.gl/s2fp5eFUMMdGnBa39)',
    'parque jardín': '(https://maps.app.goo.gl/aJLzQor2R3xQzNz8A)',
    'tepeyac': '(https://maps.app.goo.gl/RFYUzf683scxtfi46)'


};


// Definir las ubicaciones específicas para cada sucursal de Estado de México
const estadoMexicoSucursales = {
    'cuatro caminos': '(https://maps.app.goo.gl/i9SNYF6EvQw1TDHB6)',
    'cosmopol': '(https://maps.app.goo.gl/YhaCHYGxtfjwbF288)',
    'lomas verdes': '(https://maps.app.goo.gl/2Jmu9iHnmv6hh7Ez9)',
    'tlanepantla': '(https://maps.app.goo.gl/fJsWLoj8VabdhEZD7)',
    'aragón': '(https://maps.app.goo.gl/oKaDwUs1Qwhu1R2x7)',
    'ciudad jardín': '(https://maps.app.goo.gl/XWzpjY6fYNWiagjU6)',
    'las américas': '(https://maps.app.goo.gl/nsPcSQtpRaGNJiJw8)'
};

// Flujos para las opciones de Ciudad de México
const flowCiudadMexicoOpciones = Object.keys(ciudadMexicoSucursales).map(sucursal =>
    addKeyword([sucursal]).addAnswer(crearMensajeSucursal(sucursal, ciudadMexicoSucursales[sucursal]))
);

// Flujos para las opciones de Estado de México
const flowEstadoMexicoOpciones = Object.keys(estadoMexicoSucursales).map(sucursal =>
    addKeyword([sucursal]).addAnswer(crearMensajeSucursal(sucursal, estadoMexicoSucursales[sucursal]))
);

// Flujo para manejar la selección de Ciudad de México
const flowCiudadMexico = addKeyword(['2', 'ciudad de mexico', 'cdmx', 'ciudad']).addAnswer(
    [
        'Has seleccionado Ciudad de México. Por favor, asegúrate de escribir correctamente la sucursal que vas a visitar.',
        '• Vía Vallejo',
        '• Linda Vista',
        '• Rosario',
        '• Águilas',
        '• Antenas',
        '• Central',
        '• Cuauhtémoc',
        '• Buenavista',
        '• Cuicuilco',
        '• Oceanía',
        '• Parque Jardín',
        '• Tepeyac'
    ],
    null,
    null,
    flowCiudadMexicoOpciones
);

// Flujo para manejar la selección de Estado de México
const flowEstadoMexico = addKeyword(['1', 'estado de mexico', 'estado']).addAnswer(
    [
        'Has seleccionado Estado de México. Por favor, asegúrate de escribir correctamente la sucursal que vas a visitar.',
        '• Cuatro Caminos',
        '• Cosmopol',
        '• Lomas Verdes',
        '• Tlanepantla',
        '• Aragón',
        '• Ciudad Jardín',
        '• Las Américas'
    ],
    null,
    null,
    flowEstadoMexicoOpciones
);

const handleFacturacion = addKeyword(['facturar', 'facturacion', 'factura']).addAnswer(
    [
        '¡Hola! Para facturar 🗒️ envíame un correo a facturame.pyb@gmail.com:',
        '- Método de pago',
        '- Datos de Facturación',
        '- Ticket o captura de tu pedido delivery.'
    ]
);

// Flujo principal que responde al saludo
const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenos días', 'buenas tardes', 'buenas noches'])
    .addAnswer(
        '¡Hola te estás comunicando a Perros y Burros!\nGracias por escribirnos, prepárate para sorprenderte con todo lo que tenemos para ti.😏😎\n¿En dónde nos visitarás? 🤔✨ Por favor selecciona la opción que corresponda. 😉👇\n1. Estado de México\n2. Ciudad de México'
    )
    .addAnswer(
        ['Escribe *1* para Estado de México o *2* para Ciudad de México.'],
        null,
        null,
        [flowEstadoMexico, flowCiudadMexico, handleFacturacion]
    );

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
}

main();