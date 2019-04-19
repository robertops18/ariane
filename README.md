# React Native Template 

## Steps

```
git clone https://github.com/gooapps/template-react-native.git
cd template-reac-native
```

En caso de necesitar notificaciones, crear proyecto en firebase.

### Android specific

Configurar proyecto de Firebase para Android, con los paquetes y nombre del proyecto.

![Nuevo firebase](https://i.imgur.com/mHxa0Q3.png)

Para conseguir de manera sencilla la huella Sha-1 seguir la siguiente imagen

![Ay mecachis, que han quitado la imagen](https://i.stack.imgur.com/ZG7rI.png)

Incluir el google-services.json en android/app machacando al que existe ahora


### IOS Specific

Work in progress


### Both (CommandLine)

```
yarn/npm install
npm run rename
react-native run-android/run-ios
Enjoy.
```


## Utilidades 

### Debuggear en dispositivo físico android

Se recomienda tener instalado [redux dev-tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

Caso Windows, tener adb tools en el path.

* Abrir menu de opciones de aplicación en el dispositivo
```
adb shell input keyevent 82
```

* Seleccionar Live Reload 
* Debug remoteley


Se abrirá una ventana de nuestro navegador favorito (~~chrome~~).

Depurar App

* Abrir consola de Desarrollo

Depurar Redux
* Click Derecho en la ventana del debugger -> Redux Tools -> Open Remote Redux Tools 

Depurar llamadas Fetch

* Copiar este código en App.js

```
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;
// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
    return global._fetch(uri, options, ...args).then((response) => {
        console.log('Fetch', { request: { uri, options, ...args }, response });
        return response;
    });
};
```

### Añadir idioma


* Añadimos un fichero con el codigo del idioma en ***src/config/language*** por ejemplo ***src/config/language/ru***
* En el fichero ***src/utils/language.utils.js*** lo importamos
* Añadir las claves necesarias
* Cambiando el idioma del dispositivo se cambia el idioma de la App (cerrar app para ver cambios)

Utilizar traducciones

* Importar Utils en el componente
```
import translate from '../../utils/language.utils.js';
```

* Llamar a la traducción en el componente
```
  <Text>{translate('HOME')}</Text>
```

## Troubleshooting Guide

### Problemas Con Rename
En caso de que existan problemas cuando se ejecute el script de rename (hace renombrados recursivos y puede causar problemas a veces con los node_modules)
```
yarn/npm install
npm run rename
rm -rf node_modules
rm -rf yarn.lock 
rm -rf package-lock.json
yarn/npm install 
```

### Gradle Mac

Si da problemas de permisos bastará con ejecutar el siguiente comando

```
    chmod 755 android/gradlew
```

### Java

Se recomienda tener instalado jdk de Java 8 64 bits.

### Other problems

![Era un Gif, da igual](https://media.giphy.com/media/2zeji2UedvZzvIZ45N/giphy.gif)

Contactar con osvaldo@gooapps.net



## Webs de interes

* [React Native Guide](https://reactnative.guide)
* [React Native Firebase](http://rnfirebase.io)
* [React Native Components](https://react-native-training.github.io/react-native-elements/docs)
* [Redux Devtools](https://github.com/zalmoxisus/redux-devtools-extension)
  

