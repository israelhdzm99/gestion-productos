# 📦 Gestor de Productos Digital

Este proyecto es una solución moderna y visual para la gestión de productos, impulsada por un enfoque práctico en la automatización y herramientas basadas en Inteligencia Artificial. Representa una muestra clara de cómo escalar habilidades sólidas de programación combinándolas con tecnologías actuales y el deseo genuino de aportar soluciones digitales 100% funcionales.
---

## 🚀 Stack Tecnológico

- **Frontend:** React + TailwindCSS
- **Backend as a Service (BaaS):** Firebase Firestore + Hosting
- **Gráficas:** Chart.js (Bar & Pie)
- **Alertas UI:** SweetAlert2 (Swal.fire)
- **Control de estado:** React Hooks + uso directo de Firestore
- **Asistente IA:** ChatGPT-4o (como co-desarrollador y solución de problemas técnicos)

---

## 🔧 Clonar y Configurar

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/gestor-productos.git
   cd gestor-productos
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Ejecuta la aplicación localmente:**
   ```bash
   npm run dev
   ```

---

## 🧪 Ejecutar pruebas

Actualmente el sistema está diseñado para pruebas manuales de tipo funcional. Se recomienda:

- Probar la creación, edición y eliminación de productos.
- Validar los gráficos al modificar stock o categoría.
- Confirmar el correcto funcionamiento del filtrado y ordenamiento.

---

## 🤖 ¿Cómo y para qué utilicé el asistente de IA?

Desde el diseño de componentes hasta la resolución de errores complejos, **ChatGPT fue mi copiloto técnico**. Ejemplos concretos incluyen:

- 🔧 Ajuste dinámico del dashboard de estadísticas y sus gráficas.
- 🛠️ Conversión de alertas simples en componentes Swal.fire personalizados.
- 🧠 Refactorización de formularios y estandarización de estilos entre vistas.
- 💡 Recomendaciones de librerías, optimización de queries y mejora de UX.

> Este proyecto aprendí a **resolver, documentar y aplicar** mejores prácticas gracias a la IA.

---

## 🗂️ Configuración del BaaS

Se utilizó **Firebase Firestore** como backend sin servidor, con la siguiente estructura:

- **Colección:** `productos`
  - `id` (autogenerado)
  - `nombre`: string
  - `categoria`: string
  - `precio`: string
  - `rating`: number
  - `stock`: number

### 🔐 Reglas de seguridad:

```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Puedes ajustar esta política a producción
    }
  }
}
```

---

## 💬 Reflexión final

Este proyecto no solo es una app funcional de gestión de productos: también es un ejercicio real de cómo la inteligencia artificial puede potenciar el trabajo de quienes creamos herramientas digitales. Es un claro ejemplo de trabajo en equipo donde nosotros como desarrolladores traemos la visión, la disciplina y la ejecución y del lado contrario la precisión, rapidez y una guía estructurada.

¿Qué demuestra este enfoque?

Aliada real: la IA me ayudó a pulir diseño, alertas, dashboards y flujos sin robar mi estilo propio.

Disciplina + curiosidad: cada iteración—formularios, navegación, estadísticas—estuvo guiada por ganas de aprender y mejorar.

Potencial de crecimiento: esto es solo el comienzo. Integraré más métricas, tests y funcionalidades para hacerlo aún más robusto.

---

## 📬 Contacto

Ing. Israel Hernández 
📧 deira.ia.mx@gmail.com
🌐 israelhdzm99 - Github
