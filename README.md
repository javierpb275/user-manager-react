# USER MANAGER

## Primer paso:

Descargar el zip o clonar el repositorio.

## Segundo paso:

Ejecutar en la carpeta raíz:

```bash
pnpm install
```

## Tercer paso:

Añadir los archivos `.env.development` y `.env.production` con las siguientes variables de entorno:

```env
VITE_API_URL=https://reqres.in/api
VITE_API_KEY=tuapikey
```

> ⚠️ Visita [https://reqres.in/](https://reqres.in/) y crea tu propia API Key, luego reemplaza el valor en `VITE_API_KEY`.

## Cuarto paso:

Ejecutar la app con:

```bash
pnpm run dev
```

---

## Librerías usadas

**Estilos:**

* `tailwindcss`
* `@tailwindcss/vite`
* `@heroicons/react`
* `@headlessui/react`

**Enrutado:**

* `@tanstack/react-router`
* `@tanstack/react-router-devtools`

**Estados:**

* `zustand`

**Llamadas API:**

* `axios`
* `@tanstack/react-query`

