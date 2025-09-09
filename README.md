# Ejercicio - Sistema de Pedidos con Pipes & Filters

## Descripción
Backend de e-commerce que procesa pedidos a través de un pipeline de filtros (Pipes & Filters) en Node.js, Express y TypeScript. Cada filtro tiene una responsabilidad específica y los datos fluyen secuencialmente hasta completar el procesamiento.

---

## Características principales
- **Arquitectura Pipes & Filters**: cada filtro es independiente y encadenable.
- **Validación y cálculo**: validación de cliente, productos, integridad, precios, descuentos, impuestos y pago.
- **Configuración dinámica**: puedes habilitar/deshabilitar filtros vía endpoint.
- **Testing profesional**: tests unitarios y de integración listos para usar.
- **Manejo de errores y middlewares**: validación, errores claros y códigos HTTP correctos.

---

## Estructura de carpetas

```
src/
	controllers/         # Lógica de endpoints
	data/                # Datos de prueba en memoria
	filters/             # Filtros Pipes & Filters
	middleware/          # Middlewares de validación y errores
	models/              # Tipos e interfaces TypeScript
	pipelines/           # Interfaces de pipeline
	routes/              # Rutas Express
	services/            # Implementación del pipeline maestro
	tests/               # Tests unitarios e integración
```

---

## Instalación y uso rápido

```bash
git clone <repo-url>
cd EjercicioSistemaDePedidosConP-F
npm install
npm run build
npm run dev
```

El servidor corre en `http://localhost:3000` por defecto.

---

## Endpoints principales

### Procesar pedido
`POST /api/orders/process`

**Body ejemplo:**
```json
{
	"id": "order1",
	"customerId": "c1",
	"items": [
		{ "productId": "p1", "quantity": 2 },
		{ "productId": "p2", "quantity": 1 }
	],
	"status": "pending",
	"createdAt": "2025-09-09T10:00:00Z"
}
```

**Respuesta exitosa:**
```json
{
	"success": true,
	"finalOrder": { ... },
	"filterResults": [ ... ],
	"executionTime": 12
}
```

### Estado de procesamiento
`GET /api/orders/:id/status`

**Respuesta:**
```json
{
	"success": true,
	"finalOrder": { ... },
	"filterResults": [ ... ],
	"executionTime": 12
}
```

### Ver configuración del pipeline
`GET /api/pipeline/config`

### Modificar configuración del pipeline
`PUT /api/pipeline/config`
**Body ejemplo:**
```json
{
	"enabledFilters": ["CustomerValidationFilter", "ProductValidationFilter", ...]
}
```

---

## Arquitectura y flujo

1. **Validación**: cliente, productos, integridad de datos.
2. **Cálculo**: precios, descuentos, impuestos.
3. **Pago y confirmación**: simula procesamiento de pago y genera código de confirmación.
4. **Manejo de errores**: cualquier filtro puede detener el pipeline y devolver errores claros.

---

## Testing

Ejecuta todos los tests con:
```bash
npm test
```
Incluye tests unitarios para cada filtro y de integración para el pipeline y endpoints.

---

## Ejemplo de pedido válido
```json
{
	"id": "order100",
	"customerId": "c1",
	"items": [
		{ "productId": "p1", "quantity": 1 },
		{ "productId": "p2", "quantity": 2 }
	],
	"status": "pending",
	"createdAt": "2025-09-09T10:00:00Z"
}
```

## Ejemplo de respuesta con confirmación
```json
{
	"success": true,
	"finalOrder": {
		"id": "order100",
		"customerId": "c1",
		"items": [ ... ],
		"status": "completed",
		"metadata": {
			"confirmationCode": "CONF-XXXXXXX"
		},
		...
	},
	"filterResults": [ ... ],
	"executionTime": 15
}
```

---

## Autores y créditos
- Desarrollado por JuanPeMiche 286845
