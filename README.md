SE BUSCA · ONE PIECE (React)
Hugo Aparicio Guillén · 3º INSO C

## Descripción
Catálogo de carteles de "SE BUSCA" con los piratas de One Piece, hecho en React. Los datos vienen de la API pública api-onepiece.com.


## Funcionalidades
- Carteles con nombre, recompensa, estado, tripulación, fruta del diablo, edad y altura.
- Sello de "Fallecido" para los piratas muertos.
- Buscador por nombre.
- Filtros por tripulación, estado, recompensa y fruta del diablo.
- Ordenación por recompensa, nombre, edad o altura.
- Resumen con el número de piratas y la suma de sus recompensas.
- Avisos de cargando, error (con botón Reintentar) y sin resultados.
- Caché de una hora en localStorage.


## Cómo ejecutarlo
Viajas a la carpeta donde este el proyecto y pones el comando npm run dev
Después, abrir http://localhost:5173


## Estructura
src/main.jsx          Punto de entrada
src/App.jsx           Componente principal: estado, carga de datos y composición
src/api.js            Petición a la API
src/cache.js          Caché en localStorage
src/transform.js      Funciones para limpiar, filtrar, ordenar y formatear datos
src/components/       Cabecera, Filtros, Buscador, Selector, Rejilla, Cartel y Aviso


## Decisiones principales
- El estado está en App porque lo comparten Filtros y Rejilla.
- Solo se guarda lo mínimo (carteles, error, intento y filtros); lo demás se calcula a partir de ello.
- Un único useEffect carga los datos de la API, con dependencia [intento] para poder reintentar y un AbortController como cleanup.
- Las listas usan el id del pirata como key.


## Uso de IA

Le pedí a Claude que me guiara paso a paso: en cada paso me explicaba el concepto nuevo (componentes, JSX, props, `useState`, `useEffect`, keys, renderizado condicional) comparándolo con mi código de la misión anterior y me proponía ideas para adaptarlo a React. Yo lo escribía en mi proyecto, lo probaba y le preguntaba todo lo que no entendía hasta poder explicarlo. La lógica de datos (`api.js`, `cache.js` y `transform.js`) es la de mi práctica anterior y la reutilicé sin cambios.

Errores en los que me ayudó:

- Pantalla en blanco al añadir los filtros: había dejado una línea del paso anterior que usaba una variable `texto` que ya no existía. Al lanzar un error, React no dibujaba nada. Aprendí a mirar la consola (F12) para ver qué componente fallaba, y cambié esa línea por `aplicarFiltros` y `ordenarCarteles`.
- Props con nombres distintos: en `App` pasaba `tipoFruta` y en `Filtros` usaba `tiposFruta`. Puse el mismo nombre en los dos sitios.
- Desplegables vacíos: en `Selector` había llamado `hijos` a la prop `children`.
- Clases que no coincidían con el CSS (`filtro_nombre` y `controles_busqueda` con una sola barra baja en vez de dos).

Cómo lo verifiqué: después de cada paso y cada cosa que hacía lo probaba en el navegador.

## Autopsia

1. Todos los filtros en un solo estado: Guardo la búsqueda, los filtros y el orden en un único objeto `filtros`, en vez de usar seis `useState` separados. Así puedo pasárselo directamente a mi función `aplicarFiltros` de la práctica anterior, y para limpiar los filtros basta con volver al objeto inicial en una sola línea. Lo descarté hacer por separado porque necesitaría seis estados, seis funciones para cambiarlos y seis props. El inconveniente es que cada control necesita una pequeña función que diga qué campo está cambiando.

2. Calcular los datos en vez de guardarlos: Solo guardo en el estado lo que no se puede deducir: los piratas de la API, el error, los filtros y un contador de intentos. La lista de piratas que se ven, el resumen y si está cargando se calculan cada vez que se dibuja la página. Descarté guardar la lista filtrada en otro estado porque tendría que acordarme de actualizarla cada vez que cambiara un filtro, y si se me olvidaba se verían datos viejos. El inconveniente es que se vuelve a filtrar en cada cambio.