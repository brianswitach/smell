# Smell&Co - Tienda de Perfumes Artesanales

Sitio web de e-commerce para perfumes artesanales, creado con Next.js, TypeScript, Tailwind CSS y Framer Motion.

## Características

- Diseño moderno y responsive con animaciones fluidas
- Catálogo de perfumes con información detallada
- Sección de decants (muestras de 5ml)
- Carrito de compras funcional
- Transiciones de página con animaciones
- Fallback para imágenes que no cargan
- Interfaz totalmente en español

## Tecnologías utilizadas

- **Next.js 15**: Framework React con funciones de servidor
- **TypeScript**: Para tipado estático y mejor mantenibilidad
- **Tailwind CSS**: Para estilizado rápido y consistente
- **Framer Motion**: Para animaciones fluidas
- **Shadcn/ui**: Componentes UI reutilizables

## Estructura del proyecto

- `src/app`: Páginas y rutas de la aplicación
- `src/components`: Componentes reutilizables
  - `navigation`: Componentes de navegación (navbar, footer)
  - `sections`: Secciones principales de la página
  - `ui`: Componentes de interfaz reutilizables
- `src/lib`: Utilidades, servicios y contextos
- `public`: Archivos estáticos e imágenes

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/brianswitach/smell.git
cd smell

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Despliegue

Este proyecto puede ser desplegado en Vercel o cualquier proveedor compatible con Next.js.

```bash
# Construir para producción
npm run build

# Iniciar en modo producción
npm start
```

## Autor

- Brian Switach

## Licencia

Este proyecto está bajo la Licencia MIT.
