# 📦 Gestor de Productos Digital

Este proyecto es una solución moderna y visual para la gestión de productos, impulsada por un enfoque práctico en la automatización y herramientas basadas en Inteligencia Artificial. Representa una muestra clara de cómo escalar habilidades sólidas de programación combinándolas con tecnologías actuales y el deseo genuino de crecer como desarrollador profesional.

---

## 🚀 Stack Tecnológico

- **Frontend:** React + TailwindCSS
- **Backend as a Service (BaaS):** Firebase Firestore + Hosting
- **Autenticación:** Firebase Authentication (opcional)
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

> Este proyecto no solo fue desarrollado por mí, sino conmigo. Aprendí a **resolver, documentar y aplicar** mejores prácticas gracias a la IA.

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

Este proyecto representa más que código: es una muestra del camino que estoy construyendo con base en disciplina, curiosidad y la determinación de crear soluciones útiles. Sé que este es solo un punto de partida.

🧠🔥 Tengo hambre de seguir aprendiendo, y estoy construyendo algo más grande, línea por línea, consulta por consulta.

---

## 📬 Contacto

¿Ideas, mejoras o te interesa el proyecto?

**Israel Hernández**  
📧 tuemail@example.com  
🌐 [Tu LinkedIn o GitHub aquí]